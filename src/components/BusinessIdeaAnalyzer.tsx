
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Lightbulb, ArrowRight, AlertCircle } from "lucide-react";

interface BusinessSuggestions {
  suggestedPages: string[];
  suggestedFeatures: string[];
  suggestedDesignStyle: string;
  explanation: string;
}

interface BusinessIdeaAnalyzerProps {
  onUseSuggestions: (suggestions: BusinessSuggestions) => void;
}

const BusinessIdeaAnalyzer = ({ onUseSuggestions }: BusinessIdeaAnalyzerProps) => {
  const [businessIdea, setBusinessIdea] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<BusinessSuggestions | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const analyzeBusiness = async () => {
    if (!businessIdea.trim()) {
      toast({
        title: "Please describe your business idea",
        description: "Enter at least one sentence about your business or idea.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    
    try {
      console.log('Calling analyze-business-idea function with:', businessIdea);
      
      const { data, error } = await supabase.functions.invoke('analyze-business-idea', {
        body: { 
          businessIdea: businessIdea.trim(),
          analysisType: 'business-analysis'
        }
      });

      console.log('Function response:', { data, error });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Failed to analyze business idea');
      }

      if (!data || !data.result) {
        throw new Error('No result received from analysis');
      }

      let parsedSuggestions;
      try {
        // Try to parse the result as JSON
        parsedSuggestions = JSON.parse(data.result);
      } catch (parseError) {
        console.error('Failed to parse JSON result:', data.result);
        // If it's not JSON, try to extract JSON from the text
        const jsonMatch = data.result.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedSuggestions = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('Invalid response format from AI service');
        }
      }

      // Validate the parsed suggestions
      if (!parsedSuggestions.suggestedPages || !Array.isArray(parsedSuggestions.suggestedPages)) {
        throw new Error('Invalid suggestions format received');
      }

      setSuggestions(parsedSuggestions);
      setError(null);
      
      toast({
        title: "Analysis Complete!",
        description: "We've generated suggestions based on your business idea.",
      });
    } catch (error) {
      console.error('Error analyzing business idea:', error);
      const errorMessage = error.message || 'Unable to analyze your business idea. Please try again.';
      setError(errorMessage);
      
      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleUseSuggestions = () => {
    if (suggestions) {
      onUseSuggestions(suggestions);
      toast({
        title: "Suggestions Applied!",
        description: "Your form has been pre-filled with our suggestions.",
      });
    }
  };

  return (
    <Card className="mb-8 border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-blue-700">
          <Lightbulb className="w-5 h-5" />
          Not Sure Where to Start?
        </CardTitle>
        <p className="text-gray-600">
          Describe your business or idea in one sentence, and we'll suggest the perfect website structure for you.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="businessIdea" className="font-medium">
            Describe your business or idea
          </Label>
          <Input
            id="businessIdea"
            placeholder="e.g., I make handmade jewelry and want to sell online to young professionals"
            value={businessIdea}
            onChange={(e) => setBusinessIdea(e.target.value)}
            className="mt-2"
          />
        </div>
        
        <Button
          onClick={analyzeBusiness}
          disabled={isAnalyzing || !businessIdea.trim()}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
        >
          {isAnalyzing ? "Analyzing..." : "Analyze My Idea"}
        </Button>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle className="w-4 h-4" />
              <span className="font-medium">Analysis Error</span>
            </div>
            <p className="text-red-600 text-sm mt-1">{error}</p>
          </div>
        )}

        {suggestions && (
          <Card className="mt-6 bg-white border border-green-200">
            <CardHeader>
              <CardTitle className="text-lg text-green-700">AI Suggestions for Your Website</CardTitle>
              <p className="text-sm text-gray-600">{suggestions.explanation}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Suggested Pages:</h4>
                <div className="flex flex-wrap gap-2">
                  {suggestions.suggestedPages.map((page, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {page}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Suggested Features:</h4>
                <div className="flex flex-wrap gap-2">
                  {suggestions.suggestedFeatures.map((feature, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Suggested Design Style:</h4>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {suggestions.suggestedDesignStyle}
                </span>
              </div>
              
              <Button
                onClick={handleUseSuggestions}
                className="w-full bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
              >
                Use This as My Starting Point
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default BusinessIdeaAnalyzer;
