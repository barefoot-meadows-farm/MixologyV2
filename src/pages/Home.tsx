
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BartenderMode from "../components/BartenderMode";
import AnnouncementsCarousel from "../components/home/AnnouncementsCarousel";
import FeaturedCocktails from "../components/home/FeaturedCocktails";
import PopularCocktails from "../components/home/PopularCocktails";
import { BartenderModeInfoDialog, shouldShowBartenderInfo } from "../components/BartenderModeInfoDialog";

const Home = () => {
  const [isBartenderMode, setIsBartenderMode] = useState(false);
  const [showBartenderInfo, setShowBartenderInfo] = useState(false);
  const navigate = useNavigate();

  // New: Always use info dialog trigger path
  const handleBartenderButtonClick = () => {
    if (shouldShowBartenderInfo()) {
      setShowBartenderInfo(true);
    } else {
      setIsBartenderMode(true);
    }
  };

  const handleBartenderContinue = () => {
    setShowBartenderInfo(false);
    setIsBartenderMode(true);
  };

  // When bartender mode is active, show bartender interface
  if (isBartenderMode) {
    return <BartenderMode onExit={() => setIsBartenderMode(false)} exitLabel="Bartender Mode" />;
  }

  return (
    <div className="pb-20 md:pb-10">
      <AnnouncementsCarousel />
      <FeaturedCocktails />
      <PopularCocktails />

      <div className="fixed bottom-24 right-4 md:bottom-8 z-10">
        <button
          onClick={handleBartenderButtonClick}
          className="bg-mixology-burgundy hover:bg-mixology-burgundy/90 text-white py-3 px-6 rounded-full shadow-lg transition-colors"
        >
          Bartender Mode
        </button>
      </div>
      
      <BartenderModeInfoDialog 
        isOpen={showBartenderInfo} 
        onClose={() => setShowBartenderInfo(false)}
        onContinue={handleBartenderContinue}
      />
    </div>
  );
};

export default Home;
