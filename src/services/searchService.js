import supabase from '../lib/supabase-browser';

// Cache for recipes
let recipesCache = null;
let lastFetchTime = null;

// Helper to detect mobile devices
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Longer cache duration for mobile devices to save battery and data
const CACHE_DURATION = isMobile ? 15 * 60 * 1000 : 5 * 60 * 1000; // 15 minutes for mobile, 5 minutes for desktop

// Function to clear cache - call this when data structure changes
export function clearCache() {
    recipesCache = null;
    lastFetchTime = null;
    console.log('Cache cleared');
}

async function fetchAllRecipes() {
    // Return cached recipes if they're still valid
    if (recipesCache && lastFetchTime && (Date.now() - lastFetchTime < CACHE_DURATION)) {
        console.log(`Using cached recipes (${isMobile ? 'mobile' : 'desktop'} cache duration: ${CACHE_DURATION/1000}s)`);
        return recipesCache;
    }

    const { data: recipes, error } = await supabase
        .from('recipes')
        .select('id, name, category, base_ingredients, image, shortdesc');

    if (error) {
        console.error('Error fetching recipes:', error);
        return [];
    }

    console.log('Fetched recipes:', recipes?.length || 0);
    recipesCache = recipes;
    lastFetchTime = Date.now();
    return recipes;
}

// Helper function to normalize Polish characters
function normalizePolishChars(text) {
    if (!text) return '';
    return text
        .toLowerCase()
        .replace(/ą/g, 'a')
        .replace(/ć/g, 'c')
        .replace(/ę/g, 'e')
        .replace(/ł/g, 'l')
        .replace(/ń/g, 'n')
        .replace(/ó/g, 'o')
        .replace(/ś/g, 's')
        .replace(/ź/g, 'z')
        .replace(/ż/g, 'z');
}

// Enhanced suggestion format
function formatRecipeAsSuggestion(recipe, searchTerm) {
    if (!recipe || !recipe.name) return null;
    
    const normalizedSearchTerm = normalizePolishChars(searchTerm.toLowerCase());
    
    // Check if search term matches ingredients
    const matchingIngredients = recipe.base_ingredients ? 
        recipe.base_ingredients
            .split(',')
            .map(ingredient => ingredient.trim())
            .filter(ingredient => 
                normalizePolishChars(ingredient.toLowerCase()).includes(normalizedSearchTerm)
            ) : [];

    return {
        id: recipe.id,
        name: recipe.name,
        category: recipe.category,
        ingredients: recipe.base_ingredients || '',
        matchingIngredients: matchingIngredients,
        image: recipe.image,
        shortdesc: recipe.shortdesc,
        original: recipe,
        type: matchingIngredients.length > 0 ? 'ingredient' : 'recipe'
    };
}

function scoreRecipe(recipe, searchTerms) {
    let score = 0;
    const normalizedName = normalizePolishChars(recipe.name || '');
    const searchTermsNormalized = searchTerms.map(term => normalizePolishChars(term.trim()));
    
    // Name matching (highest priority)
    for (const term of searchTermsNormalized) {
        if (normalizedName.includes(term)) {
            // Exact match in name gets highest score
            score += 200;
            // If the match is at the beginning of the name, give extra points
            if (normalizedName.startsWith(term)) {
                score += 100;
            }
        }
    }

    // Ingredient matching (lower priority)
    if (recipe.base_ingredients) {
        const ingredients = recipe.base_ingredients.split(',')
            .map(i => normalizePolishChars(i.trim()));
        
        for (const term of searchTermsNormalized) {
            for (const ingredient of ingredients) {
                // Match against full ingredient
                if (ingredient.includes(term)) {
                    score += 50;
                    break;
                }
            }
        }
    }

    return score;
}

export async function getSuggestions(searchTerm) {
    if (!searchTerm || searchTerm.length < 2) return [];

    try {
        const recipes = await fetchAllRecipes();
        const searchTerms = searchTerm.split(',').map(term => normalizePolishChars(term.toLowerCase().trim()));

        // Score and filter recipes
        const scoredRecipes = recipes
            .map(recipe => {
                const normalizedName = normalizePolishChars(recipe.name || '');
                let score = 0;
                
                // For each search term
                for (const term of searchTerms) {
                    if (term.length < 2) continue; // Skip very short terms
                    
                    // Name matching (highest priority)
                    if (normalizedName.includes(term)) {
                        score += 100;
                        if (normalizedName.startsWith(term)) {
                            score += 50;
                        }
                    }

                    // Ingredient matching (lower priority)
                    if (recipe.base_ingredients) {
                        const ingredients = recipe.base_ingredients.split(',')
                            .map(i => normalizePolishChars(i.trim()));
                        
                        // Check if any ingredient matches the current term
                        if (ingredients.some(ingredient => ingredient.includes(term))) {
                            score += 30;
                        }
                    }
                }

                return { recipe, score };
            })
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 5);

        // Format suggestions and remove duplicates by recipe ID
        const seenIds = new Set();
        const suggestions = scoredRecipes
            .map(item => formatRecipeAsSuggestion(item.recipe, searchTerm))
            .filter(Boolean)
            .filter(suggestion => {
              if (seenIds.has(suggestion.id)) {
                return false; // Duplicate
              }
              seenIds.add(suggestion.id);
              return true;
            });

        return suggestions;

    } catch (error) {
        console.error('Error getting suggestions:', error);
        return [];
    }
}

export async function searchRecipes(searchTerm) {
    if (!searchTerm) return [];

    console.log('Searching for:', searchTerm);

    try {
        const recipes = await fetchAllRecipes();
        const searchTerms = searchTerm.split(',').map(term => normalizePolishChars(term.toLowerCase().trim()));

        // Score and filter recipes
        const scoredRecipes = recipes
            .map(recipe => ({
                recipe,
                score: scoreRecipe(recipe, searchTerms)
            }))
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score);

        console.log('Found matches:', scoredRecipes.length);
        
        // Remove duplicates by recipe ID
        const uniqueRecipes = [];
        const seenIds = new Set();
        
        for (const item of scoredRecipes) {
          if (!seenIds.has(item.recipe.id)) {
            seenIds.add(item.recipe.id);
            uniqueRecipes.push(item.recipe);
          }
        }
        
        console.log('Unique recipes after deduplication:', uniqueRecipes.length);
        return uniqueRecipes;

    } catch (error) {
        console.error('Error searching recipes:', error);
        return [];
    }
}

// Create a named export object
const searchService = {
    getSuggestions,
    searchRecipes,
    clearCache
};

export default searchService; 