import type { APIRoute } from "astro";
import OpenAI from "openai";

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const formData = await request.formData();
    const message = formData.get("message")?.toString() || "";
    const fileId = formData.get("file_id")?.toString();
    const fileContent = formData.get("file_content")?.toString();

    if (!message) {
      return new Response(JSON.stringify({ error: "No message provided" }), {
        status: 400,
      });
    }

    const apiKey = import.meta.env.DEEPSEEK_API_KEY || process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "DEEPSEEK_API_KEY not configured" }), {
        status: 500,
      });
    }

    const client = new OpenAI({
      apiKey,
      baseURL: "https://api.deepseek.com",
    });

    const systemPrompt =
      "You are an FEA (Finite Element Analysis) assistant. " +
      "You help users analyze mechanical parts, interpret simulation results, " +
      "and suggest design improvements. Be concise and technical. " +
      "When given CAD file data (STEP format), identify the geometry, " +
      "suggest load cases, and help interpret analysis results.\n\n" +
      "IMPORTANT — Visuals: NEVER output placeholder/stock image URLs. " +
      "If the user asks for a stress-strain curve, contour plot, or any chart, " +
      "output a JSON code block with the special language tag `chart-data` containing:\n" +
      "  { \"type\": \"scatter\"|\"line\"|\"bar\", \"title\": \"...\", " +
      "\"xLabel\": \"...\", \"yLabel\": \"...\", " +
      "\"datasets\": [{ \"label\": \"...\", \"data\": [[x,y],...] }] }\n" +
      "Generate reasonable FEA data points based on the material and geometry discussed. " +
      "For a typical stress-strain curve of a common material, include at least 15 data points " +
      "showing elastic and plastic regions. For contour descriptions, use paragraph text.";

    let userMessage = message;
    if (fileContent) {
      userMessage = `[Uploaded file content]\n${fileContent.slice(0, 15000)}\n\n[User message]\n${message}`;
    }

    const resp = await client.chat.completions.create({
      model: "deepseek-chat",
      max_tokens: 4096,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
    });

    return new Response(
      JSON.stringify({
        reply: resp.choices[0].message.content,
        model: resp.model,
        usage: {
          input_tokens: resp.usage?.prompt_tokens,
          output_tokens: resp.usage?.completion_tokens,
        },
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || "Chat error" }),
      { status: 500 }
    );
  }
};
