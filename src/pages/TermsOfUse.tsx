
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Use</h1>
          <p className="text-gray-600 mb-8">Last updated: July 8, 2025</p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using Prompt4U, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Use License</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Permission is granted to temporarily download one copy of Prompt4U for personal, non-commercial transitory viewing only.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Modify or copy the materials</li>
                <li>Use the materials for commercial purposes or for public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or proprietary notations from the materials</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Content</h2>
              <p className="text-gray-700 leading-relaxed">
                You retain full ownership of the prompts and content you create using Prompt4U. We do not claim any ownership 
                rights to your creative work. You are responsible for ensuring your content complies with applicable laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Service Availability</h2>
              <p className="text-gray-700 leading-relaxed">
                We strive to maintain consistent service availability but cannot guarantee uninterrupted access. 
                We reserve the right to modify or discontinue features with reasonable notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                Prompt4U shall not be held liable for any damages arising from the use or inability to use this service, 
                including but not limited to direct, indirect, incidental, punitive, and consequential damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                For questions regarding these Terms of Use, please contact us at legal@prompt4u.com
              </p>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TermsOfUse;
