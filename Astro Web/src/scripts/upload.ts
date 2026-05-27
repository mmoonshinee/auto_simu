import Chart from "chart.js/auto";

// ── Config (can be overridden via localStorage) ──
const STORAGE_KEY_URL = "fea_backend_url";
const STORAGE_KEY_TOKEN = "fea_api_token";

function getBackendUrl(): string {
  return localStorage.getItem(STORAGE_KEY_URL) || "http://localhost:8000";
}

function getApiToken(): string {
  return localStorage.getItem(STORAGE_KEY_TOKEN) || "";
}

// ── DOM refs ──
const uploadZone = document.getElementById("upload-zone")!;
const fileInput = document.getElementById("file-input")! as HTMLInputElement;
const uploadPrompt = document.getElementById("upload-prompt")!;
const uploadStatus = document.getElementById("upload-status")!;
const uploadFilename = document.getElementById("upload-filename")!;
const uploadMessage = document.getElementById("upload-message")!;
const feaSettings = document.getElementById("fea-settings")!;
const feaRunBtn = document.getElementById("fea-run-btn")! as HTMLButtonElement;
const feaProgress = document.getElementById("fea-progress")!;
const feaProgressBar = document.getElementById("fea-progress-bar")!;
const feaProgressText = document.getElementById("fea-progress-text")!;
const feaResults = document.getElementById("fea-results")!;
const feaResultImages = document.getElementById("fea-result-images")!;
const feaResultSummary = document.getElementById("fea-result-summary")!;
const chatContainer = document.getElementById("chat-container")!;
const chatMessages = document.getElementById("chat-messages")!;
const chatInput = document.getElementById("chat-input")! as HTMLInputElement;
const chatSend = document.getElementById("chat-send")!;
const cfgToggle = document.getElementById("cfg-toggle")!;
const cfgPanel = document.getElementById("cfg-panel")!;
const cfgBackendUrl = document.getElementById("cfg-backend-url")! as HTMLInputElement;
const cfgApiToken = document.getElementById("cfg-api-token")! as HTMLInputElement;
const cfgSave = document.getElementById("cfg-save")!;

// ── State ──
let fileContent: string | null = null;
let fileName: string | null = null;
let currentJobId: string | null = null;
let pollTimer: ReturnType<typeof setInterval> | null = null;
const chartInstances: Chart[] = [];

// ── Init ──
cfgBackendUrl.value = getBackendUrl();
cfgApiToken.value = getApiToken();

cfgToggle.addEventListener("click", () => {
  cfgPanel.classList.toggle("hidden");
});
cfgSave.addEventListener("click", () => {
  localStorage.setItem(STORAGE_KEY_URL, cfgBackendUrl.value);
  localStorage.setItem(STORAGE_KEY_TOKEN, cfgApiToken.value);
  cfgPanel.classList.add("hidden");
});

// ── File handling ──
uploadZone.addEventListener("click", () => fileInput.click());
uploadZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadZone.classList.add("border-accent");
});
uploadZone.addEventListener("dragleave", () => uploadZone.classList.remove("border-accent"));
uploadZone.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadZone.classList.remove("border-accent");
  const files = e.dataTransfer?.files;
  if (files?.length) handleFile(files[0]);
});
fileInput.addEventListener("change", () => {
  if (fileInput.files?.length) handleFile(fileInput.files[0]);
});

async function handleFile(file: File) {
  const ext = file.name.split(".").pop()?.toLowerCase();
  if (!ext || !["step", "stp", "iges", "igs", "x_t", "x_b"].includes(ext)) {
    alert("Unsupported format. Please upload STEP/IGES/Parasolid files.");
    return;
  }
  if (file.size > 50 * 1024 * 1024) {
    alert("File too large. Max 50MB.");
    return;
  }

  uploadPrompt.classList.add("hidden");
  uploadStatus.classList.remove("hidden");
  uploadFilename.textContent = file.name;
  uploadMessage.textContent = "Reading file...";

  try {
    fileContent = await file.text();
    fileName = file.name;
    const lineCount = fileContent.split("\n").length;
    uploadMessage.textContent = `${(file.size / 1024).toFixed(1)} kB, ${lineCount} lines. Ready.`;
    feaSettings.classList.remove("hidden");
    chatContainer.classList.remove("hidden");
    feaResults.classList.add("hidden");
  } catch (err: unknown) {
    uploadMessage.textContent = `Error reading file: ${(err as Error).message}`;
  }
}

// ── FEA Run ──
feaRunBtn.addEventListener("click", runFea);

function isDirectMode(): boolean {
  const url = getBackendUrl();
  return url && url !== "http://localhost:8000";
}

async function runFea() {
  if (!fileName) return;

  const material = (document.getElementById("fea-material") as HTMLSelectElement).value;
  const forceDir = (document.getElementById("fea-force-dir") as HTMLSelectElement).value;
  const forceMag = parseFloat((document.getElementById("fea-force-n") as HTMLInputElement).value) || 5000;

  feaRunBtn.setAttribute("disabled", "true");
  feaProgress.classList.remove("hidden");
  feaResults.classList.add("hidden");
  feaProgressBar.style.width = "5%";

  if (isDirectMode()) {
    await runFeaDirect(material, forceDir, forceMag);
  } else {
    await runFeaBlob(material, forceDir, forceMag);
  }
}

// ── Direct mode: talk to local/tunnel backend ──
async function runFeaDirect(material: string, forceDir: string, forceMag: number) {
  const backendUrl = getBackendUrl();
  const apiToken = getApiToken();

  feaProgressText.textContent = "Uploading to FEA server...";

  try {
    const form = new FormData();
    form.append("file", new Blob([fileContent!]), fileName!);
    form.append("material", material);
    form.append("force_direction", forceDir);
    form.append("force_magnitude", forceMag.toString());

    const headers: Record<string, string> = {};
    if (apiToken) headers["Authorization"] = `Bearer ${apiToken}`;

    feaProgressBar.style.width = "15%";
    feaProgressText.textContent = "FEA job submitted, waiting for Mechanical...";

    const res = await fetch(`${backendUrl}/api/fea/run`, {
      method: "POST", body: form, headers,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
      throw new Error(err.error || err.detail || `Server error: ${res.status}`);
    }

    const data = await res.json();
    currentJobId = data.job_id;
    feaProgressText.textContent = "ANSYS Mechanical is analyzing... (~3 min)";
    pollTimer = setInterval(() => pollFeaDirect(backendUrl, apiToken), 3000);
  } catch (err: unknown) {
    feaProgressText.textContent = `Error: ${(err as Error).message}`;
    feaRunBtn.removeAttribute("disabled");
  }
}

async function pollFeaDirect(backendUrl: string, apiToken: string) {
  if (!currentJobId) return;
  try {
    const headers: Record<string, string> = {};
    if (apiToken) headers["Authorization"] = `Bearer ${apiToken}`;
    const res = await fetch(`${backendUrl}/api/fea/status/${currentJobId}`, { headers });
    if (!res.ok) throw new Error(`Status failed: ${res.status}`);
    const data = await res.json();
    handleFeaStatus(data, backendUrl);
  } catch (err: unknown) {
    clearInterval(pollTimer!);
    pollTimer = null;
    feaRunBtn.removeAttribute("disabled");
    feaProgressText.textContent = `Connection error: ${(err as Error).message}`;
  }
}

// ── Vercel Blob mode: use Vercel API routes, polled by local machine ──
async function runFeaBlob(material: string, forceDir: string, forceMag: number) {
  feaProgressText.textContent = "Uploading to cloud storage...";

  try {
    const form = new FormData();
    form.append("file", new Blob([fileContent!]), fileName!);
    form.append("material", material);
    form.append("force_direction", forceDir);
    form.append("force_magnitude", forceMag.toString());

    feaProgressBar.style.width = "15%";

    const res = await fetch("/api/fea/upload", { method: "POST", body: form });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
      if (res.status === 500) {
        throw new Error("Vercel Blob storage not configured. Set BLOB_READ_WRITE_TOKEN in Vercel env vars, or configure a direct backend URL.");
      }
      throw new Error(err.error || `Upload failed: ${res.status}`);
    }

    const data = await res.json();
    currentJobId = data.jobId;
    feaProgressText.textContent = "Job queued. Waiting for ANSYS machine to pick it up...";
    feaProgressBar.style.width = "25%";
    pollTimer = setInterval(pollFeaBlob, 3000);
  } catch (err: unknown) {
    feaProgressText.textContent = `Error: ${(err as Error).message}`;
    feaRunBtn.removeAttribute("disabled");
  }
}

async function pollFeaBlob() {
  if (!currentJobId) return;
  try {
    const res = await fetch(`/api/fea/${currentJobId}`);
    if (!res.ok) throw new Error(`Status failed: ${res.status}`);
    const data = await res.json();
    handleFeaStatus(data, ""); // no backendUrl needed — images are absolute Blob URLs
  } catch (err: unknown) {
    clearInterval(pollTimer!);
    pollTimer = null;
    feaRunBtn.removeAttribute("disabled");
    feaProgressText.textContent = `Connection error: ${(err as Error).message}`;
  }
}

// ── Shared status handling ──
function handleFeaStatus(data: any, backendUrl: string) {
  if (data.status === "pending") {
    feaProgressBar.style.width = "25%";
    feaProgressText.textContent = "Queued, waiting for ANSYS machine...";
  } else if (data.status === "running") {
    feaProgressBar.style.width = "50%";
    feaProgressText.textContent = "ANSYS Mechanical is solving...";
  } else {
    clearInterval(pollTimer!);
    pollTimer = null;
    feaRunBtn.removeAttribute("disabled");

    if (data.status === "completed") {
      feaProgressBar.style.width = "100%";
      feaProgressText.textContent = "Analysis complete!";
      displayResults(data, backendUrl);
    } else if (data.status === "timeout") {
      feaProgressText.textContent = "FEA timed out. Try simpler geometry.";
    } else {
      feaProgressText.textContent = `FEA failed: ${data.error || "Unknown error"}`;
      // If job was just created, show helpful message
      if (data.status === "pending" && !data.results) {
        feaProgressText.textContent = "Waiting for ANSYS machine to process... (ensure fea_poller.py is running)";
      }
    }
  }
}

function displayResults(data: any, backendUrl: string) {
  // Normalize result field names (direct mode uses snake_case, blob mode uses camelCase)
  const r = data.results || data;
  const images = data.images || {};

  if (r) {
    const lines: string[] = [];
    const stressMax = r.stress_max_MPa || r.stressMaxMPa;
    const deformMax = r.deform_max_mm || r.deformMaxMm;
    const safetyFactor = r.safety_factor || r.safetyFactor;
    const yieldStrength = r.yield_strength_MPa || r.yieldStrengthMPa;
    const material = r.material || data.material;

    if (stressMax != null) lines.push(`Max Stress: <b>${stressMax} MPa</b>`);
    if (deformMax != null) lines.push(`Max Deformation: <b>${deformMax} mm</b>`);
    if (safetyFactor != null) {
      const color = safetyFactor < 1.5 ? "color: #ef4444" : "color: #22c55e";
      lines.push(`Safety Factor: <b style="${color}">${safetyFactor}</b> (yield: ${yieldStrength || "?"} MPa)`);
    }
    if (material) lines.push(`Material: <b>${material}</b>`);
    feaResultSummary.innerHTML = lines.join("<br>");
  }

  feaResultImages.innerHTML = "";
  if (images && Object.keys(images).length > 0) {
    const imgOrder = ["stress", "strain", "deform", "mesh"];
    for (const name of imgOrder) {
      const url = images[name];
      if (url) {
        const fullUrl = url.startsWith("http") ? url : `${backendUrl}${url}`;
        const div = document.createElement("div");
        div.className = "flex flex-col items-center";
        const label = document.createElement("p");
        label.className = "text-sm font-medium mb-1";
        label.textContent = name.charAt(0).toUpperCase() + name.slice(1);
        const img = document.createElement("img");
        img.src = fullUrl;
        img.alt = name;
        img.className = "w-full max-w-md rounded-lg border border-border";
        img.loading = "lazy";
        div.appendChild(label);
        div.appendChild(img);
        feaResultImages.appendChild(div);
      }
    }
  }

  feaResults.classList.remove("hidden");
}

// ── AI Chat ──
async function sendMessage() {
  const msg = chatInput.value.trim();
  if (!msg) return;

  addChatBubble("You", msg);
  chatInput.value = "";
  chatSend.setAttribute("disabled", "true");

  // If we have FEA results, include them as context
  let enrichedMsg = msg;
  if (currentJobId) {
    try {
      const backendUrl = getBackendUrl();
      const apiToken = getApiToken();
      const headers: Record<string, string> = {};
      if (apiToken) headers["Authorization"] = `Bearer ${apiToken}`;
      const res = await fetch(`${backendUrl}/api/fea/status/${currentJobId}`, { headers });
      if (res.ok) {
        const data = await res.json();
        if (data.results) {
          enrichedMsg = `[FEA Results Context]\n${JSON.stringify(data.results, null, 2)}\n\n[User message]\n${msg}`;
        }
      }
    } catch {
      // ignore, proceed with plain message
    }
  }

  const form = new FormData();
  form.append("message", enrichedMsg);
  if (fileContent && !currentJobId) {
    form.append("file_content", fileContent.slice(0, 15000));
    form.append("file_id", fileName || "unknown");
  }

  try {
    // Use Vercel API route for AI chat (calls DeepSeek directly from Vercel)
    const res = await fetch("/api/chat", { method: "POST", body: form });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: "Chat error" }));
      throw new Error(err.error || "Chat error");
    }
    const data = await res.json();
    addChatBubble("AI", data.reply);
  } catch (err: unknown) {
    addChatBubble("AI", `Error: ${(err as Error).message}`);
  } finally {
    chatSend.removeAttribute("disabled");
  }
}

// ── Chart rendering ──
interface ChartDataset {
  label?: string;
  data: number[][];
}

interface ChartConfig {
  type: string;
  title?: string;
  xLabel?: string;
  yLabel?: string;
  data?: number[][];
  datasets?: ChartDataset[];
}

function parseChartBlocks(text: string): { cleanText: string; charts: ChartConfig[] } {
  const charts: ChartConfig[] = [];
  const re = /```chart-data\n([\s\S]*?)```/g;
  let match;
  while ((match = re.exec(text)) !== null) {
    try {
      charts.push(JSON.parse(match[1]));
    } catch {
      // ignore parse errors
    }
  }
  const cleanText = text.replace(/```chart-data\n[\s\S]*?```/g, "").trim();
  return { cleanText, charts };
}

function renderChart(container: HTMLElement, config: ChartConfig) {
  const wrapper = document.createElement("div");
  wrapper.className = "my-4 bg-background border border-border rounded-lg p-4";
  const title = document.createElement("p");
  title.className = "text-sm font-medium mb-2 text-center";
  title.textContent = config.title || "Chart";
  wrapper.appendChild(title);
  const canvas = document.createElement("canvas");
  canvas.style.maxHeight = "320px";
  wrapper.appendChild(canvas);
  container.appendChild(wrapper);

  const datasets = (config.datasets || [
    { label: config.title || "Data", data: config.data || [] },
  ]).map((ds) => ({
    label: ds.label,
    data: ds.data.map((p) => ({ x: p[0], y: p[1] })),
  }));

  const chart = new Chart(canvas, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type: config.type as any,
    data: { datasets },
    options: {
      responsive: true,
      plugins: {
        legend: { display: datasets.length > 1 },
      },
      scales: {
        x: { title: { display: true, text: config.xLabel || "" } },
        y: { title: { display: true, text: config.yLabel || "" } },
      },
    },
  });
  chartInstances.push(chart);
}

function addChatBubble(sender: string, text: string) {
  const { cleanText, charts } = parseChartBlocks(text);

  const div = document.createElement("div");
  div.className = "flex flex-col gap-2";

  const header = document.createElement("div");
  header.className = "flex gap-2";
  const senderColor = sender === "AI" ? "text-accent" : "text-foreground";

  if (cleanText) {
    header.innerHTML = `<span class="${senderColor} font-bold shrink-0">${sender}:</span>
                        <p class="text-sm whitespace-pre-wrap">${cleanText}</p>`;
  } else {
    header.innerHTML = `<span class="${senderColor} font-bold shrink-0">${sender}:</span>`;
  }
  div.appendChild(header);

  for (const chartConfig of charts) {
    renderChart(div, chartConfig);
  }

  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

chatSend.addEventListener("click", sendMessage);
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});
