
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { businessIdea, analysisType } = await req.json();

    if (!geminiApiKey) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    let systemPrompt = '';
    
    if (analysisType === 'business-analysis') {
      systemPrompt = `Analyze this business idea and suggest website structure. Return a JSON object with:
{
  "suggestedPages": ["Home", "About", "Services", "Contact"],
  "suggestedFeatures": ["Contact Form", "Gallery", "Testimonials"],
  "suggestedDesignStyle": "Modern & Professional",
  "explanation": "Brief explanation of why these suggestions fit the business"
}

Business idea: "${businessIdea}"

Provide only the JSON response, no additional text.`;
    } else if (analysisType === 'guided-qa') {
      systemPrompt = `Based on these Q&A responses, create a detailed website prompt. Format as a complete prompt ready for AI website builders:

${businessIdea}

Create a professional prompt that includes website purpose, target audience, features, design style, and page structure. Make it detailed and actionable.`;
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: systemPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const result = data.candidates[0].content.parts[0].text;

    return new Response(JSON.stringify({ result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in analyze-business-idea function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
