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
const initialReviews: Review[] = [{
  id: 1,
  name: "Sarah Johnson",
  role: "Freelance Designer",
  content: "This tool has revolutionized how I create websites for my clients. The AI suggestions are incredibly accurate and save me hours of work.",
  rating: 5,
  likes: 24,
  avatar: "SJ"
}, {
  id: 2,
  name: "Mike Chen",
  role: "Startup Founder",
  content: "As someone with no technical background, this made it possible for me to communicate exactly what I wanted to my development team.",
  rating: 5,
  likes: 31,
  avatar: "MC"
}, {
  id: 3,
  name: "Emily Rodriguez",
  role: "Marketing Manager",
  content: "The step-by-step approach is perfect. It walks you through everything you need to consider for a professional website.",
  rating: 4,
  likes: 18,
  avatar: "ER"
}, {
  id: 4,
  name: "David Park",
  role: "Small Business Owner",
  content: "I was amazed at how it understood my business needs and suggested features I hadn't even thought of. Highly recommended!",
  rating: 5,
  likes: 42,
  avatar: "DP"
}];
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
    return [...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />);
  };
  return;
};
export default InteractiveReviewsSection;