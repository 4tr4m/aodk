import supabase from '../lib/supabase-browser';

const categoryService = {
  getCategories: async () => {
    try {
      // Try simple query first without ordering
      const { data, error } = await supabase
        .from('categories')
        .select('*');
        // .order('display_name'); // Temporarily commented - checking if column exists
      
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