import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-white font-inter">
      <Navigation />
      
      {/* Enhanced Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Turn Your Website Idea Into Reality —{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                  No Code, Just Smart Prompts
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                PromptBuddy helps you generate the perfect AI prompt to build your dream website in tools like Framer, Webflow, and more.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/prompt-builder">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    🪄 Start Building Your Prompt
                  </Button>
                </Link>
                
                <Link 
                  to="/prompt-builder" 
                  className="text-purple-600 hover:text-purple-700 font-medium text-lg underline-offset-4 hover:underline transition-colors duration-200 flex items-center justify-center py-4"
                >
                  Not sure what you need? Describe your idea instead →
                </Link>
              </div>
              
              {/* Trust indicators */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-4 font-medium">Works with your favorite AI website builders:</p>
                <div className="flex items-center justify-center lg:justify-start space-x-8 text-gray-400">
                  <span className="font-semibold text-lg">Framer</span>
                  <span className="font-semibold text-lg">Webflow</span>
                  <span className="font-semibold text-lg">Cursor</span>
                  <span className="font-semibold text-lg">v0.dev</span>
                </div>
              </div>
            </div>
            
            {/* Right Illustration */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Main illustration container */}
                <div className="w-80 h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-white to-purple-50 rounded-3xl shadow-2xl border border-purple-100 flex items-center justify-center relative overflow-hidden">
                  {/* AI Assistant Icon */}
                  <div className="absolute top-8 left-8 w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl">🤖</span>
                  </div>
                  
                  {/* Website Wireframe */}
                  <div className="w-64 h-48 bg-white rounded-lg shadow-lg border-2 border-gray-200 relative">
                    {/* Header bar */}
                    <div className="h-8 bg-gray-100 rounded-t-lg flex items-center px-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Content area */}
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gradient-to-r from-purple-200 to-blue-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                      <div className="mt-4 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded w-1/2"></div>
                    </div>
                  </div>
                  
                  {/* Floating elements */}
                  <div className="absolute top-20 right-4 w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <span className="text-lg">✨</span>
                  </div>
                  
                  <div className="absolute bottom-20 left-4 w-10 h-10 bg-green-200 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <span className="text-sm">💡</span>
                  </div>
                </div>
                
                {/* Background decoration */}
                <div className="absolute -z-10 top-4 left-4 w-80 h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-purple-200 to-blue-200 rounded-3xl opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Features Highlight */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-12">
            <h2 className="text-3xl font-bold mb-4">✨ New Features Just Added!</h2>
            <p className="text-xl text-blue-100">Enhanced tools to make website building even easier</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">🧭</div>
              <h3 className="font-semibold text-white mb-2">"I Don't Know What I Want" Mode</h3>
              <p className="text-blue-100 text-sm mb-3">Just describe your business and get AI suggestions</p>
              <Link to="/prompt-builder" className="text-yellow-300 text-sm hover:underline">Try in Prompt Builder →</Link>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">🤖</div>
              <h3 className="font-semibold text-white mb-2">Guided Q&A Wizard</h3>
              <p className="text-blue-100 text-sm mb-3">Step-by-step questions to build your perfect prompt</p>
              <Link to="/prompt-builder" className="text-yellow-300 text-sm hover:underline">Try in Prompt Builder →</Link>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">🧰</div>
              <h3 className="font-semibold text-white mb-2">Enhanced Templates</h3>
              <p className="text-blue-100 text-sm mb-3">Detailed templates with real examples and previews</p>
              <Link to="/templates" className="text-yellow-300 text-sm hover:underline">Browse Templates →</Link>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="font-semibold text-white mb-2">Smart Prompt Preview</h3>
              <p className="text-blue-100 text-sm mb-3">See exactly how to use your generated prompts</p>
              <Link to="/prompt-builder" className="text-yellow-300 text-sm hover:underline">See in Action →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              AI-Powered Website Building Features
            </h2>
            <p className="text-xl text-gray-600">
              Unleash the power of AI to create stunning websites with ease.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl text-blue-600 mb-4">💡</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Intelligent Prompt Generation
              </h3>
              <p className="text-gray-700">
                Our AI analyzes your requirements and generates optimized prompts for website builders.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl text-green-600 mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Customizable Design Options
              </h3>
              <p className="text-gray-700">
                Tailor your website's design with a wide range of styles, layouts, and color schemes.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl text-purple-600 mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Real-Time Preview
              </h3>
              <p className="text-gray-700">
                See your website come to life in real-time as you adjust the prompts and settings.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl text-orange-600 mb-4">📱</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Mobile-Responsive Design
              </h3>
              <p className="text-gray-700">
                Ensure your website looks stunning on any device with our mobile-responsive design features.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl text-red-600 mb-4">✍️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                AI Content Generation
              </h3>
              <p className="text-gray-700">
                Generate compelling website content, including headlines, descriptions, and more, using AI.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl text-teal-600 mb-4">✅</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                SEO Optimization
              </h3>
              <p className="text-gray-700">
                Improve your website's visibility on search engines with our built-in SEO optimization tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Create your dream website in three simple steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-semibold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Describe Your Vision
              </h3>
              <p className="text-gray-700">
                Tell our AI about your website idea, target audience, and desired features.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-semibold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Generate AI Prompts
              </h3>
              <p className="text-gray-700">
                Our AI generates optimized prompts tailored to your specific needs.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-semibold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Build Your Website
              </h3>
              <p className="text-gray-700">
                Use the generated prompts in your favorite AI website builder to bring your vision to life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Community Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Join Our Community</h2>
          <p className="text-xl text-purple-100 mb-12 max-w-2xl mx-auto">
            Connect with other creators, share your websites, and get help from our community
          </p>
          
          <div className="flex justify-center">
            <a
              href="https://discord.gg/S3K84jr4"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center gap-3 text-lg"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              Join Discord
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Join thousands of creators and build your dream website today.
          </p>
          <Link to="/prompt-builder">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg font-medium px-8 py-3 rounded-md">
              Start Building Now
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
