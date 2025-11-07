import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUtensils, FaTimes } from 'react-icons/fa';

const StickyIngredientsSidebar = ({ 
  isVisible, 
  isOpen, 
  onOpen, 
  onClose, 
  ingredients, 
  processIngredients, 
  replaceLinkPlaceholder 
}) => {
  if (!ingredients) return null;

  const { groups, hasGroups, normalized } = processIngredients(ingredients);

  return (
    <AnimatePresence>
      {isVisible && !isOpen && (
        <motion.button
          onClick={onOpen}
          className="hidden lg:flex fixed right-4 top-1/2 -translate-y-1/2 z-40 items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 group"
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.9 }}
          whileHover={{ scale: 1.08, x: -4 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Pokaż składniki"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <FaUtensils className="w-5 h-5" />
          </motion.div>
          <span className="font-semibold">Składniki</span>
          <motion.div
            className="absolute -right-1 -top-1 w-3 h-3 bg-green-400 rounded-full"
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
      )}
      
      {isVisible && isOpen && (
        <motion.div
          className="hidden lg:block fixed right-4 top-1/2 -translate-y-1/2 z-40"
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 max-h-[calc(100vh-8rem)] overflow-hidden flex flex-col backdrop-blur-sm"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Header with close button */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 px-4 py-3 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <FaUtensils className="text-green-600 flex-shrink-0" />
                <h3 className="font-bold text-gray-800 font-['Playfair_Display'] text-base">Składniki</h3>
              </div>
              <motion.button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white/80 transition-colors text-gray-600 hover:text-gray-800 flex-shrink-0"
                aria-label="Zamknij"
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.85 }}
              >
                <FaTimes className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Ingredients Content */}
            <div className="overflow-y-auto flex-1 p-4 scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-gray-100">
              {hasGroups ? (
                <div className="space-y-4">
                  {groups.map((group, groupIdx) => (
                    <motion.div
                      key={groupIdx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: groupIdx * 0.1 }}
                      className="bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-lg p-3 border border-gray-200"
                    >
                      {group.title && (
                        <h4 className="text-sm font-bold text-gray-800 mb-2 font-['Playfair_Display'] flex items-center gap-1.5 pb-1.5 border-b border-gray-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                          {group.title}
                        </h4>
                      )}
                      <ul className="list-disc pl-4 space-y-1.5 text-gray-800 text-sm">
                        {group.items.map((ing, i) => (
                          <li key={i} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: replaceLinkPlaceholder(ing) }} />
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <ul className="list-disc pl-5 space-y-1.5 text-gray-800 text-sm">
                  {normalized.map((ing, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      dangerouslySetInnerHTML={{ __html: replaceLinkPlaceholder(ing) }}
                    />
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyIngredientsSidebar;

