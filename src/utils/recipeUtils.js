/**
 * Utility functions for recipe-related operations
 */

/**
 * Convert category name to URL-friendly slug
 * @param {string} category - Category name (e.g., "OBIADY", "BABECZKI i MUFFINY")
 * @returns {string} URL-friendly slug (e.g., "obiady", "babeczki-i-muffiny")
 */
export const getCategorySlug = (category) => {
  if (!category) return '';
  const categoryMap = {
    'OBIADY': 'obiady',
    'ZUPY': 'zupy',
    'CHLEBY': 'chleby',
    'SMAROWIDŁA': 'smarowidla',
    'DESERY': 'desery',
    'BABECZKI i MUFFINY': 'babeczki-i-muffiny',
    'CIASTA': 'ciasta',
    'CIASTKA': 'ciastka',
    'SMOOTHIE': 'smoothie',
    'INNE': 'inne',
    'ŚWIĘTA': 'swieta',
    'SNAKI': 'snaki',
    'SAŁATKI/SUROWKI': 'salatki-surowki',
    'LUNCH': 'lunch'
  };
  return categoryMap[category] || category.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-');
};

/**
 * Generate recipe URL with category for better SEO
 * @param {string} recipeId - Recipe ID
 * @param {string} category - Category name (optional, will be converted to slug)
 * @returns {string} Recipe URL (e.g., "/kuchnia/obiady/mieszanka-1" or "/przepis/mieszanka-1" if no category)
 */
export const getRecipeUrl = (recipeId, category = null) => {
  if (!recipeId) return '/przepis/';
  
  if (category) {
    const categorySlug = getCategorySlug(category);
    return `/kuchnia/${categorySlug}/${recipeId}`;
  }
  
  // Fallback to old format if no category provided
  return `/przepis/${recipeId}`;
};

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
 * Normalize URL to relative format
 * Handles: full URLs, relative URLs, short formats
 * @param {string} url - URL in any format
 * @returns {string} Normalized relative URL starting with /
 */
const normalizeUrl = (url) => {
  if (!url || typeof url !== 'string') return url;
  
  let normalized = url.trim();
  
  // Remove full domain if present
  normalized = normalized.replace(/^https?:\/\/(www\.)?autyzmodkuchni\.pl/i, '');
  
  // Ensure it starts with /
  if (!normalized.startsWith('/')) {
    normalized = '/' + normalized;
  }
  
  return normalized;
};

/**
 * Replace recipe link placeholders with actual clickable links
 * Supports formats:
 * - {categorySlug:recipeId} - e.g., {obiady:mieszanka-1} - makes the entire text clickable
 * - {recipeId} - e.g., {mieszanka-1} - makes the entire text clickable (backward compatibility)
 * - {LINK} - old format, replaced with mieszanka-2 link (backward compatibility)
 * - {URL:fullUrl} - e.g., {URL:https://www.autyzmodkuchni.pl/kuchnia/chleby/chleb-2} or {URL:kuchnia/chleby/chleb-2}
 * - Direct URLs in placeholders: {https://...} or {kuchnia/chleby/chleb-2}
 * @param {string} text - Text that may contain recipe link placeholders
 * @returns {string} Text with replaced links
 */
export const replaceLinkPlaceholder = (text) => {
  if (!text || typeof text !== 'string') return text;
  
  let processedText = text;
  
  // Check if text contains a recipe link placeholder
  const recipeLinkRegex = /\{([^}]+)\}/;
  const match = text.match(recipeLinkRegex);
  
  if (match) {
    const recipeIdentifier = match[1].trim(); // The content inside {}
    
    let recipeUrl;
    
    // Check if it's a URL format (starts with http, https, or contains /)
    if (recipeIdentifier.toLowerCase().startsWith('url:')) {
      // Format: {URL:https://...} or {URL:kuchnia/chleby/chleb-2}
      const urlPart = recipeIdentifier.substring(4).trim();
      recipeUrl = normalizeUrl(urlPart);
    } else if (recipeIdentifier.startsWith('http://') || recipeIdentifier.startsWith('https://')) {
      // Format: {https://www.autyzmodkuchni.pl/kuchnia/chleby/chleb-2}
      recipeUrl = normalizeUrl(recipeIdentifier);
    } else if (recipeIdentifier.includes('/')) {
      // Format: {kuchnia/chleby/chleb-2} or {/kuchnia/chleby/chleb-2}
      recipeUrl = normalizeUrl(recipeIdentifier);
    } else if (recipeIdentifier.includes(':')) {
      // Format: {categorySlug:recipeId} - e.g., {obiady:mieszanka-1}
      const [categorySlug, id] = recipeIdentifier.split(':');
      recipeUrl = `/kuchnia/${categorySlug.trim()}/${id.trim()}`;
    } else {
      // Old format: just recipe ID (backward compatibility) - e.g., {mieszanka-1}
      recipeUrl = `/przepis/${recipeIdentifier}`;
    }
    
    // Remove the placeholder from the text
    const textWithoutPlaceholder = text.replace(/\s*\{[^}]+\}/g, '').trim();
    
    // Wrap the entire text in a clickable link
    processedText = `<a href="${recipeUrl}" class="text-green-600 hover:text-green-700 underline font-medium transition-colors duration-200 cursor-pointer">${textWithoutPlaceholder}</a>`;
  } else {
    // Handle old {LINK} format for backward compatibility
    processedText = processedText.replace(
      /\{LINK\}/g,
      '<a href="/przepis/mieszanka-2" class="text-green-600 hover:text-green-700 underline font-medium transition-all duration-200 cursor-pointer hover:underline-offset-2">uniwersalnej mieszanki mąk bezglutenowych</a>'
    );
  }
  
  // Process all <a href> tags from database - add green color, underline, and nice UX effects
  // This handles direct HTML links from database
  processedText = processedText.replace(
    /<a\s+([^>]*?)href=["']([^"']+)["']([^>]*?)>(.*?)<\/a>/gi,
    (match, attrsBefore, url, attrsAfter, linkText) => {
      const normalized = normalizeUrl(url);
      
      // Default classes for green, underlined, clickable links
      const defaultClasses = 'text-green-600 hover:text-green-700 underline font-medium transition-all duration-200 cursor-pointer hover:underline-offset-2 active:scale-95';
      
      // Extract existing class attribute if present
      const allAttrs = (attrsBefore + ' ' + attrsAfter).trim();
      const classMatch = allAttrs.match(/class=["']([^"']+)["']/i);
      
      let finalClasses = defaultClasses;
      if (classMatch) {
        const existingClasses = classMatch[1];
        // Remove conflicting color/underline classes and keep others
        const cleanedClasses = existingClasses
          .replace(/\b(text-\w+|hover:text-\w+|underline|font-\w+|transition-\w+|cursor-\w+|hover:underline-offset-\w+|active:scale-\w+)\b/g, '')
          .trim();
        if (cleanedClasses) {
          finalClasses = `${cleanedClasses} ${defaultClasses}`.trim();
        }
      }
      
      // Remove class attribute from attrs and add our classes
      const attrsWithoutClass = allAttrs.replace(/class=["'][^"']*["']/gi, '').trim();
      const finalAttrs = attrsWithoutClass ? `${attrsWithoutClass} ` : '';
      
      return `<a ${finalAttrs}href="${normalized}" class="${finalClasses}">${linkText}</a>`;
    }
  );
  
  return processedText;
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

