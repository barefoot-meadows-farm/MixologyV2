import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { PlusCircle, Trash, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ingredients } from "../data/ingredients";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface FormValues {
  name: string;
  description: string;
  instructions: string;
}

interface IngredientItem {
  id: string;
  name: string;
  amount: string;
  unit: string;
}

const CustomRecipeForm = () => {
  const { toast } = useToast();
  const [recipeIngredients, setRecipeIngredients] = useState<IngredientItem[]>([]);
  const [availableIngredients, setAvailableIngredients] = useState<any[]>(ingredients);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState({ id: "", amount: "", unit: "oz" });
  const [showOther, setShowOther] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();

  useEffect(() => {
    // If we successfully load the ingredients from Supabase later, we can use that here
  }, []);

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
        unit: currentIngredient.unit
      };
    } else {
      const selectedIngredient = availableIngredients.find(ing => ing.id === currentIngredient.id);
      if (!selectedIngredient) return;
      ingredientToAdd = {
        id: selectedIngredient.id,
        name: selectedIngredient.name,
        amount: currentIngredient.amount,
        unit: currentIngredient.unit
      };
    }

    setRecipeIngredients(prev => [...prev, ingredientToAdd]);
    setCurrentIngredient({ id: "", name: "", amount: "", unit: "oz" });
    setShowOther(false);
  };

  const removeIngredient = (index: number) => {
    setRecipeIngredients(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: FormValues) => {
    if (recipeIngredients.length === 0) {
      toast({
        title: "No ingredients added",
        description: "Please add at least one ingredient to your recipe",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to save your recipe",
          variant: "destructive",
        });
        return;
      }
      
      // Convert recipeIngredients to a format that matches Json type
      const ingredientsJson = JSON.parse(JSON.stringify(recipeIngredients));
      
      const { data: recipe, error } = await supabase
        .from('user_custom_recipes')
        .insert({
          user_id: session.user.id,
          name: data.name,
          description: data.description || null,
          instructions: data.instructions,
          ingredients: ingredientsJson
        })
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      // Also add this to drink history
      await supabase.from('user_drink_history').insert({
        user_id: session.user.id,
        recipe_id: recipe.id,
        is_custom: true
      });
      
      toast({
        title: "Recipe saved!",
        description: "Your custom recipe has been saved to your collection",
      });
      
      // Reset the form
      reset();
      setRecipeIngredients([]);
      
    } catch (error: any) {
      console.error("Error saving recipe:", error);
      toast({
        title: "Failed to save recipe",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const unitOptions = ["oz", "ml", "tbsp", "tsp", "dash", "drop", "cup", "pcs", "leaves"];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 dark:bg-mixology-navy/20">
      <h2 className="text-xl font-medium mb-4">Create Your Custom Recipe</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Recipe Name</Label>
            <Input
              id="name"
              placeholder="Enter a name for your recipe"
              {...register("name", { required: "Recipe name is required" })}
              className="mt-1"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              placeholder="Describe your cocktail..."
              {...register("description")}
              className="mt-1"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Ingredients</Label>
          <div className="flex flex-wrap gap-2">
            <select
              value={currentIngredient.id}
              onChange={(e) => {
                setCurrentIngredient(prev => ({
                  ...prev,
                  id: e.target.value,
                  name: e.target.value === "__other__" ? "" : prev.name
                }));
                setShowOther(e.target.value === "__other__");
              }}
              className="flex-grow p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              <option value="">Select an ingredient</option>
              {availableIngredients.map(ing => (
                <option key={ing.id} value={ing.id}>{ing.name}</option>
              ))}
              <option value="__other__">Other...</option>
            </select>
            
            {showOther && (
              <Input
                type="text"
                placeholder="Custom ingredient name"
                value={currentIngredient.name || ""}
                onChange={(e) => setCurrentIngredient(prev => ({ ...prev, name: e.target.value }))}
                className="w-40"
              />
            )}
            
            <Input
              type="text"
              placeholder="Amount"
              value={currentIngredient.amount}
              onChange={(e) => setCurrentIngredient(prev => ({ ...prev, amount: e.target.value }))}
              className="w-24"
            />
            
            <select
              value={currentIngredient.unit}
              onChange={(e) => setCurrentIngredient(prev => ({ ...prev, unit: e.target.value }))}
              className="w-24 p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              {unitOptions.map(unit => (
                <option key={unit} value={unit}>{unit}</option>
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
                  <li key={index} className="flex items-center justify-between p-2 bg-gray-100 rounded dark:bg-gray-800">
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
            <p className="text-sm text-gray-500 mt-2">No ingredients added yet</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="instructions">Instructions</Label>
          <Textarea
            id="instructions"
            placeholder="How to prepare your cocktail..."
            {...register("instructions", { required: "Instructions are required" })}
            className="mt-1"
            rows={5}
          />
          {errors.instructions && (
            <p className="text-red-500 text-sm mt-1">{errors.instructions.message}</p>
          )}
        </div>
        
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center"
        >
          <Save size={16} className="mr-2" />
          {isSubmitting ? "Saving..." : "Save Recipe"}
        </Button>
      </form>
    </div>
  );
};

export default CustomRecipeForm;
