
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Wine } from "lucide-react";
import { useSettings } from "../contexts/SettingsContext";
import { useIsMobile } from "../hooks/use-mobile";
import BartenderMode from "./BartenderMode";

const Header = () => {
  const location = useLocation();
  const { themeMode } = useSettings();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isBartenderMode, setIsBartenderMode] = useState(false);

  // If bartender mode is active, render BartenderMode component instead
  if (isBartenderMode) {
    return <BartenderMode onExit={() => setIsBartenderMode(false)} />;
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Browse", path: "/browse" },
    { name: "My Bar", path: "/bar" },
    { name: "Favorites", path: "/favorites" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "bg-white shadow-md dark:bg-mixology-dark dark:shadow-none dark:border-b dark:border-gray-800"
          : "bg-white/80 backdrop-blur-md dark:bg-mixology-dark/90"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Bartender Mode Button */}
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-2 text-mixology-purple dark:text-mixology-cream"
            >
              <span className="text-2xl font-serif font-medium">Mixology</span>
              <span className="text-2xl font-serif text-mixology-burgundy dark:text-mixology-burgundy">
                Master
              </span>
            </Link>
            
            <button
              onClick={() => setIsBartenderMode(true)}
              className="hidden md:flex items-center text-sm font-medium px-4 py-2 border border-mixology-burgundy rounded-md hover:bg-mixology-burgundy hover:text-white transition-colors dark:text-white dark:hover:text-white dark:border-mixology-burgundy dark:hover:bg-mixology-burgundy"
            >
              <Wine size={16} className="mr-1" />
              Bartender Mode
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-mixology-burgundy ${
                  location.pathname === link.path
                    ? "text-mixology-burgundy"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/login"
              className="text-sm font-medium px-4 py-2 border border-mixology-burgundy rounded-md hover:bg-mixology-burgundy hover:text-white transition-colors dark:text-white dark:hover:text-white dark:border-mixology-burgundy dark:hover:bg-mixology-burgundy"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-700 dark:text-gray-300"
              aria-label="Open mobile menu"
            >
              {mobileMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-mixology-dark border-t border-gray-100 dark:border-gray-800">
          <div className="container mx-auto px-4 py-2 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block py-2 text-sm font-medium ${
                  location.pathname === link.path
                    ? "text-mixology-burgundy"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => {
                setIsBartenderMode(true);
                setMobileMenuOpen(false);
              }}
              className="block py-2 text-sm font-medium text-gray-700 dark:text-gray-300 w-full text-left"
            >
              <span className="flex items-center">
                <Wine size={16} className="mr-1" />
                Bartender Mode
              </span>
            </button>
            <Link
              to="/login"
              className="block py-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
