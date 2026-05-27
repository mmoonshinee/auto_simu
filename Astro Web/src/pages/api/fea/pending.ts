import type { APIRoute } from "astro";
import { list } from "@vercel/blob";

const FEA_API_KEY = import.meta.env.FEA_API_KEY || process.env.FEA_API_KEY || "fea-local-api-key-change-me";

export const GET: APIRoute = async ({ request }) => {
  try {
    const auth = request.headers.get("authorization") || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
    if (!FEA_API_KEY || token !== FEA_API_KEY) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    // Try reading master index first (fast path)
    let allJobs: any[] = [];
    const indexBlobName = "fea-jobs/index.json";
    try {
      const { blobs: indexBlobs } = await list({ limit: 1, prefix: indexBlobName });
      if (indexBlobs.length > 0) {
        const res = await fetch(indexBlobs[0].downloadUrl);
        if (res.ok) {
          allJobs = await res.json().catch(() => []);
        }
      }
    } catch {
      // Fallback: scan individual job files
    }

    // Fallback: if index is empty, scan for individual job files
    if (allJobs.length === 0) {
      const { blobs } = await list({ limit: 1000, prefix: "fea-jobs/" });
      const jobBlobs = blobs.filter((b) => b.pathname.endsWith("/job.json"));
      const jobs = await Promise.all(
        jobBlobs.map(async (b) => {
          try {
            const res = await fetch(b.downloadUrl);
            return await res.json();
          } catch {
            return null;
          }
        })
      );
      allJobs = jobs.filter(Boolean);
    }

    allJobs.sort((a: any, b: any) => (b.createdAt || "").localeCompare(a.createdAt || ""));
    const pending = allJobs.filter((j: any) => j.status === "pending");

    return new Response(JSON.stringify({
      total: allJobs.length,
      pending: pending.length,
      jobs: pending.map((j: any) => ({
        jobId: j.jobId,
        filename: j.filename,
        material: j.material,
        forceDirection: j.forceDirection,
        forceMagnitude: j.forceMagnitude,
        createdAt: j.createdAt,
      })),
    }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to list jobs";
    return new Response(JSON.stringify({ error: msg }), { status: 500 });
  }
};
