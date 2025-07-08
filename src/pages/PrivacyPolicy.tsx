
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: July 8, 2025</p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Commitment to Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                At Prompt4U, we are committed to protecting your privacy and ensuring the security of your personal information. 
                We do not store, sell, or share your prompt data with third parties. Your creative ideas and prompts remain yours.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Basic account information (email, name) when you create an account</li>
                <li>Usage analytics to improve our service (anonymized)</li>
                <li>Feedback and comments you voluntarily provide</li>
                <li>Technical information like IP address and browser type for security purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>To provide and improve our prompt generation service</li>
                <li>To send important service updates and notifications</li>
                <li>To respond to your questions and support requests</li>
                <li>To analyze usage patterns and improve user experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Protection</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement industry-standard security measures to protect your data. All data transmission is encrypted, 
                and we regularly update our security protocols. Your prompt data is processed temporarily and not stored permanently.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Delete your account and associated data</li>
                <li>Export your data</li>
                <li>Opt out of non-essential communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have questions about this Privacy Policy, please contact us at privacy@prompt4u.com
              </p>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
