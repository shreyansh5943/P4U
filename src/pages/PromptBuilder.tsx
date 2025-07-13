import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PromptImprover from "@/components/PromptImprover";
import BusinessIdeaAnalyzer from "@/components/BusinessIdeaAnalyzer";
import PromptPreview from "@/components/PromptPreview";
import GuidedQAWizard from "@/components/GuidedQAWizard";
import { useToast } from "@/hooks/use-toast";
import EmptyFormSuggestion from "@/components/EmptyFormSuggestion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { Lock, AlertCircle } from "lucide-react";

interface FormData {
  websiteName: string;
  purpose: string;
  targetAudience: string;
  features: string[];
  designStyle: string;
  pages: string[];
  additionalInfo: string;
}

interface BusinessSuggestions {
  suggestedPages: string[];
  suggestedFeatures: string[];
  suggestedDesignStyle: string;
  explanation: string;
}

const PromptBuilder = () => {
  const { user, remainingAIUses, refreshUsage } = useAuth();
  const [activeTab, setActiveTab] = useState("form");
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    websiteName: "",
    purpose: "",
    targetAudience: "",
    features: [],
    designStyle: "",
    pages: [],
    additionalInfo: ""
  });
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [guidedPrompt, setGuidedPrompt] = useState("");
  const [showEmptyFormSuggestion, setShowEmptyFormSuggestion] = useState(false);
  const [isGeneratingAISuggestions, setIsGeneratingAISuggestions] = useState(false);
  const { toast } = useToast();

  const totalSteps = 6;

  const featuresOptions = [
    "Contact Form", "Blog", "User Login", "E-commerce", "Gallery", 
    "Testimonials", "Newsletter Signup", "Social Media Integration",
    "Search Functionality", "Analytics", "Chat Support", "Booking System"
  ];

  const designStyles = [
    "Minimal & Clean", "Modern & Professional", "Colorful & Creative", 
    "Dark & Elegant", "Playful & Fun", "Corporate & Traditional"
  ];

  const pageOptions = [
    "Home", "About", "Services", "Portfolio", "Blog", "Contact", 
    "Shop", "FAQ", "Testimonials", "Team", "Pricing", "Privacy Policy"
  ];

  const isFormEmpty = () => {
    return !formData.websiteName && 
           !formData.purpose && 
           !formData.targetAudience && 
           formData.features.length === 0 && 
           !formData.designStyle && 
           formData.pages.length === 0 && 
           !formData.additionalInfo;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isFormEmpty() && activeTab === "form") {
        setShowEmptyFormSuggestion(true);
      }
    }, 5000); // Show after 5 seconds if form is still empty

    return () => clearTimeout(timer);
  }, []);

  const checkAIUsageAndIncrement = async (): Promise<boolean> => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to use AI features.",
        variant: "destructive"
      });
      return false;
    }

    if (remainingAIUses <= 0) {
      toast({
        title: "Daily Limit Reached",
        description: "You've reached your daily limit of 5 AI uses. Try again tomorrow!",
        variant: "destructive"
      });
      return false;
    }

    try {
      const { data, error } = await supabase.rpc('increment_ai_usage', {
        user_uuid: user.id
      });

      if (error) {
        console.error('Error incrementing AI usage:', error);
        toast({
          title: "Usage Error",
          description: "Unable to track AI usage. Please try again.",
          variant: "destructive"
        });
        return false;
      }

      if (!data) {
        toast({
          title: "Daily Limit Reached",
          description: "You've reached your daily limit of 5 AI uses. Try again tomorrow!",
          variant: "destructive"
        });
        return false;
      }

      // Refresh usage count
      await refreshUsage();
      return true;
    } catch (error) {
      console.error('Error checking AI usage:', error);
      toast({
        title: "Usage Error",
        description: "Unable to track AI usage. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  const generateAISuggestions = async () => {
    if (!(await checkAIUsageAndIncrement())) return;
    
    setIsGeneratingAISuggestions(true);
    
    try {
      console.log('Generating AI suggestions for empty form...');
      
      const { data, error } = await supabase.functions.invoke('analyze-business-idea', {
        body: { 
          businessIdea: "I want to create a professional website for my business but I'm not sure what features or pages I need. Please suggest a good starting point for a general business website.",
          analysisType: 'business-analysis'
        }
      });

      console.log('AI suggestions response:', { data, error });

      if (error) {
        console.error('Error generating AI suggestions:', error);
        throw new Error(error.message || 'Failed to generate suggestions');
      }

      if (!data || !data.result) {
        throw new Error('No suggestions received');
      }

      let parsedSuggestions;
      try {
        parsedSuggestions = JSON.parse(data.result);
      } catch (parseError) {
        console.error('Failed to parse JSON result:', data.result);
        const jsonMatch = data.result.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedSuggestions = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('Invalid response format from AI service');
        }
      }

      // Apply the suggestions to the form
      setFormData(prev => ({
        ...prev,
        websiteName: "My Business Website",
        purpose: "Create a professional online presence for my business",
        targetAudience: "Potential customers and business partners",
        pages: parsedSuggestions.suggestedPages || ["Home", "About", "Services", "Contact"],
        features: parsedSuggestions.suggestedFeatures || ["Contact Form", "Testimonials", "Gallery"],
        designStyle: parsedSuggestions.suggestedDesignStyle || "Modern & Professional"
      }));

      setShowEmptyFormSuggestion(false);
      
      toast({
        title: "AI Suggestions Applied!",
        description: "Your form has been pre-filled with AI recommendations. You can modify any field as needed.",
      });
    } catch (error) {
      console.error('Error generating AI suggestions:', error);
      
      toast({
        title: "Couldn't Generate Suggestions",
        description: "Let's try the Business Idea Analyzer instead.",
        variant: "destructive"
      });
      
      // Fallback to scrolling to Business Idea Analyzer
      const analyzerElement = document.querySelector('[data-testid="business-analyzer"]');
      if (analyzerElement) {
        analyzerElement.scrollIntoView({ behavior: 'smooth' });
      }
    } finally {
      setIsGeneratingAISuggestions(false);
    }
  };

  const handleFeatureChange = (feature: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      features: checked 
        ? [...prev.features, feature]
        : prev.features.filter(f => f !== feature)
    }));
  };

  const handlePageChange = (page: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      pages: checked 
        ? [...prev.pages, page]
        : prev.pages.filter(p => p !== page)
    }));
  };

  const generatePrompt = () => {
    const prompt = `Create a ${formData.designStyle.toLowerCase()} website called "${formData.websiteName}" for ${formData.purpose}. 

Target Audience: ${formData.targetAudience}

Required Pages: ${formData.pages.join(", ")}

Key Features to Include:
${formData.features.map(feature => `- ${feature}`).join("\n")}

Design Style: ${formData.designStyle} - Use modern layouts, appropriate color schemes, and ensure mobile responsiveness.

Additional Requirements: ${formData.additionalInfo || "None specified"}

Please ensure the website is professional, user-friendly, and optimized for the target audience. Include proper navigation, clear call-to-action buttons, and maintain consistent branding throughout.`;

    setGeneratedPrompt(prompt);
  };

  const copyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    toast({
      title: "Prompt Copied!",
      description: "Your AI prompt has been copied to clipboard.",
    });
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      generatePrompt();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReplaceOriginal = (improvedPrompt: string) => {
    if (activeTab === "form") {
      setGeneratedPrompt(improvedPrompt);
    } else {
      setGuidedPrompt(improvedPrompt);
    }
  };

  const handleUseSuggestions = (suggestions: BusinessSuggestions) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to use AI suggestions.",
        variant: "destructive"
      });
      return;
    }

    setFormData(prev => ({
      ...prev,
      pages: suggestions.suggestedPages,
      features: suggestions.suggestedFeatures,
      designStyle: suggestions.suggestedDesignStyle
    }));
    setActiveTab("form");
  };

  const handleGuidedPromptGenerated = async (prompt: string) => {
    if (!(await checkAIUsageAndIncrement())) return;
    setGuidedPrompt(prompt);
  };

  const handleLetAIHelp = () => {
    generateAISuggestions();
  };

  const handleSkipForm = () => {
    setShowEmptyFormSuggestion(false);
    // Generate a basic prompt with default values
    const basicPrompt = `Create a modern, professional website with the following features:

Required Pages: Home, About, Contact

Key Features:
- Contact Form
- Mobile Responsive Design
- Clean Navigation
- Professional Layout

Design Style: Modern & Professional - Use clean layouts, appropriate color schemes, and ensure mobile responsiveness.

Additional Requirements: Create a user-friendly website that looks professional and works well on all devices.

Please ensure the website is professional, user-friendly, and optimized for general use. Include proper navigation, clear call-to-action buttons, and maintain consistent branding throughout.`;

    setGeneratedPrompt(basicPrompt);
    setActiveTab("form");
  };

  const handleDismissSuggestion = () => {
    setShowEmptyFormSuggestion(false);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="websiteName" className="text-lg font-medium">Website Name</Label>
              <Input
                id="websiteName"
                placeholder="e.g., Sarah's Portfolio, TechCorp Solutions"
                value={formData.websiteName}
                onChange={(e) => setFormData(prev => ({...prev, websiteName: e.target.value}))}
                className="mt-2 text-lg p-6"
              />
            </div>
            <div>
              <Label htmlFor="purpose" className="text-lg font-medium">What's the purpose of your website?</Label>
              <Textarea
                id="purpose"
                placeholder="e.g., Showcase my design portfolio, Sell handmade jewelry, Share my travel blog"
                value={formData.purpose}
                onChange={(e) => setFormData(prev => ({...prev, purpose: e.target.value}))}
                className="mt-2 text-lg p-6 min-h-[120px]"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-medium">Who is your target audience?</Label>
              <Textarea
                placeholder="e.g., Small business owners, Creative professionals, Young families"
                value={formData.targetAudience}
                onChange={(e) => setFormData(prev => ({...prev, targetAudience: e.target.value}))}
                className="mt-2 text-lg p-6 min-h-[120px]"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-medium mb-4 block">What features do you need?</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {featuresOptions.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={feature}
                      checked={formData.features.includes(feature)}
                      onCheckedChange={(checked) => handleFeatureChange(feature, checked as boolean)}
                    />
                    <Label htmlFor={feature} className="text-sm">{feature}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-medium mb-4 block">Choose your design style</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {designStyles.map((style) => (
                  <div key={style} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={style}
                      name="designStyle"
                      value={style}
                      checked={formData.designStyle === style}
                      onChange={(e) => setFormData(prev => ({...prev, designStyle: e.target.value}))}
                      className="w-4 h-4 text-blue-600"
                    />
                    <Label htmlFor={style} className="text-sm">{style}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-medium mb-4 block">Which pages do you need?</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {pageOptions.map((page) => (
                  <div key={page} className="flex items-center space-x-2">
                    <Checkbox
                      id={page}
                      checked={formData.pages.includes(page)}
                      onCheckedChange={(checked) => handlePageChange(page, checked as boolean)}
                    />
                    <Label htmlFor={page} className="text-sm">{page}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-medium">Any additional requirements?</Label>
              <Textarea
                placeholder="e.g., Use blue and white colors, Include a hero video, Make it fun and engaging"
                value={formData.additionalInfo}
                onChange={(e) => setFormData(prev => ({...prev, additionalInfo: e.target.value}))}
                className="mt-2 text-lg p-6 min-h-[120px]"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const currentPrompt = activeTab === "form" ? generatedPrompt : guidedPrompt;

  // Authentication requirement banner component
  const AuthRequiredBanner = () => (
    <Card className="mb-8 border-amber-200 bg-amber-50">
      <CardContent className="p-6">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600" />
          <div className="flex-1">
            <h3 className="font-semibold text-amber-800">Authentication Required</h3>
            <p className="text-amber-700 mt-1">
              Please sign in to use AI features. You get 5 free AI suggestions per day!
            </p>
          </div>
          <Button asChild variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-100">
            <Link to="/auth">
              <Lock className="w-4 h-4 mr-2" />
              Sign In
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Prompt Builder</h1>
          <p className="text-xl text-gray-600">
            Choose your preferred method to create the perfect prompt for your AI website builder
          </p>
          {user && (
            <p className="text-sm text-gray-500 mt-2">
              AI uses remaining today: {remainingAIUses}/5
            </p>
          )}
        </div>

        {!user && <AuthRequiredBanner />}

        <div data-testid="business-analyzer">
          <BusinessIdeaAnalyzer onUseSuggestions={handleUseSuggestions} />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="form">Step-by-Step Form</TabsTrigger>
            <TabsTrigger value="guided">Guided Q&A</TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <TabsContent value="form">
                {showEmptyFormSuggestion && isFormEmpty() && (
                  <EmptyFormSuggestion
                    onLetAIHelp={handleLetAIHelp}
                    onSkip={handleSkipForm}
                    onDismiss={handleDismissSuggestion}
                  />
                )}
                
                <Card className="shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl">
                        Step {currentStep} of {totalSteps}
                        {isGeneratingAISuggestions && (
                          <span className="text-sm text-blue-600 ml-2">(AI is filling this out...)</span>
                        )}
                      </CardTitle>
                      <div className="text-sm text-gray-500">
                        {Math.round((currentStep / totalSteps) * 100)}% Complete
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                      ></div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {renderStep()}
                    
                    <div className="flex justify-between pt-6">
                      <Button
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 1 || isGeneratingAISuggestions}
                        className="px-8"
                      >
                        Previous
                      </Button>
                      <Button
                        onClick={nextStep}
                        disabled={isGeneratingAISuggestions}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8"
                      >
                        {currentStep === totalSteps ? "Generate Prompt" : "Next"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="guided">
                <GuidedQAWizard onPromptGenerated={handleGuidedPromptGenerated} />
              </TabsContent>
            </div>

            {/* Preview Section */}
            <div className="space-y-6">
              <Card className="shadow-lg h-fit">
                <CardHeader>
                  <CardTitle className="text-2xl">Your AI Prompt Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  {currentPrompt ? (
                    <div className="space-y-4">
                      <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm leading-relaxed max-h-96 overflow-y-auto">
                        {currentPrompt}
                      </div>
                      <Button
                        onClick={() => copyPrompt(currentPrompt)}
                        className="w-full bg-green-500 hover:bg-green-600 text-white"
                      >
                        Copy Prompt to Clipboard
                      </Button>
                      <PromptPreview 
                        prompt={currentPrompt} 
                        websitePurpose={formData.purpose || "your website"}
                      />
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <div className="text-6xl mb-4">📝</div>
                      <p>Complete the form or guided Q&A to see your generated prompt here</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* AI Prompt Improver */}
              <PromptImprover 
                originalPrompt={currentPrompt} 
                onReplaceOriginal={handleReplaceOriginal}
              />
            </div>
          </div>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default PromptBuilder;
