
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type Props = {
  register: any;
};

const RecipeDescriptionInput = ({ register }: Props) => (
  <div>
    <Label htmlFor="description">Description (optional)</Label>
    <Textarea
      id="description"
      placeholder="Describe your cocktail..."
      {...register("description")}
      className="mt-1"
    />
  </div>
);

export default RecipeDescriptionInput;
