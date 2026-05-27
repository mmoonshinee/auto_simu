import type { APIRoute } from "astro";
import { put, list, head } from "@vercel/blob";

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
    logs.push(`   url snippet: ${blob.url.slice(0, 80)}...`);
    logs.push(`   downloadUrl snippet: ${blob.downloadUrl.slice(0, 80)}...`);

    // 2. Try direct fetch with downloadUrl
    logs.push("2. Direct fetch downloadUrl...");
    const directFetch = await fetch(blob.downloadUrl);
    logs.push(`   Status: ${directFetch.status}`);

    // 3. Try head() to get fresh metadata
    logs.push("3. head() on blob.url...");
    try {
      const meta = await head(blob.url);
      logs.push(`   OK: size=${meta.size}, contentType=${meta.contentType}`);
      logs.push(`   fresh downloadUrl: ${meta.downloadUrl.slice(0, 80)}...`);

      // 4. Fetch with fresh downloadUrl from head()
      logs.push("4. Fetch with FRESH downloadUrl from head()...");
      const freshFetch = await fetch(meta.downloadUrl);
      logs.push(`   Status: ${freshFetch.status}`);
      if (freshFetch.ok) {
        logs.push(`   Content: ${await freshFetch.text()}`);
      } else {
        logs.push(`   Error: ${await freshFetch.text()}`);
      }
    } catch (e: any) {
      logs.push(`   FAIL: ${e.message}`);
    }

    // 5. Try head() on downloadUrl
    logs.push("5. head() on blob.downloadUrl...");
    try {
      const meta2 = await head(blob.downloadUrl);
      logs.push(`   OK: fresh downloadUrl: ${meta2.downloadUrl.slice(0, 80)}...`);

      logs.push("6. Fetch with downloadUrl from head(downloadUrl)...");
      const freshFetch2 = await fetch(meta2.downloadUrl);
      logs.push(`   Status: ${freshFetch2.status}`);
      if (freshFetch2.ok) {
        logs.push(`   Content: ${await freshFetch2.text()}`);
      } else {
        logs.push(`   Error: ${await freshFetch2.text()}`);
      }
    } catch (e: any) {
      logs.push(`   FAIL: ${e.message}`);
    }

    return new Response(JSON.stringify({ logs }, null, 2), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    logs.push(`FATAL: ${err instanceof Error ? err.message : String(err)}`);
    return new Response(JSON.stringify({ logs }, null, 2), { status: 500 });
  }
};
