
import { useState } from "react";
import { FolderPlus, Folder } from "lucide-react";
import CocktailCard from "../components/CocktailCard";
import { cocktails } from "../data/cocktails";

// Mock favorite collections
const favoritesData = {
  collections: [
    { id: "all", name: "All Favorites" },
    { id: "summer", name: "Summer Favorites" },
    { id: "classics", name: "Classic Cocktails" },
    { id: "party", name: "Party Drinks" },
  ],
  // Sample data: first 2 cocktails in "All", first in "Summer", etc.
  items: {
    all: [cocktails[0], cocktails[1], cocktails[2], cocktails[5]],
    summer: [cocktails[2], cocktails[3]],
    classics: [cocktails[0], cocktails[4]],
    party: [cocktails[5]],
  },
};

const Favorites = () => {
  const [activeCollection, setActiveCollection] = useState("all");

  return (
    <div className="container mx-auto px-4 pb-20 md:pb-10">
      <h1 className="text-3xl font-serif font-medium text-mixology-purple mb-6">
        My Favorites
      </h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {favoritesData.collections.map((collection) => (
          <button
            key={collection.id}
            className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${
              activeCollection === collection.id
                ? "bg-mixology-burgundy text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveCollection(collection.id)}
          >
            {collection.id === "all" ? (
              <BookmarkIcon size={16} className="mr-1.5" />
            ) : (
              <Folder size={16} className="mr-1.5" />
            )}
            {collection.name}
          </button>
        ))}

        <button
          className="px-4 py-2 rounded-full text-sm font-medium bg-mixology-purple/10 text-mixology-purple flex items-center hover:bg-mixology-purple/20"
        >
          <FolderPlus size={16} className="mr-1.5" />
          New Collection
        </button>
      </div>

      {favoritesData.items[activeCollection as keyof typeof favoritesData.items]?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favoritesData.items[activeCollection as keyof typeof favoritesData.items].map((cocktail) => (
            <CocktailCard key={cocktail.id} cocktail={cocktail} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-2">No favorites in this collection yet</p>
          <button className="text-mixology-burgundy font-medium">
            Browse cocktails to add
          </button>
        </div>
      )}
    </div>
  );
};

export default Favorites;

// Lucide BookmarkIcon implementation for consistency
const BookmarkIcon = ({ size = 24, className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
    </svg>
  );
};
