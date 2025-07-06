
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PromptPreview from "@/components/PromptPreview";
import { useToast } from "@/hooks/use-toast";
import { Eye, Copy, Edit, Star } from "lucide-react";

interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  prompt: string;
  features: string[];
  useCase: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
}

const Templates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [editedPrompt, setEditedPrompt] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const templates: Template[] = [
    {
      id: "portfolio",
      title: "Creative Portfolio",
      description: "Perfect for designers, developers, and creatives to showcase their work",
      category: "Personal",
      useCase: "Showcase work and attract clients",
      difficulty: "Beginner",
      estimatedTime: "2-3 hours",
      features: ["Hero Section", "Project Gallery", "About Me", "Contact Form", "Skills Showcase"],
      prompt: `Create a modern portfolio website for a creative professional. Include:

- Hero section with professional photo and compelling headline
- About section with personal story and skills
- Portfolio/work gallery with project case studies
- Services or skills section with clear descriptions
- Testimonials from past clients
- Contact form and social media links

Design Style: Clean and minimal with focus on showcasing work
Color Scheme: Professional with one accent color
Layout: Grid-based with plenty of white space
Mobile: Fully responsive design

Additional features:
- Smooth scrolling navigation
- Image optimization for fast loading
- Professional typography
- Clear call-to-action buttons`
    },
    {
      id: "local-business",
      title: "Local Business",
      description: "Perfect for restaurants, salons, shops, and service providers",
      category: "Business",
      useCase: "Attract local customers and bookings",
      difficulty: "Beginner",
      estimatedTime: "1-2 hours",
      features: ["Location Map", "Hours & Contact", "Services", "Reviews", "Booking System"],
      prompt: `Create a local business website that includes:

- Hero section with business name, tagline, and main service
- About section with business story and team
- Services or menu section with prices and descriptions
- Location with embedded map and business hours
- Customer reviews and testimonials
- Contact information and booking system
- Photo gallery showcasing work/products

Design Style: Trustworthy and professional
Color Scheme: Reflects business personality
Layout: Easy navigation for local customers
Features: Mobile-friendly for on-the-go users

Special elements:
- Local SEO optimization
- Click-to-call buttons
- Directions integration
- Social proof and trust indicators`
    },
    {
      id: "online-store",
      title: "E-commerce Store",
      description: "Complete online store setup for selling products",
      category: "E-commerce",
      useCase: "Sell products online with secure checkout",
      difficulty: "Advanced",
      estimatedTime: "4-6 hours",
      features: ["Product Catalog", "Shopping Cart", "Checkout", "User Accounts", "Payment Integration"],
      prompt: `Create a complete e-commerce website with:

- Homepage with featured products and categories
- Product catalog with filtering and search
- Individual product pages with multiple images
- Shopping cart and wishlist functionality
- User registration and account management
- Secure checkout process
- Payment gateway integration
- Order tracking and history
- Customer reviews and ratings
- About page and company story

Design Features:
- Product-focused layout with high-quality images
- Trust badges and security indicators
- Mobile-optimized shopping experience
- Clear call-to-action buttons
- Professional color scheme

E-commerce specific:
- Inventory management ready
- Multiple payment options
- Shipping calculator
- Email notifications for orders
- Customer support integration`
    },
    {
      id: "saas-landing",
      title: "SaaS Landing Page",
      description: "Convert visitors into customers for your software product",
      category: "Business",
      useCase: "Drive signups and subscriptions",
      difficulty: "Intermediate",
      estimatedTime: "2-4 hours",
      features: ["Product Demo", "Pricing Plans", "Feature Highlights", "Social Proof", "CTA Forms"],
      prompt: `Create a high-converting SaaS landing page featuring:

- Compelling hero section with clear value proposition
- Problem-solution narrative
- Product features with screenshots or demo videos
- Pricing plans with comparison table
- Customer testimonials and success stories
- Free trial or demo signup forms
- FAQ section addressing common concerns
- Social proof (customer logos, user count)

Design Elements:
- Modern, tech-focused design
- Trust indicators and security badges
- Mobile-responsive layout
- Fast loading and optimized performance

Conversion Optimization:
- Multiple call-to-action buttons
- Lead capture forms
- Social proof throughout
- Clear benefit statements
- Risk-free trial messaging`
    },
    {
      id: "event-page",
      title: "Event Landing Page",
      description: "Promote events and manage registrations effectively",
      category: "Events",
      useCase: "Drive event registration and attendance",
      difficulty: "Beginner",
      estimatedTime: "1-2 hours",
      features: ["Event Details", "Registration Form", "Schedule", "Speaker Profiles", "Location Map"],
      prompt: `Create an engaging event landing page with:

- Eye-catching hero section with event name and date
- Event overview and key benefits
- Detailed schedule and agenda
- Speaker or performer profiles
- Registration form with ticket options
- Venue information with map and directions
- FAQ section for common questions
- Social media integration for sharing

Design Style: Energetic and engaging
Layout: Single-page with smooth scrolling
Features: Mobile-friendly registration

Event-specific elements:
- Countdown timer to event date
- Early bird pricing options
- Social proof (past attendee testimonials)
- Clear registration call-to-action
- Contact information for questions`
    },
    {
      id: "blog-personal",
      title: "Personal Blog",
      description: "Share your thoughts, stories, and expertise with readers",
      category: "Personal",
      useCase: "Build audience and share knowledge",
      difficulty: "Beginner",
      estimatedTime: "2-3 hours",
      features: ["Blog Posts", "Categories", "Search", "Comments", "Author Bio"],
      prompt: `Create a personal blog website that includes:

- Homepage with latest posts and featured content
- Blog post pages with readable typography
- About the author page with personal story
- Categories and tags for content organization
- Search functionality for finding posts
- Comment system for reader engagement
- Newsletter signup for subscribers
- Social media integration
- Archive pages by date and category
- Contact page for collaborations

Design Elements:
- Reading-focused typography and layout
- Clean, distraction-free post pages
- Sidebar with popular posts and categories
- Author bio section on each post
- Social sharing buttons

Blog Features:
- RSS feed for subscribers
- Related posts suggestions
- Reading time estimates
- Mobile-optimized reading experience
- SEO optimization for better discoverability`
    }
  ];

  const openTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setEditedPrompt(template.prompt);
    setIsDialogOpen(true);
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(editedPrompt);
    toast({
      title: "Prompt Copied!",
      description: "Your customized prompt has been copied to clipboard.",
    });
    setIsDialogOpen(false);
  };

  const categories = ["All", ...Array.from(new Set(templates.map(t => t.category)))];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTemplates = selectedCategory === "All" 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-white font-inter">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Website Templates</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started quickly with our professionally crafted prompt templates. 
            Each template includes detailed examples and customization options.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category 
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white" 
                : ""
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <Card 
              key={template.id} 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-l-4 border-l-transparent hover:border-l-blue-500"
              onClick={() => openTemplate(template)}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors line-clamp-2">
                    {template.title}
                  </CardTitle>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-500">New</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2">{template.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    {template.category}
                  </Badge>
                  <Badge className={`text-xs ${getDifficultyColor(template.difficulty)}`}>
                    {template.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      <strong>Use Case:</strong> {template.useCase}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Est. Time:</strong> {template.estimatedTime}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 mb-1">Key Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {template.features.slice(0, 3).map((feature) => (
                        <span 
                          key={feature}
                          className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded border"
                        >
                          {feature}
                        </span>
                      ))}
                      {template.features.length > 3 && (
                        <span className="text-xs text-gray-500 px-2 py-1">
                          +{template.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button 
                      className="flex-1 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-600 group-hover:text-white transition-all text-sm py-2 flex items-center gap-2"
                      variant="outline"
                    >
                      <Eye className="w-4 h-4" />
                      Preview & Use
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Template Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              {selectedTemplate?.title}
              <Badge className={`text-xs ${selectedTemplate ? getDifficultyColor(selectedTemplate.difficulty) : ''}`}>
                {selectedTemplate?.difficulty}
              </Badge>
            </DialogTitle>
            <p className="text-gray-600">{selectedTemplate?.description}</p>
          </DialogHeader>
          
          {selectedTemplate && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Template Details:</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Category:</strong> {selectedTemplate.category}</p>
                    <p><strong>Use Case:</strong> {selectedTemplate.useCase}</p>
                    <p><strong>Estimated Time:</strong> {selectedTemplate.estimatedTime}</p>
                    <p><strong>Difficulty:</strong> {selectedTemplate.difficulty}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Included Features:</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTemplate.features.map((feature) => (
                      <span 
                        key={feature}
                        className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Customize Your Prompt:
                </h3>
                <Textarea
                  value={editedPrompt}
                  onChange={(e) => setEditedPrompt(e.target.value)}
                  className="min-h-[300px] font-mono text-sm"
                  placeholder="Your prompt will appear here..."
                />
              </div>

              <PromptPreview 
                prompt={editedPrompt} 
                websitePurpose={selectedTemplate.useCase}
              />
              
              <div className="flex gap-3">
                <Button
                  onClick={copyPrompt}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy Customized Prompt
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Templates;
