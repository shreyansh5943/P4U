
import { Link } from "react-router-dom";
import { Github, Shield, FileText, MessageCircle, Share2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P4U</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Prompt4U</span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Turn your website ideas into reality with AI-powered prompt generation for modern website builders.
            </p>
            
            {/* Privacy & Security Notice */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">Privacy Protected</span>
              </div>
              <p className="text-xs text-green-700 mt-1">
                We do not store or sell your prompt data. Your privacy is our priority.
              </p>
            </div>
            
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'Prompt4U - AI Website Prompts',
                      text: 'Turn your website ideas into reality with AI-powered prompts',
                      url: window.location.origin,
                    });
                  }
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/prompt-builder" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Prompt Builder
                </Link>
              </li>
              <li>
                <Link to="/templates" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Templates
                  <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                    Updated July 2025
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/examples" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Examples
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
              Legal & Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center">
                  <FileText className="w-3 h-3 mr-1" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-use" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center">
                  <FileText className="w-3 h-3 mr-1" />
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link to="/feedback-review" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center">
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Contact Support
                </Link>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © 2025 Prompt4U. Built with ❤️ for creators. Last updated: July 2025
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
