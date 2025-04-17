/**
 * Utility functions for barcode scanning and product management
 */

import { Ingredient } from "../components/IngredientsList";

export interface BarcodeProduct {
  id: string;
  name: string;
  category: string;
  barcode: string;
}

// Mock database of barcode-to-product mappings
// In a real application, this would be stored in a database
export const barcodeMappings: Record<string, BarcodeProduct> = {
  '0123456789012': { id: 'vodka', name: 'Vodka', category: 'Spirits', barcode: '0123456789012' },
  '1234567890128': { id: 'gin', name: 'Gin', category: 'Spirits', barcode: '1234567890128' },
  '2345678901234': { id: 'rum', name: 'White Rum', category: 'Spirits', barcode: '2345678901234' },
  '3456789012345': { id: 'tequila', name: 'Tequila', category: 'Spirits', barcode: '3456789012345' },
  '4567890123456': { id: 'triple-sec', name: 'Triple Sec', category: 'Liqueurs', barcode: '4567890123456' },
};

/**
 * Look up a product by its barcode
 * @param barcode The barcode to look up
 * @returns The product if found, null otherwise
 */
export const lookupBarcodeProduct = async (barcode: string): Promise<BarcodeProduct | null> => {
  // In a real app, this would be an API call
  // Example: return fetch(`/api/products/barcode/${barcode}`).then(res => res.json());
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return barcodeMappings[barcode] || null;
};

/**
 * Add a new barcode-product mapping
 * @param product The product to add
 * @returns The added product
 */
export const addBarcodeProduct = async (product: BarcodeProduct): Promise<BarcodeProduct> => {
  // In a real app, this would be an API call
  // Example: return fetch('/api/products/create', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(product)
  // }).then(res => res.json());
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Add to our mock database
  barcodeMappings[product.barcode] = product;
  
  return product;
};

/**
 * Validate a barcode format
 * @param barcode The barcode to validate
 * @returns Whether the barcode is valid
 */
export const isValidBarcode = (barcode: string): boolean => {
  // Basic validation - in a real app, this would be more sophisticated
  // UPC-A is 12 digits, EAN-13 is 13 digits
  return /^\d{12,13}$/.test(barcode);
};

/**
 * Debounce function to prevent multiple rapid barcode detections
 * @param func The function to debounce
 * @param wait The wait time in milliseconds
 * @returns The debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
};