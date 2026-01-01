import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUtensils } from 'react-icons/fa';
import { processIngredients, replaceLinkPlaceholder } from '../../../utils/recipeUtils';

const RecipeIngredients = ({ ingredients, ingredientsRef, onMobileButtonClick, isMobileButtonVisible }) => {
  const { groups, hasGroups, normalized } = processIngredients(ingredients);
  
  if (!normalized || normalized.length === 0) return null;

  // Check if mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  return (
    <>
      {/* Fixed button on mobile when scrolled past ingredients section - icon only, compact */}
      <AnimatePresence mode="wait">
        {isMobile && onMobileButtonClick && isMobileButtonVisible && (
          <motion.button
            key="fixed-button"
            onClick={onMobileButtonClick}
            className="fixed top-20 right-4 z-[45] flex items-center justify-center bg-green-600 hover:bg-green-700 active:bg-green-800 text-white rounded-full shadow-lg hover:shadow-xl"
            style={{
              transform: 'translateZ(0)',
              willChange: 'transform',
              width: '48px',
              height: '48px',
              minWidth: '48px',
              minHeight: '48px',
              padding: '0',
              position: 'fixed',
              top: '80px',
              right: '16px',
              zIndex: 45,
            }}
            initial={{ 
              opacity: 0, 
              scale: 0.5,
              y: -20,
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: 0,
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.5,
              y: -20,
            }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 25,
              duration: 0.3
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Pokaż składniki"
            title="Składniki"
          >
            <motion.div
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <FaUtensils className="w-5 h-5" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
      
      <div 
        className="mb-8" 
        ref={ingredientsRef}
      >
        <div className="flex items-center justify-between gap-3 mb-4">
          <h2 className="text-xl font-bold text-gray-800 font-['Playfair_Display'] flex items-center gap-2">
            <FaUtensils className="text-green-600" />
            Składniki
          </h2>
          
          {/* Mobile button - inline with heading (hidden when fixed button is visible) */}
          <AnimatePresence mode="wait">
            {isMobile && onMobileButtonClick && !isMobileButtonVisible && (
              <motion.button
                key="inline-button"
                onClick={onMobileButtonClick}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg shadow-md hover:shadow-lg text-base font-semibold flex-shrink-0"
                style={{
                  paddingLeft: 'calc(0.75rem - 5px)',
                  paddingRight: 'calc(0.75rem - 5px)',
                }}
                initial={{ 
                  opacity: 0, 
                  scale: 0.8,
                  x: 20,
                }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  x: 0,
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.8,
                  x: 20,
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  duration: 0.3
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Pokaż składniki"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaUtensils className="w-4 h-4 flex-shrink-0" />
                </motion.div>
                <motion.span 
                  className="text-base"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                >
                  Składniki
                </motion.span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      
      {hasGroups ? (
        <div className="space-y-6">
          {groups.map((group, groupIdx) => (
            <div key={groupIdx} className="bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl p-4 sm:p-5 border border-gray-200">
              {group.title && (
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 font-['Playfair_Display'] pb-2 border-b border-gray-300">
                  {group.title}
                </h3>
              )}
              <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-gray-800">
                {group.items.map((ing, i) => (
                  <li key={i} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: replaceLinkPlaceholder(ing) }} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <ul className="list-disc pl-6 space-y-1 text-gray-800">
          {normalized.map((ing, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: replaceLinkPlaceholder(ing) }} />
          ))}
        </ul>
      )}
      </div>
    </>
  );
};

export default RecipeIngredients;

