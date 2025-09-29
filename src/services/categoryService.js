import supabase from '../lib/supabase-browser';

const categoryService = {
  getCategories: async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*');
      
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