
/**
 * Utility functions for ingredient comparison and validation
 */

import { Ingredient } from "../components/IngredientsList";

/**
 * Normalizes an ingredient name for comparison by removing extra whitespace,
 * converting to lowercase, and handling common variations
 * 
 * @param name The ingredient name to normalize
 * @returns Normalized string for comparison
 */
export function normalizeIngredientName(name: string): string {
  if (!name) return '';
  
  // Convert to lowercase and trim whitespace
  let normalized = name.toLowerCase().trim();
  
  // Remove any extra whitespace between words
  normalized = normalized.replace(/\s+/g, ' ');
  
  // Handle common variations (could be expanded based on needs)
  const replacements: Record<string, string> = {
    'whiskey': 'whisky',
    'rum (white)': 'white rum',
    'rum (dark)': 'dark rum',
    'orange liqueur': 'triple sec',
    'simple': 'simple syrup',
    'angostura': 'angostura bitters'
  };
  
  // Apply replacements
  Object.entries(replacements).forEach(([search, replace]) => {
    if (normalized === search) {
      normalized = replace;
    }
  });
  
  return normalized;
}

/**
 * Helper function to get the name from an ingredient regardless of its type
 * @param ingredient String or object with name property
 * @returns The ingredient name as a string
 */
export const getIngredientName = (ingredient: string | { name: string, amount: string }): string => {
  if (typeof ingredient === 'string') {
    return ingredient;
  } else {
    return ingredient.name;
  }
};

/**
 * Helper function to get the amount from an ingredient if available
 * @param ingredient String or object with amount property
 * @returns The ingredient amount as a string or undefined
 */
export const getIngredientAmount = (ingredient: string | { name: string, amount: string }): string | undefined => {
  if (typeof ingredient === 'object' && 'amount' in ingredient) {
    return ingredient.amount;
  }
  return undefined;
};

/**
 * Safely gets an ingredient name and returns it in lowercase
 * @param ingredient String or object with name property
 * @returns The ingredient name in lowercase
 */
export const getLowercaseIngredientName = (ingredient: string | { name: string, amount: string }): string => {
  return getIngredientName(ingredient).toLowerCase();
};

/**
 * Checks if an ingredient name (string or from object) includes a search term
 * @param ingredient The ingredient to check
 * @param searchTerm The term to search for
 * @returns Boolean indicating if the ingredient includes the search term
 */
export const ingredientNameIncludes = (
  ingredient: string | { name: string, amount: string },
  searchTerm: string
): boolean => {
  return getIngredientName(ingredient).toLowerCase().includes(searchTerm.toLowerCase());
};

/**
 * Formats ingredient for display, showing name and amount if available
 * @param ingredient The ingredient to format
 * @returns Formatted ingredient string for display
 */
export const formatIngredientForDisplay = (
  ingredient: string | { name: string, amount: string }
): string => {
  if (typeof ingredient === 'string') {
    return ingredient;
  }
  return ingredient.amount ? `${ingredient.name} (${ingredient.amount})` : ingredient.name;
};

/**
 * Compares an ingredient from the shopping list with the user's inventory
 * to determine if it's already available
 * 
 * @param shoppingIngredientName The name of the ingredient in the shopping list
 * @param inventoryIngredients Array of ingredients in the user's inventory
 * @returns Boolean indicating if the ingredient is in inventory
 */
export function isIngredientInInventory(
  shoppingIngredientName: string,
  inventoryIngredients: Ingredient[]
): boolean {
  // Normalize the shopping ingredient name
  const normalizedShoppingName = normalizeIngredientName(shoppingIngredientName);
  
  // Check if any inventory ingredient matches after normalization
  return inventoryIngredients.some(inventoryItem => {
    const normalizedInventoryName = normalizeIngredientName(inventoryItem.name);
    
    // Exact match check
    if (normalizedShoppingName === normalizedInventoryName) {
      return true;
    }
    
    // Check for partial matches (e.g., "lemon" should match "lemon juice")
    if (normalizedShoppingName.includes(normalizedInventoryName) || 
        normalizedInventoryName.includes(normalizedShoppingName)) {
      // Only match if the partial string is a complete word
      const shoppingWords = normalizedShoppingName.split(' ');
      const inventoryWords = normalizedInventoryName.split(' ');
      
      // Check if all words from the shorter name appear in the longer name
      const shorterWords = shoppingWords.length <= inventoryWords.length ? shoppingWords : inventoryWords;
      const longerWords = shoppingWords.length > inventoryWords.length ? shoppingWords : inventoryWords;
      
      return shorterWords.every(word => 
        longerWords.some(longWord => longWord === word || longWord.startsWith(word + '-') || word.startsWith(longWord + '-'))
      );
    }
    
    return false;
  });
}

/**
 * Validates an ingredient name before adding to inventory or shopping list
 * 
 * @param name The ingredient name to validate
 * @returns Object with validation result and any error message
 */
export function validateIngredientName(name: string): { isValid: boolean; errorMessage?: string } {
  if (!name || name.trim() === '') {
    return { isValid: false, errorMessage: 'Ingredient name cannot be empty' };
  }
  
  if (name.length < 2) {
    return { isValid: false, errorMessage: 'Ingredient name must be at least 2 characters' };
  }
  
  // Additional validation rules could be added here
  
  return { isValid: true };
}

/**
 * Logs ingredient matching errors for debugging purposes
 * 
 * @param shoppingName The name from the shopping list
 * @param inventoryNames Array of names from inventory that were checked against
 * @param matched Whether a match was found
 */
export function logIngredientMatchingError(
  shoppingName: string,
  inventoryNames: string[],
  matched: boolean
): void {
  if (!matched) {
    console.warn(
      `Ingredient matching failed: "${shoppingName}" not found in inventory.`,
      `Checked against: ${inventoryNames.join(', ')}`
    );
  }
}
