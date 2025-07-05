
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface FeedbackItem {
  id: string;
  name: string;
  email: string;
  type: string;
  message: string;
  created_at: string;
}

const FeedbackReview = () => {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching feedback:', error);
        toast({
          title: "Error",
          description: "Failed to load feedback. You may need to be authenticated.",
          variant: "destructive"
        });
      } else {
        setFeedback(data || []);
      }
    } catch (error) {
      console.error('Error fetching feedback:', error);
      toast({
        title: "Error",
        description: "Failed to load feedback.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'review':
        return 'default';
      case 'issue':
        return 'destructive';
      case 'suggestion':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-white font-inter">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Feedback Review
          </h1>
          <p className="text-xl text-gray-600">
            Review all user feedback submissions
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-lg text-gray-600">Loading feedback...</div>
          </div>
        ) : feedback.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-lg text-gray-600">No feedback submissions yet.</div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-sm text-gray-600 mb-4">
              Total submissions: {feedback.length}
            </div>
            
            {feedback.map((item) => (
              <Card key={item.id} className="shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-semibold">
                        {item.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600">{item.email}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant={getBadgeVariant(item.type)}>
                        {item.type}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {formatDate(item.created_at)}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-800 whitespace-pre-wrap">
                      {item.message}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default FeedbackReview;
