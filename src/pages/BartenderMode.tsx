import { useState, useEffect, useRef } from "react";
import { Search, X, ArrowLeft, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSettings } from "../contexts/SettingsContext";
import { useDevice } from "../contexts/DeviceContext";

// Enhanced cocktail type for bartender mode
interface BartenderCocktail {
  id: string;
  name: string;
  image: string;
  ingredients: string[];
  steps?: string[];
  glass?: string;
  difficulty: string;
}

// Import from data file but enhance with steps for demonstration
import { cocktails } from "../data/cocktails";

// Enhance cocktails with steps for the bartender mode
const enhancedCocktails: BartenderCocktail[] = cocktails.map(cocktail => ({
  ...cocktail,
  steps: [
    `Gather all ingredients: ${cocktail.ingredients.join(", ")}.`,
    `Prepare your glass: ${cocktail.name.includes("Martini") ? "Chill a martini glass" : "Fill with ice"}.`,
    `Mix ingredients in a shaker with ice.`,
    `Strain into glass and garnish.`,
    `Serve immediately and enjoy!`
  ],
  glass: cocktail.name.includes("Martini") ? "Martini Glass" : "Rocks Glass"
}));

const BartenderModePage = () => {
  const [selectedCocktail, setSelectedCocktail] = useState<BartenderCocktail | null>(null);
  const [viewMode, setViewMode] = useState<'selection' | 'preparation'>('selection');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCocktails, setFilteredCocktails] = useState<BartenderCocktail[]>(enhancedCocktails);
  const [noResults, setNoResults] = useState(false);
  const { measurementUnit } = useSettings();
  const { deviceType } = useDevice();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Focus the search input when entering Bartender Mode
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Filter cocktails based on search query
  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();
    if (query === '') {
      setFilteredCocktails(enhancedCocktails);
      setNoResults(false);
    } else {
      const filtered = enhancedCocktails.filter(cocktail => 
        cocktail.name.toLowerCase().includes(query) || 
        cocktail.ingredients.some(ingredient => ingredient.toLowerCase().includes(query))
      );
      setFilteredCocktails(filtered);
      setNoResults(filtered.length === 0);
    }
  }, [searchQuery]);

  // Cache viewed recipes for offline use
  useEffect(() => {
    const cacheRecipes = async () => {
      if (selectedCocktail) {
        try {
          // Store recently viewed cocktail in localStorage
          const recentlyViewed = JSON.parse(localStorage.getItem('bartenderModeRecent') || '[]');
          if (!recentlyViewed.includes(selectedCocktail.id)) {
            recentlyViewed.unshift(selectedCocktail.id);
            // Keep only the 5 most recent
            const updatedRecent = recentlyViewed.slice(0, 5);
            localStorage.setItem('bartenderModeRecent', JSON.stringify(updatedRecent));
          }
          
          // Store full cocktail data
          localStorage.setItem(`cocktail_${selectedCocktail.id}`, JSON.stringify(selectedCocktail));
        } catch (error) {
          console.error('Error caching recipe:', error);
        }
      }
    };
    
    cacheRecipes();
  }, [selectedCocktail]);

  // Handle going back to the selection view
  const handleBackToSelection = () => {
    setViewMode('selection');
    setSelectedCocktail(null); // Clear selected cocktail when going back
  };

  // Select a cocktail and start preparation
  const handleSelectCocktail = (cocktail: BartenderCocktail) => {
    setSelectedCocktail(cocktail);
    setViewMode('preparation');
  };

  // Clear search query
  const clearSearch = () => {
    setSearchQuery('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const displayIngredient = (ingredient: string) => {
    // In a real app, we would parse the ingredient string to extract the quantity and unit
    // For this demo, we'll just return the ingredient as is
    return ingredient;
  };

  // Get cached recently viewed cocktails
  const getRecentCocktails = () => {
    try {
      const recentIds = JSON.parse(localStorage.getItem('bartenderModeRecent') || '[]');
      return recentIds.map((id: string) => enhancedCocktails.find(c => c.id === id)).filter(Boolean);
    } catch (error) {
      console.error('Error getting recent cocktails:', error);
      return [];
    }
  };

  const recentCocktails = getRecentCocktails();

  // Exit bartender mode and return to home
  const handleExit = () => {
    navigate('/');
  };

  return (
    // Removed custom header, assuming main header is now always visible
    <div className="bartender-mode min-h-screen bg-black text-white pt-4 pb-20 px-4">
      {/* Exit button moved into content */}
      {viewMode === 'preparation' && (
         <button 
           onClick={handleExit}
           className="absolute top-4 right-4 touch-target p-2 text-white z-20 bg-black/50 rounded-full"
           aria-label="Exit Bartender Mode"
         >
           <X size={24} />
         </button>
      )}
      
      <div>
        {viewMode === 'selection' ? (
          <div>
            {/* Search bar */}
            <div className="mb-6 relative">
              <div className="relative flex items-center">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Search size={20} />
                </div>
                <input
                  ref={searchInputRef}
                  type="text"
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-3 pl-10 pr-10 text-lg focus:outline-none focus:ring-2 focus:ring-white/30"
                  placeholder="Search cocktails or ingredients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoComplete="off"
                  spellCheck="false"
                  autoCapitalize="off"
                  inputMode="search"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>
            
            {/* No results message */}
            {noResults && (
              <div className="text-center py-8">
                <p className="text-white text-xl mb-4">No cocktails found for "{searchQuery}"</p>
                <button
                  onClick={clearSearch}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )}
            
            {recentCocktails.length > 0 && !searchQuery && (
              <div className="mb-8">
                <h3 className="text-xl text-white mb-4">Recently Viewed</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {recentCocktails.map(cocktail => (
                    <button
                      key={cocktail.id}
                      className="bg-mixology-dark p-4 rounded-lg text-left hover:bg-mixology-navy/40 transition-colors flex items-center"
                      onClick={() => handleSelectCocktail(cocktail)}
                    >
                      <img 
                        src={cocktail.image} 
                        alt={cocktail.name} 
                        className="w-16 h-16 object-cover rounded-lg mr-4"
                      />
                      <div>
                        <h4 className="text-white font-bold text-lg">{cocktail.name}</h4>
                        <p className="text-gray-400 text-sm">{cocktail.difficulty}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {filteredCocktails.length > 0 && !noResults && (
              <div>
                <h3 className="text-xl text-white mb-4">
                  {searchQuery ? 'Search Results' : 'All Cocktails'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredCocktails.map(cocktail => (
                    <button
                      key={cocktail.id}
                      className="bg-mixology-dark p-4 rounded-lg text-left hover:bg-mixology-navy/40 transition-colors flex items-center"
                      onClick={() => handleSelectCocktail(cocktail)}
                    >
                      <img 
                        src={cocktail.image} 
                        alt={cocktail.name} 
                        className="w-16 h-16 object-cover rounded-lg mr-4"
                      />
                      <div>
                        <h4 className="text-white font-bold text-lg">{cocktail.name}</h4>
                        <p className="text-gray-400 text-sm">{cocktail.difficulty}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            {selectedCocktail && (
              <div>
                {/* Back button */}
                <button 
                  onClick={handleBackToSelection} // Use updated handler
                  className="touch-target flex items-center text-white mb-4"
                >
                  <ArrowLeft size={20} className="mr-2" />
                  Back to Selection
                </button>
                
                {/* Cocktail Info */}
                <div className="mb-6 flex items-center">
                  <img 
                    src={selectedCocktail.image} 
                    alt={selectedCocktail.name}
                    className="w-20 h-20 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h2 className="bartender-text-large text-white">{selectedCocktail.name}</h2>
                    <p className="text-gray-300">
                      {selectedCocktail.glass && `${selectedCocktail.glass} • `}
                      {selectedCocktail.steps?.length || 0} steps
                    </p>
                  </div>
                </div>
                
                {/* Ingredients */}
                <div className="bartender-step-card mb-6">
                  <h3 className="bartender-text-medium text-white mb-4">Ingredients</h3>
                  <ul className="space-y-2">
                    {selectedCocktail.ingredients.map((ingredient, idx) => (
                      <li key={idx} className="text-white text-xl">
                        • {displayIngredient(ingredient)}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* All Steps */}
                {selectedCocktail.steps && selectedCocktail.steps.length > 0 && (
                  <div className="space-y-6">
                    <h3 className="bartender-text-medium text-white mb-4">Preparation Steps</h3>
                    {selectedCocktail.steps.map((step, index) => (
                      <div key={index} className="bartender-step-card">
                        <h4 className="text-lg text-gray-300 mb-2">Step {index + 1}</h4>
                        <p className="text-white text-xl">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Removed Next/Finish Button */}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Removed Mobile fixed bottom nav */}
    </div>
  );
};

export default BartenderModePage;