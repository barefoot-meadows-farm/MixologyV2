
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { History, ExternalLink, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface DrinkHistoryItem {
  id: string;
  created_at: string;
  recipe_id: string;
  is_custom: boolean;
  recipe_name?: string;
  recipe_description?: string;
}

const DrinkHistory = () => {
  const [history, setHistory] = useState<DrinkHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to view your drink history",
          variant: "destructive",
        });
        return;
      }
      
      // Get history items
      const { data: historyData, error: historyError } = await supabase
        .from('user_drink_history')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (historyError) throw historyError;
      
      // Create an enriched history with details
      const enrichedHistory: DrinkHistoryItem[] = [];
      
      for (const item of historyData || []) {
        if (item.is_custom && item.recipe_id) {
          // Get custom recipe details
          const { data: recipe } = await supabase
            .from('user_custom_recipes')
            .select('name, description')
            .eq('id', item.recipe_id)
            .single();
          
          if (recipe) {
            enrichedHistory.push({
              ...item,
              recipe_name: recipe.name,
              recipe_description: recipe.description
            });
          } else {
            // Recipe might have been deleted
            enrichedHistory.push({
              ...item,
              recipe_name: "Deleted Recipe",
              recipe_description: "This recipe has been deleted"
            });
          }
        } else if (!item.is_custom && item.recipe_id) {
          // This would be a standard cocktail - for now use mockup
          enrichedHistory.push({
            ...item,
            recipe_name: "Standard Cocktail",  // In a real app, fetch from cocktails table
            recipe_description: "A standard cocktail recipe"
          });
        } else {
          // Unidentified recipe
          enrichedHistory.push({
            ...item,
            recipe_name: "Unknown Recipe",
            recipe_description: "Recipe details unavailable"
          });
        }
      }
      
      setHistory(enrichedHistory);
    } catch (error: any) {
      console.error("Error fetching history:", error);
      toast({
        title: "Failed to load history",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteHistoryItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('user_drink_history')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setHistory(prev => prev.filter(item => item.id !== id));
      
      toast({
        title: "History item deleted",
        description: "The item has been removed from your history",
      });
    } catch (error: any) {
      console.error("Error deleting history item:", error);
      toast({
        title: "Failed to delete",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    }
  };

  // Handle navigation to recipe details
  const viewRecipeDetails = (item: DrinkHistoryItem) => {
    if (item.is_custom) {
      // Navigate to custom recipe view (would need to be implemented)
      toast({
        description: "Viewing custom recipe: " + item.recipe_name
      });
    } else {
      // Navigate to standard cocktail
      navigate(`/cocktail/${item.recipe_id}`);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 dark:bg-mixology-navy/20">
      <div className="flex items-center mb-6">
        <History size={24} className="mr-3 text-mixology-purple dark:text-mixology-cream" />
        <h2 className="text-xl font-medium">Your Drink History</h2>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mixology-burgundy"></div>
        </div>
      ) : history.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.recipe_name || "Unknown Recipe"}</TableCell>
                <TableCell>{item.is_custom ? "Custom" : "Standard"}</TableCell>
                <TableCell>{formatDate(item.created_at)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => viewRecipeDetails(item)}
                      title="View details"
                    >
                      <ExternalLink size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteHistoryItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Remove from history"
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-2">You haven't made any drinks yet</p>
          <Button 
            onClick={() => navigate('/browse')}
            variant="outline"
          >
            Browse cocktails to make
          </Button>
        </div>
      )}
    </div>
  );
};

export default DrinkHistory;
