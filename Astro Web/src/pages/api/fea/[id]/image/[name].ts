import type { APIRoute } from "astro";
import { list } from "@vercel/blob";

export const GET: APIRoute = async ({ params }) => {
  try {
    const { id, name } = params;
    if (!id || !name) {
      return new Response(JSON.stringify({ error: "Missing params" }), { status: 400 });
    }

    const { blobs } = await list({ limit: 1000, prefix: `fea-jobs/${id}/` });
    for (const b of blobs) {
      const pathName = b.pathname.split("/").pop() || "";
      const baseName = pathName.replace(/\.(png|jpg|jpeg)$/, "");
      if (baseName === name && /\.(png|jpg|jpeg)$/i.test(pathName)) {
        const blobRes = await fetch(b.url);
        if (!blobRes.ok) {
          return new Response(JSON.stringify({ error: "Failed to fetch image" }), { status: 500 });
        }
        const contentType = pathName.endsWith(".png") ? "image/png" : "image/jpeg";
        return new Response(blobRes.body, {
          status: 200,
          headers: {
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=86400",
          },
        });
      }
    }

    return new Response(JSON.stringify({ error: "Image not found" }), { status: 404 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Image fetch failed";
    return new Response(JSON.stringify({ error: msg }), { status: 500 });
  }
};
