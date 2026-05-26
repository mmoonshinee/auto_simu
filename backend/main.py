"""
FastAPI backend for ANSYS FEA Automation Web Service.
Handles file upload, AI analysis (DeepSeek / Claude), and FEA pipeline orchestration.
"""

import os
import json
import uuid
from pathlib import Path
from datetime import datetime
from typing import Optional

from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

app = FastAPI(title="ANSYS FEA Automation API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4321", "https://auto-simu.vercel.app", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = Path(os.getenv("UPLOAD_DIR", "./uploads"))
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
MAX_UPLOAD_SIZE_MB = int(os.getenv("MAX_UPLOAD_SIZE_MB", "50"))

# Provider config — pick based on which API key is set
DEEPSEEK_KEY = os.getenv("DEEPSEEK_API_KEY")
ANTHROPIC_KEY = os.getenv("ANTHROPIC_API_KEY")

if DEEPSEEK_KEY:
    _client = OpenAI(api_key=DEEPSEEK_KEY, base_url="https://api.deepseek.com")
    _model = os.getenv("AI_MODEL", "deepseek-chat")
    _provider = "deepseek"
elif ANTHROPIC_KEY:
    _client = OpenAI(api_key=ANTHROPIC_KEY)  # fallback, won't work with Anthropic
    _model = "claude-sonnet-4-6"
    _provider = "anthropic"
else:
    _client = None
    _model = None
    _provider = None

SYSTEM_PROMPT = (
    "You are an FEA (Finite Element Analysis) assistant. "
    "You help users analyze mechanical parts, interpret simulation results, "
    "and suggest design improvements. Be concise and technical. "
    "When given CAD file data (STEP format), identify the geometry, "
    "suggest load cases, and help interpret analysis results."
)


def get_client():
    if _client is None:
        raise HTTPException(500, "No AI provider configured — set DEEPSEEK_API_KEY or ANTHROPIC_API_KEY")
    return _client, _model


# ── Health ────────────────────────────────────────────────


@app.get("/api/health")
async def health():
    return {
        "status": "ok",
        "provider": _provider or "none",
        "model": _model or "none",
        "timestamp": datetime.now().isoformat(),
    }


# ── File Upload ───────────────────────────────────────────


@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    ext = Path(file.filename or "unknown").suffix.lower()
    if ext not in {".step", ".stp", ".iges", ".igs", ".x_t", ".x_b",
                   ".zip", ".pdf", ".txt", ".csv", ".json"}:
        raise HTTPException(400, f"Unsupported file type: {ext}")

    size = 0
    file_id = uuid.uuid4().hex[:12]
    safe_name = f"{file_id}_{file.filename}"
    dest = UPLOAD_DIR / safe_name

    with open(dest, "wb") as f:
        while chunk := await file.read(1024 * 1024):
            size += len(chunk)
            if size > MAX_UPLOAD_SIZE_MB * 1024 * 1024:
                f.close()
                dest.unlink(missing_ok=True)
                raise HTTPException(413, f"File exceeds {MAX_UPLOAD_SIZE_MB}MB limit")
            f.write(chunk)

    return {
        "file_id": file_id,
        "filename": file.filename,
        "size_bytes": size,
        "type": ext,
        "uploaded_at": datetime.now().isoformat(),
    }


# ── AI Chat ───────────────────────────────────────────────


@app.post("/api/chat")
async def chat(
    message: str = Form(...),
    file_id: Optional[str] = Form(None),
    conversation_id: Optional[str] = Form(None),
):
    client, model = get_client()

    user_content = _build_user_content(message, file_id)

    try:
        resp = client.chat.completions.create(
            model=model,
            max_tokens=4096,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_content},
            ],
        )
        return {
            "conversation_id": conversation_id or uuid.uuid4().hex[:12],
            "reply": resp.choices[0].message.content,
            "model": model,
            "provider": _provider,
            "usage": {
                "input_tokens": resp.usage.prompt_tokens,
                "output_tokens": resp.usage.completion_tokens,
            },
        }
    except Exception as e:
        raise HTTPException(500, f"AI API error: {str(e)}")


# ── AI Chat (Streaming SSE) ────────────────────────────────


@app.post("/api/chat/stream")
async def chat_stream(
    message: str = Form(...),
    file_id: Optional[str] = Form(None),
):
    client, model = get_client()
    user_content = _build_user_content(message, file_id)

    async def stream():
        try:
            stream_resp = client.chat.completions.create(
                model=model,
                max_tokens=4096,
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": user_content},
                ],
                stream=True,
            )
            for chunk in stream_resp:
                if chunk.choices[0].delta.content:
                    yield f"data: {json.dumps({'type': 'token', 'text': chunk.choices[0].delta.content})}\n\n"
            yield f"data: {json.dumps({'type': 'done'})}\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'type': 'error', 'message': str(e)})}\n\n"

    return StreamingResponse(stream(), media_type="text/event-stream")


# ── Helpers ───────────────────────────────────────────────


def _build_user_content(message: str, file_id: Optional[str]) -> str:
    parts = []
    if file_id:
        file_path = _find_upload(file_id)
        if file_path:
            file_text = _read_file_text(file_path)
            if file_text:
                parts.append(f"[File: {file_path.name}]\n{file_text}")
    parts.append(message)
    return "\n\n".join(parts)


def _find_upload(file_id: str) -> Optional[Path]:
    for f in UPLOAD_DIR.iterdir():
        if f.name.startswith(file_id + "_"):
            return f
    return None


def _read_file_text(path: Path) -> Optional[str]:
    ext = path.suffix.lower()
    if ext in {".step", ".stp"}:
        try:
            lines = path.read_text(encoding="utf-8", errors="ignore").splitlines()
            return "\n".join(lines[:300])
        except Exception:
            return None
    elif ext in {".txt", ".csv", ".json"}:
        try:
            return path.read_text(encoding="utf-8")[:10000]
        except Exception:
            return None
    else:
        return f"[Binary file: {path.name}, size={path.stat().st_size} bytes]"


# ── Run ───────────────────────────────────────────────────

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("BACKEND_PORT", "8000"))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
