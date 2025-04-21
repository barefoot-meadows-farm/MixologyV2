
import { useState } from "react";
import AnnouncementsCarousel from "../components/home/AnnouncementsCarousel";
import FeaturedCocktails from "../components/home/FeaturedCocktails";
import PopularCocktails from "../components/home/PopularCocktails";

const Home = () => {
  return (
    <div className="pb-20 md:pb-10">
      <AnnouncementsCarousel />
      <FeaturedCocktails />
      <PopularCocktails />
    </div>
  );
};

export default Home;
