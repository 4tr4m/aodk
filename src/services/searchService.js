import { supabase } from '../supabaseClient';
import { cleanIngredient } from '../utils/ingredientExtractor';

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
        .select('*');

    if (error) throw error;

    recipesCache = recipes;
    lastFetchTime = Date.now();
    return recipes;
}

function formatRecipeAsSuggestion(recipe, searchTerm) {
    return {
        name: recipe.name,
        category: recipe.category,
        ingredients: recipe.base_ingredients?.join(', ') || '',
        original: recipe
    };
}

function scoreRecipe(recipe, searchTerms) {
    let score = 0;
    const searchTermsLower = searchTerms.map(term => term.toLowerCase());
    
    // Name matching (highest priority)
    if (recipe.name.toLowerCase().includes(searchTermsLower[0])) {
        score += 100;
    }

    // Category matching
    if (recipe.category?.toLowerCase().includes(searchTermsLower[0])) {
        score += 50;
    }

    // Ingredient matching - support up to 8 ingredients
    if (recipe.base_ingredients) {
        const cleanedSearchTerms = searchTerms
            .slice(0, 8) // Limit to 8 ingredients
            .map(term => term.toLowerCase().trim());
        
        // Count exact ingredient matches
        const matchedTerms = cleanedSearchTerms.filter(term => 
            recipe.base_ingredients.some(ingredient => 
                ingredient === term || ingredient.includes(term)
            )
        );

        // Higher score for more matched ingredients
        const matchRatio = matchedTerms.length / cleanedSearchTerms.length;
        score += matchRatio * 150; // Increased weight for ingredient matches

        // Bonus for exact matches
        matchedTerms.forEach(term => {
            if (recipe.base_ingredients.includes(term)) {
                score += 50; // Higher bonus for exact matches
            }
        });

        // If all search terms matched, give significant bonus
        if (matchedTerms.length === cleanedSearchTerms.length && cleanedSearchTerms.length > 1) {
            score += 200;
        }
    }

    return score;
}

export async function getSuggestions(searchTerm) {
    if (!searchTerm || searchTerm.length < 2) return [];

    try {
        const recipes = await fetchAllRecipes();
        const searchTerms = searchTerm.toLowerCase().split(' ').filter(term => term.length >= 2);

        // Score and filter recipes
        const scoredRecipes = recipes
            .map(recipe => ({
                recipe,
                score: scoreRecipe(recipe, searchTerms)
            }))
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 10);

        // Format results as suggestions
        return scoredRecipes.map(item => formatRecipeAsSuggestion(item.recipe, searchTerm));

    } catch (error) {
        console.error('Error getting suggestions:', error);
        return [];
    }
}

export async function searchRecipes(searchTerm) {
    if (!searchTerm) return [];

    try {
        const recipes = await fetchAllRecipes();
        const searchTerms = searchTerm.toLowerCase().split(' ').filter(term => term.length >= 2);

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