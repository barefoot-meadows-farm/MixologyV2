
import { useState, useEffect } from "react";
import { ShoppingCart, Check, Trash2, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cocktails } from "../data/cocktails";
import { ingredients } from "../data/ingredients";
import { useShoppingCart } from "../contexts/ShoppingContext";
import { useSettings } from "../contexts/SettingsContext";

// Simple unit conversion for demonstration
const convertToMetric = (amount: number): string => {
  return `${(amount * 29.5735).toFixed(1)} ml`;
};

const convertToUS = (amount: number): string => {
  return `${amount} oz`;
};

// Sample quantity mapping - in a real app, this would come from a database
const ingredientQuantities: Record<string, number> = {
  "gin": 2,
  "sweet-vermouth": 1,
  "campari": 1,
  "tequila": 1.5,
  "triple-sec": 1,
  "lime-juice": 1,
  "white-rum": 2,
  "mint-leaves": 0.5,
  "sugar": 0.5,
  "soda-water": 3,
  "vodka": 1.5,
  "coffee-liqueur": 1,
  "espresso": 1,
  "simple-syrup": 0.5,
  "lemon-juice": 0.75,
  "angostura-bitters": 0.25,
  "orange-peel": 0.1,
  "dark-rum": 1.5,
  "bourbon": 2,
  "rye-whiskey": 2
};

interface ShoppingIngredient {
  id: string;
  name: string;
  quantity: number;
  cocktailCount: number;
  inInventory: boolean;
}

const ShoppingList = () => {
  const { shoppingItems, removeFromCart, clearCart } = useShoppingCart();
  const { measurementUnit } = useSettings();
  const [shoppingIngredients, setShoppingIngredients] = useState<ShoppingIngredient[]>([]);
  const [filter, setFilter] = useState<"all" | "need" | "have">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const calculateIngredients = () => {
      setLoading(true);
      
      const selectedCocktails = cocktails.filter(cocktail => 
        shoppingItems.some(item => item.cocktailId === cocktail.id)
      );
      
      const ingredientMap = new Map<string, { quantity: number, cocktailCount: number }>();
      
      // Calculate total quantities for each ingredient
      selectedCocktails.forEach(cocktail => {
        const quantity = shoppingItems.find(item => item.cocktailId === cocktail.id)?.quantity || 0;
        
        cocktail.ingredients.forEach(ingredientName => {
          // Find the ingredient ID from the name
          const ingredient = ingredients.find(ing => 
            ing.name.toLowerCase() === ingredientName.toLowerCase()
          );
          
          if (ingredient) {
            const id = ingredient.id;
            const baseQuantity = ingredientQuantities[id] || 1;
            const totalQuantity = baseQuantity * quantity;
            
            if (ingredientMap.has(id)) {
              const current = ingredientMap.get(id)!;
              ingredientMap.set(id, {
                quantity: current.quantity + totalQuantity,
                cocktailCount: current.cocktailCount + 1
              });
            } else {
              ingredientMap.set(id, { quantity: totalQuantity, cocktailCount: 1 });
            }
          }
        });
      });
      
      // Convert map to array and include inventory status
      const ingredientsArray: ShoppingIngredient[] = Array.from(ingredientMap).map(([id, data]) => {
        const ingredient = ingredients.find(ing => ing.id === id);
        return {
          id,
          name: ingredient?.name || id,
          quantity: data.quantity,
          cocktailCount: data.cocktailCount,
          inInventory: ingredient?.isInInventory || false
        };
      });
      
      setShoppingIngredients(ingredientsArray);
      setLoading(false);
    };
    
    calculateIngredients();
  }, [shoppingItems]);

  // Add all missing ingredients to inventory
  const handleAddAllMissing = () => {
    // In a real app, this would update the user's inventory in the database
    // For this demo, we'll just show a mock success state
    const missingIngredients = shoppingIngredients.filter(ing => !ing.inInventory);
    if (missingIngredients.length > 0) {
      // Update local state to reflect changes immediately
      setShoppingIngredients(prev => 
        prev.map(ing => ({ ...ing, inInventory: true }))
      );
      // In a real app, we would call an API to update the user's inventory
    }
  };

  const handleRemoveIngredient = (id: string) => {
    // In a real app, we would need to determine which cocktails use this ingredient
    // and remove them from the cart. For this demo, we'll just update the ingredients list.
    setShoppingIngredients(prev => prev.filter(ing => ing.id !== id));
  };

  const displayQuantity = (amount: number) => {
    return measurementUnit === 'metric' ? convertToMetric(amount) : convertToUS(amount);
  };

  // Fix: Added correct filtering logic
  const filteredIngredients = shoppingIngredients.filter(ingredient => {
    if (filter === "need") return !ingredient.inInventory;
    if (filter === "have") return ingredient.inInventory;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm p-6 dark:bg-mixology-navy/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <ShoppingCart size={24} className="mr-3 text-mixology-purple dark:text-mixology-cream" />
            <h2 className="font-medium dark:text-white">Shopping List</h2>
          </div>
          
          {shoppingItems.length > 0 && (
            <button 
              className="text-red-500 text-sm font-medium flex items-center"
              onClick={clearCart}
            >
              <Trash2 size={16} className="mr-1" />
              Clear All
            </button>
          )}
        </div>
        
        {shoppingItems.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300 text-center py-6">
            Your shopping list is empty. Add cocktails to your shopping list to see ingredients here.
          </p>
        ) : (
          <>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4 bg-gray-100 dark:bg-mixology-navy/40">
                <TabsTrigger 
                  value="all" 
                  onClick={() => setFilter("all")}
                  className="flex-1 dark:text-white dark:data-[state=active]:text-white"
                >
                  All
                </TabsTrigger>
                <TabsTrigger 
                  value="need" 
                  onClick={() => setFilter("need")}
                  className="flex-1 dark:text-white dark:data-[state=active]:text-white"
                >
                  Need to Buy
                </TabsTrigger>
                <TabsTrigger 
                  value="have" 
                  onClick={() => setFilter("have")}
                  className="flex-1 dark:text-white dark:data-[state=active]:text-white"
                >
                  Already Have
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                {loading ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-300">Loading shopping list...</p>
                  </div>
                ) : filteredIngredients.length > 0 ? (
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {filteredIngredients.map(ingredient => (
                      <div 
                        key={ingredient.id}
                        className="py-3 flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <div 
                            className={`w-4 h-4 rounded-full mr-3 ${
                              ingredient.inInventory ? 'bg-green-500' : 'bg-red-500'
                            }`}
                          />
                          <div>
                            <p className={`font-medium ${
                              ingredient.inInventory ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'
                            }`}>
                              {ingredient.name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-300">
                              {displayQuantity(ingredient.quantity)} • Used in {ingredient.cocktailCount} cocktail{ingredient.cocktailCount !== 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          {!ingredient.inInventory && (
                            <button 
                              className="touch-target w-9 h-9 bg-green-100 text-green-600 rounded-full flex items-center justify-center"
                              aria-label={`Add ${ingredient.name} to inventory`}
                            >
                              <Plus size={18} />
                            </button>
                          )}
                          <button 
                            className="touch-target w-9 h-9 bg-red-100 text-red-600 rounded-full flex items-center justify-center"
                            onClick={() => handleRemoveIngredient(ingredient.id)}
                            aria-label={`Remove ${ingredient.name} from shopping list`}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-300 text-center py-6">
                    No ingredients match the current filter.
                  </p>
                )}
              </TabsContent>
              
              <TabsContent value="need" className="mt-0">
                {/* This content will be shown when the "Need to Buy" tab is active */}
                {/* The filteredIngredients is already filtered based on the active tab */}
              </TabsContent>
              
              <TabsContent value="have" className="mt-0">
                {/* This content will be shown when the "Already Have" tab is active */}
                {/* The filteredIngredients is already filtered based on the active tab */}
              </TabsContent>
            </Tabs>
            
            {filter === "need" && filteredIngredients.length > 0 && (
              <button 
                className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
                onClick={handleAddAllMissing}
              >
                <Check size={18} className="mr-2" />
                Add All to My Bar
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ShoppingList;
