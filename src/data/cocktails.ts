
import { supabase } from "@/integrations/supabase/client";
import { Cocktail } from "../components/CocktailCard";

export const cocktails: Cocktail[] = [];
export const featuredCocktails: Cocktail[] = [];
export const popularCocktails: Cocktail[] = [];

export async function fetchCocktails(): Promise<Cocktail[]> {
  const { data: cocktailsData, error: cocktailsError } = await supabase
    .from('cocktails')
    .select(`
      *,
      required_ingredients (
        id,
        amount,
        unit,
        ingredient: ingredients (
          name,
          category
        )
      ),
      flavor_profiles (
        flavor
      )
    `);

  if (cocktailsError) {
    console.error('Error fetching cocktails:', cocktailsError);
    return [];
  }

  const transformedCocktails = cocktailsData.map(cocktail => ({
    id: cocktail.id,
    name: cocktail.name || '',
    description: cocktail.description || '',
    image: cocktail.image_url || '/placeholder.svg',
    difficulty: cocktail.difficulty_level || 'easy',
    ingredients: cocktail.required_ingredients.map((ri: any) => ({
      amount: ri.amount,
      unit: ri.unit,
      name: ri.ingredient?.name || ''
    })),
    preparation: cocktail.instructions?.split('\n') || [],
    flavors: cocktail.flavor_profiles.map((fp: any) => fp.flavor),
    canMake: false, // This will be calculated based on user's inventory
    rating: cocktail.average_rating || 4.5,
    prepTime: '5 min'
  }));

  return transformedCocktails;
}

export async function fetchFeaturedCocktails(): Promise<Cocktail[]> {
  const { data, error } = await supabase
    .from('cocktails')
    .select(`
      *,
      required_ingredients (
        id,
        amount,
        unit,
        ingredient: ingredients (
          name,
          category
        )
      ),
      flavor_profiles (
        flavor
      )
    `)
    .eq('featured', true)
    .limit(4);

  if (error) {
    console.error('Error fetching featured cocktails:', error);
    return [];
  }

  return data.map(cocktail => ({
    id: cocktail.id,
    name: cocktail.name || '',
    description: cocktail.description || '',
    image: cocktail.image_url || '/placeholder.svg',
    difficulty: cocktail.difficulty_level || 'easy',
    ingredients: cocktail.required_ingredients.map((ri: any) => ({
      amount: ri.amount,
      unit: ri.unit,
      name: ri.ingredient?.name || ''
    })),
    preparation: cocktail.instructions?.split('\n') || [],
    flavors: cocktail.flavor_profiles.map((fp: any) => fp.flavor),
    canMake: false,
    rating: cocktail.average_rating || 4.5,
    prepTime: '5 min'
  }));
}

export async function fetchPopularCocktails(): Promise<Cocktail[]> {
  const { data, error } = await supabase
    .from('cocktails')
    .select(`
      *,
      required_ingredients (
        id,
        amount,
        unit,
        ingredient: ingredients (
          name,
          category
        )
      ),
      flavor_profiles (
        flavor
      )
    `)
    .eq('popular', true)
    .limit(4);

  if (error) {
    console.error('Error fetching popular cocktails:', error);
    return [];
  }

  return data.map(cocktail => ({
    id: cocktail.id,
    name: cocktail.name || '',
    description: cocktail.description || '',
    image: cocktail.image_url || '/placeholder.svg',
    difficulty: cocktail.difficulty_level || 'easy',
    ingredients: cocktail.required_ingredients.map((ri: any) => ({
      amount: ri.amount,
      unit: ri.unit,
      name: ri.ingredient?.name || ''
    })),
    preparation: cocktail.instructions?.split('\n') || [],
    flavors: cocktail.flavor_profiles.map((fp: any) => fp.flavor),
    canMake: false,
    rating: cocktail.average_rating || 4.5,
    prepTime: '5 min'
  }));
}
