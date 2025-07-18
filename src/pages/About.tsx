import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Github } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-white font-inter">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Prompt4U
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're on a mission to make website creation accessible to everyone,
            regardless of their technical background.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-600">
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  To democratize website creation by providing anyone with the
                  tools to generate professional, detailed prompts for AI
                  website builders. We believe great ideas shouldn't be limited
                  by technical barriers.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-600">
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  A world where anyone can turn their website idea into reality
                  within minutes, not months. Where creativity and business
                  needs drive website creation, not technical complexity.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gray-50 rounded-3xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Why PromptBuddy Works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Precision
                </h3>
                <p className="text-gray-600">
                  Our guided process ensures no important detail is missed,
                  resulting in prompts that capture your exact vision.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Speed
                </h3>
                <p className="text-gray-600">
                  Generate comprehensive prompts in under 5 minutes, instead of
                  spending hours crafting them yourself.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📚</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Expertise
                </h3>
                <p className="text-gray-600">
                  Built-in best practices from successful website projects
                  across various industries and use cases.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-3xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Open Source & Free
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              PromptBuddy is completely free to use and open source. We believe
              that powerful tools for website creation should be accessible to
              everyone, regardless of budget. Our code is available on GitHub
              for developers who want to contribute or learn from our approach.
            </p>
            <p className="text-gray-700 leading-relaxed">
              If PromptBuddy has helped you create an amazing website, consider
              starring us on GitHub or sharing your success story with the
              community!
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
