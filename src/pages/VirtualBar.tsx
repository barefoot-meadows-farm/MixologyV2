
import { useState, useEffect } from "react";
import { Search, PlusCircle } from "lucide-react";
import IngredientsList from "../components/IngredientsList";
import CocktailCard from "../components/CocktailCard";
import ShoppingList from "../components/ShoppingList";
import BarcodeScannerButton from "../components/BarcodeScannerButton";
import { ingredients } from "../data/ingredients";
import { cocktails } from "../data/cocktails";

const VirtualBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [barIngredients, setBarIngredients] = useState(
    ingredients.filter((ing) => ing.isInInventory)
  );
  const [activeTab, setActiveTab] = useState<"inventory" | "make" | "shopping">("inventory");

  useEffect(() => {
    // Sort ingredients alphabetically when component mounts
    const sortedBarIngredients = [...barIngredients].sort((a, b) => 
      a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
    );
    
    if (JSON.stringify(sortedBarIngredients) !== JSON.stringify(barIngredients)) {
      setBarIngredients(sortedBarIngredients);
    }
  }, []);

  const handleToggleIngredient = (id: string) => {
    setBarIngredients((prev) => {
      const isInBar = prev.some((ing) => ing.id === id);
      
      if (isInBar) {
        return prev.filter((ing) => ing.id !== id).sort((a, b) => 
          a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
        );
      } else {
        const ingredientToAdd = ingredients.find((ing) => ing.id === id);
        if (ingredientToAdd) {
          return [...prev, ingredientToAdd].sort((a, b) => 
            a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
          );
        }
        return prev;
      }
    });
  };

  const sortAlphabetically = (items: typeof ingredients) => {
    return [...items].sort((a, b) => 
      a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
    );
  };

  const filteredIngredients = sortAlphabetically(
    ingredients.filter((ingredient) => {
      if (searchTerm) {
        return ingredient.name.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return true;
    })
  ).map((ingredient) => ({
    ...ingredient,
    isInInventory: barIngredients.some((ing) => ing.id === ingredient.id),
  }));

  // Dummy implementation - in a real app, this would be more sophisticated
  const cocktailsICanMake = cocktails.filter((cocktail) => cocktail.canMake);

  return (
    <div className="container mx-auto px-4 pb-20 md:pb-10">
      <h1 className="text-3xl font-serif font-medium text-mixology-purple dark:text-mixology-cream mb-6">
        My Virtual Bar
      </h1>
      
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
        <button
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
            activeTab === "inventory"
              ? "border-b-2 border-mixology-burgundy text-mixology-burgundy"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("inventory")}
        >
          Inventory
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
            activeTab === "make"
              ? "border-b-2 border-mixology-burgundy text-mixology-burgundy"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("make")}
        >
          What Can I Make?
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
            activeTab === "shopping"
              ? "border-b-2 border-mixology-burgundy text-mixology-burgundy"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("shopping")}
        >
          Shopping
        </button>
      </div>

      {activeTab === "inventory" ? (
        <>
          <div className="mb-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search ingredients..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-mixology-burgundy/50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 mb-6 dark:bg-mixology-navy/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium">My Bar Ingredients</h2>
              <span className="text-sm text-gray-500">
                {barIngredients.length} items
              </span>
            </div>
            
            {barIngredients.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {barIngredients.map((ingredient) => (
                  <div 
                    key={ingredient.id} 
                    className="bg-mixology-purple/10 text-mixology-purple px-3 py-1.5 rounded-full text-sm flex items-center dark:bg-mixology-purple/30"
                  >
                    {ingredient.name}
                    <button 
                      className="ml-2 text-mixology-purple/70 hover:text-mixology-purple"
                      onClick={() => handleToggleIngredient(ingredient.id)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                You haven't added any ingredients to your bar yet.
              </p>
            )}
          </div>

          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium">Add Ingredients to Your Bar</h2>
            <BarcodeScannerButton onIngredientToggle={handleToggleIngredient} />
          </div>
          <IngredientsList 
            ingredients={filteredIngredients} 
            onIngredientToggle={handleToggleIngredient}
          />
        </>
      ) : activeTab === "make" ? (
        <>
          <div className="mb-6">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 dark:bg-mixology-navy/20">
              <div className="flex items-center mb-4">
                <PlusCircle size={24} className="mr-3 text-mixology-purple dark:text-mixology-cream" />
                <h2 className="font-medium">Cocktails You Can Make Now</h2>
              </div>
              <p className="text-sm text-gray-600 mb-2 dark:text-gray-300">
                Based on your {barIngredients.length} bar ingredients, you can make the following cocktails:
              </p>
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
                  onClick={() => setActiveTab("inventory")}
                >
                  Add more ingredients to your bar
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <ShoppingList />
      )}
    </div>
  );
};

export default VirtualBar;
