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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

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
  // Handler for GuidedQAWizard prompt output
  const handleGuidedPromptGenerated = (prompt: string) => {
    setGuidedPrompt(prompt);
    toast({
      title: "Prompt Generated!",
      description: "Your guided Q&A prompt is ready.",
    });
  };
  const { user, remainingAIUses, refreshUsage } = useAuth();
  // Restore state from localStorage if available
  const getInitialState = <T,>(key: string, fallback: T): T => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(key);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {}
      }
    }
    return fallback;
  };

  const [activeTab, setActiveTab] = useState(() =>
    getInitialState("pb_activeTab", "form")
  );
  const [currentStep, setCurrentStep] = useState(() =>
    getInitialState("pb_currentStep", 1)
  );
  const [formData, setFormData] = useState<FormData>(() =>
    getInitialState("pb_formData", {
      websiteName: "",
      purpose: "",
      targetAudience: "",
      features: [],
      designStyle: "",
      pages: [],
      additionalInfo: "",
    })
  );
  const [generatedPrompt, setGeneratedPrompt] = useState(() =>
    getInitialState("pb_generatedPrompt", "")
  );
  const [staticPrompt, setStaticPrompt] = useState(() =>
    getInitialState("pb_staticPrompt", "")
  );
  const [aiEnhancedPrompt, setAiEnhancedPrompt] = useState(() =>
    getInitialState("pb_aiEnhancedPrompt", "")
  );
  const [improvementType, setImprovementType] = useState(() =>
    getInitialState("pb_improvementType", "creative-enhancement")
  );
  const [guidedPrompt, setGuidedPrompt] = useState(() =>
    getInitialState("pb_guidedPrompt", "")
  );
  // Persist state to localStorage on change
  useEffect(() => {
    localStorage.setItem("pb_activeTab", JSON.stringify(activeTab));
  }, [activeTab]);
  useEffect(() => {
    localStorage.setItem("pb_currentStep", JSON.stringify(currentStep));
  }, [currentStep]);
  useEffect(() => {
    localStorage.setItem("pb_formData", JSON.stringify(formData));
  }, [formData]);
  useEffect(() => {
    localStorage.setItem("pb_generatedPrompt", JSON.stringify(generatedPrompt));
  }, [generatedPrompt]);
  useEffect(() => {
    localStorage.setItem("pb_staticPrompt", JSON.stringify(staticPrompt));
  }, [staticPrompt]);
  useEffect(() => {
    localStorage.setItem(
      "pb_aiEnhancedPrompt",
      JSON.stringify(aiEnhancedPrompt)
    );
  }, [aiEnhancedPrompt]);
  useEffect(() => {
    localStorage.setItem("pb_improvementType", JSON.stringify(improvementType));
  }, [improvementType]);
  useEffect(() => {
    localStorage.setItem("pb_guidedPrompt", JSON.stringify(guidedPrompt));
  }, [guidedPrompt]);

  const [showEmptyFormSuggestion, setShowEmptyFormSuggestion] = useState(false);
  const [isGeneratingAISuggestions, setIsGeneratingAISuggestions] =
    useState(false);
  const [isGeneratingAIPrompt, setIsGeneratingAIPrompt] = useState(false);
  const { toast } = useToast();
  const totalSteps = 6;
  const featuresOptions = [
    "Contact Form",
    "Blog",
    "User Login",
    "E-commerce",
    "Gallery",
    "Testimonials",
    "Newsletter Signup",
    "Social Media Integration",
    "Search Functionality",
    "Analytics",
    "Chat Support",
    "Booking System",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isFormEmpty() && activeTab === "form") {
        setShowEmptyFormSuggestion(true);
      }
    }, 5000); // Show after 5 seconds if form is still empty

    return () => clearTimeout(timer);
  }, []);

  const designStyles = [
    "Minimal & Clean",
    "Modern & Professional",
    "Colorful & Creative",
    "Dark & Elegant",
    "Playful & Fun",
    "Corporate & Traditional",
  ];

  const pageOptions = [
    "Home",
    "About",
    "Services",
    "Portfolio",
    "Blog",
    "Contact",
    "Shop",
    "FAQ",
    "Testimonials",
    "Team",
    "Pricing",
    "Privacy Policy",
  ];

  const isFormEmpty = () => {
    return (
      !formData.websiteName &&
      !formData.purpose &&
      !formData.targetAudience &&
      formData.features.length === 0 &&
      !formData.designStyle &&
      formData.pages.length === 0 &&
      !formData.additionalInfo
    );
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
        title: "Login Required",
        description: "Please login or sign up first to use AI features.",
        variant: "destructive",
      });
      return false;
    }

    if (remainingAIUses <= 0) {
      toast({
        title: "Daily Limit Reached",
        description:
          "You've reached your daily limit of 5 AI uses. Try again tomorrow!",
        variant: "destructive",
      });
      return false;
    }

    try {
      const { data, error } = await supabase.rpc("increment_ai_usage", {
        user_uuid: user.id,
      });

      if (error) {
        console.error("Error incrementing AI usage:", error);
        toast({
          title: "Usage Error",
          description: "Unable to track AI usage. Please try again.",
          variant: "destructive",
        });
        return false;
      }

      if (!data) {
        toast({
          title: "Daily Limit Reached",
          description:
            "You've reached your daily limit of 5 AI uses. Try again tomorrow!",
          variant: "destructive",
        });
        return false;
      }

      // Refresh usage count
      await refreshUsage();
      return true;
    } catch (error) {
      console.error("Error checking AI usage:", error);
      toast({
        title: "Usage Error",
        description: "Unable to track AI usage. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const generateAISuggestions = async () => {
    if (!(await checkAIUsageAndIncrement())) return;

    setIsGeneratingAISuggestions(true);

    try {
      console.log("Generating AI suggestions for empty form...");

      const { data, error } = await supabase.functions.invoke(
        "analyze-business-idea",
        {
          body: {
            businessIdea:
              "I want to create a professional website for my business but I'm not sure what features or pages I need. Please suggest a good starting point for a general business website.",
            analysisType: "business-analysis",
            userId: user?.id,
          },
        }
      );

      console.log("AI suggestions response:", { data, error });

      if (error) {
        console.error("Error generating AI suggestions:", error);
        throw new Error(error.message || "Failed to generate suggestions");
      }

      if (!data || !data.result) {
        throw new Error("No suggestions received");
      }

      let parsedSuggestions;
      try {
        parsedSuggestions = JSON.parse(data.result);
      } catch (parseError) {
        console.error("Failed to parse JSON result:", data.result);
        const jsonMatch = data.result.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedSuggestions = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error("Invalid response format from AI service");
        }
      }

      // Apply the suggestions to the form
      setFormData((prev) => ({
        ...prev,
        websiteName: "My Business Website",
        purpose: "Create a professional online presence for my business",
        targetAudience: "Potential customers and business partners",
        pages: parsedSuggestions.suggestedPages || [
          "Home",
          "About",
          "Services",
          "Contact",
        ],
        features: parsedSuggestions.suggestedFeatures || [
          "Contact Form",
          "Testimonials",
          "Gallery",
        ],
        designStyle:
          parsedSuggestions.suggestedDesignStyle || "Modern & Professional",
      }));

      setShowEmptyFormSuggestion(false);

      toast({
        title: "AI Suggestions Applied!",
        description:
          "Your form has been pre-filled with AI recommendations. You can modify any field as needed.",
      });
    } catch (error) {
      console.error("Error generating AI suggestions:", error);

      toast({
        title: "Couldn't Generate Suggestions",
        description: "Let's try the Business Idea Analyzer instead.",
        variant: "destructive",
      });

      // Fallback to scrolling to Business Idea Analyzer
      const analyzerElement = document.querySelector(
        '[data-testid="business-analyzer"]'
      );
      if (analyzerElement) {
        analyzerElement.scrollIntoView({ behavior: "smooth" });
      }
    } finally {
      setIsGeneratingAISuggestions(false);
    }
  };

  const handleFeatureChange = (feature: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      features: checked
        ? [...prev.features, feature]
        : prev.features.filter((f) => f !== feature),
    }));
  };

  const handlePageChange = (page: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      pages: checked
        ? [...prev.pages, page]
        : prev.pages.filter((p) => p !== page),
    }));
  };

  const generatePrompt = () => {
    // Generate static structured prompt
    const structured = `WEBSITE CREATION PROMPT

• PROJECT NAME: ${formData.websiteName || "My Business Website"}

• PURPOSE & GOALS:
  - Primary objective: ${formData.purpose || "Professional business website"}
  - Target audience: ${formData.targetAudience || "General audience"}

• REQUIRED PAGES:
${
  formData.pages.map((page) => `  - ${page}`).join("\n") ||
  "  - Home\n  - About\n  - Contact"
}

• ESSENTIAL FEATURES:
${
  formData.features.map((feature) => `  - ${feature}`).join("\n") ||
  "  - Contact Form\n  - Mobile Responsive Design"
}

• DESIGN SPECIFICATIONS:
  - Style: ${formData.designStyle || "Modern & Professional"}
  - Responsive design for all devices
  - Clean and intuitive navigation
  - Consistent branding throughout

• TECHNICAL REQUIREMENTS:
  - Mobile-first responsive design
  - Fast loading times
  - SEO-optimized structure
  - Cross-browser compatibility

• ADDITIONAL SPECIFICATIONS:
${formData.additionalInfo || "None specified"}

• DELIVERABLES:
  - Fully functional website
  - Professional appearance
  - User-friendly interface
  - Clear call-to-action elements`;

    setStaticPrompt(structured);
    setGeneratedPrompt(structured);
  };

  const generateAIEnhancedPrompt = async () => {
    if (!(await checkAIUsageAndIncrement())) return;

    setIsGeneratingAIPrompt(true);

    try {
      const { data, error } = await supabase.functions.invoke(
        "improve-prompt",
        {
          body: {
            originalPrompt: staticPrompt,
            improvementType,
          },
        }
      );

      if (error) {
        console.error("Error generating AI prompt:", error);
        throw new Error(
          error.message || "Failed to generate AI enhanced prompt"
        );
      }

      if (data && data.improvedPrompt) {
        setAiEnhancedPrompt(data.improvedPrompt);
      } else {
        throw new Error("No enhanced prompt received");
      }
    } catch (error) {
      console.error("Error in AI prompt enhancement:", error);
      toast({
        title: "AI Enhancement Failed",
        description: "Unable to generate AI enhanced prompt. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingAIPrompt(false);
    }
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
        title: "Login Required",
        description: "Please login or sign up first to use AI features.",
        variant: "destructive",
      });
      return;
    }
    setFormData((prev) => ({
      ...prev,
      pages: suggestions.suggestedPages,
      features: suggestions.suggestedFeatures,
      designStyle: suggestions.suggestedDesignStyle,
    }));
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
              <Label htmlFor="websiteName" className="text-lg font-medium">
                Website Name
              </Label>
              <Input
                id="websiteName"
                placeholder="e.g., Sarah's Portfolio, TechCorp Solutions"
                value={formData.websiteName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    websiteName: e.target.value,
                  }))
                }
                className="mt-2 text-lg p-6"
              />
            </div>
            <div>
              <Label htmlFor="purpose" className="text-lg font-medium">
                What's the purpose of your website?
              </Label>
              <Textarea
                id="purpose"
                placeholder="e.g., Showcase my design portfolio, Sell handmade jewelry, Share my travel blog"
                value={formData.purpose}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, purpose: e.target.value }))
                }
                className="mt-2 text-lg p-6 min-h-[120px]"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-medium">
                Who is your target audience?
              </Label>
              <Textarea
                placeholder="e.g., Small business owners, Creative professionals, Young families"
                value={formData.targetAudience}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    targetAudience: e.target.value,
                  }))
                }
                className="mt-2 text-lg p-6 min-h-[120px]"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-medium mb-4 block">
                What features do you need?
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {featuresOptions.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={feature}
                      checked={formData.features.includes(feature)}
                      onCheckedChange={(checked) =>
                        handleFeatureChange(feature, checked as boolean)
                      }
                    />
                    <Label htmlFor={feature} className="text-sm">
                      {feature}
                    </Label>
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
              <Label className="text-lg font-medium mb-4 block">
                Choose your design style
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {designStyles.map((style) => (
                  <div key={style} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={style}
                      name="designStyle"
                      value={style}
                      checked={formData.designStyle === style}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          designStyle: e.target.value,
                        }))
                      }
                      className="w-4 h-4 text-blue-600"
                    />
                    <Label htmlFor={style} className="text-sm">
                      {style}
                    </Label>
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
              <Label className="text-lg font-medium mb-4 block">
                Which pages do you need?
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {pageOptions.map((page) => (
                  <div key={page} className="flex items-center space-x-2">
                    <Checkbox
                      id={page}
                      checked={formData.pages.includes(page)}
                      onCheckedChange={(checked) =>
                        handlePageChange(page, checked as boolean)
                      }
                    />
                    <Label htmlFor={page} className="text-sm">
                      {page}
                    </Label>
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
              <Label className="text-lg font-medium">
                Any additional requirements?
              </Label>
              <Textarea
                placeholder="e.g., Use blue and white colors, Include a hero video, Make it fun and engaging"
                value={formData.additionalInfo}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    additionalInfo: e.target.value,
                  }))
                }
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
            <h3 className="font-semibold text-amber-800">
              Authentication Required
            </h3>
            <p className="text-amber-700 mt-1">
              Please sign in to use AI features. You get 5 free AI suggestions
              per day!
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-amber-300 text-amber-700 hover:bg-amber-100"
          >
            <Link to="/auth">
              <Lock className="w-4 h-4 mr-2" />
              Sign In
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // Prompt Writing Tips Carousel State & Data
  const promptTips = [
    {
      title: "Be Specific",
      description:
        "Clearly state your website's purpose, audience, and required features."
    },
    {
      title: "List Key Pages",
      description:
        "Include all essential pages (Home, About, Contact, etc.) for clarity."
    },
    {
      title: "Describe Design Style",
      description:
        "Mention preferred colors, layout, and style to guide the AI."
    },
    {
      title: "State Technical Needs",
      description:
        "Add any technical requirements (SEO, mobile, integrations) for precision."
    },
    {
      title: "Add Unique Features",
      description:
        "Highlight any special features (blog, shop, booking, etc.) you want."
    },
    {
      title: "Keep It Concise",
      description:
        "Use short, clear sentences for best AI results."
    }
  ];

  const [tipIndex, setTipIndex] = useState(0);
  const handlePrevTip = () => setTipIndex((i) => (i === 0 ? promptTips.length - 1 : i - 1));
  const handleNextTip = () => setTipIndex((i) => (i === promptTips.length - 1 ? 0 : i + 1));

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Prompt Builder
          </h1>
          <p className="text-xl text-gray-600">
            Choose your preferred method to create the perfect prompt for your
            AI website builder
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

          <TabsContent value="form">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="col-span-1 flex flex-col">
                {/* ...existing code... */}
                {showEmptyFormSuggestion && isFormEmpty() && (
                  <EmptyFormSuggestion
                    onLetAIHelp={handleLetAIHelp}
                    onSkip={handleSkipForm}
                    onDismiss={handleDismissSuggestion}
                  />
                )}
                <Card className="shadow-lg w-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl">
                        Step {currentStep} of {totalSteps}
                        {isGeneratingAISuggestions && (
                          <span className="text-sm text-blue-600 ml-2">
                            (AI is filling this out...)
                          </span>
                        )}
                      </CardTitle>
                      <div className="text-sm text-gray-500">
                        {Math.round((currentStep / totalSteps) * 100)}% Complete
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${(currentStep / totalSteps) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {renderStep()}
                    <div className="flex justify-between pt-6">
                      <Button
                        variant="outline"
                        onClick={prevStep}
                        disabled={
                          currentStep === 1 || isGeneratingAISuggestions
                        }
                        className="px-8"
                      >
                        Previous
                      </Button>
                      <Button
                        onClick={nextStep}
                        disabled={isGeneratingAISuggestions}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8"
                      >
                        {currentStep === totalSteps
                          ? "Generate Prompt"
                          : "Next"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                {/* Prompt Writing Tips Carousel - moved below the form card */}
                <Card className="shadow-lg w-full mt-8 animate-fade-in">
                  <CardHeader className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-t-xl py-4">
                    <CardTitle className="text-lg flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-bold">
                      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M12 4v16m0 0l-4-4m4 4l4-4"/></svg>
                      Prompt Writing Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 rounded-b-xl shadow-lg p-6">
                    <div className="flex items-center justify-between gap-2">
                      <button
                        aria-label="Previous Tip"
                        onClick={handlePrevTip}
                        className="p-2 rounded-full bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 shadow hover:scale-110 transition-transform"
                      >
                        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><polyline points="18 20 10 12 18 4" /></svg>
                      </button>
                      <div className="flex-1 px-2">
                        <div className="transition-all duration-300 ease-in-out">
                          <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-2 text-center drop-shadow">
                            {promptTips[tipIndex].title}
                          </h3>
                          <p className="text-base text-gray-700 text-center font-medium drop-shadow-sm">
                            {promptTips[tipIndex].description}
                          </p>
                        </div>
                      </div>
                      <button
                        aria-label="Next Tip"
                        onClick={handleNextTip}
                        className="p-2 rounded-full bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 shadow hover:scale-110 transition-transform"
                      >
                        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500"><polyline points="10 4 18 12 10 20" /></svg>
                      </button>
                    </div>
                    <div className="mt-4 text-center text-xs text-purple-400 font-semibold tracking-wide">
                      Tip {tipIndex + 1} of {promptTips.length}
                    </div>
                  </CardContent>
                </Card>
                {/* Example Prompts Gallery - below tips carousel */}
                <Card className="shadow-lg w-full mt-8 animate-fade-in">
                  <CardHeader className="bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 rounded-t-xl py-4">
                    <CardTitle className="text-lg flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 font-bold">
                      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M8 17l4 4 4-4"/><path d="M12 12v9"/><path d="M20.88 18.37A9 9 0 1 0 21 12"/></svg>
                      Example Prompts Gallery
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-100 rounded-b-xl shadow-lg p-0">
                    <div className="max-h-[24rem] overflow-y-auto px-6 py-6 space-y-6 rounded-b-xl scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
                      {/* Portfolio Prompt */}
                      <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 border border-green-100">
                        <div className="font-semibold text-green-700 mb-1">Portfolio Website</div>
                        <div className="font-mono text-sm text-gray-700 mb-2">
                          Create a modern portfolio website for a graphic designer. Required pages: Home, Portfolio, About, Contact. Features: Gallery, Testimonials, Contact Form. Design style: Minimal & Clean. Additional: Mobile responsive, SEO optimized.
                        </div>
                        <Button size="sm" variant="outline" className="w-fit self-end bg-gradient-to-r from-green-400 to-blue-400 text-white hover:from-green-500 hover:to-blue-500" onClick={() => copyPrompt('Create a modern portfolio website for a graphic designer. Required pages: Home, Portfolio, About, Contact. Features: Gallery, Testimonials, Contact Form. Design style: Minimal & Clean. Additional: Mobile responsive, SEO optimized.')}>Copy Prompt</Button>
                      </div>
                      {/* Shop Prompt */}
                      <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 border border-blue-100">
                        <div className="font-semibold text-blue-700 mb-1">Online Shop</div>
                        <div className="font-mono text-sm text-gray-700 mb-2">
                          Build an e-commerce website for handmade jewelry. Required pages: Home, Shop, About, Contact, FAQ. Features: Shopping cart, User Login, Newsletter Signup, Testimonials. Design style: Colorful & Creative. Additional: Fast loading, secure payments.
                        </div>
                        <Button size="sm" variant="outline" className="w-fit self-end bg-gradient-to-r from-blue-400 to-purple-400 text-white hover:from-blue-500 hover:to-purple-500" onClick={() => copyPrompt('Build an e-commerce website for handmade jewelry. Required pages: Home, Shop, About, Contact, FAQ. Features: Shopping cart, User Login, Newsletter Signup, Testimonials. Design style: Colorful & Creative. Additional: Fast loading, secure payments.')}>Copy Prompt</Button>
                      </div>
                      {/* Blog Prompt */}
                      <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 border border-purple-100">
                        <div className="font-semibold text-purple-700 mb-1">Personal Blog</div>
                        <div className="font-mono text-sm text-gray-700 mb-2">
                          Design a personal travel blog. Required pages: Home, Blog, About, Contact. Features: Blog, Gallery, Social Media Integration, Search Functionality. Design style: Playful & Fun. Additional: Easy navigation, mobile friendly.
                        </div>
                        <Button size="sm" variant="outline" className="w-fit self-end bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:from-purple-500 hover:to-pink-500" onClick={() => copyPrompt('Design a personal travel blog. Required pages: Home, Blog, About, Contact. Features: Blog, Gallery, Social Media Integration, Search Functionality. Design style: Playful & Fun. Additional: Easy navigation, mobile friendly.')}>Copy Prompt</Button>
                      </div>
                      {/* Restaurant Website */}
                      <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 border border-red-100">
                        <div className="font-semibold text-red-700 mb-1">Restaurant Website</div>
                        <div className="font-mono text-sm text-gray-700 mb-2">
                          Create a restaurant website. Required pages: Home, Menu, Reservations, About, Contact. Features: Online booking, Menu gallery, Testimonials, Newsletter Signup. Design style: Modern & Professional. Additional: Mobile friendly, Google Maps integration.
                        </div>
                        <Button size="sm" variant="outline" className="w-fit self-end bg-gradient-to-r from-red-400 to-yellow-400 text-white hover:from-red-500 hover:to-yellow-500" onClick={() => copyPrompt('Create a restaurant website. Required pages: Home, Menu, Reservations, About, Contact. Features: Online booking, Menu gallery, Testimonials, Newsletter Signup. Design style: Modern & Professional. Additional: Mobile friendly, Google Maps integration.')}>Copy Prompt</Button>
                      </div>
                      {/* SaaS Landing Page */}
                      <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 border border-cyan-100">
                        <div className="font-semibold text-cyan-700 mb-1">SaaS Landing Page</div>
                        <div className="font-mono text-sm text-gray-700 mb-2">
                          Build a SaaS product landing page. Required pages: Home, Features, Pricing, About, Contact. Features: Pricing table, Testimonials, Newsletter Signup, Blog. Design style: Minimal & Clean. Additional: Fast loading, SEO optimized.
                        </div>
                        <Button size="sm" variant="outline" className="w-fit self-end bg-gradient-to-r from-cyan-400 to-blue-400 text-white hover:from-cyan-500 hover:to-blue-500" onClick={() => copyPrompt('Build a SaaS product landing page. Required pages: Home, Features, Pricing, About, Contact. Features: Pricing table, Testimonials, Newsletter Signup, Blog. Design style: Minimal & Clean. Additional: Fast loading, SEO optimized.')}>Copy Prompt</Button>
                      </div>
                      {/* Nonprofit Organization */}
                      <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 border border-teal-100">
                        <div className="font-semibold text-teal-700 mb-1">Nonprofit Organization</div>
                        <div className="font-mono text-sm text-gray-700 mb-2">
                          Design a nonprofit organization website. Required pages: Home, About, Programs, Donate, Contact. Features: Donation form, Event calendar, Blog, Newsletter Signup. Design style: Colorful & Creative. Additional: Social media integration, volunteer signup.
                        </div>
                        <Button size="sm" variant="outline" className="w-fit self-end bg-gradient-to-r from-teal-400 to-green-400 text-white hover:from-teal-500 hover:to-green-500" onClick={() => copyPrompt('Design a nonprofit organization website. Required pages: Home, About, Programs, Donate, Contact. Features: Donation form, Event calendar, Blog, Newsletter Signup. Design style: Colorful & Creative. Additional: Social media integration, volunteer signup.')}>Copy Prompt</Button>
                      </div>
                      {/* Fitness Trainer */}
                      <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 border border-pink-100">
                        <div className="font-semibold text-pink-700 mb-1">Fitness Trainer</div>
                        <div className="font-mono text-sm text-gray-700 mb-2">
                          Create a personal trainer website. Required pages: Home, About, Services, Blog, Contact. Features: Booking system, Testimonials, Gallery, Newsletter Signup. Design style: Playful & Fun. Additional: Mobile friendly, Instagram feed integration.
                        </div>
                        <Button size="sm" variant="outline" className="w-fit self-end bg-gradient-to-r from-pink-400 to-purple-400 text-white hover:from-pink-500 hover:to-purple-500" onClick={() => copyPrompt('Create a personal trainer website. Required pages: Home, About, Services, Blog, Contact. Features: Booking system, Testimonials, Gallery, Newsletter Signup. Design style: Playful & Fun. Additional: Mobile friendly, Instagram feed integration.')}>Copy Prompt</Button>
                      </div>
                      {/* Tech Startup */}
                      <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 border border-blue-200">
                        <div className="font-semibold text-blue-800 mb-1">Tech Startup</div>
                        <div className="font-mono text-sm text-gray-700 mb-2">
                          Build a tech startup website. Required pages: Home, About, Product, Blog, Careers, Contact. Features: Careers page, Blog, Newsletter Signup, Testimonials. Design style: Modern & Professional. Additional: Fast loading, SEO optimized.
                        </div>
                        <Button size="sm" variant="outline" className="w-fit self-end bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600" onClick={() => copyPrompt('Build a tech startup website. Required pages: Home, About, Product, Blog, Careers, Contact. Features: Careers page, Blog, Newsletter Signup, Testimonials. Design style: Modern & Professional. Additional: Fast loading, SEO optimized.')}>Copy Prompt</Button>
                      </div>
                      {/* Photography Portfolio */}
                      <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 border border-yellow-100">
                        <div className="font-semibold text-yellow-700 mb-1">Photography Portfolio</div>
                        <div className="font-mono text-sm text-gray-700 mb-2">
                          Create a photography portfolio website. Required pages: Home, Portfolio, About, Contact. Features: Gallery, Testimonials, Blog, Booking system. Design style: Minimal & Clean. Additional: Mobile responsive, fast loading.
                        </div>
                        <Button size="sm" variant="outline" className="w-fit self-end bg-gradient-to-r from-yellow-400 to-pink-400 text-white hover:from-yellow-500 hover:to-pink-500" onClick={() => copyPrompt('Create a photography portfolio website. Required pages: Home, Portfolio, About, Contact. Features: Gallery, Testimonials, Blog, Booking system. Design style: Minimal & Clean. Additional: Mobile responsive, fast loading.')}>Copy Prompt</Button>
                      </div>
                      {/* Law Firm */}
                      <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 border border-gray-200">
                        <div className="font-semibold text-gray-800 mb-1">Law Firm</div>
                        <div className="font-mono text-sm text-gray-700 mb-2">
                          Build a law firm website. Required pages: Home, About, Services, Team, Contact. Features: Team profiles, Testimonials, Blog, Contact form. Design style: Corporate & Traditional. Additional: Mobile friendly, SEO optimized.
                        </div>
                        <Button size="sm" variant="outline" className="w-fit self-end bg-gradient-to-r from-gray-400 to-blue-400 text-white hover:from-gray-500 hover:to-blue-500" onClick={() => copyPrompt('Build a law firm website. Required pages: Home, About, Services, Team, Contact. Features: Team profiles, Testimonials, Blog, Contact form. Design style: Corporate & Traditional. Additional: Mobile friendly, SEO optimized.')}>Copy Prompt</Button>
                      </div>
                      {/* Event Planner */}
                      <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 border border-orange-100">
                        <div className="font-semibold text-orange-700 mb-1">Event Planner</div>
                        <div className="font-mono text-sm text-gray-700 mb-2">
                          Design an event planner website. Required pages: Home, Services, Portfolio, Blog, Contact. Features: Gallery, Booking system, Testimonials, Newsletter Signup. Design style: Colorful & Creative. Additional: Instagram feed, mobile friendly.
                        </div>
                        <Button size="sm" variant="outline" className="w-fit self-end bg-gradient-to-r from-orange-400 to-pink-400 text-white hover:from-orange-500 hover:to-pink-500" onClick={() => copyPrompt('Design an event planner website. Required pages: Home, Services, Portfolio, Blog, Contact. Features: Gallery, Booking system, Testimonials, Newsletter Signup. Design style: Colorful & Creative. Additional: Instagram feed, mobile friendly.')}>Copy Prompt</Button>
                      </div>
                      {/* Education Platform */}
                      <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 border border-indigo-100">
                        <div className="font-semibold text-indigo-700 mb-1">Education Platform</div>
                        <div className="font-mono text-sm text-gray-700 mb-2">
                          Build an online education platform. Required pages: Home, Courses, About, Blog, Contact. Features: Course catalog, User login, Blog, Newsletter Signup. Design style: Modern & Professional. Additional: Mobile friendly, fast loading.
                        </div>
                        <Button size="sm" variant="outline" className="w-fit self-end bg-gradient-to-r from-indigo-400 to-blue-400 text-white hover:from-indigo-500 hover:to-blue-500" onClick={() => copyPrompt('Build an online education platform. Required pages: Home, Courses, About, Blog, Contact. Features: Course catalog, User login, Blog, Newsletter Signup. Design style: Modern & Professional. Additional: Mobile friendly, fast loading.')}>Copy Prompt</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* ...existing code... */}
              <div className="col-span-1 flex flex-col w-full">
                {/* ...existing code... */}
                {activeTab === "form" && staticPrompt ? (
                  <>
                    <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded text-green-800 text-center text-lg font-medium">
                      Your prompt has been generated below
                    </div>
                    <Card className="shadow-lg w-full">
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Structured Format
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col">
                          <div className="bg-gray-100 rounded-lg p-6 font-mono text-sm leading-relaxed max-h-[32rem] overflow-y-auto mb-6">
                            {staticPrompt}
                          </div>
                          <Button
                            onClick={() => copyPrompt(staticPrompt)}
                            className="w-full bg-green-500 hover:bg-green-600 text-white mb-4"
                          >
                            Copy Static Prompt
                          </Button>
                          <div className="flex flex-col gap-3">
                            <Select
                              value={improvementType}
                              onValueChange={setImprovementType}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Enhancement Type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="creative-enhancement">
                                  Creative Enhancement
                                </SelectItem>
                                <SelectItem value="clarity">
                                  Clarity & Tone
                                </SelectItem>
                                <SelectItem value="seo">
                                  SEO Optimization
                                </SelectItem>
                                <SelectItem value="technical">
                                  Technical Precision
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              onClick={generateAIEnhancedPrompt}
                              disabled={isGeneratingAIPrompt || !user}
                              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                            >
                              {isGeneratingAIPrompt
                                ? "AI Innovating..."
                                : "AI Enhancement"}
                            </Button>
                          </div>
                          {/* AI Enhanced Prompt Output Below Button */}
                          <div className="mt-8">
                            {aiEnhancedPrompt ? (
                              <div>
                                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 font-mono text-sm leading-relaxed max-h-[32rem] overflow-y-auto mb-6">
                                  {aiEnhancedPrompt}
                                </div>
                                <Button
                                  onClick={() => copyPrompt(aiEnhancedPrompt)}
                                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                                >
                                  Copy AI Enhanced Prompt
                                </Button>
                              </div>
                            ) : (
                              <div className="text-center py-12 text-gray-500">
                                <div className="text-4xl mb-2">🤖</div>
                                <p className="text-sm">
                                  Click "AI Enhancement" to generate an enhanced
                                  version
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                ) : currentPrompt ? (
                  <Card className="shadow-lg w-full h-fit">
                    <CardHeader>
                      <CardTitle className="text-2xl">
                        Your AI Prompt Preview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
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
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="shadow-lg w-full h-fit">
                    <CardHeader>
                      <CardTitle className="text-2xl">
                        Your AI Prompt Preview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12 text-gray-500">
                        <div className="text-6xl mb-4">📝</div>
                        <p>
                          Complete the form or guided Q&A to see your generated
                          prompt here
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="guided">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <GuidedQAWizard
                  onPromptGenerated={handleGuidedPromptGenerated}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default PromptBuilder;
