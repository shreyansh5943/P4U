import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import UserAccountButton from "./UserAccountButton";
import logoImage from "@/assets/prompt4u-logo.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logoImage}
              alt="Prompt4U"
              className="h-8 w-8 rounded-full"
            />
            <span className="text-xl font-bold text-gray-900">Prompt4U</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/prompt-builder"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Prompt Builder
            </Link>
            <Link
              to="/templates"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Templates
            </Link>
            <Link
              to="/examples"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Examples
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              About
            </Link>
            <UserAccountButton />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              <Link
                to="/prompt-builder"
                className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Prompt Builder
              </Link>
              <Link
                to="/templates"
                className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Templates
              </Link>
              <Link
                to="/examples"
                className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Examples
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <div className="px-3 py-2">
                <UserAccountButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
