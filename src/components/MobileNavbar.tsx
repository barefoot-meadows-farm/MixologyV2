
import { Compass, Search, GlassWater, BookmarkIcon, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const MobileNavbar = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Compass, label: "Discover", path: "/" },
    { icon: Search, label: "Browse", path: "/browse" },
    { icon: GlassWater, label: "My Bar", path: "/bar" },
    { icon: BookmarkIcon, label: "Favorites", path: "/favorites" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-3 flex justify-between z-50 md:hidden">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        
        return (
          <Link 
            key={item.label} 
            to={item.path} 
            className={`mobile-nav-item ${isActive ? 'text-mixology-burgundy' : 'text-gray-500'}`}
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
