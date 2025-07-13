
import { ArrowRight, Sparkles, Zap, Target, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 font-inter">
      <Navigation />
      
      {/* Hero Section with Animations */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-pink-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg mb-8 animate-fade-in">
              <Sparkles className="w-5 h-5 text-purple-600 mr-2 animate-pulse" />
              <span className="text-sm font-medium text-gray-700">AI-Powered Website Prompt Generator</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in" style={{animationDelay: '0.2s'}}>
              Create Perfect
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {" "}AI Prompts
              </span>
              <br />
              for Your Website
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{animationDelay: '0.4s'}}>
              Transform your ideas into detailed, professional prompts that AI website builders understand perfectly. 
              No technical knowledge required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{animationDelay: '0.6s'}}>
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg hover-scale">
                <Link to="/prompt-builder">
                  Start Building Your Prompt
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg hover-scale">
                <Link to="/examples">
                  View Examples
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-bounce" style={{animationDelay: '1s', animationDuration: '3s'}}>
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center shadow-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="absolute bottom-20 right-10 animate-bounce" style={{animationDelay: '2s', animationDuration: '4s'}}>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <Target className="w-6 h-6 text-white" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Prompt4U?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get professional results without the complexity. Our tool guides you through every step.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-2 hover:border-purple-200 transition-all duration-300 hover-scale">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">AI-Powered Suggestions</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get intelligent recommendations based on your business type and goals. Our AI understands what works.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 border-2 hover:border-purple-200 transition-all duration-300 hover-scale">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Lightning Fast</h3>
                <p className="text-gray-600 leading-relaxed">
                  Create comprehensive website prompts in minutes, not hours. Streamline your entire workflow.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 border-2 hover:border-purple-200 transition-all duration-300 hover-scale">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Precision Targeting</h3>
                <p className="text-gray-600 leading-relaxed">
                  Tailor your prompts to your exact audience and business needs with our guided approach.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three simple steps to get your perfect AI prompt
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-fade-in" style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl hover-scale">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Describe Your Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                Tell us about your business, target audience, and what you want your website to achieve.
              </p>
            </div>
            
            <div className="text-center animate-fade-in" style={{animationDelay: '0.4s'}}>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl hover-scale">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Get AI Suggestions</h3>
              <p className="text-gray-600 leading-relaxed">
                Our AI analyzes your requirements and suggests features, pages, and design styles.
              </p>
            </div>
            
            <div className="text-center animate-fade-in" style={{animationDelay: '0.6s'}}>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl hover-scale">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Copy & Use</h3>
              <p className="text-gray-600 leading-relaxed">
                Get your optimized prompt and use it with any AI website builder for perfect results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-600/90 to-pink-600/90"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6 animate-fade-in">
            Ready to Create Your Perfect Website Prompt?
          </h2>
          <p className="text-xl text-purple-100 mb-8 leading-relaxed animate-fade-in" style={{animationDelay: '0.2s'}}>
            Join thousands of satisfied users who have transformed their web development process
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg hover-scale animate-fade-in" style={{animationDelay: '0.4s'}}>
            <Link to="/prompt-builder">
              Get Started Now - It's Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
