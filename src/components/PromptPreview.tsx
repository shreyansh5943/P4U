
import { Card, CardContent } from "@/components/ui/card";
import { Info, Target } from "lucide-react";

interface PromptPreviewProps {
  prompt: string;
  websitePurpose?: string;
}

const PromptPreview = ({ prompt, websitePurpose }: PromptPreviewProps) => {
  if (!prompt) return null;

  const getUsageInstructions = () => {
    return {
      purpose: "Paste this into Framer AI, Webflow AI, or similar tools to generate a website layout",
      outcome: websitePurpose 
        ? `This will create a ${websitePurpose.toLowerCase()} website with all specified features and sections`
        : "This will create a professional website with all your specified features and design preferences"
    };
  };

  const instructions = getUsageInstructions();

  return (
    <Card className="mt-4 border-l-4 border-l-blue-500 bg-blue-50/50">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <Info className="w-5 h-5 text-blue-600" />
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-blue-900 flex items-center gap-2">
              How to Use This Prompt
            </h4>
            <div className="space-y-1 text-sm">
              <p className="text-gray-700">
                <span className="font-medium">📋 Usage:</span> {instructions.purpose}
              </p>
              <p className="text-gray-700 flex items-start gap-1">
                <Target className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600" />
                <span><span className="font-medium">Expected Result:</span> {instructions.outcome}</span>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PromptPreview;
