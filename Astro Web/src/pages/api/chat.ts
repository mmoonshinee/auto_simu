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
      "suggest load cases, and help interpret analysis results.";

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
