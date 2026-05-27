"""FEA Job Poller — runs on the local Windows machine with ANSYS.
Polls the Vercel website for pending FEA jobs, downloads STEP files,
runs ANSYS Mechanical FEA, and uploads results + contour images back.

Usage:
  py fea_poller.py [--interval 5] [--once]

Config via environment variables or .env:
  VERCEL_URL=https://auto-simu.vercel.app
  FEA_API_KEY=fea-local-api-key-change-me
"""
import os
import sys
import json
import time
import argparse
import subprocess
import requests
from pathlib import Path
from datetime import datetime

# ── Config ────────────────────────────────────────────────
BASE_DIR = Path(__file__).resolve().parent
UPLOAD_DIR = BASE_DIR / "uploads"
RESULTS_DIR = BASE_DIR / "results"
FEA_SCRIPT = BASE_DIR / "run_generic_fea.py"
PYTHON_EXE = r"C:\Users\admin\AppData\Local\Programs\Python\Python311\python.exe"

VERCEL_URL = os.getenv("VERCEL_URL", "https://auto-simu.vercel.app").rstrip("/")
FEA_API_KEY = os.getenv("FEA_API_KEY", "fea-local-api-key-change-me")
POLL_INTERVAL = int(os.getenv("POLL_INTERVAL", "5"))

UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
RESULTS_DIR.mkdir(parents=True, exist_ok=True)

processed_jobs = set()


def log(msg: str):
    print(f"[{datetime.now().strftime('%H:%M:%S')}] {msg}")


def fetch_pending_jobs():
    """GET /api/fea/pending — returns list of pending jobs."""
    try:
        resp = requests.get(
            f"{VERCEL_URL}/api/fea/pending",
            headers={
                "Authorization": f"Bearer {FEA_API_KEY}",
                "Origin": VERCEL_URL,
            },
            timeout=15,
        )
        if resp.status_code == 401:
            log("ERROR: Unauthorized — check FEA_API_KEY matches Vercel's FEA_API_KEY env var")
            return []
        if not resp.ok:
            log(f"ERROR: HTTP {resp.status_code} from pending endpoint")
            return []
        data = resp.json()
        return data.get("jobs", [])
    except requests.exceptions.ConnectionError:
        # Vercel might be temporarily unreachable
        return []
    except Exception as e:
        log(f"ERROR fetching pending jobs: {e}")
        return []


def download_step(job: dict) -> Path | None:
    """Download STEP file from public blob URL or via API."""
    job_id = job["jobId"]
    filename = job.get("filename", "model.step")
    dest = UPLOAD_DIR / f"{job_id}_{filename}"

    if dest.exists():
        log(f"  File already downloaded: {dest}")
        return dest

    log(f"  Downloading: {filename}")

    # Try direct blob URL first (public store)
    step_url = job.get("stepBlobUrl", "")
    if step_url:
        try:
            resp = requests.get(step_url, timeout=120)
            if resp.ok:
                dest.write_bytes(resp.content)
                log(f"  Downloaded: {len(resp.content) / 1024:.0f} kB → {dest.name}")
                return dest
        except Exception:
            pass

    # Fallback: download via API
    try:
        resp = requests.get(
            f"{VERCEL_URL}/api/fea/{job_id}/download",
            headers={
                "Authorization": f"Bearer {FEA_API_KEY}",
                "Origin": VERCEL_URL,
            },
            timeout=120,
        )
        if resp.status_code == 401:
            log(f"  Unauthorized — check FEA_API_KEY")
            return None
        resp.raise_for_status()
        dest.write_bytes(resp.content)
        log(f"  Downloaded via API: {len(resp.content) / 1024:.0f} kB → {dest.name}")
        return dest
    except Exception as e:
        log(f"  Download failed: {e}")
        return None


def run_fea(step_path: Path, job: dict) -> dict | None:
    """Run the generic FEA script on the downloaded STEP file."""
    job_id = job["jobId"]
    material = job.get("material", "Structural Steel")
    force_dir = job.get("forceDirection", "+Z")
    force_n = job.get("forceMagnitude", 5000)

    log(f"  Running FEA: material={material}, force={force_n}N {force_dir}")

    cmd = [
        PYTHON_EXE, str(FEA_SCRIPT), str(step_path),
        "--material", material,
        "--force-direction", force_dir,
        "--force-magnitude", str(force_n),
        "--job-id", job_id,
    ]

    try:
        proc = subprocess.run(cmd, capture_output=True, text=True, timeout=600, cwd=str(BASE_DIR))
        stdout = proc.stdout

        # Extract JSON result block
        marker = "__JSON_RESULT__"
        if marker in stdout:
            json_start = stdout.index(marker) + len(marker)
            try:
                result = json.loads(stdout[json_start:].strip())
                log(f"  FEA complete: {result.get('status', 'unknown')}")
                return result
            except json.JSONDecodeError:
                log(f"  JSON parse error in FEA output")

        # Try reading results file
        result_file = RESULTS_DIR / f"{job_id}_results.json"
        if result_file.exists():
            result = json.loads(result_file.read_text(encoding="utf-8"))
            log(f"  FEA complete (from file): {result.get('status', 'unknown')}")
            return result

        log(f"  FEA failed — no results found")
        if proc.stderr:
            log(f"  stderr: {proc.stderr[:500]}")
        return None

    except subprocess.TimeoutExpired:
        log(f"  FEA timed out (>10 min)")
        return None
    except Exception as e:
        log(f"  FEA error: {e}")
        return None


def upload_results(job_id: str, results: dict):
    """POST /api/fea/:id — upload results + images to Vercel."""
    log(f"  Uploading results for {job_id}...")

    try:
        form = {}
        form["result"] = json.dumps(results)

        files = []
        img_dir = RESULTS_DIR / job_id
        for img_name in ["stress.png", "strain.png", "deform.png", "mesh.png"]:
            img_path = img_dir / img_name
            if img_path.exists():
                files.append(("images", (img_name, img_path.read_bytes(), "image/png")))

        # Use multipart form data with both JSON and files
        resp = requests.post(
            f"{VERCEL_URL}/api/fea/{job_id}",
            data={"result": json.dumps(results)},
            files=files,
            headers={
                "Authorization": f"Bearer {FEA_API_KEY}",
                "Origin": VERCEL_URL,
            },
            timeout=60,
        )

        if resp.ok:
            log(f"  Results uploaded successfully")
            data = resp.json()
            for k, url in data.get("images", {}).items():
                log(f"    {k}: {url}")
        else:
            log(f"  Upload failed: HTTP {resp.status_code} — {resp.text[:200]}")
    except Exception as e:
        log(f"  Upload error: {e}")


def process_job(job: dict):
    """Full pipeline: download → FEA → upload."""
    job_id = job["jobId"]
    if job_id in processed_jobs:
        return

    log(f"Processing job {job_id}: {job.get('filename', 'unknown')}")
    processed_jobs.add(job_id)

    step_path = download_step(job)
    if not step_path:
        upload_results(job_id, {"status": "failed", "error": "Download failed"})
        return

    results = run_fea(step_path, job)
    if not results:
        upload_results(job_id, {"status": "failed", "error": "FEA execution failed"})
        return

    upload_results(job_id, results)


def poll_once():
    """Check for pending jobs, process one."""
    jobs = fetch_pending_jobs()
    if jobs:
        log(f"Found {len(jobs)} pending job(s)")
        for job in jobs:
            process_job(job)
    else:
        log("No pending jobs")


def main():
    parser = argparse.ArgumentParser(description="FEA Job Poller")
    parser.add_argument("--interval", type=int, default=POLL_INTERVAL, help="Poll interval in seconds")
    parser.add_argument("--once", action="store_true", help="Run once and exit")
    args = parser.parse_args()

    log(f"FEA Poller started")
    log(f"  Vercel: {VERCEL_URL}")
    log(f"  FEA script: {FEA_SCRIPT}")
    log(f"  Python: {PYTHON_EXE}")
    log(f"  Poll interval: {args.interval}s")

    if args.once:
        poll_once()
        return

    while True:
        try:
            poll_once()
        except KeyboardInterrupt:
            log("Poller stopped")
            break
        except Exception as e:
            log(f"Unexpected error: {e}")

        time.sleep(args.interval)


if __name__ == "__main__":
    main()
