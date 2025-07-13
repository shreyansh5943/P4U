
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, ArrowRight, Wand2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface GuidedQAWizardProps {
  onPromptGenerated: (prompt: string) => void;
}

const GuidedQAWizard = ({ onPromptGenerated }: GuidedQAWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [answers, setAnswers] = useState({
    whatYouSell: "",
    targetAudience: "",
    desiredAction: "",
    brandPersonality: "",
    additionalInfo: ""
  });
  const { toast } = useToast();
  const { user } = useAuth();

  const totalSteps = 5;

  const questions = [
    {
      id: "whatYouSell",
      title: "What do you sell or offer?",
      placeholder: "e.g., Handmade soaps, Web design services, Online courses",
      type: "input"
    },
    {
      id: "targetAudience",
      title: "Who is your ideal customer?",
      placeholder: "e.g., Eco-conscious millennials, Small business owners, College students",
      type: "input"
    },
    {
      id: "desiredAction",
      title: "What do you want visitors to do on your website?",
      placeholder: "e.g., Buy products, Contact me for services, Sign up for newsletter",
      type: "input"
    },
    {
      id: "brandPersonality",
      title: "How would you describe your brand personality?",
      placeholder: "e.g., Fun and playful, Professional and trustworthy, Creative and artistic",
      type: "input"
    },
    {
      id: "additionalInfo",
      title: "Any specific requirements or features you need?",
      placeholder: "e.g., Online booking, Image gallery, Blog section, customer reviews",
      type: "textarea"
    }
  ];

  const currentQuestion = questions[currentStep - 1];

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generatePrompt = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to use AI features.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      const qaData = `
What you sell/offer: ${answers.whatYouSell}
Target audience: ${answers.targetAudience}
Desired visitor action: ${answers.desiredAction}
Brand personality: ${answers.brandPersonality}
Additional requirements: ${answers.additionalInfo}
      `;

      const { data, error } = await supabase.functions.invoke('analyze-business-idea', {
        body: { 
          businessIdea: qaData,
          analysisType: 'guided-qa'
        }
      });

      if (error) throw error;

      onPromptGenerated(data.result);
      
      toast({
        title: "Prompt Generated!",
        description: "Your personalized prompt has been created based on your answers.",
      });
    } catch (error) {
      console.error('Error generating prompt:', error);
      toast({
        title: "Generation Failed",
        description: "Unable to generate your prompt. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const canProceed = answers[currentQuestion.id as keyof typeof answers]?.trim();

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Wand2 className="w-6 h-6 text-purple-600" />
          Guided Prompt Creation
        </CardTitle>
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            Answer a few questions to create a personalized prompt
          </p>
          <div className="text-sm text-gray-500">
            Step {currentStep} of {totalSteps}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-lg font-medium mb-4 block">
            {currentQuestion.title}
          </Label>
          {currentQuestion.type === "input" ? (
            <Input
              placeholder={currentQuestion.placeholder}
              value={answers[currentQuestion.id as keyof typeof answers]}
              onChange={(e) => handleAnswerChange(e.target.value)}
              className="text-lg p-6"
            />
          ) : (
            <Textarea
              placeholder={currentQuestion.placeholder}
              value={answers[currentQuestion.id as keyof typeof answers]}
              onChange={(e) => handleAnswerChange(e.target.value)}
              className="text-lg p-6 min-h-[120px]"
            />
          )}
        </div>

        <div className="flex justify-between pt-6">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-8 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>
          
          {currentStep === totalSteps ? (
            <Button
              onClick={generatePrompt}
              disabled={!canProceed || isGenerating}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8"
            >
              {isGenerating ? "Generating..." : "Generate My Prompt"}
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              disabled={!canProceed}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 flex items-center gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GuidedQAWizard;
