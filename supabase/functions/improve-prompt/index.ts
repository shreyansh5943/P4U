import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get("GEMINI_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    // Accept both 'prompt' and 'originalPrompt' for compatibility
    const prompt = body.originalPrompt || body.prompt;
    const improvementType = body.improvementType || "creative-enhancement";

    if (!geminiApiKey) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    // If prompt is missing or empty, return error (do not call Gemini)
    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "No structured prompt provided." }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Set instructions based on improvementType
    let instructions = "";
    switch (improvementType) {
      case "creative-enhancement":
        instructions = `- Add creative ideas, innovative features, and unique design suggestions.\n- Make the prompt more inspiring and imaginative.`;
        break;
      case "clarity":
        instructions = `- Improve clarity, tone, and readability.\n- Make instructions easy to follow and user-friendly.`;
        break;
      case "seo":
        instructions = `- Add SEO best practices, keywords, and optimization tips.\n- Make the prompt more search-engine friendly.`;
        break;
      case "technical":
        instructions = `- Add technical precision, implementation details, and best practices.\n- Make the prompt more actionable for developers.`;
        break;
      default:
        instructions = `- Add creative ideas, innovative features, and unique design suggestions.\n- Make the prompt more inspiring and imaginative.`;
    }

    const systemPrompt = `# Role\nAct as Agent X, a highly creative AI for website development.\n\n# Task\nYou will receive a structured website development prompt from the user. Your job is to directly edit, improve, and expand the structured prompt itself—do not return a static template.\n\n## Instructions\n${instructions}\n- Read the user's structured prompt carefully.\n- Make direct changes to the prompt: add creative ideas, technical suggestions, and user experience improvements.\n- Rewrite, reorganize, and expand sections as needed for clarity, detail, and innovation.\n- If the prompt is missing details, add them or suggest clarifying questions inline.\n- Your output should be the improved, edited version of the user's structured prompt.\n- Do not return a generic template—always modify the user's actual content.\n- IMPORTANT: Return ONLY the improved prompt. Do NOT include any role introduction, explanations, or extra text.\n\n# Example\nIf the user provides a prompt with sections like 'Goal', 'Features', 'Design', etc., edit those sections to be more detailed, creative, and actionable.\n\n# Notes\n- Be positive and encouraging.\n- Avoid jargon without explanation.\n- Focus on practical, user-focused improvements.\n\n# Structured Prompt (to edit)\n${prompt}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: systemPrompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const improvedPrompt =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return new Response(JSON.stringify({ improvedPrompt }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in improve-prompt function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
