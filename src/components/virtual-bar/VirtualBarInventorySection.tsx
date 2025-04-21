import React from "react";
import IngredientsList from "@/components/IngredientsList";
import BarcodeScannerButton from "@/components/BarcodeScannerButton";
import { Button } from "@/components/ui/button";
import AddCustomIngredientModal from "@/components/AddCustomIngredientModal";
import { Ingredient } from "@/components/IngredientsList";

type Props = {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  barIngredients: Ingredient[];
  handleToggleIngredient: (id: string) => void;
  showAddCustomModal: boolean;
  setShowAddCustomModal: (show: boolean) => void;
  handleAddCustomIngredient: (arg: { name: string }) => void;
  ingredients: Ingredient[];
  setBarIngredients: (ings: Ingredient[]) => void;
};

const demoIngredients: Ingredient[] = [];

const VirtualBarInventorySection: React.FC<Props> = ({
  searchTerm,
  setSearchTerm,
  barIngredients,
  handleToggleIngredient,
  showAddCustomModal,
  setShowAddCustomModal,
  handleAddCustomIngredient,
  ingredients,
  setBarIngredients,
}) => {
  const sortAlphabetically = (items: Ingredient[]) =>
    [...items].sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

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

  const handleAddPreExistingIngredients = () => {
    setBarIngredients((prev) => [...prev]);
  };

  return (
    <>
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="text-gray-400" width={20} height={20} fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </div>
        <input
          type="text"
          placeholder="Search ingredients..."
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-mixology-burgundy/50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <button
          className="px-3 py-2 rounded-lg bg-mixology-purple text-white text-sm font-medium shadow hover:bg-mixology-purple/90 transition-colors"
          style={{ float: "left" }}
          onClick={handleAddPreExistingIngredients}
        >
          Add Ingredients
        </button>
        <div style={{ clear: "both" }}/>
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
              <div key={ingredient.id} className="bg-mixology-purple/10 text-mixology-purple px-3 py-1.5 rounded-full text-sm flex items-center dark:bg-mixology-purple/30">
                {ingredient.name}
                <button className="ml-2 text-mixology-purple/70 hover:text-mixology-purple" onClick={() => handleToggleIngredient(ingredient.id)}>
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
    </>
  );
};

export default VirtualBarInventorySection;
