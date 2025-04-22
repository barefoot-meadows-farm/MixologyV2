
import React from 'react';
import { Link } from 'react-router-dom';
import { FlavorProfile, CocktailStyle, CocktailMethod, GlassType, Strength, ServingTemperature, Color } from '@/types/filters';

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
  canMake?: boolean;
  style?: CocktailStyle;
  method?: CocktailMethod;
  glass_type?: GlassType;
  flavors?: FlavorProfile[];
  strength?: Strength;
  color?: Color;
  serving_temperature?: ServingTemperature;
  garnish?: string;
}

interface CocktailCardProps {
  cocktail: Cocktail;
  compact?: boolean;
  size?: string;
}

const CocktailCard: React.FC<CocktailCardProps> = ({ cocktail, compact = false, size = 'medium' }) => {
  // Make sure we're not rendering null or undefined data
  if (!cocktail) {
    return <div className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
      <p className="text-gray-500 dark:text-gray-400">Cocktail data is missing</p>
    </div>;
  }

  return (
    <Link to={`/cocktail/${cocktail.id}`} className="block">
      <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
        <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-md mb-3">
          <img 
            src={cocktail.image || '/placeholder.svg'} 
            alt={cocktail.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }}
          />
        </div>
        <h3 className="font-medium text-lg mb-1 dark:text-white">{cocktail.name || 'Unnamed Cocktail'}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 dark:text-gray-400">
          {cocktail.description || 'No description available'}
        </p>
        {!compact && (
          <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
            <span className="mr-2">{cocktail.difficulty || 'Easy'}</span>
            <span className="mr-2">•</span>
            <span>{cocktail.prepTime || '5 min'}</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default CocktailCard;
