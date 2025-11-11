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
                  // Handle click on the link to mieszanka-2
                  const target = e.target.closest('a[data-newsletter-trigger]');
                  if (target) {
                    e.preventDefault();
                    onNewsletterLinkClick();
                  }
                }}
                dangerouslySetInnerHTML={{
                  __html: description.replace(
                    /{LINK}/g,
                    '<span class="inline-block relative group"><a href="/przepis/mieszanka-2" data-newsletter-trigger class="relative z-10 text-green-600 font-medium transition-colors duration-200 group-hover:text-green-700 underline decoration-1 underline-offset-2 cursor-pointer">optymalną domową mieszankę na mąkę bezglutenową</a><span class="absolute bottom-0 left-0 w-full h-[25%] bg-green-100/40 transform transition-all duration-200 -z-0 group-hover:h-[80%] group-hover:bg-green-50/20"></span></span>'
                  )
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

