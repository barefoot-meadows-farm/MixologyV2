import { useState, useEffect } from "react";
import { Search, PlusCircle, Shuffle, History, Plus } from "lucide-react"; 
import { useNavigate } from "react-router-dom"; 
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import IngredientsList from "../components/IngredientsList";
import CocktailCard from "../components/CocktailCard";
import ShoppingList from "../components/ShoppingList";
import BarcodeScannerButton from "../components/BarcodeScannerButton";
import CustomRecipeForm from "../components/CustomRecipeForm";
import DrinkHistory from "../components/DrinkHistory";
import { ingredients } from "../data/ingredients";
import { cocktails } from "../data/cocktails"; 
import AddCustomIngredientModal from "../components/AddCustomIngredientModal";

const VirtualBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [barIngredients, setBarIngredients] = useState(
    ingredients.filter((ing) => ing.isInInventory)
  );
  const [activeTab, setActiveTab] = useState<"inventory" | "make" | "shopping" | "create" | "history">("inventory");
  const [user, setUser] = useState<any>(null);
  const [showAddCustomModal, setShowAddCustomModal] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    const sortedBarIngredients = [...barIngredients].sort((a, b) => 
      a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
    );
    
    if (JSON.stringify(sortedBarIngredients) !== JSON.stringify(barIngredients)) {
      setBarIngredients(sortedBarIngredients);
    }

    return () => subscription.unsubscribe();
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

  const cocktailsICanMake = cocktails.filter((cocktail) => {
    return cocktail.canMake; 
  });

  const handleSurpriseMe = () => {
    if (cocktailsICanMake.length > 0) {
      const randomIndex = Math.floor(Math.random() * cocktailsICanMake.length);
      const randomCocktail = cocktailsICanMake[randomIndex];
      navigate(`/cocktail/${randomCocktail.id}`); 
    }
  };

  const requireAuth = (targetTab: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to access this feature",
        variant: "destructive",
      });
      navigate("/login");
      return false;
    }
    return true;
  };

  const handleTabChange = (value: string) => {
    if ((value === "create" || value === "history") && !requireAuth(value)) {
      return;
    }
    setActiveTab(value as any);
  };

  const handleAddCustomIngredient = ({ name }: { name: string }) => {
    if (
      barIngredients.some(
        (ing) => ing.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      toast({
        title: "Already exists",
        description: "This ingredient is already in your inventory.",
        variant: "destructive",
      });
      return;
    }
    const newIngredient = {
      id: "custom_" + Math.random().toString(36).substr(2, 9),
      name,
      isInInventory: true,
      category: "Custom",
      type: undefined,
      abv: undefined,
      is_common: false,
    };
    setBarIngredients([...barIngredients, newIngredient]);
    toast({
      title: "Custom ingredient added",
      description: `${name} added to your bar`,
    });
    setShowAddCustomModal(false);
  };

  return (
    <div className="container mx-auto px-4 pb-20 md:pb-10">
      <h1 className="text-3xl font-serif font-medium text-mixology-purple dark:text-mixology-cream mb-6">
        My Virtual Bar
      </h1>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="w-full flex overflow-x-auto bg-transparent space-x-1 mb-6 border-b border-gray-200 pb-0">
          <TabsTrigger
            value="inventory"
            className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-mixology-burgundy data-[state=active]:text-mixology-burgundy rounded-none bg-transparent"
          >
            Inventory
          </TabsTrigger>
          <TabsTrigger
            value="make"
            className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-mixology-burgundy data-[state=active]:text-mixology-burgundy rounded-none bg-transparent"
          >
            What Can I Make?
          </TabsTrigger>
          <TabsTrigger
            value="shopping"
            className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-mixology-burgundy data-[state=active]:text-mixology-burgundy rounded-none bg-transparent"
          >
            Shopping
          </TabsTrigger>
          <TabsTrigger
            value="create"
            className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-mixology-burgundy data-[state=active]:text-mixology-burgundy rounded-none bg-transparent"
          >
            Create Recipe
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-mixology-burgundy data-[state=active]:text-mixology-burgundy rounded-none bg-transparent"
          >
            Drink History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inventory">
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

          <div className="mt-2">
            <Button
              variant="outline"
              onClick={() => setShowAddCustomModal(true)}
              className="px-3"
            >
              Add Custom Ingredient
            </Button>
          </div>

          <AddCustomIngredientModal
            isOpen={showAddCustomModal}
            onClose={() => setShowAddCustomModal(false)}
            onAdd={handleAddCustomIngredient}
          />
        </TabsContent>

        <TabsContent value="make">
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
                  onClick={() => setActiveTab("inventory")}
                >
                  Add more ingredients to your bar
                </button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="shopping">
          <ShoppingList />
        </TabsContent>

        <TabsContent value="create">
          {user ? (
            <CustomRecipeForm />
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-2">
                Please sign in to create custom recipes
              </p>
              <button
                className="text-mixology-burgundy font-medium"
                onClick={() => navigate("/login")}
              >
                Sign In
              </button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="history">
          {user ? (
            <DrinkHistory />
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-2">
                Please sign in to view your drink history
              </p>
              <button
                className="text-mixology-burgundy font-medium"
                onClick={() => navigate("/login")}
              >
                Sign In
              </button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VirtualBar;
