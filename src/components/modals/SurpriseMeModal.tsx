
import React from 'react';

interface SurpriseMeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAll: () => void;
  onSelectAvailable: () => void;
}

const SurpriseMeModal: React.FC<SurpriseMeModalProps> = ({ 
  isOpen, 
  onClose, 
  onSelectAll, 
  onSelectAvailable 
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="bg-white dark:bg-mixology-dark rounded-lg p-6 shadow-xl max-w-sm w-full mx-auto my-auto"
        style={{ maxHeight: '90vh', overflow: 'auto' }}
      >
        <h3 className="text-lg font-medium mb-4 text-mixology-purple dark:text-mixology-cream">Surprise Me!</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Choose how you want to be surprised:</p>
        <div className="space-y-3">
          <button
            onClick={onSelectAll}
            className="w-full px-4 py-2 bg-mixology-burgundy text-white rounded-md hover:bg-mixology-burgundy/90 transition-colors"
          >
            Pick From All Drinks
          </button>
          <button
            onClick={onSelectAvailable}
            className="w-full px-4 py-2 bg-mixology-purple text-white rounded-md hover:bg-mixology-purple/90 transition-colors"
          >
            Pick From Available Drinks
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SurpriseMeModal;
