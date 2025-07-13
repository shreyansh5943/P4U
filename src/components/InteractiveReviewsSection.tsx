
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Star } from "lucide-react";

interface Review {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  likes: number;
  avatar: string;
}

const initialReviews: Review[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Freelance Designer",
    content: "This tool has revolutionized how I create websites for my clients. The AI suggestions are incredibly accurate and save me hours of work.",
    rating: 5,
    likes: 24,
    avatar: "SJ"
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "Startup Founder",
    content: "As someone with no technical background, this made it possible for me to communicate exactly what I wanted to my development team.",
    rating: 5,
    likes: 31,
    avatar: "MC"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Manager",
    content: "The step-by-step approach is perfect. It walks you through everything you need to consider for a professional website.",
    rating: 4,
    likes: 18,
    avatar: "ER"
  },
  {
    id: 4,
    name: "David Park",
    role: "Small Business Owner",
    content: "I was amazed at how it understood my business needs and suggested features I hadn't even thought of. Highly recommended!",
    rating: 5,
    likes: 42,
    avatar: "DP"
  }
];

const InteractiveReviewsSection = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [likedReviews, setLikedReviews] = useState<Set<number>>(new Set());

  const handleLike = (reviewId: number) => {
    const newLikedReviews = new Set(likedReviews);
    const isLiked = likedReviews.has(reviewId);
    
    if (isLiked) {
      newLikedReviews.delete(reviewId);
    } else {
      newLikedReviews.add(reviewId);
    }
    
    setLikedReviews(newLikedReviews);
    
    setReviews(prev => prev.map(review => {
      if (review.id === reviewId) {
        return {
          ...review,
          likes: isLiked ? review.likes - 1 : review.likes + 1
        };
      }
      return review;
    }));
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied users who have transformed their web development process
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review) => (
            <Card key={review.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                    {review.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{review.name}</h3>
                        <p className="text-sm text-gray-600">{review.role}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      "{review.content}"
                    </p>
                    <div className="flex items-center justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(review.id)}
                        className={`flex items-center space-x-2 transition-colors ${
                          likedReviews.has(review.id)
                            ? "text-red-500 hover:text-red-600"
                            : "text-gray-500 hover:text-red-500"
                        }`}
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            likedReviews.has(review.id) ? "fill-current" : ""
                          }`}
                        />
                        <span>{review.likes}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteractiveReviewsSection;
