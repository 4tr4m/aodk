import recipeService from './recipeService';

// Cache for recipes to avoid repeated fetches
let recipesCache = null;
let lastSearchTerm = '';
let lastSearchResults = [];
let lastSuggestionsCache = {};

// Helper function to format recipe as a search suggestion
const formatRecipeAsSuggestion = (recipe) => {
  return {
    id: recipe.id,
    name: recipe.name || '',
    category: recipe.category || '',
    ingredients: recipe.ingredients || [],
    image: recipe.image || '',
    slug: recipe.slug || '',
    original: recipe // Keep the original recipe data for direct access
  };
};

// Function to fetch and cache all recipes
const getAndCacheAllRecipes = async () => {
  if (recipesCache) return recipesCache;
  
  try {
    const allRecipes = await recipeService.getAllRecipes();
    if (allRecipes && Array.isArray(allRecipes)) {
      recipesCache = allRecipes;
      // Pre-process recipes to optimize search
      recipesCache.forEach(recipe => {
        // Lowercase search fields for faster matching
        recipe._searchName = recipe.name ? recipe.name.toLowerCase() : '';
        recipe._searchCategory = recipe.category ? recipe.category.toLowerCase() : '';
        recipe._searchIngredients = recipe.ingredients 
          ? Array.isArray(recipe.ingredients) 
            ? recipe.ingredients.join(' ').toLowerCase()
            : recipe.ingredients.toLowerCase()
          : '';
      });
    }
    return recipesCache;
  } catch (error) {
    console.error('Error caching recipes:', error);
    return [];
  }
};

// Fast search for small changes in search term
const incrementalSearch = (searchTerm) => {
  // If new term is extension of old term, filter last results
  if (searchTerm.startsWith(lastSearchTerm) && lastSearchResults.length > 0) {
    const term = searchTerm.toLowerCase().trim();
    return lastSearchResults.filter(recipe => {
      return (
        (recipe._searchName && recipe._searchName.includes(term)) ||
        (recipe._searchCategory && recipe._searchCategory.includes(term)) ||
        (recipe._searchIngredients && recipe._searchIngredients.includes(term))
      );
    });
  }
  return null; // Signal that incremental search isn't applicable
};

// Search recipes based on search term
const searchRecipes = async (searchTerm, limit = 50) => {
  if (!searchTerm || searchTerm.trim().length < 2) {
    return [];
  }

  const term = searchTerm.toLowerCase().trim();
  
  // Return cached results if exact same search
  if (term === lastSearchTerm && lastSearchResults.length > 0) {
    return lastSearchResults;
  }
  
  // Try incremental search for better performance
  const incrementalResults = incrementalSearch(term);
  if (incrementalResults) {
    lastSearchTerm = term;
    lastSearchResults = incrementalResults;
    return incrementalResults;
  }

  try {
    const allRecipes = await getAndCacheAllRecipes();
    
    if (!allRecipes || !Array.isArray(allRecipes)) {
      console.error('Invalid recipes data:', allRecipes);
      return [];
    }

    // Score and filter recipes based on relevance - using pre-processed fields
    const scoredRecipes = allRecipes
      .map(recipe => {
        let score = 0;
        
        // Name match (highest priority) - using pre-processed field
        if (recipe._searchName && recipe._searchName.includes(term)) {
          score += 100;
          // Bonus for exact match or match at start of name
          if (recipe._searchName === term) {
            score += 50;
          } else if (recipe._searchName.startsWith(term)) {
            score += 25;
          }
        }
        
        // Category match - using pre-processed field
        if (recipe._searchCategory && recipe._searchCategory.includes(term)) {
          score += 50;
        }
        
        // Ingredients match - using pre-processed field
        if (recipe._searchIngredients && recipe._searchIngredients.includes(term)) {
          score += 25;
        }
        
        return { recipe, score };
      })
      .filter(item => item.score > 0) // Only keep matches
      .sort((a, b) => b.score - a.score) // Sort by score (descending)
      .slice(0, limit) // Limit number of results
      .map(item => item.recipe); // Extract recipes
      
    // Update cache
    lastSearchTerm = term;
    lastSearchResults = scoredRecipes;
      
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
  
  const term = searchTerm.toLowerCase().trim();
  
  // Check suggestion cache first
  if (lastSuggestionsCache[term]) {
    return lastSuggestionsCache[term];
  }
  
  try {
    const matchingRecipes = await searchRecipes(searchTerm, limit);
    const suggestions = matchingRecipes.map(formatRecipeAsSuggestion);
    
    // Cache the suggestions
    lastSuggestionsCache[term] = suggestions;
    
    // Limit cache size
    const cacheKeys = Object.keys(lastSuggestionsCache);
    if (cacheKeys.length > 50) {
      delete lastSuggestionsCache[cacheKeys[0]];
    }
    
    return suggestions;
  } catch (error) {
    console.error('Error getting suggestions:', error);
    return [];
  }
};

// Initialize cache on app start
getAndCacheAllRecipes();

const searchService = {
  searchRecipes,
  getSuggestions
};

export default searchService; 