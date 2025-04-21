
import React from "react";
import { Shuffle } from "lucide-react";

interface SurpriseMeButtonProps {
  onClick: () => void;
}

const SurpriseMeButton: React.FC<SurpriseMeButtonProps> = ({ onClick }) => (
  <div className="w-full flex justify-start">
    <button
      onClick={onClick}
      className="flex items-center text-sm font-medium px-4 py-2 border border-mixology-purple rounded-md bg-mixology-purple text-white hover:bg-mixology-purple/90 transition-colors dark:border-mixology-purple dark:bg-mixology-purple dark:hover:bg-mixology-purple/90"
      aria-label="Surprise Me"
    >
      <Shuffle size={16} className="mr-1" />
      Surprise Me
    </button>
  </div>
);

export default SurpriseMeButton;
