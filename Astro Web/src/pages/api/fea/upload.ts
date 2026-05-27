import type { APIRoute } from "astro";
import { put } from "@vercel/blob";

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const material = formData.get("material")?.toString() || "Structural Steel";
    const forceDirection = formData.get("force_direction")?.toString() || "+Z";
    const forceMagnitude = formData.get("force_magnitude")?.toString() || "5000";

    if (!file) {
      return new Response(JSON.stringify({ error: "No STEP file provided" }), { status: 400 });
    }

    const jobId = crypto.randomUUID().slice(0, 12);
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");

    // Store STEP file
    const stepBlob = await put(`fea-jobs/${jobId}/${safeName}`, file, {
      access: "private",
      contentType: "application/octet-stream",
    });

    const job = {
      jobId,
      status: "pending",
      filename: file.name,
      material,
      forceDirection,
      forceMagnitude: parseFloat(forceMagnitude),
      stepBlobUrl: stepBlob.downloadUrl,
      createdAt: new Date().toISOString(),
      results: null,
      images: null,
    };

    // Store job metadata
    await put(`fea-jobs/${jobId}/job.json`, JSON.stringify(job), {
      access: "private",
      contentType: "application/json",
    });

    // Update master index (append this job)
    await addToIndex(job);

    return new Response(JSON.stringify({
      jobId,
      status: "pending",
      filename: file.name,
      message: "Job queued. A local ANSYS machine will process it.",
    }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Upload failed";
    return new Response(JSON.stringify({ error: msg }), { status: 500 });
  }
};

// Helper: append job to master index blob
async function addToIndex(job: any) {
  const indexBlobName = "fea-jobs/index.json";
  try {
    // Try to read existing index
    const { blobs } = await (await import("@vercel/blob")).list({ limit: 1, prefix: indexBlobName });
    let index: any[] = [];
    if (blobs.length > 0) {
      const res = await fetch(blobs[0].downloadUrl);
      if (res.ok) {
        index = await res.json().catch(() => []);
      }
    }
    // Add job summary (not full job to keep it small)
    index.push({
      jobId: job.jobId,
      status: job.status,
      filename: job.filename,
      material: job.material,
      forceDirection: job.forceDirection,
      forceMagnitude: job.forceMagnitude,
      createdAt: job.createdAt,
    });
    // Keep only last 200 jobs
    if (index.length > 200) index = index.slice(-200);
    await put(indexBlobName, JSON.stringify(index), {
      access: "private",
      contentType: "application/json",
    });
  } catch {
    // Index update is best-effort; job.json is the source of truth
  }
}

// Export for use in other routes
export { addToIndex };
