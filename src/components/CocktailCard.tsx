
import { BookmarkIcon } from "lucide-react";
import { Link } from "react-router-dom";

export interface Cocktail {
  id: string;
  name: string;
  image: string;
  description: string;
  ingredients: string[];
  difficulty: "easy" | "medium" | "hard";
  canMake?: boolean;
}

interface CocktailCardProps {
  cocktail: Cocktail;
  size?: "small" | "medium" | "large";
}

const CocktailCard = ({ cocktail, size = "medium" }: CocktailCardProps) => {
  const { id, name, image, description, difficulty, canMake } = cocktail;
  
  const sizeClasses = {
    small: "w-40 h-56",
    medium: "w-full sm:w-64 h-72",
    large: "w-full h-96 md:h-80",
  };
  
  const imageClasses = {
    small: "h-28",
    medium: "h-40",
    large: "h-60 md:h-48",
  };

  return (
    <div className={`cocktail-card ${sizeClasses[size]}`}>
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className={`w-full ${imageClasses[size]} object-cover`} 
        />
        <div className="gradient-overlay"></div>
        <button className="absolute top-2 right-2 touch-target bg-white/20 rounded-full p-1.5">
          <BookmarkIcon size={18} className="text-white" />
        </button>
        {canMake && (
          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
            Can Make
          </div>
        )}
        <div className="absolute bottom-2 left-2 bg-mixology-purple/80 text-white text-xs px-2 py-1 rounded-full dark:bg-mixology-purple/90">
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </div>
      </div>
      
      <div className="p-3 dark:text-white">
        <Link to={`/cocktail/${id}`}>
          <h3 className="font-serif font-medium text-lg text-mixology-purple dark:text-mixology-cream mb-1 line-clamp-1">{name}</h3>
        </Link>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{description}</p>
      </div>
    </div>
  );
};

export default CocktailCard;
