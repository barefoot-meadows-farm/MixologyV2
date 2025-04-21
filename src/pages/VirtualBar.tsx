import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import AddCustomIngredientModal from "../components/AddCustomIngredientModal";
import VirtualBarInventorySection from "../components/virtual-bar/VirtualBarInventorySection";
import VirtualBarMakeSection from "../components/virtual-bar/VirtualBarMakeSection";
import VirtualBarShoppingSection from "../components/virtual-bar/VirtualBarShoppingSection";
import VirtualBarCreateSection from "../components/virtual-bar/VirtualBarCreateSection";
import VirtualBarHistorySection from "../components/virtual-bar/VirtualBarHistorySection";

// Remove ingredient and cocktail imports.
// import { ingredients } from "../data/ingredients";
// import { cocktails } from "../data/cocktails";

const VirtualBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [barIngredients, setBarIngredients] = useState([]);
  const [activeTab, setActiveTab] = useState<"inventory" | "make" | "shopping" | "create" | "history">("inventory");
  const [user, setUser] = useState<any>(null);
  const [showAddCustomModal, setShowAddCustomModal] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Ingredient functions unchanged for custom ingredients
  const handleToggleIngredient = (id: string) => {
    setBarIngredients((prev) => {
      const isInBar = prev.some((ing) => ing.id === id);

      if (isInBar) {
        return prev.filter((ing) => ing.id !== id);
      } else {
        // No base ingredients data - impossible to add, so do nothing.
        return prev;
      }
    });
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

  // Tab control unchanged
  const handleTabChange = (value: string) => setActiveTab(value as any);

  // For demonstration, ingredients and cocktails arrays are empty
  const allIngredients = [];
  const allCocktails = [];

  return (
    <div className="container mx-auto px-4 pb-20 md:pb-10">
      <h1 className="text-3xl font-serif font-medium text-mixology-purple dark:text-mixology-cream mb-6">
        My Virtual Bar
      </h1>
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="w-full flex overflow-x-auto bg-transparent space-x-1 mb-6 border-b border-gray-200 pb-0">
          <TabsTrigger value="inventory" className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-mixology-burgundy data-[state=active]:text-mixology-burgundy rounded-none bg-transparent">Inventory</TabsTrigger>
          <TabsTrigger value="make" className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-mixology-burgundy data-[state=active]:text-mixology-burgundy rounded-none bg-transparent">What Can I Make?</TabsTrigger>
          <TabsTrigger value="shopping" className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-mixology-burgundy data-[state=active]:text-mixology-burgundy rounded-none bg-transparent">Shopping</TabsTrigger>
          <TabsTrigger value="create" className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-mixology-burgundy data-[state=active]:text-mixology-burgundy rounded-none bg-transparent">Create Recipe</TabsTrigger>
          <TabsTrigger value="history" className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-mixology-burgundy data-[state=active]:text-mixology-burgundy rounded-none bg-transparent">Drink History</TabsTrigger>
        </TabsList>
        <TabsContent value="inventory">
          <VirtualBarInventorySection
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            barIngredients={barIngredients}
            handleToggleIngredient={handleToggleIngredient}
            showAddCustomModal={showAddCustomModal}
            setShowAddCustomModal={setShowAddCustomModal}
            handleAddCustomIngredient={handleAddCustomIngredient}
            ingredients={allIngredients}
            setBarIngredients={setBarIngredients} /* pass setter for demonstration */
          />
        </TabsContent>
        <TabsContent value="make">
          <VirtualBarMakeSection
            barIngredients={barIngredients}
            cocktails={allCocktails}
          />
        </TabsContent>
        <TabsContent value="shopping">
          <VirtualBarShoppingSection />
        </TabsContent>
        <TabsContent value="create">
          <VirtualBarCreateSection user={user} />
        </TabsContent>
        <TabsContent value="history">
          <VirtualBarHistorySection user={user} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VirtualBar;
