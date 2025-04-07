import supabase from '../lib/supabase-browser';

// Cache for recipes
let recipesCache = null;
let lastFetchTime = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Function to clear cache - call this when data structure changes
export function clearCache() {
    recipesCache = null;
    lastFetchTime = null;
    console.log('Cache cleared');
}

async function fetchAllRecipes() {
    // Return cached recipes if they're still valid
    if (recipesCache && lastFetchTime && (Date.now() - lastFetchTime < CACHE_DURATION)) {
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

function formatRecipeAsSuggestion(recipe) {
    return {
        id: recipe.id,
        name: recipe.name,
        category: recipe.category,
        ingredients: recipe.base_ingredients || '',
        image: recipe.image,
        shortdesc: recipe.shortdesc,
        original: recipe
    };
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

function recipeMatchesAllTerms(recipe, searchTerms) {
    if (!recipe.base_ingredients) return false;
    
    const normalizedIngredients = normalizePolishChars(recipe.base_ingredients);
    const normalizedName = normalizePolishChars(recipe.name || '');
    
    // Check if all search terms are found in either name or ingredients
    return searchTerms.every(term => {
        const normalizedTerm = normalizePolishChars(term.trim());
        return normalizedIngredients.includes(normalizedTerm) || normalizedName.includes(normalizedTerm);
    });
}

function scoreRecipe(recipe, searchTerms) {
    // If recipe doesn't match all terms, return 0 score immediately
    if (!recipeMatchesAllTerms(recipe, searchTerms)) {
        return 0;
    }

    let score = 0;
    const normalizedName = normalizePolishChars(recipe.name || '');
    const normalizedIngredients = normalizePolishChars(recipe.base_ingredients || '');
    const searchTermsNormalized = searchTerms.map(term => normalizePolishChars(term.trim()));
    
    // Debug logging
    console.log('Scoring recipe:', recipe.name);
    console.log('Search terms:', searchTermsNormalized);
    console.log('Base ingredients:', recipe.base_ingredients);
    
    // Name matching (highest priority)
    for (const term of searchTermsNormalized) {
        if (normalizedName.includes(term)) {
            score += 100;
            console.log('Name match found:', term);
        }
    }

    // Ingredient matching
    if (recipe.base_ingredients) {
        for (const term of searchTermsNormalized) {
            if (normalizedIngredients.includes(term)) {
                score += 75; // Significant score for ingredient match
                console.log('Ingredient match found:', term);
            }
        }

        // Extra points for matching all terms
        score += 150;
        console.log('All terms found!');
    }

    console.log('Final score:', score);
    return score;
}

export async function getSuggestions(searchTerm) {
    if (!searchTerm || searchTerm.length < 2) return [];

    console.log('Getting suggestions for:', searchTerm);

    try {
        const recipes = await fetchAllRecipes();
        const searchTerms = searchTerm
            .split(' ')
            .filter(term => term.length >= 2)
            .slice(0, 8); // Limit to 8 ingredients

        console.log('Processing search terms:', searchTerms);

        // Score and filter recipes
        const scoredRecipes = recipes
            .map(recipe => ({
                recipe,
                score: scoreRecipe(recipe, searchTerms)
            }))
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 10); // Top 10 suggestions

        console.log('Found matches:', scoredRecipes.length);
        return scoredRecipes.map(item => formatRecipeAsSuggestion(item.recipe));

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
        const searchTerms = searchTerm
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

        console.log('Found matches:', scoredRecipes.length);
        return scoredRecipes.map(item => item.recipe);

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