import { supabase } from "@/integrations/supabase/client";
import { Cocktail } from "../components/CocktailCard";
import { CocktailStyle, CocktailMethod, GlassType, Strength, ServingTemperature, FlavorProfile, Color } from "@/types/filters";

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
    style: cocktail.style as CocktailStyle,
    method: cocktail.method as CocktailMethod,
    glass_type: cocktail.glass_type as GlassType,
    garnish: cocktail.garnish,
    flavors: cocktail.flavor_profiles.map((fp: any) => fp.flavor as FlavorProfile),
    strength: cocktail.strength as Strength,
    color: cocktail.color as Color,
    serving_temperature: cocktail.serving_temperature as ServingTemperature,
    canMake: false,
    rating: cocktail.average_rating || 4.5,
    prepTime: '5 min',
    season: cocktail.season as Season,
    occasion: cocktail.occasion as Occasion,
    time_of_day: cocktail.time_of_day as TimeOfDay,
    contains_eggs: cocktail.contains_eggs || false,
    contains_dairy: cocktail.contains_dairy || false,
    contains_nuts: cocktail.contains_nuts || false,
    vegan: cocktail.vegan || false,
    gluten_free: cocktail.gluten_free || true,
    sugar_level: cocktail.sugar_level as SugarLevel,
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
    style: cocktail.style as CocktailStyle,
    method: cocktail.method as CocktailMethod,
    glass_type: cocktail.glass_type as GlassType,
    garnish: cocktail.garnish,
    flavors: cocktail.flavor_profiles.map((fp: any) => fp.flavor as FlavorProfile),
    strength: cocktail.strength as Strength,
    color: cocktail.color as Color,
    serving_temperature: cocktail.serving_temperature as ServingTemperature,
    canMake: false,
    rating: cocktail.average_rating || 4.5,
    prepTime: '5 min',
    season: cocktail.season as Season,
    occasion: cocktail.occasion as Occasion,
    time_of_day: cocktail.time_of_day as TimeOfDay,
    contains_eggs: cocktail.contains_eggs || false,
    contains_dairy: cocktail.contains_dairy || false,
    contains_nuts: cocktail.contains_nuts || false,
    vegan: cocktail.vegan || false,
    gluten_free: cocktail.gluten_free || true,
    sugar_level: cocktail.sugar_level as SugarLevel,
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
    style: cocktail.style as CocktailStyle,
    method: cocktail.method as CocktailMethod,
    glass_type: cocktail.glass_type as GlassType,
    garnish: cocktail.garnish,
    flavors: cocktail.flavor_profiles.map((fp: any) => fp.flavor as FlavorProfile),
    strength: cocktail.strength as Strength,
    color: cocktail.color as Color,
    serving_temperature: cocktail.serving_temperature as ServingTemperature,
    canMake: false,
    rating: cocktail.average_rating || 4.5,
    prepTime: '5 min',
    season: cocktail.season as Season,
    occasion: cocktail.occasion as Occasion,
    time_of_day: cocktail.time_of_day as TimeOfDay,
    contains_eggs: cocktail.contains_eggs || false,
    contains_dairy: cocktail.contains_dairy || false,
    contains_nuts: cocktail.contains_nuts || false,
    vegan: cocktail.vegan || false,
    gluten_free: cocktail.gluten_free || true,
    sugar_level: cocktail.sugar_level as SugarLevel,
  }));
}
