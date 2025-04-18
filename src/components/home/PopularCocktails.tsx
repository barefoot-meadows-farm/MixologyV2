
import { Link } from "react-router-dom";
import CocktailCard from "../CocktailCard";
import { popularCocktails } from "../../data/cocktails";

// Display only the first 8 popular cocktails
const displayedCocktails = popularCocktails.slice(0, 8);

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
      {/* Responsive layout: Horizontal scroll on small screens, grid on medium+ */}
      <div className="flex space-x-4 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:gap-4 md:space-x-0 md:overflow-x-visible md:pb-0">
        {displayedCocktails.map((cocktail) => (
          <div key={cocktail.id} className="flex-shrink-0 w-36 md:w-auto"> {/* Ensure items don't shrink on flex row */}
            <CocktailCard cocktail={cocktail} size="small" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularCocktails;
