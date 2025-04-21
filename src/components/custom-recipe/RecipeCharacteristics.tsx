
import { Control, UseFormRegister } from "react-hook-form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

type Props = {
  register: UseFormRegister<any>;
  control: Control<any>;
};

// Define options for select fields
const strengthOptions = ["Low", "Medium", "High"];
const complexityOptions = ["Simple", "Moderate", "Complex"];

const colorOptions = [
  "Red", "Blue", "Green", "Yellow", "Orange", "Purple", 
  "Pink", "Brown", "Black", "White", "Clear", "Amber", "Gold", "Other"
];

const servingTemperatureOptions = ["Cold", "Room Temperature", "Hot"];

const flavorProfileOptions = [
  "Sweet", "Sour", "Bitter", "Herbal", "Spicy", "Fruity", 
  "Smoky", "Savory", "Umami", "Floral", "Nutty", "Creamy", "Dry", "Other"
];

const RecipeCharacteristics = ({ register, control }: Props) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-mixology-burgundy dark:text-mixology-cream">Flavor & Characteristics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="strength"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Strength</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select strength" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {strengthOptions.map(option => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="complexity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Complexity</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select complexity" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {complexityOptions.map(option => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {colorOptions.map(option => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="servingTemperature"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Serving Temperature</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select serving temperature" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {servingTemperatureOptions.map(option => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </div>

      <div>
        <FormField
          control={control}
          name="flavorProfile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Flavor Profile (select one or more)</FormLabel>
              <div className="flex flex-wrap gap-2 mt-2">
                {flavorProfileOptions.map(flavor => (
                  <div 
                    key={flavor} 
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      id={`flavor-${flavor}`}
                      value={flavor}
                      onChange={(e) => {
                        const value = e.target.value;
                        const isChecked = e.target.checked;
                        const currentValues = Array.isArray(field.value) ? field.value : [];
                        
                        field.onChange(
                          isChecked
                            ? [...currentValues, value]
                            : currentValues.filter(val => val !== value)
                        );
                      }}
                      checked={field.value?.includes(flavor) || false}
                      className="h-4 w-4 rounded border-gray-300 text-mixology-burgundy focus:ring-mixology-burgundy"
                    />
                    <label 
                      htmlFor={`flavor-${flavor}`}
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      {flavor}
                    </label>
                  </div>
                ))}
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default RecipeCharacteristics;
