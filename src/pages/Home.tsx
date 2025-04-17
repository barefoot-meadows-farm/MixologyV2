
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import CocktailCard from "../components/CocktailCard";
import { featuredCocktails, popularCocktails } from "../data/cocktails";
import { announcements } from "../data/announcements";
import { Cocktail } from "lucide-react";
import { useState } from "react";
import BartenderMode from "../components/BartenderMode";

const Home = () => {
  const [isBartenderMode, setIsBartenderMode] = useState(false);

  // If bartender mode is active, show the bartender interface
  if (isBartenderMode) {
    return <BartenderMode onExit={() => setIsBartenderMode(false)} />;
  }

  const announcementSlides = announcements.map((announcement) => (
    <div key={announcement.id} className="relative h-48 sm:h-64 md:h-80">
      <img
        src={announcement.image}
        alt={announcement.title}
        className="w-full h-full object-cover"
      />
      <div className="gradient-overlay"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h2 className="font-serif text-xl md:text-2xl font-medium mb-1">
          {announcement.title}
        </h2>
        <p className="text-sm md:text-base mb-2">{announcement.description}</p>
        <Link
          to={announcement.link}
          className="inline-block px-3 py-1.5 bg-mixology-burgundy text-white text-sm rounded-md hover:bg-mixology-burgundy/90 transition-colors"
        >
          Learn More
        </Link>
      </div>
    </div>
  ));

  return (
    <div className="pb-20 md:pb-10">
      {/* Bartender Mode Button - Desktop */}
      <div className="hidden md:flex justify-center mb-4">
        <button
          onClick={() => setIsBartenderMode(true)}
          className="bg-mixology-burgundy text-white px-6 py-3 rounded-lg flex items-center font-medium hover:bg-mixology-burgundy/90 transition-colors"
        >
          <Cocktail className="mr-2" size={20} />
          Enter Bartender Mode
        </button>
      </div>

      {/* Bartender Mode Button - Mobile */}
      <div className="md:hidden flex justify-center mb-4">
        <button
          onClick={() => setIsBartenderMode(true)}
          className="bg-mixology-burgundy text-white px-4 py-2 rounded-lg flex items-center text-sm font-medium hover:bg-mixology-burgundy/90 transition-colors"
        >
          <Cocktail className="mr-1" size={16} />
          Bartender Mode
        </button>
      </div>

      <section className="mb-8">
        <Carousel items={announcementSlides} />
      </section>

      <section className="container mx-auto px-4 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="section-title">Featured Cocktails</h2>
          <Link
            to="/browse"
            className="text-sm font-medium text-mixology-burgundy hover:underline dark:text-mixology-burgundy"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredCocktails.map((cocktail) => (
            <CocktailCard key={cocktail.id} cocktail={cocktail} size="large" />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="section-title">Popular Cocktails</h2>
          <Link
            to="/browse"
            className="text-sm font-medium text-mixology-burgundy hover:underline dark:text-mixology-burgundy"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {popularCocktails.map((cocktail) => (
            <CocktailCard key={cocktail.id} cocktail={cocktail} size="small" />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="bg-mixology-navy/5 rounded-lg p-6 dark:bg-mixology-navy/20">
          <h2 className="section-title mb-6 text-center">Quick Access</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link
              to="/browse"
              className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow dark:bg-mixology-navy/40 dark:text-white"
            >
              <div className="w-12 h-12 bg-mixology-purple/10 rounded-full flex items-center justify-center mb-2 dark:bg-mixology-purple/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-mixology-purple dark:text-mixology-cream"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium">Browse Cocktails</span>
            </Link>
            <Link
              to="/bar"
              className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow dark:bg-mixology-navy/40 dark:text-white"
            >
              <div className="w-12 h-12 bg-mixology-burgundy/10 rounded-full flex items-center justify-center mb-2 dark:bg-mixology-burgundy/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-mixology-burgundy dark:text-mixology-burgundy"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium">My Bar</span>
            </Link>
            <Link
              to="/browse?filter=canMake"
              className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow dark:bg-mixology-navy/40 dark:text-white"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2 dark:bg-green-950">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600 dark:text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium">What Can I Make?</span>
            </Link>
            <Link
              to="/favorites"
              className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow dark:bg-mixology-navy/40 dark:text-white"
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-2 dark:bg-red-950">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-500 dark:text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium">Favorites</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
