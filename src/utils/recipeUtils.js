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
 * Slugify helper for recipe titles – removes Polish characters, special signs and normalizes dashes.
 * Example: "Chleb z mąki gryczanej!" -> "chleb-z-maki-gryczanej"
 * @param {string} text
 * @returns {string}
 */
export const slugifyText = (text) => {
  if (!text || typeof text !== 'string') return '';
  const polishMap = {
    ą: 'a', ć: 'c', ę: 'e', ł: 'l', ń: 'n', ó: 'o', ś: 's', ż: 'z', ź: 'z',
    Ą: 'a', Ć: 'c', Ę: 'e', Ł: 'l', Ń: 'n', Ó: 'o', Ś: 's', Ż: 'z', Ź: 'z',
  };
  const normalized = text
    .split('')
    .map((ch) => polishMap[ch] || ch)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // anything non alphanumeric -> dash
    .replace(/-+/g, '-') // collapse multiple dashes
    .replace(/^-|-$/g, ''); // trim dashes
  return normalized;
};

/**
 * Build canonical recipe slug part (used in URLs) with stable ID separator.
 * We use `--` as delimiter to safely keep IDs that may contain `-`.
 * Example: title="Chleb z mąki", id="abc-1" -> "chleb-z-maki--abc-1"
 * @param {{id?: string, name?: string}|string} recipe
 * @returns {string}
 */
export const getRecipeSlugForUrl = (recipe) => {
  if (!recipe) return '';
  const id = typeof recipe === 'string' ? recipe : recipe.id;
  const name = typeof recipe === 'string' ? '' : (recipe.name || '');
  const base = slugifyText(name || id || '');
  if (!id) return base;
  // If id is already encoded in the slug (legacy /przepis/abc-1), keep it as-is
  if (base === id || base.endsWith(`--${id}`)) return base;
  return `${base}--${id}`;
};

/**
 * Extract internal recipe ID from slug used in URL.
 * Supports:
 * - "chleb-z-maki--abc-1"  -> "abc-1"
 * - "abc-1" (legacy URLs) -> "abc-1"
 * @param {string} slug
 * @returns {string|null}
 */
export const extractRecipeIdFromSlug = (slug) => {
  if (!slug || typeof slug !== 'string') return null;
  const parts = slug.split('--');
  if (parts.length > 1) {
    return parts[parts.length - 1];
  }
  return slug;
};

/**
 * Get canonical path for a recipe detail page (one unique URL per recipe).
 * Example: "/przepis/chleb-z-maki--abc-1"
 * @param {{id?: string, name?: string}|string} recipe
 * @returns {string}
 */
export const getRecipeCanonicalPath = (recipe) => {
  const slug = getRecipeSlugForUrl(recipe);
  if (!slug) return '/przepis/';
  return `/przepis/${slug}`;
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
 * Normalize URL - keep full URLs as-is, convert relative URLs to proper format
 * Handles: full URLs (keeps as-is), relative URLs, short formats
 * @param {string} url - URL in any format
 * @param {boolean} keepFullUrl - If true, keep full URLs as-is (default: true)
 * @returns {string} Normalized URL (full URL kept as-is, relative URLs normalized)
 */
const normalizeUrl = (url, keepFullUrl = true) => {
  if (!url || typeof url !== 'string') return url;
  
  let normalized = url.trim();
  
  // Remove any surrounding quotes that might have been included
  normalized = normalized.replace(/^["']|["']$/g, '');
  
  // If it's a full URL and we want to keep it, return as-is
  if (keepFullUrl && (normalized.startsWith('http://') || normalized.startsWith('https://'))) {
    return normalized;
  }
  
  // Remove full domain if present (only if we're converting to relative)
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
  
  // Default classes for green, underlined, clickable links with nice UX
  const defaultLinkClasses = 'text-green-600 hover:text-green-700 underline font-medium transition-all duration-200 cursor-pointer hover:underline-offset-2 active:scale-95';
  
  // Process existing <a href> tags from database
  // CRITICAL: Support BOTH ASCII quotes (" ' code 34/39) AND Unicode quotes (U+201C U+201D U+2018 U+2019)
  // Using Unicode escape sequences to match curly quotes from database
  let processedText = text.replace(
    /<a\s+[^>]*?href\s*=\s*["\u201C\u201D'\u2018\u2019]([^"\u201C\u201D'\u2018\u2019]+)["\u201C\u201D'\u2018\u2019][^>]*?>(.*?)<\/a>/gi,
    (match, url, linkText) => {
      // Clean URL - remove any whitespace, quotes (both ASCII and Unicode), or artifacts
      let cleanUrl = url.trim();
      // Remove ASCII quotes (34, 39) and Unicode quotes (U+201C, U+201D, U+2018, U+2019)
      cleanUrl = cleanUrl.replace(/^["\u201C\u201D'\u2018\u2019]+|["\u201C\u201D'\u2018\u2019]+$/g, '');
      
      // CRITICAL: For full URLs, use them EXACTLY as-is (no normalization)
      // For relative URLs, normalize them
      let finalUrl;
      if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
        // Full URL - use EXACTLY as provided, no changes
        finalUrl = cleanUrl;
      } else {
        // Relative URL - normalize it
        finalUrl = normalizeUrl(cleanUrl, false);
      }
      
      // Return clean link with proper URL and styling
      // Use ASCII double quotes for href attribute
      return `<a href="${finalUrl}" class="${defaultLinkClasses}">${linkText}</a>`;
    }
  );
  
  // SECOND: Process placeholders - but only if text doesn't already contain links
  // Check if text already has links (to avoid wrapping links in links)
  const hasExistingLinks = /<a\s+[^>]*href/i.test(processedText);
  
  // Check if text contains a recipe link placeholder
  const recipeLinkRegex = /\{([^}]+)\}/;
  const match = processedText.match(recipeLinkRegex);
  
  if (match && !hasExistingLinks) {
    // Only process placeholders if there are no existing links (to avoid nesting)
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
      const [, id] = recipeIdentifier.split(':');
      recipeUrl = `/przepis/${id.trim()}`;
    } else {
      // Old format: just recipe ID (backward compatibility) - e.g., {mieszanka-1}
      recipeUrl = `/przepis/${recipeIdentifier}`;
    }
    
    // Remove the placeholder from the text
    const textWithoutPlaceholder = processedText.replace(/\s*\{[^}]+\}/g, '').trim();
    
    // Wrap the entire text in a clickable link with proper styling
    processedText = `<a href="${recipeUrl}" class="${defaultLinkClasses}">${textWithoutPlaceholder}</a>`;
  } else if (match && hasExistingLinks) {
    // If there are existing links, just remove the placeholder (don't wrap in link)
    processedText = processedText.replace(/\s*\{[^}]+\}/g, '').trim();
  } else {
    // Handle old {LINK} format for backward compatibility
    processedText = processedText.replace(
      /\{LINK\}/g,
      `<a href="/przepis/mieszanka-2" class="${defaultLinkClasses}">uniwersalnej mieszanki mąk bezglutenowych</a>`
    );
  }
  
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

