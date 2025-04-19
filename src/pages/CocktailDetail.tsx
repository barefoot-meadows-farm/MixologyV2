
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Clock, ThumbsUp, Heart } from "lucide-react";
import { cocktails } from "../data/cocktails";

const CocktailDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Find the cocktail by ID
  const cocktail = cocktails.find(c => c.id === id);
  
  useEffect(() => {
    // Check if the cocktail is in local storage favorites
    const storedFavorites = localStorage.getItem('mixologyFavorites');
    if (storedFavorites && id) {
      const favorites = JSON.parse(storedFavorites);
      setIsFavorite(favorites.includes(id));
    }
  }, [id]);
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  const toggleFavorite = () => {
    if (!id) return;
    
    const storedFavorites = localStorage.getItem('mixologyFavorites');
    let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    
    if (isFavorite) {
      favorites = favorites.filter((favId: string) => favId !== id);
    } else {
      favorites.push(id);
    }
    
    localStorage.setItem('mixologyFavorites', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };
  
  if (!cocktail) {
    return (
      <div className="container mx-auto px-4 py-10">
        <button 
          onClick={handleGoBack}
          className="flex items-center text-mixology-purple mb-6"
        >
          <ChevronLeft size={20} className="mr-1" />
          Back
        </button>
        <div className="text-center py-10">
          <h1 className="text-2xl font-medium mb-4">Cocktail Not Found</h1>
          <p className="text-gray-600 mb-6">
            Sorry, the cocktail you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate('/browse')}
            className="px-6 py-2 bg-mixology-burgundy text-white rounded-lg"
          >
            Browse Cocktails
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 pb-20 md:pb-10">
      <button 
        onClick={handleGoBack}
        className="flex items-center text-mixology-purple mb-6 mt-4"
      >
        <ChevronLeft size={20} className="mr-1" />
        Back
      </button>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden dark:bg-mixology-navy/20">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={cocktail.image} 
            alt={cocktail.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-6">
              <h1 className="text-3xl font-serif font-medium text-white">{cocktail.name}</h1>
              <div className="flex items-center mt-2">
                <span className="bg-mixology-burgundy/90 text-white text-xs px-2 py-1 rounded-full">
                  {cocktail.difficulty || 'Easy'}
                </span>
                <span className="ml-2 flex items-center text-white text-sm">
                  <Clock size={14} className="mr-1" />
                  {cocktail.prepTime || '5 min'}
                </span>
                <span className="ml-2 flex items-center text-white text-sm">
                  <ThumbsUp size={14} className="mr-1" />
                  {cocktail.rating || '4.7'}
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={toggleFavorite}
            className={`absolute top-4 right-4 p-2 rounded-full ${
              isFavorite ? 'bg-mixology-burgundy text-white' : 'bg-white/80 text-mixology-burgundy'
            }`}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
        
        <div className="p-6">
          <h2 className="text-lg font-medium mb-2">Description</h2>
          <p className="text-gray-700 mb-6 dark:text-gray-300">{cocktail.description}</p>
          
          <h2 className="text-lg font-medium mb-2">Ingredients</h2>
          <ul className="mb-6">
            {cocktail.ingredients.map((ingredient, index) => (
              <li key={index} className="py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                {typeof ingredient === 'string' ? ingredient : ingredient.toString()}
              </li>
            ))}
          </ul>
          
          <h2 className="text-lg font-medium mb-2">Preparation</h2>
          {cocktail.preparation ? (
            <ol className="list-decimal pl-5 mb-6">
              {typeof cocktail.preparation === 'string' ? (
                <li className="py-1">{cocktail.preparation}</li>
              ) : Array.isArray(cocktail.preparation) ? (
                cocktail.preparation.map((step, index) => (
                  <li key={index} className="py-1">{step}</li>
                ))
              ) : null}
            </ol>
          ) : (
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Mix all ingredients and serve chilled.
            </p>
          )}
          
          <div className="mt-4 flex justify-center">
            <button className="bg-mixology-burgundy text-white px-6 py-3 rounded-lg font-medium">
              Make This Cocktail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CocktailDetail;
