
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ingredients } from "../data/ingredients";
import { Button } from "@/components/ui/button";
import RecipeNameInput from "./custom-recipe/RecipeNameInput";
import RecipeDescriptionInput from "./custom-recipe/RecipeDescriptionInput";
import RecipeIngredientsForm from "./custom-recipe/RecipeIngredientsForm";
import RecipeInstructionsInput from "./custom-recipe/RecipeInstructionsInput";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();

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

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 dark:bg-mixology-navy/20">
      <h2 className="text-xl font-medium mb-4">Create Your Custom Recipe</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <RecipeNameInput register={register} errors={errors} />
        <RecipeDescriptionInput register={register} />
        <RecipeIngredientsForm
          ingredientsList={ingredients}
          recipeIngredients={recipeIngredients}
          setRecipeIngredients={setRecipeIngredients}
          toast={toast}
        />
        <RecipeInstructionsInput register={register} errors={errors} />
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
