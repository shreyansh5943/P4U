
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, Copy, RefreshCw, Replace } from "lucide-react";

interface PromptImproverProps {
  originalPrompt: string;
  onReplaceOriginal: (improvedPrompt: string) => void;
}

type ImprovementType = "clarity" | "seo" | "technical";

const PromptImprover = ({ originalPrompt, onReplaceOriginal }: PromptImproverProps) => {
  const [improvementType, setImprovementType] = useState<ImprovementType>("clarity");
  const [improvedPrompt, setImprovedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const improvementOptions = {
    clarity: "Improve for clarity & tone",
    seo: "Improve for SEO-friendly output", 
    technical: "Improve for technical precision"
  };

  const getImprovementInstruction = (type: ImprovementType) => {
    const instructions = {
      clarity: "Improve the following AI prompt for building a website. Focus on making it clearer, more polished, and better structured while keeping all the original features and requirements. Make the language more professional and easier to understand.",
      seo: "Improve the following AI prompt for building a website. Focus on making it more SEO-friendly by adding relevant keywords, meta descriptions, and search optimization requirements while keeping all the original features intact.",
      technical: "Improve the following AI prompt for building a website. Focus on adding more technical precision, specific requirements, best practices, and detailed implementation guidelines while preserving all the original features and intent."
    };
    return instructions[type];
  };

  const improvePrompt = async () => {
    if (!originalPrompt.trim()) {
      toast({
        title: "No prompt to improve",
        description: "Please generate a prompt first before trying to improve it.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/improve-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: originalPrompt,
          improvementType: getImprovementInstruction(improvementType)
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to improve prompt');
      }

      const data = await response.json();
      setImprovedPrompt(data.improvedPrompt);
      
      toast({
        title: "Prompt Improved! ✨",
        description: "Your prompt has been enhanced with AI.",
      });
    } catch (error) {
      console.error('Error improving prompt:', error);
      toast({
        title: "Error",
        description: "Failed to improve prompt. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyImprovedPrompt = () => {
    navigator.clipboard.writeText(improvedPrompt);
    toast({
      title: "Copied!",
      description: "Improved prompt copied to clipboard.",
    });
  };

  const replaceOriginal = () => {
    onReplaceOriginal(improvedPrompt);
    toast({
      title: "Prompt Replaced!",
      description: "Original prompt has been replaced with the improved version.",
    });
  };

  const regeneratePrompt = () => {
    improvePrompt();
  };

  if (!originalPrompt) return null;

  return (
    <Card className="mt-6 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-900">
          <Sparkles className="w-5 h-5" />
          AI Prompt Enhancement
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex-1">
            <Select value={improvementType} onValueChange={(value: ImprovementType) => setImprovementType(value)}>
              <SelectTrigger className="bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(improvementOptions).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={improvePrompt}
            disabled={isLoading}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Improving...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Improve This Prompt with AI
              </>
            )}
          </Button>
        </div>

        {improvedPrompt && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <label className="text-sm font-medium text-purple-900 mb-2 block flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                AI-Enhanced Prompt
              </label>
              <Textarea
                value={improvedPrompt}
                readOnly
                className="bg-white border-2 border-purple-200 min-h-[200px] font-mono text-sm leading-relaxed resize-none"
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={copyImprovedPrompt}
                variant="outline"
                className="flex-1 sm:flex-none border-purple-200 hover:bg-purple-50"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
              <Button
                onClick={replaceOriginal}
                variant="outline"
                className="flex-1 sm:flex-none border-purple-200 hover:bg-purple-50"
              >
                <Replace className="w-4 h-4 mr-2" />
                Replace Original
              </Button>
              <Button
                onClick={regeneratePrompt}
                variant="outline"
                disabled={isLoading}
                className="flex-1 sm:flex-none border-purple-200 hover:bg-purple-50"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Regenerate
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PromptImprover;
