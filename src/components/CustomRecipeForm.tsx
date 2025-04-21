
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ingredients } from "../data/ingredients";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import RecipeNameInput from "./custom-recipe/RecipeNameInput";
import RecipeDescriptionInput from "./custom-recipe/RecipeDescriptionInput";
import RecipeIngredientsForm from "./custom-recipe/RecipeIngredientsForm";
import RecipeInstructionsInput from "./custom-recipe/RecipeInstructionsInput";
import RecipeCategorization from "./custom-recipe/RecipeCategorization";
import RecipeCharacteristics from "./custom-recipe/RecipeCharacteristics";

interface FormValues {
  name: string;
  description: string;
  instructions: string;
  imageUrl: string;
  spiritBase: string;
  secondarySpirits: string[];
  style: string;
  method: string;
  glassType: string;
  iceType: string;
  garnish: string;
  flavorProfile: string[];
  strength: string;
  complexity: string;
  color: string;
  servingTemperature: string;
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

  const form = useForm<FormValues>({
    defaultValues: {
      secondarySpirits: [],
      flavorProfile: []
    }
  });

  const { register, handleSubmit, reset, formState: { errors }, control } = form;

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
          ingredients: ingredientsJson,
          image_url: data.imageUrl || null,
          spirit_base: data.spiritBase || null,
          secondary_spirits: data.secondarySpirits.length > 0 ? data.secondarySpirits : null,
          style: data.style || null,
          method: data.method || null,
          glass_type: data.glassType || null,
          ice_type: data.iceType || null,
          garnish: data.garnish || null,
          flavor_profile: data.flavorProfile.length > 0 ? data.flavorProfile : null,
          strength: data.strength || null,
          complexity: data.complexity || null,
          color: data.color || null,
          serving_temperature: data.servingTemperature || null
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
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-mixology-burgundy dark:text-mixology-cream">Basic Information</h3>
            <RecipeNameInput register={register} errors={errors} />
            <RecipeDescriptionInput register={register} />
            <RecipeIngredientsForm
              ingredientsList={ingredients}
              recipeIngredients={recipeIngredients}
              setRecipeIngredients={setRecipeIngredients}
              toast={toast}
            />
            <RecipeInstructionsInput register={register} errors={errors} />
            
            <div className="form-group">
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Image URL (optional)
              </label>
              <input
                id="imageUrl"
                type="text"
                placeholder="https://example.com/my-cocktail.jpg"
                {...register("imageUrl")}
                className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm focus:border-mixology-burgundy focus:ring-1 focus:ring-mixology-burgundy dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>

          <RecipeCategorization register={register} control={control} />
          <RecipeCharacteristics register={register} control={control} />
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center"
          >
            <Save size={16} className="mr-2" />
            {isSubmitting ? "Saving..." : "Save Recipe"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CustomRecipeForm;
