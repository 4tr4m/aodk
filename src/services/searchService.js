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
        .select('id, name, category, base_ingredients, image, shortdesc')
        .eq('is_published', true);

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

// Extract stem from Polish word by removing common endings
// Handles variations like: batat, bataty, batata, batatem, etc.
function extractPolishStem(word) {
    if (!word || word.length < 3) return word;
    
    const normalized = normalizePolishChars(word);
    
    // Common Polish noun endings (singular and plural cases)
    // Order matters - try longer endings first
    const endings = [
        'ami', 'ach', 'owi', 'ach', 'om', 'ów',  // plural cases
        'em', 'ie', 'iu', 'ą', 'ę', 'y', 'i', 'a', 'u', 'e', 'o'  // singular cases
    ];
    
    // Try to find the stem by removing endings
    for (const ending of endings) {
        if (normalized.endsWith(ending) && normalized.length > ending.length + 2) {
            return normalized.slice(0, -ending.length);
        }
    }
    
    // If no ending matches, return the word as-is (might already be a stem)
    return normalized;
}

// Generate possible variations of a word based on its stem
// This helps match "batat", "bataty", "batata", etc.
function getWordVariations(word) {
    if (!word || word.length < 3) return [normalizePolishChars(word)];
    
    const stem = extractPolishStem(word);
    const normalized = normalizePolishChars(word);
    
    // If the word is already the stem, generate variations
    if (normalized === stem) {
        return [
            stem,
            stem + 'a',   // genitive/accusative singular
            stem + 'y',   // nominative plural
            stem + 'i',   // genitive plural / dative singular
            stem + 'u',   // genitive singular
            stem + 'em',  // instrumental singular
            stem + 'owi', // dative singular
            stem + 'ie',  // locative singular
            stem + 'ów',  // genitive plural
            stem + 'om',  // dative plural
            stem + 'ami', // instrumental plural
            stem + 'ach'  // locative plural
        ];
    }
    
    // If word has an ending, return both the stem and the original
    return [stem, normalized];
}

// Check if search term matches ingredient with flexible Polish endings
function matchesIngredientFlexible(searchTerm, ingredient) {
    if (!searchTerm || !ingredient) return false;
    
    const normalizedSearch = normalizePolishChars(searchTerm);
    const normalizedIngredient = normalizePolishChars(ingredient);
    
    // Direct match (includes substring)
    if (normalizedIngredient.includes(normalizedSearch) || normalizedSearch.includes(normalizedIngredient)) {
        return true;
    }
    
    // Get variations of search term
    const searchVariations = getWordVariations(searchTerm);
    const ingredientVariations = getWordVariations(ingredient);
    
    // Check if any variation of search term matches any variation of ingredient
    for (const searchVar of searchVariations) {
        for (const ingVar of ingredientVariations) {
            // Check if one contains the other (flexible matching)
            if (searchVar.length >= 3 && ingVar.length >= 3) {
                if (ingVar.includes(searchVar) || searchVar.includes(ingVar)) {
                    return true;
                }
            }
            // Exact match on stems
            if (searchVar === ingVar && searchVar.length >= 3) {
                return true;
            }
        }
    }
    
    return false;
}

// Enhanced suggestion format
function formatRecipeAsSuggestion(recipe, searchTerm) {
    if (!recipe || !recipe.name) return null;
    
    // Check if search term matches ingredients (with flexible Polish endings)
    const matchingIngredients = recipe.base_ingredients ? 
        recipe.base_ingredients
            .split(',')
            .map(ingredient => ingredient.trim())
            .filter(ingredient => 
                matchesIngredientFlexible(searchTerm, ingredient)
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

    // Ingredient matching (lower priority) - with flexible Polish endings
    if (recipe.base_ingredients) {
        const ingredients = recipe.base_ingredients.split(',')
            .map(i => i.trim());
        
        for (const term of searchTermsNormalized) {
            for (const ingredient of ingredients) {
                // Match with flexible Polish endings
                if (matchesIngredientFlexible(term, ingredient)) {
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

                    // Ingredient matching (lower priority) - with flexible Polish endings
                    if (recipe.base_ingredients) {
                        const ingredients = recipe.base_ingredients.split(',')
                            .map(i => i.trim());
                        
                        // Check if any ingredient matches the current term (with flexible endings)
                        if (ingredients.some(ingredient => matchesIngredientFlexible(term, ingredient))) {
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