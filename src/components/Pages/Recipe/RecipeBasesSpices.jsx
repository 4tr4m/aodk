import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUtensils, FaChevronDown } from 'react-icons/fa';
import { capitalizeFirstLetter } from '../../../utils/recipeUtils';

const RecipeBasesSpices = ({ recipe, isExpanded, onToggle }) => {
  const baseText = (recipe.base || recipe.bases || recipe.podstawa || '').toString();
  const spicesText = (recipe.spices || recipe.przyprawy || '').toString();
  const hasAny = baseText.trim().length > 0 || spicesText.trim().length > 0;
  
  if (!hasAny) return null;
  
  const baseItems = (baseText || '')
    .split(',')
    .map(i => i.trim())
    .filter(Boolean)
    .map(i => capitalizeFirstLetter(i));
  
  const spicesItems = (spicesText || '')
    .split(',')
    .map(i => i.trim())
    .filter(Boolean)
    .map(i => capitalizeFirstLetter(i));
  
  const allItems = [...baseItems, ...spicesItems];
  
  return (
    <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
      <motion.button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-3 p-2.5 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
        whileHover={{ scale: 1.005 }}
        whileTap={{ scale: 0.995 }}
      >
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 font-['Playfair_Display'] flex items-center gap-2">
          <FaUtensils className="text-green-600 text-sm sm:text-base" />
          Podstawa i Przyprawy
        </h2>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown className="w-3.5 h-3.5 text-gray-500 group-hover:text-green-600 transition-colors duration-200 flex-shrink-0" />
        </motion.div>
      </motion.button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ 
              height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
              opacity: { duration: 0.2, delay: 0.05 }
            }}
            className="overflow-hidden"
          >
            <div className="pt-3 sm:pt-4 pb-2">
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
                {allItems.map((item, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.03, duration: 0.2 }}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm bg-white text-gray-700 border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200 whitespace-nowrap cursor-default"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecipeBasesSpices;

