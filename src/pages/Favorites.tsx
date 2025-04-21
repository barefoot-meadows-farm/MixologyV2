
import { useState, useEffect } from "react";
import { FolderPlus, Folder, Bookmark } from "lucide-react";
import CocktailCard from "../components/CocktailCard";
import { supabase } from "../integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cocktails } from "../data/cocktails";

const Favorites = () => {
  const [activeCollection, setActiveCollection] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [favoritesData, setFavoritesData] = useState({
    collections: [
      { id: "all", name: "All Favorites" },
      { id: "summer", name: "Summer Favorites" },
      { id: "classics", name: "Classic Cocktails" },
      { id: "party", name: "Party Drinks" },
    ],
    items: {
      all: [],
      summer: [],
      classics: [],
      party: [],
    },
  });
  const { toast } = useToast();

  useEffect(() => {
    async function loadFavorites() {
      setIsLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          // Use mock data for non-authenticated users
          setFavoritesData({
            collections: [
              { id: "all", name: "All Favorites" },
              { id: "summer", name: "Summer Favorites" },
              { id: "classics", name: "Classic Cocktails" },
              { id: "party", name: "Party Drinks" },
            ],
            items: {
              all: [cocktails[0], cocktails[1], cocktails[2], cocktails[5]],
              summer: [cocktails[2], cocktails[3]],
              classics: [cocktails[0], cocktails[4]],
              party: [cocktails[5]],
            },
          });
        } else {
          // In a real app, we would fetch actual favorites from the database
          // For now, we're still using mock data but showing how we would integrate with Supabase
          console.log("Logged in user, would fetch favorites for:", session.user.id);
          
          // Simulating a database call for favorites
          setFavoritesData({
            collections: [
              { id: "all", name: "All Favorites" },
              { id: "summer", name: "Summer Favorites" },
              { id: "classics", name: "Classic Cocktails" },
              { id: "party", name: "Party Drinks" },
            ],
            items: {
              all: [cocktails[0], cocktails[1], cocktails[2], cocktails[5]],
              summer: [cocktails[2], cocktails[3]],
              classics: [cocktails[0], cocktails[4]],
              party: [cocktails[5]],
            },
          });
        }
      } catch (error) {
        console.error("Error loading favorites:", error);
        toast({
          title: "Failed to load favorites",
          description: "Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
    
    loadFavorites();
  }, [toast]);

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
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
            onClick={() => setActiveCollection(collection.id)}
          >
            {collection.id === "all" ? (
              <Bookmark size={16} className="mr-1.5" />
            ) : (
              <Folder size={16} className="mr-1.5" />
            )}
            {collection.name}
          </button>
        ))}

        <button
          className="px-4 py-2 rounded-full text-sm font-medium bg-mixology-purple/10 text-mixology-purple flex items-center hover:bg-mixology-purple/20 dark:bg-mixology-purple/20 dark:hover:bg-mixology-purple/30"
        >
          <FolderPlus size={16} className="mr-1.5" />
          New Collection
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mixology-purple"></div>
        </div>
      ) : (
        <>
          {favoritesData.items[activeCollection as keyof typeof favoritesData.items]?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {favoritesData.items[activeCollection as keyof typeof favoritesData.items].map((cocktail) => (
                <CocktailCard key={cocktail.id} cocktail={cocktail} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-2 dark:text-gray-400">No favorites in this collection yet</p>
              <button className="text-mixology-burgundy font-medium dark:text-mixology-burgundy">
                Browse cocktails to add
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Favorites;
