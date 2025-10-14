// Image utility functions for consistent image path handling
// This ensures images work correctly in both development and production environments

/**
 * Get the correct base URL for static assets
 * In development: usually empty string
 * In production: might be the domain or subdirectory
 */
export const getBaseUrl = () => {
  return process.env.PUBLIC_URL || '';
};

/**
 * Construct image path with proper base URL
 * @param {string} imagePath - The image path relative to public folder
 * @returns {string} - Full image URL
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  
  // If imagePath already starts with http or /, use as is
  if (imagePath.startsWith('http') || imagePath.startsWith('/')) {
    return imagePath;
  }
  
  const baseUrl = getBaseUrl();
  return `${baseUrl}/img/${imagePath}`;
};

/**
 * Get znajdki product image with fallback chain
 * @param {Object} product - Product object
 * @returns {string} - Image URL
 */
export const getZnajdkiImageUrl = (product) => {
  if (!product) return '';
  
  const baseUrl = getBaseUrl();
  
  // Priority order for image sources
  const imageSources = [
    product.image ? `${baseUrl}/img/${product.image}` : null,
    `${baseUrl}/img/znajdki/${product.id}.jpg`,
    `${baseUrl}/img/znajdki/1.jpg`,
    `${baseUrl}/img/znajdki/default.jpg`
  ].filter(Boolean);
  
  return imageSources[0] || `${baseUrl}/img/znajdki/1.jpg`;
};

/**
 * Get recipe image URL with fallback
 * @param {Object} recipe - Recipe object
 * @returns {string} - Image URL
 */
export const getRecipeImageUrl = (recipe) => {
  if (!recipe?.image) return getImageUrl('ciasta.jpg');
  
  // If image already looks like an absolute or starts with /img, use as is
  if (typeof recipe.image === 'string' && (recipe.image.startsWith('http') || recipe.image.startsWith('/img/'))) {
    return recipe.image;
  }
  
  return getImageUrl(recipe.image);
};
