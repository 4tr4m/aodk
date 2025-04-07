import supabase from '../lib/supabase-browser';

// Cache for categories
let categoriesCache = null;
let lastFetchTime = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getCategories() {
    // Return cached categories if they're still valid
    if (categoriesCache && lastFetchTime && (Date.now() - lastFetchTime < CACHE_DURATION)) {
        return categoriesCache;
    }

    try {
        const { data: categories, error } = await supabase
            .from('categories')
            .select('*')
            .order('order', { ascending: true });

        if (error) {
            console.error('Error fetching categories:', error);
            return [];
        }

        // Transform the data to match the expected format
        const formattedCategories = categories.map(category => ({
            id: category.id,
            label: category.name,
            link: `/kuchnia/${category.slug}`,
            image: category.image_url,
            shortDesc: category.description,
            order: category.order
        }));

        // Update cache
        categoriesCache = formattedCategories;
        lastFetchTime = Date.now();

        return formattedCategories;
    } catch (error) {
        console.error('Error in getCategories:', error);
        return [];
    }
}

export function clearCategoriesCache() {
    categoriesCache = null;
    lastFetchTime = null;
}

const categoryService = {
    getCategories,
    clearCategoriesCache
};

export default categoryService; 