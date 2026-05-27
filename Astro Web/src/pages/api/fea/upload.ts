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

    // Store STEP file (private — accessed via API)
    const stepBlob = await put(`fea-jobs/${jobId}/${safeName}`, file, {
      access: "private",
      contentType: "application/octet-stream",
    });

    // Store job metadata
    const job = {
      jobId,
      status: "pending",
      filename: file.name,
      material,
      forceDirection,
      forceMagnitude: parseFloat(forceMagnitude),
      stepBlobUrl: stepBlob.url,
      createdAt: new Date().toISOString(),
      results: null,
      images: null,
    };

    await put(`fea-jobs/${jobId}/job.json`, JSON.stringify(job), {
      access: "private",
      contentType: "application/json",
    });

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
