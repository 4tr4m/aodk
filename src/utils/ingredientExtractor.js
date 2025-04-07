import { supabase } from '../supabaseClient';

// Common Polish measurements and their variations
const MEASUREMENTS = {
    units: [
        'szklanka', 'szklanki', 'szklanek',
        'łyżka', 'łyżki', 'łyżek',
        'łyżeczka', 'łyżeczki', 'łyżeczek',
        'gram', 'gramy', 'gramów',
        'kg', 'g', 'ml', 'l',
        'sztuka', 'sztuki', 'sztuk', 'szt',
        'opakowanie', 'opakowania', 'opakowań', 'opak'
    ],
    adjectives: [
        'duży', 'duża', 'duże',
        'mały', 'mała', 'małe',
        'średni', 'średnia', 'średnie',
        'świeży', 'świeża', 'świeże',
        'posiekany', 'posiekana', 'posiekane',
        'starty', 'starta', 'starte',
        'pokrojony', 'pokrojona', 'pokrojone'
    ],
    phrases: [
        'do smaku',
        'według uznania',
        'do dekoracji',
        'trochę',
        'kilka'
    ]
};

// Create regex patterns
const measurementRegex = new RegExp(
    `\\b(${MEASUREMENTS.units.join('|')})\\b`, 'gi'
);
const adjectiveRegex = new RegExp(
    `\\b(${MEASUREMENTS.adjectives.join('|')})\\b`, 'gi'
);
const phraseRegex = new RegExp(
    `\\b(${MEASUREMENTS.phrases.join('|')})\\b`, 'gi'
);
const numberRegex = /\d+(\s*[,-]\s*\d+)?/g;

export function cleanIngredient(ingredient) {
    if (!ingredient) return '';
    
    let cleaned = ingredient.toLowerCase().trim();
    
    // Remove numbers
    cleaned = cleaned.replace(numberRegex, '');
    
    // Remove measurements
    cleaned = cleaned.replace(measurementRegex, '');
    
    // Remove adjectives
    cleaned = cleaned.replace(adjectiveRegex, '');
    
    // Remove common phrases
    cleaned = cleaned.replace(phraseRegex, '');
    
    // Remove bullet points and extra whitespace
    cleaned = cleaned
        .replace(/^\s*[-•]\s*/, '')
        .replace(/\s+/g, ' ')
        .replace(/,/g, '')
        .trim();
    
    return cleaned;
}

export function extractBaseIngredients(ingredientsText) {
    if (!ingredientsText) return [];
    
    return ingredientsText
        .split('\n')
        .map(cleanIngredient)
        .filter(ingredient => ingredient.length > 0)
        .filter((ingredient, index, self) => 
            self.indexOf(ingredient) === index
        );
}

export async function processAllRecipes() {
    try {
        // Fetch all recipes
        const { data: recipes, error } = await supabase
            .from('recipes')
            .select('id, name, ingredients');
            
        if (error) throw error;
        
        // Process each recipe
        const processedRecipes = recipes.map(recipe => {
            const baseIngredients = extractBaseIngredients(recipe.ingredients);
            return {
                id: recipe.id,
                name: recipe.name,
                originalIngredients: recipe.ingredients,
                baseIngredients: baseIngredients
            };
        });
        
        // Create a master list of unique ingredients
        const allIngredients = new Set();
        processedRecipes.forEach(recipe => {
            recipe.baseIngredients.forEach(ingredient => {
                allIngredients.add(ingredient);
            });
        });
        
        return {
            recipes: processedRecipes,
            uniqueIngredients: Array.from(allIngredients).sort()
        };
        
    } catch (error) {
        console.error('Error processing recipes:', error);
        throw error;
    }
}

// Function to update recipe with base ingredients
export async function updateRecipeBaseIngredients(recipeId, baseIngredients) {
    try {
        const { error } = await supabase
            .from('recipes')
            .update({ base_ingredients: baseIngredients })
            .eq('id', recipeId);
            
        if (error) throw error;
        
        return true;
    } catch (error) {
        console.error('Error updating recipe:', error);
        throw error;
    }
} 