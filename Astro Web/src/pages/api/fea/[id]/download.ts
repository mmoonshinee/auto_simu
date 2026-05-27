import type { APIRoute } from "astro";
import { list } from "@vercel/blob";

const FEA_API_KEY = import.meta.env.FEA_API_KEY || process.env.FEA_API_KEY || "fea-local-api-key-change-me";

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const { id } = params;
    if (!id) {
      return new Response(JSON.stringify({ error: "Missing job ID" }), { status: 400 });
    }

    const auth = request.headers.get("authorization") || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
    if (!FEA_API_KEY || token !== FEA_API_KEY) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    // Find job metadata
    const { blobs: jobBlobs } = await list({ prefix: `fea-jobs/${id}/job.json` });
    if (jobBlobs.length === 0) {
      return new Response(JSON.stringify({ error: "Job not found" }), { status: 404 });
    }

    const jobRes = await fetch(jobBlobs[0].downloadUrl);
    const job = await jobRes.json();

    // Find the STEP file in Blob
    const { blobs: allBlobs } = await list({ prefix: `fea-jobs/${id}/` });
    let stepDownloadUrl = "";
    for (const b of allBlobs) {
      if (b.pathname.endsWith(".step") || b.pathname.endsWith(".stp")) {
        stepDownloadUrl = b.downloadUrl;
        break;
      }
    }

    if (!stepDownloadUrl) {
      // Fallback: try the stored stepBlobUrl (which is already a downloadUrl)
      if (job.stepBlobUrl) {
        stepDownloadUrl = job.stepBlobUrl;
      } else {
        return new Response(JSON.stringify({ error: "STEP file not found" }), { status: 404 });
      }
    }

    const blobRes = await fetch(stepDownloadUrl);
    if (!blobRes.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch STEP" }), { status: 500 });
    }

    return new Response(blobRes.body, {
      status: 200,
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${job.filename || "model.step"}"`,
      },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Download failed";
    return new Response(JSON.stringify({ error: msg }), { status: 500 });
  }
};
