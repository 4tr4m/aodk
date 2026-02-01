import supabase from '../lib/supabase-browser';

const categoryService = {
  getCategories: async () => {
    try {
      // Try simple query first without ordering
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('id', { ascending: true }); // Sort by id to maintain database order
      
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