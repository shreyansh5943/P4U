
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ArrowRight } from "lucide-react";

interface EmptyFormSuggestionProps {
  onLetAIHelp: () => void;
  onSkip: () => void;
  onDismiss: () => void;
}

const EmptyFormSuggestion = ({ onLetAIHelp, onSkip, onDismiss }: EmptyFormSuggestionProps) => {
  return (
    <Card className="border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 mb-6">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Need help getting started?</h3>
        </div>
        <p className="text-gray-600 mb-4">
          It looks like you haven't filled out any information yet. Would you like some assistance?
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={onLetAIHelp}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Let AI Find For You
          </Button>
          <Button
            onClick={onSkip}
            variant="outline"
            className="flex items-center gap-2"
          >
            I'd Like To Skip It
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            onClick={onDismiss}
            variant="ghost"
            className="text-gray-500 hover:text-gray-700"
          >
            Continue with form
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyFormSuggestion;
