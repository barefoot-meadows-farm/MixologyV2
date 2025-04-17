
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Cocktail } from '../components/CocktailCard';
import { useSettings } from './SettingsContext';

interface ShoppingItem {
  cocktailId: string;
  quantity: number;
}

interface ShoppingContextType {
  shoppingItems: ShoppingItem[];
  addToCart: (cocktailId: string) => void;
  removeFromCart: (cocktailId: string) => void;
  updateQuantity: (cocktailId: string, quantity: number) => void;
  isInCart: (cocktailId: string) => boolean;
  getQuantity: (cocktailId: string) => number;
  clearCart: () => void;
}

const ShoppingContext = createContext<ShoppingContextType | undefined>(undefined);

export const useShoppingCart = () => {
  const context = useContext(ShoppingContext);
  if (context === undefined) {
    throw new Error('useShoppingCart must be used within a ShoppingProvider');
  }
  return context;
};

interface ShoppingProviderProps {
  children: ReactNode;
}

export const ShoppingProvider = ({ children }: ShoppingProviderProps) => {
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);

  // Load shopping cart from localStorage on mount
  useEffect(() => {
    const loadShoppingItems = () => {
      try {
        const savedItems = localStorage.getItem('mixologyMasterShoppingCart');
        if (savedItems) {
          setShoppingItems(JSON.parse(savedItems));
        }
      } catch (error) {
        console.error('Failed to load shopping cart:', error);
      }
    };

    loadShoppingItems();
  }, []);

  // Save shopping cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('mixologyMasterShoppingCart', JSON.stringify(shoppingItems));
  }, [shoppingItems]);

  const addToCart = (cocktailId: string) => {
    setShoppingItems(prev => {
      if (prev.some(item => item.cocktailId === cocktailId)) {
        return prev;
      }
      return [...prev, { cocktailId, quantity: 1 }];
    });
  };

  const removeFromCart = (cocktailId: string) => {
    setShoppingItems(prev => prev.filter(item => item.cocktailId !== cocktailId));
  };

  const updateQuantity = (cocktailId: string, quantity: number) => {
    if (quantity < 1 || quantity > 99) return;
    
    setShoppingItems(prev => 
      prev.map(item => 
        item.cocktailId === cocktailId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const isInCart = (cocktailId: string) => {
    return shoppingItems.some(item => item.cocktailId === cocktailId);
  };

  const getQuantity = (cocktailId: string) => {
    const item = shoppingItems.find(item => item.cocktailId === cocktailId);
    return item ? item.quantity : 0;
  };

  const clearCart = () => {
    setShoppingItems([]);
  };

  return (
    <ShoppingContext.Provider
      value={{
        shoppingItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        isInCart,
        getQuantity,
        clearCart
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};
