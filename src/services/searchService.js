import supabase from '../lib/supabase-browser';

// Cache for recipes
let recipesCache = null;
let lastFetchTime = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function fetchAllRecipes() {
    // Return cached recipes if they're still valid
    if (recipesCache && lastFetchTime && (Date.now() - lastFetchTime < CACHE_DURATION)) {
        return recipesCache;
    }

    const { data: recipes, error } = await supabase
        .from('recipes')
        .select('id, name, category, base_ingredients, image, shortdesc');

    if (error) throw error;

    recipesCache = recipes;
    lastFetchTime = Date.now();
    return recipes;
}

function formatRecipeAsSuggestion(recipe) {
    return {
        name: recipe.name,
        category: recipe.category,
        ingredients: recipe.base_ingredients?.join(', ') || '',
        image: recipe.image,
        shortdesc: recipe.shortdesc,
        original: recipe
    };
}

function scoreRecipe(recipe, searchTerms) {
    let score = 0;
    
    // Skip if no base_ingredients
    if (!recipe.base_ingredients || !Array.isArray(recipe.base_ingredients)) {
        return score;
    }

    const recipeIngredients = recipe.base_ingredients.map(ing => ing.toLowerCase());
    const searchTermsLower = searchTerms.map(term => term.toLowerCase().trim());
    
    // Name matching (highest priority)
    if (recipe.name.toLowerCase().includes(searchTermsLower[0])) {
        score += 100;
    }

    // Ingredient matching
    const matchedIngredients = searchTermsLower.filter(term => 
        recipeIngredients.some(ingredient => ingredient.includes(term))
    );

    // Score based on how many ingredients matched
    if (matchedIngredients.length > 0) {
        // Base score for any match
        score += 50;
        
        // Additional score based on match ratio
        const matchRatio = matchedIngredients.length / searchTermsLower.length;
        score += matchRatio * 100;

        // Bonus for exact matches
        const exactMatches = searchTermsLower.filter(term => 
            recipeIngredients.includes(term)
        );
        score += exactMatches.length * 25;

        // Extra bonus if ALL search terms matched
        if (matchedIngredients.length === searchTermsLower.length) {
            score += 200;
        }
    }

    return score;
}

export async function getSuggestions(searchTerm) {
    if (!searchTerm || searchTerm.length < 2) return [];

    try {
        const recipes = await fetchAllRecipes();
        const searchTerms = searchTerm.toLowerCase()
            .split(' ')
            .filter(term => term.length >= 2)
            .slice(0, 8); // Limit to 8 ingredients

        // Score and filter recipes
        const scoredRecipes = recipes
            .map(recipe => ({
                recipe,
                score: scoreRecipe(recipe, searchTerms)
            }))
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 10); // Top 10 suggestions

        return scoredRecipes.map(item => formatRecipeAsSuggestion(item.recipe));

    } catch (error) {
        console.error('Error getting suggestions:', error);
        return [];
    }
}

export async function searchRecipes(searchTerm) {
    if (!searchTerm) return [];

    try {
        const recipes = await fetchAllRecipes();
        const searchTerms = searchTerm.toLowerCase()
            .split(' ')
            .filter(term => term.length >= 2)
            .slice(0, 8); // Limit to 8 ingredients

        // Score and filter recipes
        const scoredRecipes = recipes
            .map(recipe => ({
                recipe,
                score: scoreRecipe(recipe, searchTerms)
            }))
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score);

        return scoredRecipes.map(item => item.recipe);

    } catch (error) {
        console.error('Error searching recipes:', error);
        return [];
    }
}

export default {
    getSuggestions,
    searchRecipes
}; 