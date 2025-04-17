
import { Link } from "react-router-dom";
import CocktailCard from "../CocktailCard";
import { popularCocktails } from "../../data/cocktails";

const PopularCocktails = () => {
  return (
    <section className="container mx-auto px-4 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="section-title">Popular Cocktails</h2>
        <Link
          to="/browse"
          className="text-sm font-medium text-mixology-burgundy hover:underline dark:text-mixology-burgundy"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {popularCocktails.map((cocktail) => (
          <CocktailCard key={cocktail.id} cocktail={cocktail} size="small" />
        ))}
      </div>
    </section>
  );
};

export default PopularCocktails;
