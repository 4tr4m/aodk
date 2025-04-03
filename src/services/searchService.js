import recipeService from './recipeService';

const searchService = {
  // Filter recipes based on search term
  searchRecipes: async (searchTerm, maxResults = 10) => {
    if (!searchTerm || searchTerm.length < 3) {
      return [];
    }

    try {
      // Get all recipes from Supabase
      const recipes = await recipeService.getAllRecipes();
      
      if (!recipes || recipes.length === 0) {
        return [];
      }

      const lowerSearchTerm = searchTerm.toLowerCase();
      
      // Filter recipes that match the search term in name, category, or ingredients
      const filteredRecipes = recipes.filter(recipe => {
        // Check recipe name
        if (recipe.name && recipe.name.toLowerCase().includes(lowerSearchTerm)) {
          return true;
        }
        
        // Check recipe category
        if (recipe.category && recipe.category.toLowerCase().includes(lowerSearchTerm)) {
          return true;
        }
        
        // Check recipe ingredients
        if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
          return recipe.ingredients.some(ingredient => {
            if (typeof ingredient === 'string') {
              return ingredient.toLowerCase().includes(lowerSearchTerm);
            } else if (ingredient && typeof ingredient === 'object' && ingredient.name) {
              return ingredient.name.toLowerCase().includes(lowerSearchTerm);
            }
            return false;
          });
        }
        
        return false;
      });
      
      // Add a match score to each recipe to help sort by relevance
      const scoredRecipes = filteredRecipes.map(recipe => {
        let score = 0;
        
        // Higher score for matches in name
        if (recipe.name && recipe.name.toLowerCase().includes(lowerSearchTerm)) {
          score += 10;
          // Even higher score for matches at the beginning of name
          if (recipe.name.toLowerCase().startsWith(lowerSearchTerm)) {
            score += 5;
          }
        }
        
        // Medium score for matches in category
        if (recipe.category && recipe.category.toLowerCase().includes(lowerSearchTerm)) {
          score += 5;
        }
        
        // Lower score for matches in ingredients
        if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
          recipe.ingredients.forEach(ingredient => {
            let ingredientName = '';
            if (typeof ingredient === 'string') {
              ingredientName = ingredient;
            } else if (ingredient && typeof ingredient === 'object' && ingredient.name) {
              ingredientName = ingredient.name;
            }
            
            if (ingredientName.toLowerCase().includes(lowerSearchTerm)) {
              score += 2;
              // Slightly higher score if the ingredient starts with the search term
              if (ingredientName.toLowerCase().startsWith(lowerSearchTerm)) {
                score += 1;
              }
            }
          });
        }
        
        return {
          ...recipe,
          score
        };
      });
      
      // Sort by score (highest first) and limit results
      return scoredRecipes
        .sort((a, b) => b.score - a.score)
        .slice(0, maxResults);
    } catch (error) {
      console.error("Error in search service:", error.message);
      return [];
    }
  },
  
  // Format suggestions for the search bar
  formatSuggestions: (recipes) => {
    return recipes.map(recipe => ({
      id: recipe.id,
      name: recipe.name,
      category: recipe.category,
      ingredients: Array.isArray(recipe.ingredients) 
        ? recipe.ingredients.map(ing => typeof ing === 'string' ? ing : ing.name)
        : [],
      original: recipe // Keep the original recipe data
    }));
  }
};

export default searchService; 