
export type CocktailStyle = 'Classic' | 'Contemporary' | 'Tiki' | 'Tropical' | 'Modern' | 'Aperitif';
export type CocktailMethod = 'Shaken' | 'Stirred' | 'Built' | 'Blended' | 'Muddled';
export type GlassType = 'Martini' | 'Highball' | 'Rocks' | 'Collins' | 'Coupe' | 'Hurricane';
export type Strength = 'Low' | 'Medium' | 'High';
export type ServingTemperature = 'Cold' | 'Room Temperature' | 'Hot';
export type FlavorProfile = 'Sweet' | 'Sour' | 'Bitter' | 'Herbal' | 'Spicy' | 'Fruity' | 'Citrusy' | 'Floral';
export type Color = 'Red' | 'Blue' | 'Green' | 'Clear' | 'Yellow' | 'Orange' | 'Purple' | 'Pink' | 'Brown' | 'Black';
export type Season = 'Summer' | 'Winter' | 'Fall' | 'Spring' | 'Year-round';
export type Occasion = 'Casual' | 'Dinner Party' | 'Holiday' | 'Brunch' | 'Special';
export type TimeOfDay = 'Morning' | 'Afternoon' | 'Evening' | 'Late Night';
export type SugarLevel = 'Low' | 'Medium' | 'High';

export interface CocktailFilters {
  spirit?: string;
  secondarySpirits?: string[];
  style?: CocktailStyle;
  method?: CocktailMethod;
  glassType?: GlassType;
  garnish?: string;
  flavorProfiles?: FlavorProfile[];
  strength?: Strength;
  color?: Color;
  servingTemperature?: ServingTemperature;
  difficulty?: string;
  canMake?: boolean;
  season?: Season;
  occasion?: Occasion;
  timeOfDay?: TimeOfDay;
  containsEggs?: boolean;
  containsDairy?: boolean;
  containsNuts?: boolean;
  vegan?: boolean;
  glutenFree?: boolean;
  sugarLevel?: SugarLevel;
}
