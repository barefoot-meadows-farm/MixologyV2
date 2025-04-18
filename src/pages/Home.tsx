
import { useState } from "react";
import BartenderMode from "../components/BartenderMode";
import AnnouncementsCarousel from "../components/home/AnnouncementsCarousel";
import FeaturedCocktails from "../components/home/FeaturedCocktails";
import PopularCocktails from "../components/home/PopularCocktails";

const Home = () => {
  const [isBartenderMode, setIsBartenderMode] = useState(false);

  // If bartender mode is active, show the bartender interface
  if (isBartenderMode) {
    return <BartenderMode onExit={() => setIsBartenderMode(false)} />;
  }

  return (
    <div className="pb-20 md:pb-10">
      <AnnouncementsCarousel />
      <FeaturedCocktails />
      <PopularCocktails />
    </div>
  );
};

export default Home;
