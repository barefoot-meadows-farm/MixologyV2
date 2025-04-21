
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  register: any;
  errors: any;
};

const RecipeNameInput = ({ register, errors }: Props) => (
  <div>
    <Label htmlFor="name">Recipe Name</Label>
    <Input
      id="name"
      placeholder="Enter a name for your recipe"
      {...register("name", { required: "Recipe name is required" })}
      className="mt-1"
    />
    {errors.name && (
      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
    )}
  </div>
);

export default RecipeNameInput;
