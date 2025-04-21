
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FolderPlus, Folder, Bookmark } from "lucide-react";
import CocktailCard from "../components/CocktailCard";
import { supabase } from "../integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cocktails } from "../data/cocktails";

const Favorites = () => {
  const [activeCollection, setActiveCollection] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
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
      custom: [] // Initialize the custom property to fix the type error
    },
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          console.log('User signed in or token refreshed:', session?.user?.email);
          setUser(session?.user || null);
          loadFavorites(session?.user?.id);
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out');
          setUser(null);
          loadFavorites();
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      loadFavorites(session?.user?.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function loadFavorites(userId?: string) {
    setIsLoading(true);
    try {
      if (!userId) {
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
        // For custom recipes, we can fetch user_custom_recipes from Supabase
        const { data: customRecipes, error } = await supabase
          .from('user_custom_recipes')
          .select('*');
        
        if (error) {
          console.error("Error fetching custom recipes:", error);
        } else {
          // Transform custom recipes to match the cocktail interface
          const customCocktails = customRecipes.map(recipe => ({
            id: recipe.id,
            name: recipe.name,
            description: recipe.description || '',
            image: '/placeholder.svg', // Use placeholder for now
            ingredients: recipe.ingredients,
            preparation: recipe.instructions,
            difficulty: 'Custom',
            prepTime: 'Custom',
            rating: '5.0',
            category: 'Custom',
            isPopular: false,
            isFeatured: false,
            canMake: true
          }));
          
          // For now, adding custom recipes to all collections
          setFavoritesData({
            collections: [
              { id: "all", name: "All Favorites" },
              { id: "summer", name: "Summer Favorites" },
              { id: "classics", name: "Classic Cocktails" },
              { id: "party", name: "Party Drinks" },
              { id: "custom", name: "My Recipes" },
            ],
            items: {
              all: [...customCocktails, cocktails[0], cocktails[1]],
              summer: [cocktails[2], cocktails[3]],
              classics: [cocktails[0], cocktails[4]],
              party: [cocktails[5]],
              custom: customCocktails,
            },
          });
        }
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

  const handleCreateCollection = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to create collections",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    // For now, just show a toast - would need a modal for collection creation
    toast({
      title: "Collection feature coming soon",
      description: "This feature is under development",
    });
  };

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
          onClick={handleCreateCollection}
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
              <button 
                className="text-mixology-burgundy font-medium dark:text-mixology-burgundy"
                onClick={() => navigate('/browse')}
              >
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
