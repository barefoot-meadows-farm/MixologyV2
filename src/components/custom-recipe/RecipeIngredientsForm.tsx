
import { useState } from "react";
import { PlusCircle, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// Types for the main form
interface IngredientItem {
  id: string;
  name: string;
  amount: string;
  unit: string;
}

type Props = {
  ingredientsList: any[];
  recipeIngredients: IngredientItem[];
  setRecipeIngredients: (fn: (prev: IngredientItem[]) => IngredientItem[]) => void;
  toast: any;
};

const unitOptions = ["oz", "ml", "tbsp", "tsp", "dash", "drop", "cup", "pcs", "leaves"];

const RecipeIngredientsForm = ({
  ingredientsList,
  recipeIngredients,
  setRecipeIngredients,
  toast,
}: Props) => {
  const [currentIngredient, setCurrentIngredient] = useState({
    id: "",
    name: "",
    amount: "",
    unit: "oz",
  });
  const [showOther, setShowOther] = useState(false);
  const [availableIngredients] = useState<any[]>(ingredientsList);

  const addIngredient = () => {
    let ingredientToAdd;

    if (currentIngredient.id === "__other__") {
      if (!currentIngredient.amount || !currentIngredient.name) {
        toast({
          title: "Missing information",
          description: "Please enter the name and amount for your custom ingredient",
          variant: "destructive",
        });
        return;
      }
      ingredientToAdd = {
        id: "__other__" + Math.random().toString(36).substr(2, 8),
        name: currentIngredient.name,
        amount: currentIngredient.amount,
        unit: currentIngredient.unit,
      };
    } else {
      const selectedIngredient = availableIngredients.find(
        (ing) => ing.id === currentIngredient.id
      );
      if (!selectedIngredient) return;
      ingredientToAdd = {
        id: selectedIngredient.id,
        name: selectedIngredient.name,
        amount: currentIngredient.amount,
        unit: currentIngredient.unit,
      };
    }

    setRecipeIngredients((prev) => [...prev, ingredientToAdd]);
    setCurrentIngredient({ id: "", name: "", amount: "", unit: "oz" });
    setShowOther(false);
  };

  const removeIngredient = (index: number) => {
    setRecipeIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <Label>Ingredients</Label>
      <div className="flex flex-wrap gap-2">
        <select
          value={currentIngredient.id}
          onChange={(e) => {
            setCurrentIngredient((prev) => ({
              ...prev,
              id: e.target.value,
              name: e.target.value === "__other__" ? "" : prev.name,
            }));
            setShowOther(e.target.value === "__other__");
          }}
          className="flex-grow p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        >
          <option value="">Select an ingredient</option>
          {availableIngredients.map((ing) => (
            <option key={ing.id} value={ing.id}>
              {ing.name}
            </option>
          ))}
          <option value="__other__">Other...</option>
        </select>

        {showOther && (
          <Input
            type="text"
            placeholder="Custom ingredient name"
            value={currentIngredient.name || ""}
            onChange={(e) =>
              setCurrentIngredient((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-40"
          />
        )}

        <Input
          type="text"
          placeholder="Amount"
          value={currentIngredient.amount}
          onChange={(e) =>
            setCurrentIngredient((prev) => ({
              ...prev,
              amount: e.target.value,
            }))
          }
          className="w-24"
        />

        <select
          value={currentIngredient.unit}
          onChange={(e) =>
            setCurrentIngredient((prev) => ({
              ...prev,
              unit: e.target.value,
            }))
          }
          className="w-24 p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        >
          {unitOptions.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>

        <Button
          type="button"
          variant="outline"
          onClick={addIngredient}
          className="flex items-center"
        >
          <PlusCircle size={16} className="mr-1" />
          Add
        </Button>
      </div>

      {recipeIngredients.length > 0 ? (
        <div className="mt-4 space-y-2">
          <h3 className="font-medium">Recipe Ingredients:</h3>
          <ul className="space-y-2">
            {recipeIngredients.map((ing, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-2 bg-gray-100 rounded dark:bg-gray-800"
              >
                <span>
                  {ing.amount} {ing.unit} {ing.name}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeIngredient(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash size={16} />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-sm text-gray-500 mt-2">
          No ingredients added yet
        </p>
      )}
    </div>
  );
};

export default RecipeIngredientsForm;
