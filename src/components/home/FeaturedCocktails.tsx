
import { Link } from "react-router-dom";
import CocktailCard from "../CocktailCard";
import { featuredCocktails } from "../../data/cocktails";

// Display only the first 4 featured cocktails
const displayedCocktails = featuredCocktails.slice(0, 4);

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
      {/* Responsive grid: 2 columns on small, 4 on medium+ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {displayedCocktails.map((cocktail) => (
          <CocktailCard key={cocktail.id} cocktail={cocktail} size="large" />
        ))}
      </div>
    </section>
  );
};

export default FeaturedCocktails;
