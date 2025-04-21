
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

  // If bartender mode is active, show the bartender interface
  if (isBartenderMode) {
    return <BartenderMode onExit={() => setIsBartenderMode(false)} />;
  }

  return (
    <div className="pb-20 md:pb-10">
      <AnnouncementsCarousel />
      <FeaturedCocktails />
      <PopularCocktails />
      
      <BartenderModeInfoDialog 
        isOpen={showBartenderInfo} 
        onClose={() => setShowBartenderInfo(false)}
        onContinue={handleBartenderContinue}
      />
    </div>
  );
};

export default Home;
