
import { useState } from "react";
import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CocktailFilters } from "@/types/filters";

const styles = ['Classic', 'Contemporary', 'Tiki', 'Tropical', 'Modern', 'Aperitif'];
const methods = ['Shaken', 'Stirred', 'Built', 'Blended', 'Muddled'];
const glassTypes = ['Martini', 'Highball', 'Rocks', 'Collins', 'Coupe', 'Hurricane'];
const strengths = ['Low', 'Medium', 'High'];
const temperatures = ['Cold', 'Room Temperature', 'Hot'];
const flavors = ['Sweet', 'Sour', 'Bitter', 'Herbal', 'Spicy', 'Fruity', 'Citrusy', 'Floral'];
const colors = ['Red', 'Blue', 'Green', 'Clear', 'Yellow', 'Orange', 'Purple', 'Pink', 'Brown', 'Black'];
const spirits = ['Vodka', 'Gin', 'Rum', 'Tequila', 'Whiskey', 'Bourbon'];

interface FilterBarProps {
  onFilterChange: (filters: CocktailFilters) => void;
}

const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<CocktailFilters>({
    spirit: undefined,
    secondarySpirits: [],
    style: undefined,
    method: undefined,
    glassType: undefined,
    garnish: undefined,
    flavorProfiles: [],
    strength: undefined,
    color: undefined,
    servingTemperature: undefined,
    canMake: false,
  });

  const handleFilterChange = <K extends keyof CocktailFilters>(
    key: K,
    value: CocktailFilters[K]
  ) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleFlavorToggle = (flavor: string) => {
    const currentFlavors = filters.flavorProfiles || [];
    const newFlavors = currentFlavors.includes(flavor)
      ? currentFlavors.filter(f => f !== flavor)
      : [...currentFlavors, flavor as any];
    handleFilterChange('flavorProfiles', newFlavors);
  };

  const handleSecondarySpiritsToggle = (spirit: string) => {
    const currentSpirits = filters.secondarySpirits || [];
    const newSpirits = currentSpirits.includes(spirit)
      ? currentSpirits.filter(s => s !== spirit)
      : [...currentSpirits, spirit];
    handleFilterChange('secondarySpirits', newSpirits);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">Filters</h3>
        <button
          className="flex items-center text-sm text-mixology-purple"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Filter size={18} className="mr-1" />
          {isExpanded ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {isExpanded && (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Base Spirit</Label>
              <Select
                value={filters.spirit}
                onValueChange={(value) => handleFilterChange('spirit', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select spirit" />
                </SelectTrigger>
                <SelectContent>
                  {spirits.map((spirit) => (
                    <SelectItem key={spirit} value={spirit}>
                      {spirit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Secondary Spirits</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    {filters.secondarySpirits?.length
                      ? `${filters.secondarySpirits.length} selected`
                      : "Select spirits"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  {spirits.map((spirit) => (
                    <DropdownMenuCheckboxItem
                      key={spirit}
                      checked={filters.secondarySpirits?.includes(spirit)}
                      onSelect={(e) => {
                        e.preventDefault();
                        handleSecondarySpiritsToggle(spirit);
                      }}
                    >
                      {spirit}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-2">
              <Label>Style</Label>
              <Select
                value={filters.style}
                onValueChange={(value) => handleFilterChange('style', value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  {styles.map((style) => (
                    <SelectItem key={style} value={style}>
                      {style}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Method</Label>
              <Select
                value={filters.method}
                onValueChange={(value) => handleFilterChange('method', value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  {methods.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Glass Type</Label>
              <Select
                value={filters.glassType}
                onValueChange={(value) => handleFilterChange('glassType', value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select glass" />
                </SelectTrigger>
                <SelectContent>
                  {glassTypes.map((glass) => (
                    <SelectItem key={glass} value={glass}>
                      {glass}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Strength</Label>
              <Select
                value={filters.strength}
                onValueChange={(value) => handleFilterChange('strength', value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select strength" />
                </SelectTrigger>
                <SelectContent>
                  {strengths.map((strength) => (
                    <SelectItem key={strength} value={strength}>
                      {strength}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Serving Temperature</Label>
              <Select
                value={filters.servingTemperature}
                onValueChange={(value) => handleFilterChange('servingTemperature', value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select temperature" />
                </SelectTrigger>
                <SelectContent>
                  {temperatures.map((temp) => (
                    <SelectItem key={temp} value={temp}>
                      {temp}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Color</Label>
              <Select
                value={filters.color}
                onValueChange={(value) => handleFilterChange('color', value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {colors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Flavor Profiles</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    {filters.flavorProfiles?.length
                      ? `${filters.flavorProfiles.length} selected`
                      : "Select flavors"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  {flavors.map((flavor) => (
                    <DropdownMenuCheckboxItem
                      key={flavor}
                      checked={filters.flavorProfiles?.includes(flavor as any)}
                      onSelect={(e) => {
                        e.preventDefault();
                        handleFlavorToggle(flavor);
                      }}
                    >
                      {flavor}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="pt-4">
            <label className="flex items-center space-x-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={filters.canMake}
                onChange={(e) => handleFilterChange('canMake', e.target.checked)}
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
