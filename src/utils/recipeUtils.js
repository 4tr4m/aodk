/**
 * Utility functions for recipe-related operations
 */

/**
 * Get the full image source path for a recipe
 * @param {string|undefined} image - The image path from recipe data
 * @returns {string} The full image path
 */
export const getRecipeImageSrc = (image) => {
  if (!image) return '/img/ciasta.jpg';
  // If image already looks like an absolute or starts with /img, use as is; else prefix with /img/
  if (typeof image === 'string' && (image.startsWith('http') || image.startsWith('/img/'))) {
    return image;
  }
  return `/img/${image}`;
};

/**
 * Replace {LINK} placeholder with actual link to mieszanka-2 recipe
 * @param {string} text - Text that may contain {LINK} placeholder
 * @returns {string} Text with replaced links
 */
export const replaceLinkPlaceholder = (text) => {
  if (!text || typeof text !== 'string') return text;
  return text.replace(
    /\{LINK\}/g,
    '<a href="/przepis/mieszanka-2" class="text-green-600 hover:text-green-700 underline font-medium">uniwersalnej mieszanki mąk bezglutenowych</a>'
  );
};

/**
 * Capitalize first letter of each word
 * @param {string} text - Text to capitalize
 * @returns {string} Capitalized text
 */
export const capitalizeFirstLetter = (text) => {
  if (!text || typeof text !== 'string') return text;
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Process ingredients data into normalized format with optional grouping
 * @param {string|Array} ingredientsData - Raw ingredients data
 * @returns {{groups: Array, hasGroups: boolean, normalized: Array}} Processed ingredients
 */
export const processIngredients = (ingredientsData) => {
  if (!ingredientsData) return { groups: [], hasGroups: false, normalized: [] };
  
  const raw = ingredientsData;
  let items = [];
  if (Array.isArray(raw)) items = raw;
  else if (typeof raw === 'string') {
    items = raw.includes('\n') ? raw.split(/\r?\n/) : raw.split(',');
  }
  const normalized = items.map(i => i.trim()).filter(Boolean);
  if (normalized.length === 0) return { groups: [], hasGroups: false, normalized: [] };

  // Group ingredients by "Na" headers
  const groups = [];
  let currentGroup = { title: null, items: [] };
  let hasGroups = false;

  normalized.forEach((item) => {
    const trimmed = item.replace(/^\*\*|\*\*$/g, '').trim();
    if (trimmed.match(/^Na\s+[^:]+:/i)) {
      hasGroups = true;
      if (currentGroup.title || currentGroup.items.length > 0) {
        groups.push(currentGroup);
      }
      currentGroup = {
        title: trimmed.replace(/:/g, '').trim(),
        items: []
      };
    } else {
      currentGroup.items.push(item);
    }
  });

  if (currentGroup.title || currentGroup.items.length > 0) {
    groups.push(currentGroup);
  }

  return { groups, hasGroups, normalized };
};

