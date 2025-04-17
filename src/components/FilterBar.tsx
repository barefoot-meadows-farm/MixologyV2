import { useState } from "react";
import { Filter } from "lucide-react";

interface Filters {
  spirit: string | undefined;
  difficulty: string | undefined;
  canMake: boolean | undefined;
}

interface FilterBarProps {
  onFilterChange: (filters: Filters) => void;
}

const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedSpirit, setSelectedSpirit] = useState<string | undefined>(undefined);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | undefined>(undefined);
  const [canMakeOnly, setCanMakeOnly] = useState(false);

  const spirits = ["Vodka", "Rum", "Gin", "Tequila", "Whiskey", "Bourbon"];
  const difficulties = ["Easy", "Medium", "Hard"];

  const handleSpiritChange = (spirit: string) => {
    const newValue = selectedSpirit === spirit ? undefined : spirit;
    setSelectedSpirit(newValue);
    onFilterChange({
      spirit: newValue,
      difficulty: selectedDifficulty,
      canMake: canMakeOnly,
    });
  };

  const handleDifficultyChange = (difficulty: string) => {
    const newValue = selectedDifficulty === difficulty ? undefined : difficulty;
    setSelectedDifficulty(newValue);
    onFilterChange({
      spirit: selectedSpirit,
      difficulty: newValue,
      canMake: canMakeOnly,
    });
  };

  const handleCanMakeChange = () => {
    setCanMakeOnly(!canMakeOnly);
    onFilterChange({
      spirit: selectedSpirit,
      difficulty: selectedDifficulty,
      canMake: !canMakeOnly,
    });
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">Filters</h3>
        <button
          className="touch-target flex items-center text-sm text-mixology-purple"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Filter size={18} className="mr-1" />
          {isExpanded ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {isExpanded && (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 animate-fade-in">
          <div className="mb-4">
            <h4 className="font-medium mb-2 text-sm">Base Spirit</h4>
            <div className="flex flex-wrap gap-2">
              {spirits.map((spirit) => (
                <button
                  key={spirit}
                  className={`px-3 py-1.5 text-sm rounded-full ${
                    selectedSpirit === spirit
                      ? "bg-mixology-burgundy text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => handleSpiritChange(spirit)}
                >
                  {spirit}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-medium mb-2 text-sm">Difficulty</h4>
            <div className="flex flex-wrap gap-2">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  className={`px-3 py-1.5 text-sm rounded-full ${
                    selectedDifficulty === difficulty
                      ? "bg-mixology-purple text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => handleDifficultyChange(difficulty)}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={canMakeOnly}
                onChange={handleCanMakeChange}
                className="rounded border-gray-300 text-mixology-burgundy focus:ring-mixology-burgundy h-4 w-4"
              />
              <span>Show only what I can make</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
