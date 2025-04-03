import recipeService from './recipeService';

// Helper function to format recipe as a search suggestion
const formatRecipeAsSuggestion = (recipe) => {
  return {
    id: recipe.id,
    name: recipe.name || '',
    category: recipe.category || '',
    ingredients: recipe.ingredients || [],
    image: recipe.image || '',
    slug: recipe.slug || '',
  };
};

// Search recipes based on search term
const searchRecipes = async (searchTerm, limit = 50) => {
  if (!searchTerm || searchTerm.trim().length < 2) {
    return [];
  }

  try {
    const allRecipes = await recipeService.getAllRecipes();
    
    if (!allRecipes || !Array.isArray(allRecipes)) {
      console.error('Invalid recipes data:', allRecipes);
      return [];
    }

    const term = searchTerm.toLowerCase().trim();
    
    // Score and filter recipes based on relevance
    const scoredRecipes = allRecipes
      .map(recipe => {
        let score = 0;
        
        // Name match (highest priority)
        if (recipe.name && recipe.name.toLowerCase().includes(term)) {
          score += 100;
          // Bonus for exact match or match at start of name
          if (recipe.name.toLowerCase() === term) {
            score += 50;
          } else if (recipe.name.toLowerCase().startsWith(term)) {
            score += 25;
          }
        }
        
        // Category match
        if (recipe.category && recipe.category.toLowerCase().includes(term)) {
          score += 50;
        }
        
        // Ingredients match
        if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
          recipe.ingredients.forEach(ingredient => {
            if (ingredient && ingredient.toLowerCase().includes(term)) {
              score += 25;
            }
          });
        }
        
        // Preparation steps match
        if (recipe.preparation && Array.isArray(recipe.preparation)) {
          recipe.preparation.forEach(step => {
            if (step && step.toLowerCase().includes(term)) {
              score += 10;
            }
          });
        }
        
        return { recipe, score };
      })
      .filter(item => item.score > 0) // Only keep matches
      .sort((a, b) => b.score - a.score) // Sort by score (descending)
      .slice(0, limit) // Limit number of results
      .map(item => item.recipe); // Extract recipes
      
    return scoredRecipes;
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw new Error('Failed to search recipes');
  }
};

// Get search suggestions based on partial input
const getSuggestions = async (searchTerm, limit = 10) => {
  if (!searchTerm || searchTerm.trim().length < 2) {
    return [];
  }
  
  try {
    const matchingRecipes = await searchRecipes(searchTerm, limit);
    return matchingRecipes.map(formatRecipeAsSuggestion);
  } catch (error) {
    console.error('Error getting suggestions:', error);
    return [];
  }
};

const searchService = {
  searchRecipes,
  getSuggestions
};

export default searchService; 