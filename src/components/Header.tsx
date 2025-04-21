import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Wine, Shuffle } from "lucide-react";
import { useSettings } from "../contexts/SettingsContext";
import { useIsMobile } from "../hooks/use-mobile";
import { cocktails } from "../data/cocktails";
import { ingredients } from "../data/ingredients";

const SurpriseMeModal = ({ isOpen, onClose, onSelectAll, onSelectAvailable }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-mixology-dark rounded-lg p-6 shadow-xl max-w-sm w-full">
        <h3 className="text-lg font-medium mb-4 text-mixology-purple dark:text-mixology-cream">Surprise Me!</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Choose how you want to be surprised:</p>
        <div className="space-y-3">
          <button
            onClick={onSelectAll}
            className="w-full px-4 py-2 bg-mixology-burgundy text-white rounded-md hover:bg-mixology-burgundy/90 transition-colors"
          >
            Pick From All Drinks
          </button>
          <button
            onClick={onSelectAvailable}
            className="w-full px-4 py-2 bg-mixology-purple text-white rounded-md hover:bg-mixology-purple/90 transition-colors"
          >
            Pick From Available Drinks
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { themeMode } = useSettings();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSurpriseModalOpen, setIsSurpriseModalOpen] = useState(false);
  const isBartenderModeActive = location.pathname === '/bartender';

  const barIngredients = ingredients.filter((ing) => ing.isInInventory);
  const cocktailsICanMake = cocktails.filter((cocktail) => {
    return cocktail.ingredients.every(ingInfo => {
      const ingredientName = typeof ingInfo === 'string' ? ingInfo : ingInfo.name;
      return barIngredients.some(barIng => barIng.name === ingredientName);
    });
  });

  const handleSurpriseAll = () => {
    if (cocktails.length > 0) {
      const randomIndex = Math.floor(Math.random() * cocktails.length);
      navigate(`/cocktail/${cocktails[randomIndex].id}`);
      setIsSurpriseModalOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const handleSurpriseAvailable = () => {
    if (cocktailsICanMake.length > 0) {
      const randomIndex = Math.floor(Math.random() * cocktailsICanMake.length);
      navigate(`/cocktail/${cocktailsICanMake[randomIndex].id}`);
      setIsSurpriseModalOpen(false);
      setMobileMenuOpen(false);
    } else {
      console.log("No makeable cocktails available for surprise.");
      alert("You don't have the ingredients for any cocktails!");
      setIsSurpriseModalOpen(false); 
    }
  };

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
    { name: "Bartender Mode", path: "/bartender", icon: Wine },
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

            <Link
              to={isBartenderModeActive ? "/" : "/bartender"}
              className={`flex items-center text-sm font-medium px-4 py-2 border rounded-md transition-colors ${isBartenderModeActive 
                ? 'bg-mixology-burgundy text-white border-mixology-burgundy'
                : 'border-mixology-burgundy hover:bg-mixology-burgundy hover:text-white dark:text-white dark:hover:text-white dark:border-mixology-burgundy dark:hover:bg-mixology-burgundy'}`}
            >
              <Wine size={16} className="mr-1" />
              {isBartenderModeActive ? 'Exit Bartender' : 'Bartender Mode'}
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {!isBartenderModeActive && (
              <div className="hidden md:flex space-x-6 items-center">
                {navLinks.filter(link => link.path !== '/bartender').map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-sm font-medium transition-colors hover:text-mixology-burgundy ${location.pathname === link.path
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
            )}

            {isBartenderModeActive && (
              <button
                onClick={() => setIsSurpriseModalOpen(true)}
                className="flex items-center text-sm font-medium px-4 py-2 border border-mixology-purple rounded-md bg-mixology-purple text-white hover:bg-mixology-purple/90 transition-colors dark:border-mixology-purple dark:bg-mixology-purple dark:hover:bg-mixology-purple/90"
                aria-label="Surprise Me"
              >
                <Shuffle size={16} className="mr-1" />
                Surprise Me
              </button>
            )}

            {!isBartenderModeActive && (
              <div className="md:hidden flex items-center">
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 text-gray-700 dark:text-gray-300"
                  aria-label="Open mobile menu"
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {!isBartenderModeActive && mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-mixology-dark border-t border-gray-100 dark:border-gray-800">
          <div className="container mx-auto px-4 py-2 space-y-1">
            {navLinks.filter(link => link.path !== '/bartender').map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center py-2 text-sm font-medium ${location.pathname === link.path
                  ? "text-mixology-burgundy"
                  : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.icon && <link.icon size={16} className="mr-2" />} 
                {link.name}
              </Link>
            ))}
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

      <SurpriseMeModal 
        isOpen={isSurpriseModalOpen}
        onClose={() => setIsSurpriseModalOpen(false)}
        onSelectAll={handleSurpriseAll}
        onSelectAvailable={handleSurpriseAvailable}
      />
    </header>
  );
};

export default Header;
