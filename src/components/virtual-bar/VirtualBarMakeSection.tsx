
import React from "react";
import CocktailCard, { Cocktail } from "@/components/CocktailCard";
import { Shuffle, PlusCircle } from "lucide-react";

type Ingredient = {
  id: string;
  name: string;
  category: string;
  isInInventory?: boolean;
};

type Props = {
  barIngredients: Ingredient[];
  cocktails: Cocktail[];
};

const VirtualBarMakeSection: React.FC<Props> = ({ barIngredients, cocktails }) => {
  const cocktailsICanMake = cocktails.filter((cocktail) => cocktail.canMake);

  const handleSurpriseMe = () => {
    if (cocktailsICanMake.length > 0) {
      const randomIndex = Math.floor(Math.random() * cocktailsICanMake.length);
      const randomCocktail = cocktailsICanMake[randomIndex];
      window.location.href = `/cocktail/${randomCocktail.id}`;
    }
  };

  return (
    <div className="mb-6">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 dark:bg-mixology-navy/20">
        <div className="flex items-center mb-4">
          <PlusCircle size={24} className="mr-3 text-mixology-purple dark:text-mixology-cream" />
          <h2 className="font-medium">Cocktails You Can Make Now</h2>
        </div>
        <p className="text-sm text-gray-600 mb-2 dark:text-gray-300">
          Based on your {barIngredients.length} bar ingredients, you can make the following cocktails:
        </p>
        {cocktailsICanMake.length > 0 && (
          <button
            onClick={handleSurpriseMe}
            className="mt-4 flex items-center justify-center w-full px-4 py-2 bg-mixology-burgundy text-white rounded-lg hover:bg-mixology-burgundy/90 transition-colors text-sm font-medium"
          >
            <Shuffle size={16} className="mr-2" />
            Surprise Me!
          </button>
        )}
      </div>
      {cocktailsICanMake.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cocktailsICanMake.map((cocktail) => (
            <CocktailCard key={cocktail.id} cocktail={cocktail} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-2">
            You don't have enough ingredients to make any cocktails yet.
          </p>
          <button
            className="text-mixology-burgundy font-medium"
            onClick={() => window.location.hash = "#inventory"}
          >
            Add more ingredients to your bar
          </button>
        </div>
      )}
    </div>
  );
};

export default VirtualBarMakeSection;
