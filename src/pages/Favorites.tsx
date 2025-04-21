import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";  // Use only the 'trash-2' icon per Lucide icon policy
import CocktailCard from "../components/CocktailCard";
import { supabase } from "../integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cocktails } from "../data/cocktails";

interface Collection {
  id: string;
  name: string;
}

interface FavoritesData {
  collections: Collection[];
  items: {
    custom: any[];
  };
}

const Favorites = () => {
  const [activeCollection, setActiveCollection] = useState("custom");
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // Only show user-created collections; by default, always have "My Recipes" (custom)
  const [favoritesData, setFavoritesData] = useState<FavoritesData>({
    collections: [
      { id: "custom", name: "My Recipes" }
    ],
    items: {
      custom: [],
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
        // Only show custom for guests
        setFavoritesData({
          collections: [
            { id: "custom", name: "My Recipes" },
          ],
          items: { custom: [] },
        });
      } else {
        // For logged-in user, fetch their collections (not implemented yet, only show custom)
        const { data: customRecipes, error } = await supabase
          .from('user_custom_recipes')
          .select('*');

        if (error) {
          setFavoritesData({
            collections: [{ id: "custom", name: "My Recipes" }],
            items: { custom: [] },
          });
        } else {
          const customCocktails = Array.isArray(customRecipes)
            ? customRecipes.map(recipe => ({
                id: recipe.id,
                name: recipe.name,
                description: recipe.description || '',
                image: '/placeholder.svg',
                ingredients: recipe.ingredients || [],
                preparation: recipe.instructions || '',
                difficulty: 'Custom',
                prepTime: 'Custom',
                rating: '5.0',
                category: 'Custom',
                isPopular: false,
                isFeatured: false,
                canMake: true
              }))
            : [];

          setFavoritesData({
            collections: [{ id: "custom", name: "My Recipes" }],
            items: { custom: customCocktails },
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
      // Initialize with empty data to prevent undefined errors
      setFavoritesData({
        collections: [{ id: "custom", name: "My Recipes" }],
        items: { custom: [] }
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Delete collection (currently only "My Recipes" exists, but supports future expansion)
  const handleDeleteCollection = async (collectionId: string) => {
    if (collectionId === "custom") {
      // Delete all custom recipes for the user
      if (!user) {
        toast({
          title: "Sign in required",
          description: "Please sign in to delete your recipes",
          variant: "destructive",
        });
        navigate('/login');
        return;
      }
      const confirmDelete = window.confirm("Delete all your custom recipes? This cannot be undone.");
      if (!confirmDelete) return;

      const { error } = await supabase
        .from('user_custom_recipes')
        .delete()
        .eq('user_id', user.id);
      if (error) {
        toast({
          title: "Error deleting recipes",
          description: error.message || "Something went wrong",
          variant: "destructive"
        });
        return;
      }
      toast({ title: "Deleted!", description: "All your custom recipes have been deleted." });
      // Reload after delete
      loadFavorites(user.id);
    }
  };

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
      {/* Show user collections (only custom for now, but can expand) */}
      <div className="flex flex-wrap gap-2 mb-6">
        {favoritesData.collections.map((collection) => (
          <div key={collection.id} className="flex items-center">
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${
                activeCollection === collection.id
                  ? "bg-mixology-burgundy text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
              onClick={() => setActiveCollection(collection.id)}
            >
              <span className="mr-1.5">🍸</span>
              {collection.name}
            </button>
            {/* Delete icon for custom collections */}
            {collection.id === "custom" && user && (
              <button
                onClick={() => handleDeleteCollection(collection.id)}
                className="ml-1 p-1 text-gray-500 hover:text-red-600"
                title="Delete all custom recipes"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Removed "New Collection" button */}

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mixology-purple"></div>
        </div>
      ) : (
        <>
          {favoritesData.items[activeCollection as keyof typeof favoritesData.items]?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {(favoritesData.items[activeCollection as keyof typeof favoritesData.items] || []).map((cocktail) => (
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
