import { list, put } from '@vercel/blob';

const FEA_API_KEY = process.env.FEA_API_KEY || "fea-local-api-key-change-me";
const GET = async ({ params }) => {
  try {
    const { id } = params;
    if (!id) {
      return new Response(JSON.stringify({ error: "Missing job ID" }), { status: 400 });
    }
    const jobUrl = await findJobBlob(id);
    if (!jobUrl) {
      return new Response(JSON.stringify({ error: "Job not found" }), { status: 404 });
    }
    const res = await fetch(jobUrl);
    const job = await res.json();
    const { blobs } = await list({ prefix: `fea-jobs/${id}/` });
    const images = {};
    for (const b of blobs) {
      if (b.pathname.endsWith(".png")) {
        const imgName = b.pathname.split("/").pop()?.replace(".png", "") || "";
        images[imgName] = b.url;
      }
    }
    return new Response(JSON.stringify({
      ...job,
      images: Object.keys(images).length > 0 ? images : job.images
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to get job";
    return new Response(JSON.stringify({ error: msg }), { status: 500 });
  }
};
const POST = async ({ params, request }) => {
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
    const images = formData.getAll("images");
    if (!resultJson) {
      return new Response(JSON.stringify({ error: "No result JSON provided" }), { status: 400 });
    }
    const results = JSON.parse(resultJson);
    const uploadedImages = {};
    for (const img of images) {
      const imgName = img.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const blob = await put(`fea-jobs/${id}/${imgName}`, img, {
        access: "public",
        contentType: img.type || "image/png"
      });
      const key = imgName.replace(".png", "").replace(".jpg", "");
      uploadedImages[key] = blob.url;
    }
    const jobRes = await fetch(`${new URL(request.url).origin}/api/fea/${id}`);
    const currentJob = jobRes.ok ? await jobRes.json() : {};
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
        material: results.material
      },
      images: uploadedImages,
      completedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    await put(`fea-jobs/${id}/job.json`, JSON.stringify(updatedJob), {
      access: "public",
      contentType: "application/json"
    });
    return new Response(JSON.stringify({
      success: true,
      jobId: id,
      status: updatedJob.status,
      images: uploadedImages
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to upload results";
    return new Response(JSON.stringify({ error: msg }), { status: 500 });
  }
};
async function findJobBlob(jobId) {
  try {
    const { blobs } = await list({ prefix: `fea-jobs/${jobId}/job.json` });
    if (blobs.length > 0) return blobs[0].url;
    return null;
  } catch {
    return null;
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
