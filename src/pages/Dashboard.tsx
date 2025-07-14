import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Zap, FileText, User, Mail, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UserStats {
  totalPrompts: number;
  promptsToday: number;
  aiUsageThisWeek: number;
  joinDate: string;
}

const Dashboard = () => {
  const { user, remainingAIUses, loading, refreshUsage } = useAuth();
  const navigate = useNavigate();
  const [userStats, setUserStats] = useState<UserStats>({
    totalPrompts: 0,
    promptsToday: 0,
    aiUsageThisWeek: 0,
    joinDate: "",
  });
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
      return;
    }

    if (user) {
      fetchUserStats();
    }
  }, [user, loading, navigate]);

  const fetchUserStats = async () => {
    if (!user) return;

    try {
      // Get AI usage stats
      const { data: usageData, error: usageError } = await supabase
        .from("user_ai_usage")
        .select("*")
        .eq("user_id", user.id);

      if (usageError) {
        console.error("Error fetching usage data:", usageError);
      }

      // Calculate stats
      const today = new Date().toISOString().split("T")[0];
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];

      const todayUsage =
        usageData?.find((record) => record.usage_date === today)?.usage_count ||
        0;
      const weeklyUsage =
        usageData
          ?.filter((record) => record.usage_date >= oneWeekAgo)
          .reduce((sum, record) => sum + record.usage_count, 0) || 0;
      const totalUsage =
        usageData?.reduce((sum, record) => sum + record.usage_count, 0) || 0;

      setUserStats({
        totalPrompts: totalUsage,
        promptsToday: todayUsage,
        aiUsageThisWeek: weeklyUsage,
        joinDate: new Date(user.created_at).toLocaleDateString(),
      });
    } catch (error) {
      console.error("Error fetching user stats:", error);
    } finally {
      setIsLoadingStats(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Clamp remainingAIUses between 0 and 5 for display
  const clampedRemaining = Math.max(0, Math.min(5, remainingAIUses ?? 0));
  const creditsUsed = 5 - clampedRemaining;
  const usagePercentage = (creditsUsed / 5) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <div className="flex items-center gap-2">
            <p className="text-gray-600">
              Welcome back{" "}
              {user?.user_metadata?.first_name
                ? `${user.user_metadata.first_name}${
                    user.user_metadata.last_name
                      ? " " + user.user_metadata.last_name
                      : ""
                  }`
                : "User"}
            </p>
            <button
              className="ml-2 px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-semibold hover:bg-blue-200 transition-colors border border-blue-300"
              onClick={refreshUsage}
              title="Refresh AI Credits"
            >
              Refresh Credits
            </button>
            <span className="text-xs text-gray-500 ml-2">
              Credits left: {clampedRemaining}
            </span>
          </div>
        </div>

        {/* Profile Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">
                    Member since {userStats.joinDate}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary"
                  >
                    Free User
                  </Badge>
                  <button
                    className="ml-2 px-3 py-1 rounded bg-primary text-white font-semibold shadow hover:bg-primary/80 transition-colors border border-primary"
                    onClick={() => navigate("/upgrade")}
                  >
                    Upgrade
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Usage Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total AI Prompts Generated
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <FileText className="w-8 h-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {isLoadingStats ? "..." : userStats.totalPrompts}
                  </div>
                  <div className="text-sm text-gray-600">All time</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Prompts Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Clock className="w-8 h-8 text-green-500" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {isLoadingStats ? "..." : userStats.promptsToday}
                  </div>
                  <div className="text-sm text-gray-600">Since midnight</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Zap className="w-8 h-8 text-blue-500" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {isLoadingStats ? "..." : userStats.aiUsageThisWeek}
                  </div>
                  <div className="text-sm text-gray-600">AI credits used</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => navigate("/prompt-builder")}
                className="p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors text-left"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">
                  Create New Prompt
                </h3>
                <p className="text-sm text-gray-600">
                  Start building a new AI prompt
                </p>
              </button>

              <button
                onClick={() => navigate("/examples")}
                className="p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors text-left"
              >
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <Calendar className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">
                  View Examples
                </h3>
                <p className="text-sm text-gray-600">Browse prompt examples</p>
              </button>

              <button
                onClick={() => navigate("/templates")}
                className="p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors text-left"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Templates</h3>
                <p className="text-sm text-gray-600">Use pre-made templates</p>
              </button>

              <button
                onClick={() => navigate("/about")}
                className="p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors text-left"
              >
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <User className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">
                  About Prompt4U
                </h3>
                <p className="text-sm text-gray-600">Learn more about us</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
