
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  websiteName: string;
  purpose: string;
  targetAudience: string;
  features: string[];
  designStyle: string;
  pages: string[];
  additionalInfo: string;
}

const PromptBuilder = () => {
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

  const copyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt);
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

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Prompt Builder</h1>
          <p className="text-xl text-gray-600">
            Answer a few questions to generate the perfect prompt for your AI website builder
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div>
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">
                    Step {currentStep} of {totalSteps}
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
                    disabled={currentStep === 1}
                    className="px-8"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={nextStep}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8"
                  >
                    {currentStep === totalSteps ? "Generate Prompt" : "Next"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div>
            <Card className="shadow-lg h-fit">
              <CardHeader>
                <CardTitle className="text-2xl">Your AI Prompt Preview</CardTitle>
              </CardHeader>
              <CardContent>
                {generatedPrompt ? (
                  <div className="space-y-4">
                    <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm leading-relaxed max-h-96 overflow-y-auto">
                      {generatedPrompt}
                    </div>
                    <Button
                      onClick={copyPrompt}
                      className="w-full bg-green-500 hover:bg-green-600 text-white"
                    >
                      Copy Prompt to Clipboard
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <div className="text-6xl mb-4">📝</div>
                    <p>Complete the form to see your generated prompt here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PromptBuilder;
