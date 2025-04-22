
import { supabase } from "@/integrations/supabase/client";
import { Ingredient } from "../components/IngredientsList";

export const ingredients: Ingredient[] = [];

export async function fetchIngredients(): Promise<Ingredient[]> {
  const { data, error } = await supabase
    .from('ingredients')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching ingredients:', error);
    return [];
  }

  return data.map(ingredient => ({
    id: ingredient.id,
    name: ingredient.name || '',
    category: ingredient.category || 'Other',
    isCommon: ingredient.is_common || false
  }));
}
