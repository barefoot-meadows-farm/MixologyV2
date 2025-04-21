
import { Control, UseFormRegister } from "react-hook-form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
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
const spiritBaseOptions = [
  "Vodka", "Gin", "Rum", "Whiskey", "Tequila", "Bourbon", "Brandy", 
  "Mezcal", "Cognac", "Scotch", "Wine", "Champagne", "Beer", "Vermouth", 
  "Liqueur", "Non-Alcoholic", "Other"
];

const secondarySpiritOptions = [
  "Vodka", "Gin", "Rum", "Whiskey", "Tequila", "Bourbon", "Brandy", 
  "Mezcal", "Cognac", "Scotch", "Absinthe", "Amaro", "Aperitif", "Cordial", 
  "Liqueur", "Vermouth", "Sherry", "Port", "Other"
];

const styleOptions = [
  "Classic", "Contemporary", "Tiki", "Tropical", "Sour", "Martini", 
  "Old Fashioned", "Highball", "Flip", "Fizz", "Punch", "Smash", "Julep", 
  "Swizzle", "Collins", "Spritz", "Negroni", "Daiquiri", "Margarita", "Other"
];

const methodOptions = [
  "Shaken", "Stirred", "Built", "Blended", "Muddled", "Layered", 
  "Thrown", "Swizzled", "Rolled", "Whipped", "Other"
];

const glassTypeOptions = [
  "Martini", "Highball", "Rocks", "Collins", "Coupe", "Flute", 
  "Wine", "Hurricane", "Mug", "Shot", "Snifter", "Julep", "Tiki", "Other"
];

const iceTypeOptions = [
  "Cubed", "Crushed", "Large Cube", "Sphere", "Collins Spear", "Cracked", "None", "Other"
];

const RecipeCategorization = ({ register, control }: Props) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-mixology-burgundy dark:text-mixology-cream">Categorization</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form control={control}>
          <FormField
            control={control}
            name="spiritBase"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Spirit Base</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select base spirit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {spiritBaseOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </Form>

        <Form control={control}>
          <FormField
            control={control}
            name="method"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preparation Method</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {methodOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </Form>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form control={control}>
          <FormField
            control={control}
            name="glassType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Glass Type</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select glass type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {glassTypeOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </Form>

        <Form control={control}>
          <FormField
            control={control}
            name="iceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ice Type</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ice type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {iceTypeOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </Form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form control={control}>
          <FormField
            control={control}
            name="style"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Style (optional)</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {styleOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </Form>

        <div>
          <Label htmlFor="garnish">Garnish (optional)</Label>
          <Input
            id="garnish"
            placeholder="e.g., Lemon twist, Mint sprig"
            {...register("garnish")}
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
};

export default RecipeCategorization;
