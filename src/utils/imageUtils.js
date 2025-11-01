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
  
  // Priority order for image sources (avoid duplicates)
  const imageSources = [];
  
  // 1. Custom image path if exists
  if (product.image) {
    imageSources.push(`${baseUrl}/img/${product.image}`);
  }
  
  // 2. Product-specific image (id-based)
  const productImagePath = `${baseUrl}/img/znajdki/${product.id}.jpg`;
  if (!imageSources.includes(productImagePath)) {
    imageSources.push(productImagePath);
  }
  
  // 3. Default fallback (only if product.id !== 1 to avoid duplicate)
  if (product.id !== 1) {
    const defaultOnePath = `${baseUrl}/img/znajdki/1.jpg`;
    if (!imageSources.includes(defaultOnePath)) {
      imageSources.push(defaultOnePath);
    }
  }
  
  // 4. Ultimate fallback
  const ultimateFallback = `${baseUrl}/img/znajdki/default.jpg`;
  if (!imageSources.includes(ultimateFallback)) {
    imageSources.push(ultimateFallback);
  }
  
  return imageSources[0] || `${baseUrl}/img/znajdki/default.jpg`;
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
