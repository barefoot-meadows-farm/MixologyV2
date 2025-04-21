import { useState } from "react";
import { Search, Shuffle } from "lucide-react"; 
import { useNavigate } from "react-router-dom"; 
import CocktailCard, { Cocktail } from "../components/CocktailCard";
import FilterBar from "../components/FilterBar";
import { cocktails } from "../data/cocktails";
import { ingredientNameIncludes } from "../lib/ingredientUtils";

interface Filters {
  spirit: string | undefined;
  difficulty: string | undefined;
  canMake: boolean | undefined;
}

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [filters, setFilters] = useState<Filters>({
    spirit: undefined,
    difficulty: undefined,
    canMake: false,
  });

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const handleSurpriseMe = () => {
    if (cocktails.length > 0) {
      const randomIndex = Math.floor(Math.random() * cocktails.length);
      const randomCocktail = cocktails[randomIndex];
      navigate(`/cocktail/${randomCocktail.id}`); 
    }
  };

  const filteredCocktails = cocktails.filter((cocktail) => {
    // Search filter
    if (
      searchTerm &&
      !cocktail.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !cocktail.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Spirit filter
    if (
      filters.spirit &&
      !cocktail.ingredients.some((ing) =>
        ingredientNameIncludes(ing, filters.spirit!)
      )
    ) {
      return false;
    }

    // Difficulty filter
    if (
      filters.difficulty &&
      cocktail.difficulty !== filters.difficulty.toLowerCase()
    ) {
      return false;
    }

    // Can make filter
    if (filters.canMake && !cocktail.canMake) {
      return false;
    }

    return true;
  });

  return (
    <div className="container mx-auto px-4 pb-20 md:pb-10">
      <h1 className="text-3xl font-serif font-medium text-mixology-purple mb-6">
        Browse Cocktails
      </h1>

      {/* Add Surprise Me button */}
      <button 
        onClick={handleSurpriseMe}
        className="mb-6 flex items-center justify-center w-full px-4 py-3 bg-mixology-burgundy text-white rounded-lg hover:bg-mixology-burgundy/90 transition-colors text-sm font-medium"
      >
        <Shuffle size={16} className="mr-2" />
        Surprise Me!
      </button>

      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={20} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search cocktails..."
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-mixology-purple/50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <FilterBar onFilterChange={handleFilterChange} />

      {filteredCocktails.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCocktails.map((cocktail) => (
            <CocktailCard key={cocktail.id} cocktail={cocktail} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-2">No cocktails match your criteria</p>
          <button
            className="text-mixology-burgundy font-medium"
            onClick={() => {
              setSearchTerm("");
              setFilters({
                spirit: undefined,
                difficulty: undefined,
                canMake: false,
              });
            }}
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Browse;
