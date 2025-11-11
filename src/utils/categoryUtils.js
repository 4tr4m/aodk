/**
 * Utility functions for category-related operations
 */

// Words that should remain lowercase (Polish prepositions and conjunctions)
const LOWERCASE_WORDS = [
  'i', 'a', 'w', 'z', 'na', 'do', 'od', 'po', 'przy', 'bez', 'dla', 'o', 'u', 
  'ze', 'we', 'ku', 'przeciw', 'między', 'nad', 'pod', 'przed', 'za', 'obok', 
  'wśród', 'dzięki', 'wobec', 'względem'
];

/**
 * Format category name - capitalize first letter of each word, except Polish prepositions/conjunctions
 * @param {string} name - Category name to format
 * @returns {string} Formatted category name
 */
export const formatCategoryName = (name) => {
  if (!name) return '';
  
  return name
    .split(' ')
    .map((word, index) => {
      // Always capitalize the first word
      if (index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
      // For other words, check if they should be lowercase
      if (LOWERCASE_WORDS.includes(word.toLowerCase())) {
        return word.toLowerCase();
      }
      // Capitalize other words
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
};

/**
 * Smart capitalize - converts slug to formatted category name
 * Replaces hyphens with spaces and formats like formatCategoryName
 * @param {string} str - Slug string (e.g., "babeczki-i-muffiny")
 * @returns {string} Formatted category name (e.g., "Babeczki i Muffiny")
 */
export const smartCapitalize = (str) => {
  if (!str) return '';
  
  return formatCategoryName(str.replace(/-/g, ' '));
};

