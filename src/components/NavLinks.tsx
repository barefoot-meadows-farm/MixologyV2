
import React from "react";
import { Link, useLocation } from "react-router-dom";

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
    </>
  );
};

export default NavLinks;
