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
        .eq('flag', true)  // Only fetch categories where flag is TRUE
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
  }
};

export default recipeService; 