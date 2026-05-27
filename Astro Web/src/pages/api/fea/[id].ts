import type { APIRoute } from "astro";
import { put, list } from "@vercel/blob";

const FEA_API_KEY = import.meta.env.FEA_API_KEY || process.env.FEA_API_KEY || "fea-local-api-key-change-me";

// GET /api/fea/:id — get job status and results (public)
export const GET: APIRoute = async ({ params }) => {
  try {
    const { id } = params;
    if (!id) {
      return new Response(JSON.stringify({ error: "Missing job ID" }), { status: 400 });
    }

    const jobUrl = await findJobBlob(id);
    if (!jobUrl) {
      return new Response(JSON.stringify({ error: "Job not found" }), { status: 404 });
    }

    const jobRes = await fetch(jobUrl);
    if (!jobRes.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch job" }), { status: 500 });
    }
    const job = await jobRes.json();

    // Build image API URLs (relative paths — work on any domain)
    const images: Record<string, string> = {};

    const prefix = `fea-jobs/${id}/`;
    const { blobs } = await list({ prefix });
    for (const b of blobs) {
      if (b.pathname.endsWith(".png") || b.pathname.endsWith(".jpg")) {
        const imgName = b.pathname.split("/").pop()?.replace(/\.(png|jpg)$/, "") || "";
        images[imgName] = `/api/fea/${id}/image/${imgName}`;
      }
    }

    return new Response(JSON.stringify({
      ...job,
      images: Object.keys(images).length > 0 ? images : job.images,
    }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to get job";
    return new Response(JSON.stringify({ error: msg }), { status: 500 });
  }
};

// POST /api/fea/:id — upload results from local poller (requires auth)
export const POST: APIRoute = async ({ params, request }) => {
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

    const formData = await request.formData();
    const resultJson = formData.get("result")?.toString();
    const images = formData.getAll("images") as File[];

    if (!resultJson) {
      return new Response(JSON.stringify({ error: "No result JSON provided" }), { status: 400 });
    }

    const results = JSON.parse(resultJson);
    const uploadedImages: Record<string, string> = {};

    for (const img of images) {
      const imgName = img.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      await put(`fea-jobs/${id}/${imgName}`, img, {
        access: "private",
        contentType: img.type || "image/png",
      });
      const key = imgName.replace(".png", "").replace(".jpg", "");
      uploadedImages[key] = `/api/fea/${id}/image/${key}`;
    }

    const existingJobUrl = await findJobBlob(id);
    const currentJob = existingJobUrl
      ? await (await fetch(existingJobUrl)).json()
      : {};

    const updatedJob = {
      ...currentJob,
      status: results.status || "completed",
      results: {
        stressMaxMPa: results.stress_max_MPa,
        stressMinPa: results.stress_min_Pa,
        deformMaxMm: results.deform_max_mm,
        strainMax: results.strain_max,
        safetyFactor: results.safety_factor,
        yieldStrengthMPa: results.yield_strength_MPa,
        material: results.material,
      },
      images: uploadedImages,
      completedAt: new Date().toISOString(),
    };

    await put(`fea-jobs/${id}/job.json`, JSON.stringify(updatedJob), {
      access: "private",
      contentType: "application/json",
    });

    return new Response(JSON.stringify({
      success: true,
      jobId: id,
      status: updatedJob.status,
      images: uploadedImages,
    }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to upload results";
    return new Response(JSON.stringify({ error: msg }), { status: 500 });
  }
};

async function findJobBlob(jobId: string): Promise<string | null> {
  try {
    const { blobs } = await list({ prefix: `fea-jobs/${jobId}/job.json` });
    if (blobs.length > 0) return blobs[0].downloadUrl;
    return null;
  } catch {
    return null;
  }
}
