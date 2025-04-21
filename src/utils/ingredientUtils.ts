
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
