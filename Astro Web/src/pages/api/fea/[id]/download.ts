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
    const { blobs: jobBlobs } = await list({ limit: 1000, prefix: `fea-jobs/${id}/job.json` });
    if (jobBlobs.length === 0) {
      return new Response(JSON.stringify({ error: "Job not found" }), { status: 404 });
    }

    const jobRes = await fetch(jobBlobs[0].url);
    const job = await jobRes.json();

    // Find the STEP file
    const { blobs: allBlobs } = await list({ limit: 1000, prefix: `fea-jobs/${id}/` });
    let stepUrl = "";
    for (const b of allBlobs) {
      if (b.pathname.endsWith(".step") || b.pathname.endsWith(".stp")) {
        stepUrl = b.url;
        break;
      }
    }

    if (!stepUrl) {
      stepUrl = job.stepBlobUrl;
    }

    if (!stepUrl) {
      return new Response(JSON.stringify({ error: "STEP file not found" }), { status: 404 });
    }

    const blobRes = await fetch(stepUrl);
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
