
import { Cocktail } from "../components/CocktailCard";

// Sample cocktails data to prevent undefined errors
export const cocktails: Cocktail[] = [
  {
    id: "1",
    name: "Mojito",
    description: "A refreshing Cuban classic made with white rum, mint leaves, lime juice, and sugar.",
    image: "/placeholder.svg",
    ingredients: ["White rum", "Mint leaves", "Lime juice", "Sugar", "Soda water"],
    preparation: "Muddle mint leaves with sugar and lime juice. Add rum and ice. Top with soda water and garnish with mint leaves.",
    difficulty: "Easy",
    prepTime: "5 min",
    rating: "4.5",
    category: "Classic",
    isPopular: true,
    isFeatured: true,
    canMake: true
  },
  {
    id: "2",
    name: "Margarita",
    description: "A tequila-based cocktail with lime juice and orange liqueur, often served with salt on the rim.",
    image: "/placeholder.svg",
    ingredients: ["Tequila", "Lime juice", "Triple sec", "Salt", "Ice"],
    preparation: "Shake tequila, lime juice, and triple sec with ice. Strain into a salt-rimmed glass.",
    difficulty: "Easy",
    prepTime: "5 min",
    rating: "4.8",
    category: "Classic",
    isPopular: true,
    isFeatured: false,
    canMake: true
  },
  {
    id: "3",
    name: "Piña Colada",
    description: "A tropical blend of rum, coconut cream, and pineapple juice.",
    image: "/placeholder.svg",
    ingredients: ["White rum", "Coconut cream", "Pineapple juice", "Ice"],
    preparation: "Blend all ingredients with ice until smooth. Garnish with a pineapple wedge.",
    difficulty: "Medium",
    prepTime: "8 min",
    rating: "4.3",
    category: "Tropical",
    isPopular: true,
    isFeatured: true,
    canMake: false
  },
  {
    id: "4",
    name: "Sangria",
    description: "A Spanish wine punch with chopped fruit, sweetener, and sometimes brandy.",
    image: "/placeholder.svg",
    ingredients: ["Red wine", "Brandy", "Orange juice", "Diced fruits", "Sugar"],
    preparation: "Mix all ingredients and let sit for at least 1 hour before serving.",
    difficulty: "Easy",
    prepTime: "15 min",
    rating: "4.2",
    category: "Wine",
    isPopular: false,
    isFeatured: true,
    canMake: false
  },
  {
    id: "5",
    name: "Old Fashioned",
    description: "A classic whiskey cocktail made with sugar, bitters, and a twist of citrus rind.",
    image: "/placeholder.svg",
    ingredients: ["Bourbon", "Sugar cube", "Angostura bitters", "Orange peel"],
    preparation: "Muddle sugar with bitters, add bourbon and ice, stir, and garnish with orange peel.",
    difficulty: "Medium",
    prepTime: "7 min",
    rating: "4.7",
    category: "Classic",
    isPopular: true,
    isFeatured: false,
    canMake: true
  },
  {
    id: "6",
    name: "Mai Tai",
    description: "A rum-based cocktail with lime, orange curaçao, and orgeat syrup.",
    image: "/placeholder.svg",
    ingredients: ["Dark rum", "Light rum", "Lime juice", "Orange curaçao", "Orgeat syrup"],
    preparation: "Shake all ingredients with ice, strain into a glass with crushed ice, and garnish with mint and lime.",
    difficulty: "Medium",
    prepTime: "10 min",
    rating: "4.4",
    category: "Tropical",
    isPopular: false,
    isFeatured: true,
    canMake: false
  }
];

// Pre-populated lists
export const featuredCocktails: Cocktail[] = cocktails.filter(cocktail => cocktail.isFeatured);
export const popularCocktails: Cocktail[] = cocktails.filter(cocktail => cocktail.isPopular);
