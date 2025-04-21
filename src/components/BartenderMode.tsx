import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, X, ChevronRight, Search } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { cocktails } from '../data/cocktails';
import { Cocktail } from '../components/CocktailCard';
import { getIngredientName, formatIngredientForDisplay, ingredientNameIncludes } from '../lib/ingredientUtils';

interface BartenderModeProps {
  onExit: () => void;
  exitLabel?: string;
}

// Extend the Cocktail type with preparation steps
interface BartenderCocktail extends Cocktail {
  glass?: string;
  steps?: string[];
}

// Mock preparation steps data - in a real app, this would come from an API
const preparationSteps: Record<string, { glass: string; steps: string[] }> = {
  "negroni": {
    glass: "Rocks Glass",
    steps: [
      "Add ice to a mixing glass",
      "Pour 1 oz gin, 1 oz sweet vermouth, and 1 oz Campari",
      "Stir for 20-30 seconds until well chilled",
      "Strain into a rocks glass over fresh ice",
      "Garnish with an orange peel"
    ]
  },
  "margarita": {
    glass: "Margarita Glass",
    steps: [
      "Rim a margarita glass with salt (optional)",
      "Add ice, 2 oz tequila, 1 oz triple sec, and 1 oz lime juice to a shaker",
      "Shake vigorously for 15 seconds",
      "Strain into the prepared glass",
      "Garnish with a lime wheel"
    ]
  },
  "mojito": {
    glass: "Highball Glass",
    steps: [
      "Muddle 6-8 mint leaves with 0.5 oz simple syrup in a highball glass",
      "Add 2 oz white rum and 1 oz lime juice",
      "Fill the glass with ice",
      "Top with soda water",
      "Stir gently and garnish with mint sprigs"
    ]
  },
  "espresso-martini": {
    glass: "Martini Glass", 
    steps: [
      "Add ice, 1.5 oz vodka, 1 oz coffee liqueur, and 1 oz fresh espresso to a shaker",
      "Shake vigorously for 15-20 seconds",
      "Double strain into a chilled martini glass",
      "Garnish with three coffee beans"
    ]
  },
  "old-fashioned": {
    glass: "Rocks Glass",
    steps: [
      "Place sugar cube in a rocks glass",
      "Add 2-3 dashes of Angostura bitters and a splash of water",
      "Muddle until dissolved",
      "Add 2 oz bourbon or rye whiskey",
      "Add one large ice cube or several small ones",
      "Stir gently for 10 seconds",
      "Garnish with an orange peel"
    ]
  }
};

// Add preparation steps to cocktails
const enhancedCocktails: BartenderCocktail[] = cocktails.map(cocktail => {
  const prep = preparationSteps[cocktail.id];
  if (prep) {
    return {
      ...cocktail,
      glass: prep.glass,
      steps: prep.steps
    };
  }
  return cocktail;
});

const BartenderMode = ({ onExit, exitLabel = "Exit" }: BartenderModeProps) => {
  const [selectedCocktail, setSelectedCocktail] = useState<BartenderCocktail | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [viewMode, setViewMode] = useState<'selection' | 'preparation'>('selection');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCocktails, setFilteredCocktails] = useState<BartenderCocktail[]>(enhancedCocktails);
  const [noResults, setNoResults] = useState(false);
  const { measurementUnit } = useSettings();
  const searchInputRef = useRef<HTMLInputElement>(null);

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
        cocktail.ingredients.some(ingredient => ingredientNameIncludes(ingredient, query))
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

  // Handle advancing to the next step
  const handleNextStep = () => {
    if (selectedCocktail?.steps && currentStep < selectedCocktail.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      // In a real app, we would add haptic feedback here for supported devices
    } else {
      setViewMode('selection');
      setCurrentStep(0);
    }
  };

  // Handle going back to the previous step
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      setViewMode('selection');
    }
  };

  // Select a cocktail and start preparation
  const handleSelectCocktail = (cocktail: BartenderCocktail) => {
    setSelectedCocktail(cocktail);
    setCurrentStep(0);
    setViewMode('preparation');
  };

  // Clear search query
  const clearSearch = () => {
    setSearchQuery('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const displayIngredient = (ingredient: string | { name: string; amount: string }) => {
    return formatIngredientForDisplay(ingredient);
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

  return (
    <div className="bartender-mode min-h-screen bg-black text-white">
      {/* Header with exit button */}
      <header className="fixed top-0 left-0 right-0 bg-black p-4 z-10 flex items-center justify-between">
        <button 
          onClick={onExit}
          className="touch-target p-2 text-white"
          aria-label={`Exit ${exitLabel}`}
        >
          <X size={24} />
        </button>
        <h1 className="text-xl font-serif text-white font-bold">{exitLabel}</h1>
        <div className="w-10"></div> {/* Spacer for centering */}
      </header>

      <div className="pt-24 pb-20 px-4">
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
                  onClick={handlePrevStep}
                  className="touch-target flex items-center text-white mb-4"
                >
                  <ArrowLeft size={20} className="mr-2" />
                  {currentStep === 0 ? 'Back to Selection' : 'Previous Step'}
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
                {currentStep === 0 && (
                  <div className="bartender-step-card mb-6">
                    <h3 className="bartender-text-medium text-white mb-4">Ingredients</h3>
                    <ul className="space-y-2">
                      {selectedCocktail.ingredients.map((ingredient, idx) => (
                        <li key={idx} className="text-white text-xl">
                          • {formatIngredientForDisplay(ingredient)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Current Step */}
                {selectedCocktail.steps && (
                  <div className="bartender-step-card">
                    <h3 className="bartender-text-medium text-white mb-2">
                      Step {currentStep + 1} of {selectedCocktail.steps.length}
                    </h3>
                    <p className="text-white text-xl mt-4">
                      {selectedCocktail.steps[currentStep]}
                    </p>
                  </div>
                )}
                
                {/* Next Button */}
                <button 
                  onClick={handleNextStep}
                  className="bartender-btn mt-6 flex items-center justify-center bg-mixology-burgundy hover:bg-mixology-burgundy/80 text-white py-3 px-6 rounded-lg w-full"
                >
                  {selectedCocktail.steps && currentStep < selectedCocktail.steps.length - 1 
                    ? 'Next Step' 
                    : 'Finish'
                  }
                  <ChevronRight size={20} className="ml-2" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile fixed bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-black p-4 border-t border-gray-800">
        {viewMode === 'preparation' && selectedCocktail && selectedCocktail.steps && (
          <div className="flex justify-between items-center">
            <button 
              onClick={handlePrevStep}
              className="text-white px-4 py-2 min-h-[44px]"
              disabled={currentStep === 0}
            >
              Previous
            </button>
            <div className="text-white">
              Step {currentStep + 1} of {selectedCocktail.steps.length}
            </div>
            <button 
              onClick={handleNextStep}
              className="text-white px-4 py-2 min-h-[44px]"
            >
              {currentStep < selectedCocktail.steps.length - 1 ? 'Next' : 'Finish'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BartenderMode;
