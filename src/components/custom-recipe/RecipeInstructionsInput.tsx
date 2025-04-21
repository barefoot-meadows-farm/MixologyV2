
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type Props = {
  register: any;
  errors: any;
};

const RecipeInstructionsInput = ({ register, errors }: Props) => (
  <div>
    <Label htmlFor="instructions">Instructions</Label>
    <Textarea
      id="instructions"
      placeholder="How to prepare your cocktail..."
      {...register("instructions", { required: "Instructions are required" })}
      className="mt-1"
      rows={5}
    />
    {errors.instructions && (
      <p className="text-red-500 text-sm mt-1">{errors.instructions.message}</p>
    )}
  </div>
);

export default RecipeInstructionsInput;
