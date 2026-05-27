import { list } from '@vercel/blob';

const FEA_API_KEY = process.env.FEA_API_KEY || "fea-local-api-key-change-me";
const GET = async ({ request }) => {
  try {
    const auth = request.headers.get("authorization") || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
    const expected = FEA_API_KEY;
    if (!expected || token !== expected) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    const { blobs } = await list({ prefix: "fea-jobs/" });
    const jobBlobs = blobs.filter((b) => b.pathname.endsWith("/job.json"));
    const jobs = await Promise.all(
      jobBlobs.map(async (b) => {
        try {
          const res = await fetch(b.url);
          return await res.json();
        } catch {
          return null;
        }
      })
    );
    const validJobs = jobs.filter(Boolean);
    validJobs.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
    const pending = validJobs.filter((j) => j.status === "pending");
    return new Response(JSON.stringify({
      total: validJobs.length,
      pending: pending.length,
      jobs: pending.map((j) => ({
        jobId: j.jobId,
        filename: j.filename,
        material: j.material,
        forceDirection: j.forceDirection,
        forceMagnitude: j.forceMagnitude,
        stepBlobUrl: j.stepBlobUrl,
        createdAt: j.createdAt
      }))
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to list jobs";
    return new Response(JSON.stringify({ error: msg }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
