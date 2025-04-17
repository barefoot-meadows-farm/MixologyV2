
import { Search, Menu, Settings } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40 dark:bg-mixology-dark dark:text-white transition-colors duration-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            className="touch-target mr-2 md:hidden" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu size={24} className="text-mixology-purple dark:text-white" />
          </button>
          <Link to="/" className="flex items-center">
            <h1 className="text-xl font-serif font-bold text-mixology-burgundy dark:text-white">
              Mixology<span className="text-mixology-purple dark:text-mixology-cream">Master</span>
            </h1>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            className="touch-target" 
            aria-label="Search"
          >
            <Search size={24} className="text-mixology-purple dark:text-white" />
          </button>
          
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="font-medium hover:text-mixology-burgundy dark:hover:text-mixology-cream">Discover</Link>
            <Link to="/browse" className="font-medium hover:text-mixology-burgundy dark:hover:text-mixology-cream">Browse</Link>
            <Link to="/bar" className="font-medium hover:text-mixology-burgundy dark:hover:text-mixology-cream">My Bar</Link>
            <Link to="/favorites" className="font-medium hover:text-mixology-burgundy dark:hover:text-mixology-cream">Favorites</Link>
            <Link to="/settings" className="font-medium hover:text-mixology-burgundy dark:hover:text-mixology-cream">Settings</Link>
          </div>
          
          <Link 
            to="/login" 
            className="hidden md:inline-flex px-4 py-2 text-sm font-medium text-white bg-mixology-burgundy rounded-md hover:bg-mixology-burgundy/90 transition-colors dark:bg-mixology-burgundy/80 dark:hover:bg-mixology-burgundy"
          >
            Sign In
          </Link>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-md md:hidden animate-fade-in dark:bg-mixology-dark dark:border-gray-700">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link to="/" className="py-2 font-medium" onClick={() => setIsMenuOpen(false)}>Discover</Link>
            <Link to="/browse" className="py-2 font-medium" onClick={() => setIsMenuOpen(false)}>Browse</Link>
            <Link to="/bar" className="py-2 font-medium" onClick={() => setIsMenuOpen(false)}>My Bar</Link>
            <Link to="/favorites" className="py-2 font-medium" onClick={() => setIsMenuOpen(false)}>Favorites</Link>
            <Link to="/settings" className="py-2 font-medium" onClick={() => setIsMenuOpen(false)}>Settings</Link>
            <div className="border-t border-gray-200 pt-4 flex justify-between dark:border-gray-700">
              <Link 
                to="/login" 
                className="px-4 py-2 text-sm font-medium text-white bg-mixology-burgundy rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 text-sm font-medium text-mixology-burgundy border border-mixology-burgundy rounded-md dark:text-white dark:border-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
