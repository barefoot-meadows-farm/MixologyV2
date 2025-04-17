
import { Compass, Search, GlassWater, BookmarkIcon, Settings, Wine } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import BartenderMode from "./BartenderMode";

const MobileNavbar = () => {
  const location = useLocation();
  const [isBartenderMode, setIsBartenderMode] = useState(false);
  
  if (isBartenderMode) {
    return <BartenderMode onExit={() => setIsBartenderMode(false)} />;
  }
  
  const navItems = [
    { icon: Compass, label: "Discover", path: "/" },
    { icon: Search, label: "Browse", path: "/browse" },
    { icon: GlassWater, label: "My Bar", path: "/bar" },
    { icon: BookmarkIcon, label: "Favorites", path: "/favorites" },
    { icon: Wine, label: "Bartender", action: () => setIsBartenderMode(true) },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-3 flex justify-between z-50 md:hidden dark:bg-mixology-dark dark:border-gray-800">
      {navItems.map((item) => {
        const isActive = item.path && location.pathname === item.path;
        
        if (item.action) {
          return (
            <button 
              key={item.label} 
              onClick={item.action}
              className="mobile-nav-item text-gray-500 dark:text-gray-300"
            >
              <item.icon size={24} className="mb-1" />
              <span>{item.label}</span>
            </button>
          );
        }
        
        return (
          <Link 
            key={item.label} 
            to={item.path || '/'} 
            className={`mobile-nav-item ${isActive ? 'text-mixology-burgundy dark:text-mixology-burgundy' : 'text-gray-500 dark:text-gray-300'}`}
          >
            <item.icon size={24} className="mb-1" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileNavbar;
