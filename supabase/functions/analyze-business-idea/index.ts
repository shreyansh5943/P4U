
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
    console.log('Starting business idea analysis...');
    
    const { businessIdea, analysisType } = await req.json();
    console.log('Request data:', { businessIdea, analysisType });

    if (!geminiApiKey) {
      console.error('GEMINI_API_KEY is not configured');
      throw new Error('GEMINI_API_KEY is not configured');
    }

    if (!businessIdea || businessIdea.trim().length === 0) {
      console.error('Business idea is empty or missing');
      throw new Error('Business idea is required');
    }

    let systemPrompt = '';
    
    if (analysisType === 'business-analysis') {
      systemPrompt = `You are a helpful AI assistant that analyzes business ideas and suggests website structures. 

Analyze this business idea: "${businessIdea}"

Return ONLY a valid JSON object with this exact structure (no additional text, no markdown formatting, no explanations outside the JSON):
{
  "suggestedPages": ["Home", "About", "Services", "Contact"],
  "suggestedFeatures": ["Contact Form", "Gallery", "Testimonials"],
  "suggestedDesignStyle": "Modern & Professional",
  "explanation": "Brief explanation of why these suggestions fit the business"
}

Make sure the response is valid JSON that can be parsed directly.`;
    } else if (analysisType === 'guided-qa') {
      systemPrompt = `Based on these Q&A responses, create a detailed website prompt. Format as a complete prompt ready for AI website builders:

${businessIdea}

Create a professional prompt that includes website purpose, target audience, features, design style, and page structure. Make it detailed and actionable.`;
    } else {
      throw new Error('Invalid analysis type');
    }

    console.log('Making request to Gemini API...');
    
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
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    console.log('Gemini API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error response:', errorText);
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Gemini API response data:', JSON.stringify(data, null, 2));

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
      console.error('Invalid response structure from Gemini API');
      throw new Error('Invalid response from AI service');
    }

    const result = data.candidates[0].content.parts[0].text;
    console.log('AI generated result:', result);

    return new Response(JSON.stringify({ result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in analyze-business-idea function:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    return new Response(JSON.stringify({ 
      error: error.message || 'An unexpected error occurred',
      details: 'Please check the function logs for more information'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
