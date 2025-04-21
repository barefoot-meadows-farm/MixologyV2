import React from 'react';
import { Link } from 'react-router-dom';

export interface Cocktail {
  id: string;
  name: string;
  description: string;
  image: string;
  ingredients: Array<string | {name: string, amount: string}>;
  preparation?: string | string[];
  difficulty?: string;
  prepTime?: string;
  rating?: string | number;
  category?: string;
  isPopular?: boolean;
  isFeatured?: boolean;
}

interface CocktailCardProps {
  cocktail: Cocktail;
  compact?: boolean;
}

const CocktailCard: React.FC<CocktailCardProps> = ({ cocktail, compact = false }) => {
  // Component implementation
  return <div>Cocktail Card</div>;
};

export default CocktailCard;
