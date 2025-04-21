
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AddCustomIngredientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (ingredient: { name: string }) => void;
}

const AddCustomIngredientModal: React.FC<AddCustomIngredientModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) return;
    onAdd({ name: name.trim() });
    setName("");
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed z-40 inset-0 flex items-center justify-center bg-black/30">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 min-w-[320px] shadow-lg">
        <h2 className="font-semibold mb-2 text-lg">Add Custom Ingredient</h2>
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <Input
            autoFocus
            placeholder="e.g. Dragonfruit Liqueur"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={name.trim().length < 2}>
            Add
          </Button>
        </form>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 mt-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddCustomIngredientModal;
