import supabase from '../lib/supabase-browser';

// Cache for recipes
let recipesCache = null;
let lastFetchTime = null;

// Helper to detect mobile devices
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Longer cache duration for mobile devices to save battery and data
const CACHE_DURATION = isMobile ? 15 * 60 * 1000 : 5 * 60 * 1000; // 15 minutes for mobile, 5 minutes for desktop

// Common Polish word endings for ingredients
const WORD_VARIATIONS = {
    'ko': ['ka', 'ek', 'ki', 'kow'], // jabłko -> jabłka, jabłek
    'ka': ['ko', 'ek', 'ki', 'kow'], // marchewka -> marchewek
    'ek': ['ka', 'ko', 'ki', 'kow'], // pomidorek -> pomidorki
    'ki': ['ka', 'ko', 'ek', 'kow'], // jabłki -> jabłko
};

// Ingredient glossary with common variations and synonyms
const INGREDIENT_GLOSSARY = {
    'jablko': ['jabłko', 'jabłka', 'jabłek', 'jabłkami'],
    'marchewka': ['marchew', 'marchewki', 'marchewek', 'marchewką'],
    'pomidor': ['pomidory', 'pomidorów', 'pomidorami', 'pomidorki'],
    'cebula': ['cebule', 'cebul', 'cebulą', 'cebulki'],
    'czosnek': ['czosnku', 'czosnkiem', 'czosnkowy'],
    'ziemniak': ['ziemniaki', 'ziemniaków', 'ziemniakami', 'ziemniaczany'],
    'maka': ['mąka', 'mąki', 'mąką', 'mączka'],
    'cukier': ['cukru', 'cukrem', 'cukrowy'],
    'sól': ['soli', 'solą'],
    'pieprz': ['pieprzu', 'pieprzem'],
    'olej': ['oleju', 'olejem', 'olejowy'],
    'masło': ['masła', 'masłem', 'maślany'],
    'jajko': ['jajka', 'jajek', 'jajkami', 'jajeczny'],
    'mleko': ['mleka', 'mlekiem', 'mleczny'],
    'ser': ['sery', 'serów', 'serami', 'serowy'],
    'kurczak': ['kurczaka', 'kurczakiem', 'kurczakowy'],
    'wołowina': ['wołowiną', 'wołowinę', 'wołowy'],
    'wieprzowina': ['wieprzowiną', 'wieprzowinę', 'wieprzowy'],
    'ryba': ['ryby', 'ryb', 'rybą', 'rybny'],
    'makaron': ['makaronu', 'makaronem', 'makaronowy'],
    'ryż': ['ryżu', 'ryżem', 'ryżowy'],
    'kasza': ['kasze', 'kaszy', 'kaszami'],
    'pizza': ['pizze', 'pizzą', 'pizzowy'],
    'pierogi': ['pierogów', 'pierogami', 'pierogowy']
};

// Helper function to get word stem (remove last 2 letters)
function getWordStem(word) {
    return word.slice(0, -2);
}

// Helper function to check if words match including variations
function wordsMatch(word1, word2) {
    word1 = word1.toLowerCase();
    word2 = word2.toLowerCase();

    // Direct match
    if (word1 === word2) return true;

    // Get the last two letters of each word
    const ending1 = word1.slice(-2);
    const ending2 = word2.slice(-2);

    // Get stems
    const stem1 = getWordStem(word1);
    const stem2 = getWordStem(word2);

    // If stems match, check if endings are related
    if (stem1 === stem2) return true;

    // Check if either word's ending has variations that match the other word
    if (WORD_VARIATIONS[ending1]) {
        const variations = WORD_VARIATIONS[ending1];
        if (variations.some(ending => stem1 + ending === word2)) return true;
    }

    if (WORD_VARIATIONS[ending2]) {
        const variations = WORD_VARIATIONS[ending2];
        if (variations.some(ending => stem2 + ending === word1)) return true;
    }

    // Partial match (one word contains the other)
    if (word1.includes(word2) || word2.includes(word1)) return true;

    return false;
}

// Helper function to get ingredient variations
function getIngredientVariations(ingredient) {
    const normalizedIngredient = normalizePolishChars(ingredient.toLowerCase());
    return INGREDIENT_GLOSSARY[normalizedIngredient] || [ingredient];
}

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
            .split(/[\s,]+/)
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

function recipeMatchesAllTerms(recipe, searchTerms) {
    if (!recipe.base_ingredients) return false;
    
    const normalizedIngredients = normalizePolishChars(recipe.base_ingredients);
    const normalizedName = normalizePolishChars(recipe.name || '');
    
    // Check if all search terms are found in either name or ingredients
    return searchTerms.every(term => {
        const normalizedTerm = normalizePolishChars(term.trim());
        
        // Check name match first (exact match)
        if (normalizedName.includes(normalizedTerm)) {
            return true;
        }
        
        // Check ingredients with variations
        const ingredientWords = normalizedIngredients.split(/[\s,]+/);
        const termVariations = getIngredientVariations(normalizedTerm);
        
        return ingredientWords.some(ingredient => 
            termVariations.some(variation => 
                ingredient === variation
            )
        );
    });
}

function scoreRecipe(recipe, searchTerms) {
    let score = 0;
    const normalizedName = normalizePolishChars(recipe.name || '');
    const normalizedIngredients = normalizePolishChars(recipe.base_ingredients || '');
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
        const ingredientWords = normalizedIngredients.split(/[\s,]+/);
        
        for (const term of searchTermsNormalized) {
            for (const ingredient of ingredientWords) {
                // Only exact matches for ingredients
                if (ingredient === term) {
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
        const searchTerms = searchTerm
            .split(' ')
            .filter(term => term.length >= 2)
            .slice(0, 8);

        // Score and filter recipes
        const scoredRecipes = recipes
            .map(recipe => {
                const normalizedName = normalizePolishChars(recipe.name || '');
                const normalizedIngredients = normalizePolishChars(recipe.base_ingredients || '');
                
                let score = 0;
                
                // Name matching (highest priority)
                searchTerms.forEach(term => {
                    const normalizedTerm = normalizePolishChars(term.toLowerCase());
                    if (normalizedName.includes(normalizedTerm)) {
                        score += 100;
                        if (normalizedName.startsWith(normalizedTerm)) {
                            score += 50;
                        }
                    }
                });

                // Ingredient matching (lower priority)
                if (recipe.base_ingredients) {
                    searchTerms.forEach(term => {
                        const normalizedTerm = normalizePolishChars(term.toLowerCase());
                        if (normalizedIngredients.includes(normalizedTerm)) {
                            score += 30;
                        }
                    });
                }

                return { recipe, score };
            })
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 5);

        // Format suggestions
        const suggestions = scoredRecipes
            .map(item => formatRecipeAsSuggestion(item.recipe, searchTerm))
            .filter(Boolean);

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