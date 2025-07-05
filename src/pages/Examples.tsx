
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface Example {
  id: string;
  title: string;
  category: string;
  input: string;
  prompt: string;
  result: string;
  features: string[];
}

const Examples = () => {
  const examples: Example[] = [
    {
      id: "portfolio-example",
      title: "UX Designer Portfolio",
      category: "Portfolio",
      input: "I need a portfolio website for my UX design work. I want to show my projects and get more clients.",
      prompt: `Create a modern UX designer portfolio website with the following requirements:

**Purpose**: Showcase UX design projects and attract potential clients
**Target Audience**: Startups, agencies, and businesses looking for UX design services

**Key Sections**:
- Hero section with professional photo and compelling headline
- About section highlighting UX design expertise and process
- Project showcase with 4-6 case studies including:
  - Project overview and challenge
  - Design process and methodology
  - Final solutions with before/after comparisons
  - Results and impact metrics
- Services offered (UX Research, Wireframing, Prototyping, etc.)
- Client testimonials and logos
- Contact form with availability calendar

**Design Style**: Clean, minimal, and modern with focus on showcasing work
**Color Scheme**: Neutral grays and whites with one accent color (blue or purple)
**Typography**: Professional sans-serif fonts with clear hierarchy

**Technical Requirements**:
- Fully responsive design optimized for all devices
- Fast loading with optimized images
- Smooth scrolling navigation
- Interactive elements and micro-animations
- SEO optimized for "UX designer [city]" keywords`,
      result: "A stunning portfolio showcasing 6 detailed case studies with interactive prototypes, leading to 40% more client inquiries within the first month.",
      features: ["Case Studies", "Interactive Prototypes", "Client Testimonials", "Contact Form", "Mobile Optimized"]
    },
    {
      id: "restaurant-example",
      title: "Italian Restaurant Website",
      category: "Restaurant",
      input: "We're opening a new Italian restaurant and need a website to attract customers and take reservations.",
      prompt: `Create an elegant Italian restaurant website that captures the authentic dining experience:

**Restaurant Name**: Nonna's Kitchen
**Concept**: Traditional Italian family recipes in a cozy, welcoming atmosphere

**Essential Pages**:
- Homepage with hero image of signature dishes
- About Us story of family tradition and authentic recipes
- Full menu with appetizers, pasta, mains, desserts, and wine list
- Photo gallery showcasing food, interior, and dining atmosphere
- Reservations system with date/time selection
- Location page with map, directions, and parking info
- Contact page with phone, email, and social media

**Design Elements**:
- Warm, inviting color palette (deep reds, golds, creams)
- High-quality food photography throughout
- Italian-inspired fonts and decorative elements
- Cozy, family-friendly atmosphere in imagery

**Key Features**:
- Online reservation booking system
- Menu with dietary restrictions indicators
- Customer review integration
- Social media feed integration
- Mobile-friendly design for on-the-go browsing
- Email newsletter signup for special offers

**SEO Focus**: "Italian restaurant [city]", "authentic Italian food", "family restaurant"`,
      result: "120% increase in online reservations and consistently booked weekends. Featured in local food blogs within 2 months of launch.",
      features: ["Online Reservations", "Menu Display", "Photo Gallery", "Location Map", "Social Integration"]
    },
    {
      id: "saas-example",
      title: "Project Management SaaS",
      category: "SaaS Startup",
      input: "We built a project management tool for small teams and need a website to get our first 1000 customers.",
      prompt: `Create a high-converting SaaS landing page for a project management tool targeting small teams:

**Product**: TeamFlow - Simple project management for teams of 5-50 people
**Unique Value**: Combines task management, time tracking, and team communication in one tool

**Page Structure**:
- Hero section with clear value proposition and product demo video
- Problem/Solution narrative addressing small team pain points
- Key features showcase with screenshots:
  - Task and project organization
  - Real-time collaboration
  - Time tracking and reporting
  - Team communication tools
  - Integration capabilities
- Social proof with customer logos and testimonials
- Pricing table with 3 tiers (Free, Pro, Enterprise)
- FAQ section addressing common concerns
- Free trial signup with minimal friction

**Design Approach**:
- Clean, professional SaaS aesthetic
- Trust-building elements (security badges, testimonials)
- Clear visual hierarchy guiding to signup
- Mobile-responsive for all device types

**Conversion Optimization**:
- Multiple CTA buttons strategically placed
- 14-day free trial with no credit card required
- Customer success stories with metrics
- Feature comparison with competitors
- Live chat integration for questions

**Technical Setup**:
- Analytics and conversion tracking ready
- A/B testing friendly structure
- Fast loading and optimized performance
- Email integration for trial signups`,
      result: "Achieved 850 signups in first month with 23% trial-to-paid conversion rate. Featured on ProductHunt and gained 50k page views.",
      features: ["Product Demo", "Pricing Table", "Free Trial", "Customer Testimonials", "Analytics Ready"]
    }
  ];

  return (
    <div className="min-h-screen bg-white font-inter">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Success Examples</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how our detailed prompts helped real projects achieve amazing results. 
            From simple ideas to professional websites that drive business growth.
          </p>
        </div>

        <div className="space-y-12">
          {examples.map((example, index) => (
            <div key={example.id} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 lg:p-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  {index + 1}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{example.title}</h2>
                  <span className="text-blue-600 font-medium">{example.category}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Input */}
                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                      Original Idea
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 italic">"{example.input}"</p>
                  </CardContent>
                </Card>

                {/* Generated Prompt */}
                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <span className="w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                      AI-Generated Prompt
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 rounded-lg p-4 font-mono text-xs leading-relaxed max-h-48 overflow-y-auto">
                      {example.prompt}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 w-full"
                      onClick={() => navigator.clipboard.writeText(example.prompt)}
                    >
                      Copy This Prompt
                    </Button>
                  </CardContent>
                </Card>

                {/* Results */}
                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                      Amazing Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{example.result}</p>
                    
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-2">Key Features Built:</h4>
                      <div className="flex flex-wrap gap-1">
                        {example.features.map((feature) => (
                          <span 
                            key={feature}
                            className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Your Success Story?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join hundreds of creators who've turned their website ideas into reality with our AI-powered prompt builder.
          </p>
          <Button 
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl"
            onClick={() => window.location.href = '/prompt-builder'}
          >
            Start Building Your Prompt
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Examples;
