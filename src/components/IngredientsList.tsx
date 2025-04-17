
import { useState, useEffect } from "react";
import { Plus, Minus, CheckCircle } from "lucide-react";

export interface Ingredient {
  id: string;
  name: string;
  category: string;
  isInInventory?: boolean;
}

interface IngredientsListProps {
  ingredients: Ingredient[];
  showInventory?: boolean;
  onIngredientToggle?: (id: string) => void;
}

const IngredientsList = ({ 
  ingredients, 
  showInventory = false,
  onIngredientToggle
}: IngredientsListProps) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [sortedIngredients, setSortedIngredients] = useState<Ingredient[]>([]);
  
  useEffect(() => {
    // Sort ingredients alphabetically within each category
    const sorted = [...ingredients].sort((a, b) => 
      a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
    );
    setSortedIngredients(sorted);
  }, [ingredients]);
  
  const categories = [...new Set(sortedIngredients.map(ing => ing.category))];
  
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <div key={category} className="border border-gray-200 rounded-lg overflow-hidden dark:border-gray-700">
          <button 
            className="w-full p-3 bg-gray-50 flex justify-between items-center text-left dark:bg-gray-800 dark:text-white"
            onClick={() => toggleCategory(category)}
          >
            <h3 className="font-medium">{category}</h3>
            {expandedCategories.includes(category) ? (
              <Minus size={18} className="text-gray-500 dark:text-gray-300" />
            ) : (
              <Plus size={18} className="text-gray-500 dark:text-gray-300" />
            )}
          </button>
          
          {expandedCategories.includes(category) && (
            <ul className="divide-y divide-gray-100 dark:divide-gray-700">
              {sortedIngredients
                .filter(ing => ing.category === category)
                .map(ingredient => (
                  <li key={ingredient.id} className="p-3 flex justify-between items-center dark:bg-gray-900 dark:text-gray-200">
                    <span className="flex items-center">
                      {showInventory && ingredient.isInInventory && (
                        <CheckCircle size={16} className="text-green-500 mr-2" />
                      )}
                      {ingredient.name}
                    </span>
                    
                    {onIngredientToggle && (
                      <button 
                        className={`touch-target w-8 h-8 rounded-full flex items-center justify-center ${
                          ingredient.isInInventory 
                            ? "bg-red-100 text-red-500 dark:bg-red-900 dark:text-red-300" 
                            : "bg-green-100 text-green-500 dark:bg-green-900 dark:text-green-300"
                        }`}
                        onClick={() => onIngredientToggle(ingredient.id)}
                        aria-label={ingredient.isInInventory ? "Remove from bar" : "Add to bar"}
                      >
                        {ingredient.isInInventory ? (
                          <Minus size={16} />
                        ) : (
                          <Plus size={16} />
                        )}
                      </button>
                    )}
                  </li>
                ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default IngredientsList;
