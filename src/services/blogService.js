import supabase from '../lib/supabase-browser';

/**
 * Blog service for fetching blog articles from Supabase
 */
const blogService = {
  /**
   * Get all blog articles
   * @returns {Promise<Array>} Array of blog articles sorted by date (newest first)
   */
  getAllArticles: async () => {
    try {
      const { data, error } = await supabase
        .from('blog_articles')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) {
        console.error('Error fetching blog articles:', error);
        return [];
      }
      
      return data || [];
    } catch (err) {
      console.error('Exception when fetching blog articles:', err);
      return [];
    }
  },

  /**
   * Get single blog article by slug
   * @param {string} slug - Article slug
   * @returns {Promise<Object|null>} Article object or null if not found
   */
  getArticleBySlug: async (slug) => {
    try {
      const { data, error } = await supabase
        .from('blog_articles')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error) {
        console.error(`Error fetching article with slug ${slug}:`, error);
        return null;
      }
      
      return data;
    } catch (err) {
      console.error(`Exception when fetching article with slug ${slug}:`, err);
      return null;
    }
  },

  /**
   * Get articles by category
   * @param {string} category - Category name
   * @returns {Promise<Array>} Array of articles in the category
   */
  getArticlesByCategory: async (category) => {
    try {
      const { data, error } = await supabase
        .from('blog_articles')
        .select('*')
        .eq('category', category)
        .order('date', { ascending: false });
      
      if (error) {
        console.error(`Error fetching articles for category ${category}:`, error);
        return [];
      }
      
      return data || [];
    } catch (err) {
      console.error(`Exception when fetching articles for category ${category}:`, err);
      return [];
    }
  },

  /**
   * Get related articles by slugs
   * @param {Array<string>} slugs - Array of article slugs
   * @returns {Promise<Array>} Array of related articles
   */
  getRelatedArticles: async (slugs) => {
    if (!slugs || slugs.length === 0) return [];
    
    try {
      const { data, error } = await supabase
        .from('blog_articles')
        .select('slug, title, excerpt, image, date, category, author')
        .in('slug', slugs);
      
      if (error) {
        console.error('Error fetching related articles:', error);
        return [];
      }
      
      return data || [];
    } catch (err) {
      console.error('Exception when fetching related articles:', err);
      return [];
    }
  }
};

export default blogService;
