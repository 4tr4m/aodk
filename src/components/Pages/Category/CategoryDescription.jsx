import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const CategoryDescription = ({ 
  description, 
  isExpanded, 
  onToggleExpand,
  isSearching,
  isScrolled,
  onNewsletterLinkClick
}) => {
  if (!description) return null;

  // Process description to replace {categorySlug:recipe-id} or {recipe-id} format with clickable links
  const processDescription = (text) => {
    // Match pattern like: word {categorySlug:recipe-id} or word {recipe-id}
    // Supports both formats: {obiady:mieszanka-1} or {mieszanka-1}
    const regex = /(\S+)\s*\{([^}]+)\}/g;
    let processedText = text;
    let match;

    while ((match = regex.exec(text)) !== null) {
      const wordBefore = match[1]; // The word before {recipe-id}
      const recipeIdentifier = match[2]; // The content inside {} (could be "categorySlug:recipeId" or just "recipeId")
      const fullMatch = match[0]; // The full match including word and {recipe-id}

      // Parse the identifier - check if it contains a colon (categorySlug:recipeId format)
      let recipeId, recipeUrl;
      if (recipeIdentifier.includes(':')) {
        const [categorySlug, id] = recipeIdentifier.split(':');
        recipeId = id.trim();
        recipeUrl = `/kuchnia/${categorySlug.trim()}/${recipeId}`;
      } else {
        // Old format: just recipe ID (backward compatibility)
        recipeId = recipeIdentifier.trim();
        recipeUrl = `/przepis/${recipeId}`;
      }

      // Create the clickable link HTML
      const linkHtml = `<span class="inline-block relative group"><a href="${recipeUrl}" data-newsletter-trigger data-recipe-id="${recipeId}" class="relative z-10 text-green-600 font-medium transition-colors duration-200 group-hover:text-green-700 underline decoration-1 underline-offset-2 cursor-pointer">${wordBefore}</a><span class="absolute bottom-0 left-0 w-full h-[25%] bg-green-100/40 transform transition-all duration-200 -z-0 group-hover:h-[80%] group-hover:bg-green-50/20"></span></span>`;

      // Replace the full match (word + {recipe-id}) with just the clickable word
      processedText = processedText.replace(fullMatch, linkHtml);
    }

    return processedText;
  };

  const processedDescription = processDescription(description);

  return (
    <AnimatePresence>
      {description && !isSearching && !isScrolled && (
        <motion.div 
          className="w-full max-w-7xl mx-auto px-4 md:px-8 mb-4 md:mb-6"
          initial={{ opacity: 0, y: 10, height: 0 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            height: 'auto',
          }}
          exit={{ 
            opacity: 0, 
            y: -10,
            height: 0,
            marginBottom: 0,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <div className="bg-white rounded-lg p-4 md:p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 max-w-3xl mx-auto">
            <div className="prose prose-sm max-w-none">
              <p 
                className={`font-['Lato'] text-sm md:text-base text-gray-600 text-center max-w-2xl mx-auto leading-relaxed transition-all duration-200 ${
                  !isExpanded && description.length > 150 
                    ? 'overflow-hidden' 
                    : ''
                }`}
                style={{
                  display: !isExpanded && description.length > 150 ? '-webkit-box' : 'block',
                  WebkitLineClamp: !isExpanded && description.length > 150 ? 3 : 'unset',
                  WebkitBoxOrient: 'vertical'
                }}
                onClick={(e) => {
                  // Handle click on the recipe link
                  const target = e.target.closest('a[data-newsletter-trigger]');
                  if (target) {
                    e.preventDefault();
                    const recipeId = target.getAttribute('data-recipe-id');
                    if (recipeId && onNewsletterLinkClick) {
                      onNewsletterLinkClick(recipeId);
                    }
                  }
                }}
                dangerouslySetInnerHTML={{
                  __html: processedDescription
                }}
              />
              {description.length > 150 && (
                <motion.button
                  onClick={onToggleExpand}
                  className="mt-3 flex items-center justify-center gap-1.5 text-green-600 hover:text-green-700 font-medium text-sm transition-all duration-200 group mx-auto px-3 py-1.5 rounded-md hover:bg-green-50/50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isExpanded ? (
                    <>
                      <span>Pokaż mniej</span>
                      <FaChevronUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    </>
                  ) : (
                    <>
                      <span>Czytaj więcej</span>
                      <FaChevronDown className="w-3 h-3 group-hover:translate-y-0.5 transition-transform duration-200" />
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CategoryDescription;

