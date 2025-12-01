import supabase from '../lib/supabase-browser';

/**
 * Service to handle recipe interactions with Supabase
 */
const recipeService = {
  /**
   * Get all recipes (only published ones)
   * @returns {Promise<Object>} - Supabase response with recipes data or error
   */
  getAllRecipes: async () => {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('is_published', true);
      
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
   * Get recipes by category (only published ones)
   * @param {string} category - The category to filter by
   * @returns {Promise<Object>} - Supabase response with filtered recipes data or error
   */
  getRecipesByCategory: async (category) => {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('category', category)
        .eq('is_published', true);
      
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
   * Get a recipe by ID (only if published)
   * @param {string} id - The ID of the recipe to get
   * @returns {Promise<Object>} - Supabase response with the recipe data or error (null if unpublished)
   */
  getRecipeById: async (id) => {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('id', id)
        .eq('is_published', true)
        .single();
      
      if (error) {
        console.error(`Error fetching recipe with ID ${id}:`, error);
        return null;
      }
      
      // Double check: if recipe exists but is_published is false, return null
      if (data && data.is_published === false) {
        return null;
      }
      
      return data;
    } catch (err) {
      console.error(`Exception when fetching recipe with ID ${id}:`, err);
      return null;
    }
  },

  /**
   * Search recipes by name (only published ones)
   * @param {string} query - The search query
   * @returns {Promise<Object>} - Supabase response with matching recipes or error
   */
  searchRecipes: async (query) => {
    return await supabase
      .from('recipes')
      .select('*')
      .ilike('name', `%${query}%`)
      .eq('is_published', true);
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
      
      // Normalize ingredient name for search (trim and lowercase for better matching)
      const normalizedName = ingredientName?.trim().toLowerCase() || '';
      
      // Try to find ingredient_id from ingredients table first
      let ingredientId = null;
      try {
        console.log('Trying to search ingredients table for:', ingredientName, '(normalized:', normalizedName + ')');
        
        // Try exact match first (case-insensitive) with normalized name
        let { data: ingredientData, error: ingredientError } = await supabase
          .from('ingredients')
          .select('id')
          .ilike('name', normalizedName)
          .limit(1);
        
        // If no exact match, try partial match with normalized name
        if (!ingredientData || ingredientData.length === 0) {
          const { data: partialData, error: partialError } = await supabase
            .from('ingredients')
            .select('id')
            .ilike('name', `%${normalizedName}%`)
            .limit(1);
          
          if (!partialError && partialData && partialData.length > 0) {
            ingredientData = partialData;
            ingredientError = null;
          }
        }
        
        // If still no match, try with original name (in case it has special formatting)
        if ((!ingredientData || ingredientData.length === 0) && ingredientName !== normalizedName) {
          const { data: originalData, error: originalError } = await supabase
            .from('ingredients')
            .select('id')
            .ilike('name', `%${ingredientName}%`)
            .limit(1);
          
          if (!originalError && originalData && originalData.length > 0) {
            ingredientData = originalData;
            ingredientError = null;
          }
        }
        
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
          ingredientId = ingredientData[0].id;
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
          .ilike('base_ingredients', `%${ingredientName}%`)
          .eq('is_published', true);
        
        if (recipesError) {
          console.error('Error fetching recipes for ingredient search:', recipesError);
          return [];
        }
        
        if (!recipesData || recipesData.length === 0) {
          console.log('No recipes found with ingredient:', ingredientName);
          return [];
        }
        
        // Get full recipe data (only published)
        const recipeIds = recipesData.map(recipe => recipe.id);
        const { data: fullRecipes, error: fullRecipesError } = await supabase
          .from('recipes')
          .select('*')
          .in('id', recipeIds)
          .eq('is_published', true);
        
        if (fullRecipesError) {
          console.error('Error fetching full recipe data:', fullRecipesError);
          return [];
        }
        
        console.log('Found recipes via fallback:', fullRecipes);
        return fullRecipes || [];
      }
      
      // Use ingredient_id to find recipes through junction table
      // Step 1: Get recipe_ids from junction table
      const { data: junctionData, error: junctionError } = await supabase
        .from('recipe_ingredient')
        .select('recipe_id')
        .eq('ingredient_id', ingredientId);
      
      console.log('Junction table query result:', { junctionData, junctionError, ingredientId });
      
      if (junctionError) {
        console.error(`Error fetching recipe_ids from junction table for ingredient ${ingredientName}:`, junctionError);
        return [];
      }
      
      if (!junctionData || junctionData.length === 0) {
        console.log(`No recipes found for ingredient ${ingredientName} (ingredient_id: ${ingredientId})`);
        return [];
      }
      
      // Step 2: Get unique recipe IDs
      const recipeIds = [...new Set(junctionData.map(item => item.recipe_id))];
      console.log('Recipe IDs found:', recipeIds);
      
      // Step 3: Fetch full recipe data (only published)
      const { data: recipesData, error: recipesError } = await supabase
        .from('recipes')
        .select('*')
        .in('id', recipeIds)
        .eq('is_published', true);
      
      console.log('Recipes query result:', { recipesData, recipesError });
      
      if (recipesError) {
        console.error(`Error fetching recipes for ingredient ${ingredientName}:`, recipesError);
        return [];
      }
      
      const recipes = recipesData || [];
      console.log('Found recipes:', recipes.length, recipes);
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
      console.log('Fetching all ingredients from recipe_ingredient...');
      
      // Get all unique ingredients from the junction table
      const { data: junctionData, error: junctionError } = await supabase
        .from('recipe_ingredient')
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
          .select('id, name')
          .in('id', uniqueIngredientIds);
        
        if (!ingredientsError && ingredientsData) {
          ingredientsData.forEach(ingredient => {
            ingredientNames.set(ingredient.id, ingredient.name);
          });
          console.log('Successfully fetched ingredient names from ingredients table');
        } else {
          console.log('Could not fetch from ingredients table, using fallback');
          if (ingredientsError) {
            console.error('Ingredients table error:', ingredientsError);
          }
        }
      } catch (err) {
        console.log('Ingredients table not accessible, using fallback');
        console.error('Exception:', err);
      }
      
      // Helper function to capitalize first letter (keep rest as is)
      const capitalizeFirst = (str) => {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
      };

      // Create ingredients array with names and count how many recipes use each ingredient
      const ingredientsWithCount = uniqueIngredientIds.map(ingredientId => {
        const count = junctionData.filter(item => item.ingredient_id === ingredientId).length;
        const rawName = ingredientNames.get(ingredientId) || `Składnik ${ingredientId}`;
        return {
          ingredient_id: ingredientId,
          name: capitalizeFirst(rawName),
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
   * Get ingredients filtered by category
   * Only returns ingredients that are used in recipes from the specified category
   * @param {string} category - The category to filter by (e.g., 'OBIADY', 'ZUPY')
   * @returns {Promise<Array>} - Array of ingredients used in recipes from the category
   */
  getIngredientsByCategory: async (category) => {
    try {
      if (!category) {
        // If no category provided, return all ingredients
        return await recipeService.getAllIngredients();
      }

      console.log('Fetching ingredients for category:', category);
      
      // Step 1: Get all recipe IDs for this category
      const { data: categoryRecipes, error: recipesError } = await supabase
        .from('recipes')
        .select('id')
        .eq('category', category);
      
      if (recipesError) {
        console.error('Error fetching recipes for category:', recipesError);
        return [];
      }
      
      if (!categoryRecipes || categoryRecipes.length === 0) {
        console.log('No recipes found for category:', category);
        return [];
      }
      
      const recipeIds = categoryRecipes.map(recipe => recipe.id);
      console.log(`Found ${recipeIds.length} recipes in category ${category}`);
      
      // Step 2: Get ingredient IDs from junction table for these recipes
      const { data: junctionData, error: junctionError } = await supabase
        .from('recipe_ingredient')
        .select('ingredient_id')
        .in('recipe_id', recipeIds)
        .not('ingredient_id', 'is', null);
      
      if (junctionError) {
        console.error('Error fetching from junction table:', junctionError);
        return [];
      }
      
      // Get unique ingredient IDs
      const uniqueIngredientIds = [...new Set(junctionData?.map(item => item.ingredient_id) || [])];
      console.log('Unique ingredient IDs for category:', uniqueIngredientIds.length);
      
      if (uniqueIngredientIds.length === 0) {
        return [];
      }
      
      // Step 3: Get ingredient names from ingredients table
      let ingredientNames = new Map();
      try {
        const { data: ingredientsData, error: ingredientsError } = await supabase
          .from('ingredients')
          .select('id, name')
          .in('id', uniqueIngredientIds);
        
        if (!ingredientsError && ingredientsData) {
          ingredientsData.forEach(ingredient => {
            ingredientNames.set(ingredient.id, ingredient.name);
          });
        }
      } catch (err) {
        console.log('Could not fetch from ingredients table');
      }
      
      // Helper function to capitalize first letter
      const capitalizeFirst = (str) => {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
      };

      // Create ingredients array with names and count how many recipes use each ingredient in this category
      const ingredientsWithCount = uniqueIngredientIds.map(ingredientId => {
        // Count only recipes in this category that use this ingredient
        const count = junctionData.filter(item => item.ingredient_id === ingredientId).length;
        const rawName = ingredientNames.get(ingredientId) || `Składnik ${ingredientId}`;
        return {
          ingredient_id: ingredientId,
          name: capitalizeFirst(rawName),
          recipe_count: count
        };
      });
      
      // Sort by recipe count (descending) - most used ingredients first
      const sortedIngredients = ingredientsWithCount.sort((a, b) => b.recipe_count - a.recipe_count);
      
      console.log(`Loaded ${sortedIngredients.length} ingredients for category ${category}`);
      return sortedIngredients;
    } catch (err) {
      console.error('Exception when fetching ingredients by category:', err);
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
      
      // Step 1: Get ingredient_ids from recipe_ingredient table
      const { data: junctionData, error: junctionError } = await supabase
        .from('recipe_ingredient')
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
        .select('id, name')
        .in('id', ingredientIds);
      
      console.log('Ingredients data:', { ingredientsData, ingredientsError });
      
      if (ingredientsError) {
        console.error('Error fetching ingredient names:', ingredientsError);
        // Fallback: return ingredient IDs as names
        return ingredientIds.map(id => ({
          ingredient_id: id,
          name: `Składnik ${id}`
        }));
      }
      
      // Helper function to capitalize first letter (keep rest as is)
      const capitalizeFirst = (str) => {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
      };

      // Step 3: Return ingredients with names
      const ingredients = ingredientsData?.map(ingredient => ({
        ingredient_id: ingredient.id,
        name: capitalizeFirst(ingredient.name)
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