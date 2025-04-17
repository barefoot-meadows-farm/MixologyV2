import React, { useState } from 'react';
import { Barcode, Plus } from 'lucide-react';
import BarcodeScanner from './BarcodeScanner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { ingredients } from "../data/ingredients";
import { BarcodeProduct, lookupBarcodeProduct } from "../lib/barcodeUtils";

interface BarcodeScannerButtonProps {
  onIngredientToggle: (id: string) => void;
}

const BarcodeScannerButton: React.FC<BarcodeScannerButtonProps> = ({ onIngredientToggle }) => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState('');
  const [scannedProduct, setScannedProduct] = useState<BarcodeProduct | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Barcode product lookup is now handled by the barcodeUtils library
  
  const handleOpenScanner = () => {
    setIsScannerOpen(true);
  };
  
  const handleCloseScanner = () => {
    setIsScannerOpen(false);
  };
  
  const handleBarcodeDetected = async (barcode: string) => {
    setScannedBarcode(barcode);
    setIsLoading(true);
    
    try {
      // Look up the barcode using our utility function
      const product = await lookupBarcodeProduct(barcode);
      
      setIsLoading(false);
      setIsScannerOpen(false);
      
      if (product) {
        setScannedProduct(product);
        setIsProductDialogOpen(true);
      } else {
        // Product not found - would show a form to add a new product
        // For this demo, we'll just show a not found dialog
        setScannedProduct(null);
        setIsProductDialogOpen(true);
      }
    } catch (error) {
      console.error('Error looking up barcode:', error);
      setIsLoading(false);
      setIsScannerOpen(false);
      // Show error dialog
    }
  };
  
  const handleAddToBar = () => {
    if (scannedProduct) {
      // Check if the ingredient already exists in our ingredients list
      const existingIngredient = ingredients.find(ing => ing.id === scannedProduct.id);
      
      if (existingIngredient) {
        // Add the existing ingredient to the bar
        onIngredientToggle(existingIngredient.id);
      } else {
        // In a real app, we would add the new product to the database
        // For this demo, we'll just pretend it worked
        console.log('Would add new product to database:', scannedProduct);
        onIngredientToggle(scannedProduct.id);
      }
    }
    
    setIsProductDialogOpen(false);
  };
  
  return (
    <>
      <button 
        className="touch-target w-9 h-9 bg-mixology-burgundy text-white rounded-full flex items-center justify-center ml-2"
        onClick={handleOpenScanner}
        aria-label="Scan barcode"
      >
        <Barcode size={18} />
      </button>
      
      {/* Barcode Scanner Dialog */}
      <BarcodeScanner 
        isOpen={isScannerOpen} 
        onClose={handleCloseScanner} 
        onBarcodeDetected={handleBarcodeDetected} 
      />
      
      {/* Product Result Dialog */}
      <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {scannedProduct ? 'Product Found' : 'Product Not Found'}
            </DialogTitle>
          </DialogHeader>
          
          {isLoading ? (
            <div className="py-6 text-center">
              <p>Looking up barcode {scannedBarcode}...</p>
            </div>
          ) : scannedProduct ? (
            <div className="py-4">
              <p className="mb-2">We found this product in our database:</p>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md mb-4">
                <p className="font-medium">{scannedProduct.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{scannedProduct.category}</p>
              </div>
              <p>Would you like to add it to your bar?</p>
            </div>
          ) : (
            <div className="py-4">
              <p className="mb-4">Sorry, we couldn't find a product with barcode {scannedBarcode} in our database.</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                In a full implementation, you would be able to add a new product here.
              </p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsProductDialogOpen(false)}>
              Cancel
            </Button>
            {scannedProduct && (
              <Button 
                className="bg-mixology-burgundy hover:bg-mixology-burgundy/90 text-white"
                onClick={handleAddToBar}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add to Bar
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BarcodeScannerButton;