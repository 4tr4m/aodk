import { useState, useEffect } from 'react';
import { useCart } from '../../../../context/CartContext';
import recipeService from '../../../../services/recipeService';

export const useRecipeData = (recipeId) => {
  const { state } = useCart();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const searchId = recipeId;
        
        // Try to find recipe in context first
        const allRecipes = Object.values(state.allRecipes).flat();
        const foundRecipe = allRecipes.find(r => r.id === searchId);
        
        if (foundRecipe) {
          // Recipe found in context (already filtered by is_published)
          setRecipe(foundRecipe);
          setIsInWishlist(state.wishlist.some(item => item.id === foundRecipe.id));
        } else {
          // If not found in context, fetch directly from Supabase using getRecipeById
          // This ensures we check is_published status
          const supabaseRecipe = await recipeService.getRecipeById(searchId);
          
          if (supabaseRecipe) {
            setRecipe(supabaseRecipe);
            setIsInWishlist(state.wishlist.some(item => item.id === supabaseRecipe.id));
          } else {
            setError('Przepis nie został znaleziony');
          }
        }
      } catch (err) {
        console.error('Error fetching recipe:', err);
        setError('Wystąpił błąd podczas ładowania przepisu');
      } finally {
        setLoading(false);
      }
    };

    if (recipeId) {
      fetchRecipe();
    }
  }, [recipeId, state.allRecipes, state.wishlist]);

  return { recipe, loading, error, isInWishlist, setIsInWishlist };
};

