import { put } from '@vercel/blob';

const POST = async ({ request }) => {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const material = formData.get("material")?.toString() || "Structural Steel";
    const forceDirection = formData.get("force_direction")?.toString() || "+Z";
    const forceMagnitude = formData.get("force_magnitude")?.toString() || "5000";
    if (!file) {
      return new Response(JSON.stringify({ error: "No STEP file provided" }), { status: 400 });
    }
    const jobId = crypto.randomUUID().slice(0, 12);
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const stepBlob = await put(`fea-jobs/${jobId}/${safeName}`, file, {
      access: "public",
      contentType: "application/octet-stream"
    });
    const job = {
      jobId,
      status: "pending",
      filename: file.name,
      material,
      forceDirection,
      forceMagnitude: parseFloat(forceMagnitude),
      stepBlobUrl: stepBlob.url,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      results: null,
      images: null
    };
    await put(`fea-jobs/${jobId}/job.json`, JSON.stringify(job), {
      access: "public",
      contentType: "application/json"
    });
    return new Response(JSON.stringify({
      jobId,
      status: "pending",
      filename: file.name,
      message: "Job queued. A local ANSYS machine will process it."
    }), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Upload failed";
    return new Response(JSON.stringify({ error: msg }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
