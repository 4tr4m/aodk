import { useState, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import recipeService from '../../../../services/recipeService';

/**
 * Custom hook for ingredient filter functionality on category page
 */
export const useIngredientFilter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isIngredientFilterVisible, setIsIngredientFilterVisible] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [selectedIngredientsCount, setSelectedIngredientsCount] = useState(0);

  // Handle URL parameter for ingredient filtering
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const ingredientParam = urlParams.get('ingredient');
    
    if (ingredientParam) {
      // Open the ingredient filter and automatically search for the ingredient
      setIsIngredientFilterVisible(true);
      
      // Automatically search for recipes with this ingredient
      const searchForIngredient = async () => {
        try {
          const recipes = await recipeService.getRecipesByIngredient(ingredientParam);
          setFilteredRecipes(recipes);
          setActiveFilter(ingredientParam);
          setSelectedIngredientsCount(1); // Single ingredient from URL
          
          // Set the selected ingredient for the filter
          setSelectedIngredient({ name: ingredientParam });
        } catch (error) {
          // Silently handle error
        }
      };
      
      searchForIngredient();
    }
  }, [location.search]);

  // Remove ?ingredient from URL
  const removeIngredientQueryParam = useCallback(() => {
    const params = new URLSearchParams(location.search);
    if (params.has('ingredient')) {
      params.delete('ingredient');
      navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
    }
  }, [location.pathname, location.search, navigate]);

  const handleIngredientFilterClose = useCallback(() => {
    // Only close the sidebar, but keep the filter results if ingredients are selected
    setIsIngredientFilterVisible(false);
    // Don't clear filteredRecipes or activeFilter - keep them visible
    // Only clear if user explicitly clears the filter
  }, []);

  const clearIngredientFilter = useCallback(() => {
    // This is called when user explicitly clears the filter
    setIsIngredientFilterVisible(false);
    setFilteredRecipes(null);
    setActiveFilter(null);
    setSelectedIngredient(null);
    setSelectedIngredientsCount(0);
    removeIngredientQueryParam();
  }, [removeIngredientQueryParam]);

  const toggleIngredientFilter = useCallback(() => {
    setIsIngredientFilterVisible(prev => !prev);
    // Don't clear filter when toggling - just open/close sidebar
  }, []);

  const handleRecipesFiltered = useCallback((recipes, ingredientName) => {
    // Ensure recipes is an array
    let recipesArray = [];
    if (Array.isArray(recipes)) {
      recipesArray = recipes.flat();
    } else if (recipes) {
      recipesArray = [recipes];
    }
    
    // Set filter even if no results - this allows showing "no results" message
    if (ingredientName) {
      setFilteredRecipes(recipesArray); // Can be empty array
      setActiveFilter(ingredientName);
      // Count ingredients - if comma-separated, count after splitting and trimming
      const count = ingredientName.includes(',') 
        ? ingredientName.split(',').map(s => s.trim()).filter(s => s.length > 0).length
        : 1;
      setSelectedIngredientsCount(count);
    } else {
      // Only clear if ingredientName is null/undefined
      setFilteredRecipes(null);
      setActiveFilter(null);
      setSelectedIngredientsCount(0);
    }
  }, []);

  return {
    isIngredientFilterVisible,
    filteredRecipes,
    activeFilter,
    selectedIngredient,
    selectedIngredientsCount,
    handleIngredientFilterClose,
    clearIngredientFilter,
    toggleIngredientFilter,
    handleRecipesFiltered,
  };
};

