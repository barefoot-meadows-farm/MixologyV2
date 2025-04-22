
import { Cocktail } from "../components/CocktailCard";

export const cocktails: Cocktail[] = [
  {
    id: "negroni",
    name: "Negroni",
    image: "https://images.unsplash.com/photo-1582056509387-8012641b7664?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
    description: "A classic cocktail made with equal parts gin, sweet vermouth, and Campari, garnished with an orange peel.",
    ingredients: ["Gin", "Sweet Vermouth", "Campari", "Orange Peel"],
    difficulty: "easy",
    canMake: true
  },
  {
    id: "old-fashioned",
    name: "Old Fashioned",
    image: "https://images.unsplash.com/photo-1551751299-1b51cab2694c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
    description: "A timeless whiskey cocktail with sugar, bitters, and a twist of orange peel.",
    ingredients: ["Bourbon", "Sugar", "Angostura Bitters", "Orange Peel"],
    difficulty: "easy"
  },
  {
    id: "margarita",
    name: "Margarita",
    image: "https://images.unsplash.com/photo-1600146591674-867833d01351?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
    description: "A refreshing tequila-based cocktail with lime juice and triple sec, served with salt on the rim.",
    ingredients: ["Tequila", "Triple Sec", "Lime Juice", "Salt"],
    difficulty: "easy",
    canMake: true
  },
  {
    id: "mojito",
    name: "Mojito",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
    description: "A refreshing Cuban highball with white rum, lime juice, mint, sugar, and soda water.",
    ingredients: ["White Rum", "Lime Juice", "Mint Leaves", "Sugar", "Soda Water"],
    difficulty: "medium",
    canMake: true
  },
  {
    id: "manhattan",
    name: "Manhattan",
    image: "https://images.unsplash.com/photo-1574046194710-9bd743593915?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
    description: "A sophisticated whiskey cocktail with sweet vermouth and bitters, garnished with a cherry.",
    ingredients: ["Rye Whiskey", "Sweet Vermouth", "Angostura Bitters", "Cherry"],
    difficulty: "easy"
  },
  {
    id: "cosmopolitan",
    name: "Cosmopolitan",
    image: "https://images.unsplash.com/photo-1588685562788-e788526e867e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
    description: "A vibrant cocktail with vodka, cranberry juice, triple sec, and lime juice.",
    ingredients: ["Vodka", "Cranberry Juice", "Triple Sec", "Lime Juice"],
    difficulty: "medium"
  },
  {
    id: "whiskey-sour",
    name: "Whiskey Sour",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
    description: "A balanced mix of whiskey, lemon juice, and sugar, sometimes with egg white for a silky texture.",
    ingredients: ["Bourbon", "Lemon Juice", "Simple Syrup", "Egg White (optional)"],
    difficulty: "medium"
  },
  {
    id: "espresso-martini",
    name: "Espresso Martini",
    image: "https://images.unsplash.com/photo-1621828600753-313bcbfc6e94?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
    description: "A rich and creamy cocktail with vodka, coffee liqueur, and freshly brewed espresso.",
    ingredients: ["Vodka", "Coffee Liqueur", "Espresso", "Simple Syrup"],
    difficulty: "medium",
    canMake: true
  }
];

export const featuredCocktails = cocktails.slice(0, 3);
export const popularCocktails = [cocktails[3], cocktails[4], cocktails[5], cocktails[6]];
