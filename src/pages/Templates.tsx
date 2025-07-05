
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  prompt: string;
  features: string[];
}

const Templates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [editedPrompt, setEditedPrompt] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const templates: Template[] = [
    {
      id: "portfolio",
      title: "Portfolio Website",
      description: "Perfect for designers, developers, and creatives",
      category: "Personal",
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
      id: "restaurant",
      title: "Restaurant Landing Page",
      description: "Showcase your restaurant with style and flavor",
      category: "Business",
      features: ["Menu Display", "Reservation System", "Location Map", "Photo Gallery", "Reviews"],
      prompt: `Create an appetizing restaurant landing page that includes:

- Hero section with mouth-watering food photography
- About the restaurant story and chef background
- Menu sections with prices and descriptions
- Image gallery showcasing dishes and atmosphere
- Reservation booking system
- Location with embedded map and hours
- Customer reviews and testimonials
- Contact information and social media

Design Style: Warm and inviting with food-focused imagery
Color Scheme: Rich colors that complement food photography
Typography: Elegant and readable fonts
Layout: Visual hierarchy emphasizing food and experience

Special features:
- Online reservation integration
- Menu filtering by category
- Photo gallery with lightbox effect
- Mobile-friendly design for on-the-go customers`
    },
    {
      id: "startup",
      title: "Tech Startup",
      description: "Launch your startup with a professional presence",
      category: "Business",
      features: ["Product Demo", "Team Section", "Pricing Plans", "Blog", "Newsletter"],
      prompt: `Create a professional tech startup website featuring:

- Compelling hero section explaining the product/service
- Problem-solution narrative with clear value proposition
- Product features with screenshots or demo videos
- Pricing plans with comparison table
- Team section with founders and key members
- Customer testimonials and success stories
- Blog section for content marketing
- Newsletter signup with lead magnet
- Contact and demo request forms

Design Style: Modern, tech-focused, and trustworthy
Color Scheme: Professional blues and grays with bright accent
Layout: Clean sections with clear information hierarchy
Features: Interactive elements and smooth animations

Technical elements:
- Fast loading and optimized performance
- SEO-friendly structure
- Analytics integration ready
- Social proof and trust indicators`
    },
    {
      id: "ecommerce",
      title: "Online Store",
      description: "Start selling online with a complete store setup",
      category: "E-commerce",
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
      id: "blog",
      title: "Personal Blog",
      description: "Share your thoughts and stories with the world",
      category: "Personal",
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
    },
    {
      id: "agency",
      title: "Creative Agency",
      description: "Showcase your agency's work and attract clients",
      category: "Business",
      features: ["Service Pages", "Case Studies", "Team Profiles", "Client Logos", "Contact Forms"],
      prompt: `Create a professional creative agency website featuring:

- Striking hero section showcasing your best work
- Services pages detailing what you offer
- Portfolio with detailed case studies
- Team page with member profiles and expertise
- Client testimonials and logo showcase
- About page with agency story and values
- Blog for sharing insights and updates
- Contact page with multiple ways to reach you
- Career page for potential hires

Design Approach:
- Bold, creative design that reflects your style
- Portfolio-first layout with visual emphasis
- Professional color palette with creative touches
- High-quality imagery and graphics

Agency-Specific Features:
- Project case studies with before/after
- Client logo carousel
- Service-specific landing pages
- Team member individual profiles
- Client portal access (optional)`
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

  return (
    <div className="min-h-screen bg-white font-inter">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Prompt Templates</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started quickly with our professionally crafted prompt templates. 
            Click any template to customize it for your needs.
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
              className="hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => openTemplate(template)}
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                    {template.title}
                  </CardTitle>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {template.category}
                  </span>
                </div>
                <p className="text-gray-600">{template.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 mb-1">Includes:</h4>
                    <div className="flex flex-wrap gap-1">
                      {template.features.slice(0, 3).map((feature) => (
                        <span 
                          key={feature}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                      {template.features.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{template.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  <Button 
                    className="w-full group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-600 group-hover:text-white transition-all"
                    variant="outline"
                  >
                    Use This Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Template Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedTemplate?.title} Template
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Features Included:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedTemplate?.features.map((feature) => (
                  <span 
                    key={feature}
                    className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Customize Your Prompt:</h3>
              <Textarea
                value={editedPrompt}
                onChange={(e) => setEditedPrompt(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
                placeholder="Your prompt will appear here..."
              />
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={copyPrompt}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              >
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
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Templates;
