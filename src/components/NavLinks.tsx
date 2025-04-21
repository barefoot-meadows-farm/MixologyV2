
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NavLinksProps {
  onMobileNav?: () => void;
  isMobile?: boolean;
}

const links = [
  { name: "Home", path: "/" },
  { name: "Browse", path: "/browse" },
  { name: "My Bar", path: "/bar" },
  { name: "Favorites", path: "/favorites" },
  { name: "Settings", path: "/settings" },
];

const NavLinks: React.FC<NavLinksProps> = ({ onMobileNav, isMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          console.log('User signed in or token refreshed:', session?.user?.email);
          setUser(session?.user || null);
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out');
          setUser(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Sign out failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.name}
          to={link.path}
          className={
            `text-sm font-medium transition-colors hover:text-mixology-burgundy ` +
            (location.pathname === link.path
              ? "text-mixology-burgundy"
              : "text-gray-700 dark:text-gray-300")
          }
          onClick={isMobile && onMobileNav ? onMobileNav : undefined}
        >
          {link.name}
        </Link>
      ))}
      
      {isLoading ? (
        <div className="w-16 h-8 animate-pulse bg-gray-200 rounded-md dark:bg-gray-700"></div>
      ) : user ? (
        isMobile ? (
          <>
            <Link
              to="/settings/profile"
              className="block py-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              onClick={onMobileNav}
            >
              My Profile
            </Link>
            <button
              onClick={() => {
                handleSignOut();
                if (onMobileNav) onMobileNav();
              }}
              className="block py-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Sign Out
            </button>
          </>
        ) : (
          <div className="relative group">
            <button className="flex items-center text-sm font-medium px-3 py-2 border border-mixology-burgundy rounded-md hover:bg-mixology-burgundy hover:text-white transition-colors dark:text-white dark:hover:text-white dark:border-mixology-burgundy dark:hover:bg-mixology-burgundy">
              <User size={16} className="mr-1" />
              {user.email?.split('@')[0] || 'Profile'}
            </button>
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-mixology-dark border border-gray-200 dark:border-gray-700 hidden group-hover:block z-50">
              <Link
                to="/settings/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                My Profile
              </Link>
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Sign Out
              </button>
            </div>
          </div>
        )
      ) : (
        <Link
          to="/login"
          className={
            isMobile
              ? "block py-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              : "text-sm font-medium px-4 py-2 border border-mixology-burgundy rounded-md hover:bg-mixology-burgundy hover:text-white transition-colors dark:text-white dark:hover:text-white dark:border-mixology-burgundy dark:hover:bg-mixology-burgundy"
          }
          onClick={isMobile && onMobileNav ? onMobileNav : undefined}
        >
          Sign In
        </Link>
      )}
    </>
  );
};

export default NavLinks;
