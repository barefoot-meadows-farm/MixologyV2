import { Ingredient } from "../components/IngredientsList";

export const ingredients: Ingredient[] = [
  // Spirits
  { id: "vodka", name: "Vodka", category: "Spirits", isInInventory: true },
  { id: "gin", name: "Gin", category: "Spirits", isInInventory: true },
  { id: "rum", name: "White Rum", category: "Spirits", isInInventory: true },
  { id: "dark-rum", name: "Dark Rum", category: "Spirits" },
  { id: "bourbon", name: "Bourbon", category: "Spirits" },
  { id: "tequila", name: "Tequila", category: "Spirits", isInInventory: true },
  { id: "rye-whiskey", name: "Rye Whiskey", category: "Spirits" },
  { id: "scotch", name: "Scotch Whisky", category: "Spirits" },
  
  // Liqueurs
  { id: "triple-sec", name: "Triple Sec", category: "Liqueurs", isInInventory: true },
  { id: "coffee-liqueur", name: "Coffee Liqueur", category: "Liqueurs", isInInventory: true },
  { id: "campari", name: "Campari", category: "Liqueurs", isInInventory: true },
  { id: "sweet-vermouth", name: "Sweet Vermouth", category: "Liqueurs", isInInventory: true },
  { id: "dry-vermouth", name: "Dry Vermouth", category: "Liqueurs" },
  { id: "amaretto", name: "Amaretto", category: "Liqueurs" },
  { id: "baileys", name: "Irish Cream", category: "Liqueurs" },
  
  // Mixers
  { id: "soda-water", name: "Soda Water", category: "Mixers", isInInventory: true },
  { id: "tonic-water", name: "Tonic Water", category: "Mixers" },
  { id: "cola", name: "Cola", category: "Mixers" },
  { id: "ginger-beer", name: "Ginger Beer", category: "Mixers" },
  { id: "cranberry-juice", name: "Cranberry Juice", category: "Mixers" },
  { id: "orange-juice", name: "Orange Juice", category: "Mixers" },
  { id: "pineapple-juice", name: "Pineapple Juice", category: "Mixers" },
  
  // Fresh Ingredients
  { id: "lemon-juice", name: "Lemon Juice", category: "Fresh Ingredients", isInInventory: true },
  { id: "lime-juice", name: "Lime Juice", category: "Fresh Ingredients", isInInventory: true },
  { id: "mint-leaves", name: "Mint Leaves", category: "Fresh Ingredients", isInInventory: true },
  { id: "basil-leaves", name: "Basil Leaves", category: "Fresh Ingredients" },
  { id: "cucumber", name: "Cucumber", category: "Fresh Ingredients" },
  { id: "orange-peel", name: "Orange Peel", category: "Fresh Ingredients", isInInventory: true },
  
  // Syrups & Bitters
  { id: "simple-syrup", name: "Simple Syrup", category: "Syrups & Bitters", isInInventory: true },
  { id: "agave-syrup", name: "Agave Syrup", category: "Syrups & Bitters" },
  { id: "grenadine", name: "Grenadine", category: "Syrups & Bitters" },
  { id: "angostura-bitters", name: "Angostura Bitters", category: "Syrups & Bitters", isInInventory: true },
  { id: "orange-bitters", name: "Orange Bitters", category: "Syrups & Bitters" },
  
  // Other
  { id: "salt", name: "Salt", category: "Other", isInInventory: true },
  { id: "sugar", name: "Sugar", category: "Other", isInInventory: true },
  { id: "egg-white", name: "Egg White", category: "Other" },
  { id: "espresso", name: "Espresso", category: "Other", isInInventory: true },
  { id: "cherry", name: "Cocktail Cherry", category: "Other" }
];
