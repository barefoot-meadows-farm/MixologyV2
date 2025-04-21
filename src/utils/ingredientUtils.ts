
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
