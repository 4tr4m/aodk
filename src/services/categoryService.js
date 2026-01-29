import supabase from '../lib/supabase-browser';

const categoryService = {
  getCategories: async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        // .eq('is_displayed', true) // Temporarily commented - column doesn't exist in DB yet
        .order('display_name');
      
      if (error) {
        console.error('Error fetching categories:', error);
        return [];
      }
      
      return data || [];
    } catch (err) {
      console.error('Error fetching categories:', err);
      return [];
    }
  }
};

export default categoryService; 