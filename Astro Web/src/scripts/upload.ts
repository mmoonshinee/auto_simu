import Chart from "chart.js/auto";

let fileContent: string | null = null;
let fileName: string | null = null;
const chartInstances: Chart[] = [];

const uploadZone = document.getElementById("upload-zone")!;
const fileInput = document.getElementById("file-input")! as HTMLInputElement;
const uploadPrompt = document.getElementById("upload-prompt")!;
const uploadStatus = document.getElementById("upload-status")!;
const uploadFilename = document.getElementById("upload-filename")!;
const uploadMessage = document.getElementById("upload-message")!;
const chatContainer = document.getElementById("chat-container")!;
const chatMessages = document.getElementById("chat-messages")!;
const chatInput = document.getElementById("chat-input")! as HTMLInputElement;
const chatSend = document.getElementById("chat-send")!;

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
  if (file.size > 15 * 1024 * 1024) {
    alert("File too large. Max 15MB.");
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
    uploadMessage.textContent = `${(file.size / 1024).toFixed(1)} kB, ${lineCount} lines. Ready for analysis.`;
    chatContainer.classList.remove("hidden");
  } catch (err: unknown) {
    uploadMessage.textContent = `Error reading file: ${(err as Error).message}`;
  }
}

async function sendMessage() {
  const msg = chatInput.value.trim();
  if (!msg) return;

  addChatBubble("You", msg);
  chatInput.value = "";
  chatSend.setAttribute("disabled", "true");

  const form = new FormData();
  form.append("message", msg);
  if (fileContent) {
    form.append("file_content", fileContent);
    form.append("file_id", fileName || "unknown");
  }

  try {
    const res = await fetch("/api/chat", { method: "POST", body: form });
    if (!res.ok) {
      const err = await res.json();
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
