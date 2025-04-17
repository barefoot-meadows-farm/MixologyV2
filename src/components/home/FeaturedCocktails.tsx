
import { Link } from "react-router-dom";
import CocktailCard from "../CocktailCard";
import { featuredCocktails } from "../../data/cocktails";

const FeaturedCocktails = () => {
  return (
    <section className="container mx-auto px-4 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="section-title">Featured Cocktails</h2>
        <Link
          to="/browse"
          className="text-sm font-medium text-mixology-burgundy hover:underline dark:text-mixology-burgundy"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuredCocktails.map((cocktail) => (
          <CocktailCard key={cocktail.id} cocktail={cocktail} size="large" />
        ))}
      </div>
    </section>
  );
};

export default FeaturedCocktails;
