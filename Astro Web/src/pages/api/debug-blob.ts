import type { APIRoute } from "astro";
import { put, list } from "@vercel/blob";

export const GET: APIRoute = async () => {
  const logs: string[] = [];

  try {
    const testId = "test-" + Date.now();

    // 1. Put a test blob
    logs.push(`1. Putting test blob: fea-jobs/${testId}/test.json`);
    const blob = await put(`fea-jobs/${testId}/test.json`, JSON.stringify({ test: true, time: Date.now() }), {
      access: "private",
      contentType: "application/json",
    });
    logs.push(`   OK: url=${blob.url.slice(0, 80)}`);
    logs.push(`   downloadUrl=${blob.downloadUrl.slice(0, 80)}`);

    // 2. Try to fetch it back via downloadUrl
    logs.push("2. Fetching back via downloadUrl...");
    const fetchRes = await fetch(blob.downloadUrl);
    logs.push(`   Status: ${fetchRes.status}`);
    if (fetchRes.ok) {
      const text = await fetchRes.text();
      logs.push(`   Content: ${text}`);
    } else {
      logs.push(`   Error: ${await fetchRes.text()}`);
    }

    // 3. List blobs
    logs.push("3. Listing fea-jobs/...");
    const { blobs } = await list({ limit: 100, prefix: "fea-jobs/" });
    logs.push(`   Found: ${blobs.length} blobs`);
    for (const b of blobs.slice(0, 10)) {
      logs.push(`   - ${b.pathname} (${b.size} bytes)`);
    }

    // 4. List with specific prefix
    logs.push(`4. Listing fea-jobs/${testId}/...`);
    const { blobs: blobs2 } = await list({ limit: 100, prefix: `fea-jobs/${testId}/` });
    logs.push(`   Found: ${blobs2.length} blobs`);

    return new Response(JSON.stringify({ logs }, null, 2), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    logs.push(`FATAL: ${err instanceof Error ? err.message : String(err)}`);
    return new Response(JSON.stringify({ logs }, null, 2), { status: 500 });
  }
};
