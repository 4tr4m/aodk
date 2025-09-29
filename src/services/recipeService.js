import supabase from '../lib/supabase-browser';

/**
 * Service to handle recipe interactions with Supabase
 */
const recipeService = {
  /**
   * Get all recipes
   * @returns {Promise<Object>} - Supabase response with recipes data or error
   */
  getAllRecipes: async () => {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*');
      
      if (error) {
        console.error('Error fetching recipes:', error);
        return [];
      }
      
      return data || [];
    } catch (err) {
      console.error('Exception when fetching recipes:', err);
      return [];
    }
  },

  /**
   * Get recipes by category
   * @param {string} category - The category to filter by
   * @returns {Promise<Object>} - Supabase response with filtered recipes data or error
   */
  getRecipesByCategory: async (category) => {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('category', category);
      
      if (error) {
        console.error(`Error fetching ${category} recipes:`, error);
        return [];
      }
      
      return data || [];
    } catch (err) {
      console.error(`Exception when fetching ${category} recipes:`, err);
      return [];
    }
  },

  /**
   * Get a recipe by ID
   * @param {string} id - The ID of the recipe to get
   * @returns {Promise<Object>} - Supabase response with the recipe data or error
   */
  getRecipeById: async (id) => {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error(`Error fetching recipe with ID ${id}:`, error);
        return null;
      }
      
      return data;
    } catch (err) {
      console.error(`Exception when fetching recipe with ID ${id}:`, err);
      return null;
    }
  },

  /**
   * Search recipes by name
   * @param {string} query - The search query
   * @returns {Promise<Object>} - Supabase response with matching recipes or error
   */
  searchRecipes: async (query) => {
    return await supabase
      .from('recipes')
      .select('*')
      .ilike('name', `%${query}%`);
  },

  /**
   * Add a new recipe
   * @param {Object} recipe - The recipe object to add
   * @returns {Promise<Object>} - Supabase response with the added recipe or error
   */
  addRecipe: async (recipe) => {
    return await supabase
      .from('recipes')
      .insert(recipe)
      .select();
  },

  /**
   * Update an existing recipe
   * @param {string} id - The ID of the recipe to update
   * @param {Object} updates - The fields to update
   * @returns {Promise<Object>} - Supabase response with the updated recipe or error
   */
  updateRecipe: async (id, updates) => {
    return await supabase
      .from('recipes')
      .update(updates)
      .eq('id', id)
      .select();
  },

  /**
   * Delete a recipe
   * @param {string} id - The ID of the recipe to delete
   * @returns {Promise<Object>} - Supabase response
   */
  deleteRecipe: async (id) => {
    return await supabase
      .from('recipes')
      .delete()
      .eq('id', id);
  },

  /**
   * Fetch all categories
   * @returns {Promise<Object>} - Supabase response with categories data or error
   */
  getCategories: async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('display_name');
      
      if (error) {
        console.error('Error fetching categories:', error);
        return [];
      }
      
      return data || [];
    } catch (err) {
      console.error('Exception when fetching categories:', err);
      return [];
    }
  },

  /**
   * Get recipes by ingredient name using the junction table
   * @param {string} ingredientName - The name of the ingredient to search for
   * @returns {Promise<Array>} - Array of recipes containing the specified ingredient
   */
  getRecipesByIngredient: async (ingredientName) => {
    try {
      console.log('Searching for recipes with ingredient:', ingredientName);
      
      // Try to find ingredient_id from ingredients table first
      let ingredientId = null;
      try {
        console.log('Trying to search ingredients table for:', ingredientName);
        console.log('Query: SELECT ingredient_id FROM ingredients WHERE name ILIKE %' + ingredientName + '%');
        
        const { data: ingredientData, error: ingredientError } = await supabase
          .from('ingredients')
          .select('ingredient_id')
          .ilike('name', `%${ingredientName}%`)
          .limit(1);
        
        console.log('Raw Supabase response:', { 
          data: ingredientData, 
          error: ingredientError,
          dataType: typeof ingredientData,
          dataLength: ingredientData?.length,
          isArray: Array.isArray(ingredientData)
        });
        
        if (ingredientError) {
          console.error('❌ ERROR querying ingredients table:', ingredientError);
          console.error('Error code:', ingredientError.code);
          console.error('Error message:', ingredientError.message);
          console.error('Error details:', ingredientError.details);
          console.error('Error hint:', ingredientError.hint);
        } else if (ingredientData && ingredientData.length > 0) {
          ingredientId = ingredientData[0].ingredient_id;
          console.log('✅ Found ingredient ID from ingredients table:', ingredientId);
        } else {
          console.log('⚠️ No ingredient found in ingredients table for:', ingredientName);
          console.log('This might be due to RLS (Row Level Security) blocking access');
        }
      } catch (err) {
        console.error('💥 Exception when querying ingredients table:', err);
        console.log('Ingredients table not accessible, trying fallback approach');
      }
      
      // If we couldn't get ingredient_id from ingredients table, try to find it by searching recipes
      if (!ingredientId) {
        console.log('Searching for ingredient in base_ingredients as fallback...');
        const { data: recipesData, error: recipesError } = await supabase
          .from('recipes')
          .select('id, base_ingredients')
          .ilike('base_ingredients', `%${ingredientName}%`);
        
        if (recipesError) {
          console.error('Error fetching recipes for ingredient search:', recipesError);
          return [];
        }
        
        if (!recipesData || recipesData.length === 0) {
          console.log('No recipes found with ingredient:', ingredientName);
          return [];
        }
        
        // Get full recipe data
        const recipeIds = recipesData.map(recipe => recipe.id);
        const { data: fullRecipes, error: fullRecipesError } = await supabase
          .from('recipes')
          .select('*')
          .in('id', recipeIds);
        
        if (fullRecipesError) {
          console.error('Error fetching full recipe data:', fullRecipesError);
          return [];
        }
        
        console.log('Found recipes via fallback:', fullRecipes);
        return fullRecipes || [];
      }
      
      // Use ingredient_id to find recipes through junction table
      const { data, error } = await supabase
        .from('recipes_ingredients')
        .select(`
          recipe_id,
          recipes!inner (
            id,
            name,
            category,
            image,
            shortdesc,
            time,
            difficulty,
            base_ingredients
          )
        `)
        .eq('ingredient_id', ingredientId);
      
      console.log('Raw query result:', { data, error });
      
      if (error) {
        console.error(`Error fetching recipes for ingredient ${ingredientName}:`, error);
        return [];
      }
      
      const recipes = data?.map(item => item.recipes).filter(Boolean) || [];
      console.log('Found recipes:', recipes);
      return recipes;
    } catch (err) {
      console.error(`Exception when fetching recipes for ingredient ${ingredientName}:`, err);
      return [];
    }
  },

  /**
   * Get all ingredients from the junction table (fallback approach)
   * @returns {Promise<Array>} - Array of ingredients
   */
  getAllIngredients: async () => {
    try {
      console.log('Fetching all ingredients from recipes_ingredients...');
      
      // Get all unique ingredients from the junction table
      const { data: junctionData, error: junctionError } = await supabase
        .from('recipes_ingredients')
        .select('ingredient_id')
        .not('ingredient_id', 'is', null);
      
      console.log('Junction table data:', { junctionData, junctionError });
      
      if (junctionError) {
        console.error('Error fetching from junction table:', junctionError);
        return [];
      }
      
      // Get unique ingredient IDs
      const uniqueIngredientIds = [...new Set(junctionData?.map(item => item.ingredient_id) || [])];
      console.log('Unique ingredient IDs:', uniqueIngredientIds);
      
      // Try to get ingredient names from ingredients table
      let ingredientNames = new Map();
      try {
        const { data: ingredientsData, error: ingredientsError } = await supabase
          .from('ingredients')
          .select('ingredient_id, name')
          .in('ingredient_id', uniqueIngredientIds);
        
        if (!ingredientsError && ingredientsData) {
          ingredientsData.forEach(ingredient => {
            ingredientNames.set(ingredient.ingredient_id, ingredient.name);
          });
          console.log('Successfully fetched ingredient names from ingredients table');
        } else {
          console.log('Could not fetch from ingredients table, using fallback');
        }
      } catch (err) {
        console.log('Ingredients table not accessible, using fallback');
      }
      
      // Create ingredients array with names and count how many recipes use each ingredient
      const ingredientsWithCount = uniqueIngredientIds.map(ingredientId => {
        const count = junctionData.filter(item => item.ingredient_id === ingredientId).length;
        return {
          ingredient_id: ingredientId,
          name: ingredientNames.get(ingredientId) || `Składnik ${ingredientId}`,
          recipe_count: count
        };
      });
      
      // Sort by recipe count (descending) - most used ingredients first
      const sortedIngredients = ingredientsWithCount.sort((a, b) => b.recipe_count - a.recipe_count);
      
      console.log('Loaded ingredients (sorted by usage):', sortedIngredients);
      return sortedIngredients;
    } catch (err) {
      console.error('Exception when fetching ingredients:', err);
      return [];
    }
  },

  /**
   * Get ingredients for a specific recipe using the junction table
   * @param {string} recipeId - The ID of the recipe
   * @returns {Promise<Array>} - Array of ingredients for the recipe
   */
  getIngredientsForRecipe: async (recipeId) => {
    try {
      console.log('Fetching ingredients for recipe:', recipeId);
      
      // Step 1: Get ingredient_ids from recipes_ingredients table
      const { data: junctionData, error: junctionError } = await supabase
        .from('recipes_ingredients')
        .select('ingredient_id')
        .eq('recipe_id', recipeId);
      
      console.log('Junction table data:', { junctionData, junctionError });
      
      if (junctionError) {
        console.error('Error fetching from junction table:', junctionError);
        return [];
      }
      
      if (!junctionData || junctionData.length === 0) {
        console.log('No ingredients found for recipe:', recipeId);
        return [];
      }
      
      const ingredientIds = junctionData.map(item => item.ingredient_id);
      console.log('Ingredient IDs for recipe:', ingredientIds);
      
      // Step 2: Get ingredient names from ingredients table
      const { data: ingredientsData, error: ingredientsError } = await supabase
        .from('ingredients')
        .select('ingredient_id, name')
        .in('ingredient_id', ingredientIds);
      
      console.log('Ingredients data:', { ingredientsData, ingredientsError });
      
      if (ingredientsError) {
        console.error('Error fetching ingredient names:', ingredientsError);
        // Fallback: return ingredient IDs as names
        return ingredientIds.map(id => ({
          ingredient_id: id,
          name: `Składnik ${id}`
        }));
      }
      
      // Step 3: Return ingredients with names
      const ingredients = ingredientsData?.map(ingredient => ({
        ingredient_id: ingredient.ingredient_id,
        name: ingredient.name
      })) || [];
      
      console.log('Final ingredients for recipe:', ingredients);
      return ingredients;
    } catch (err) {
      console.error(`Exception when fetching ingredients for recipe ${recipeId}:`, err);
      return [];
    }
  }
};

export default recipeService; 