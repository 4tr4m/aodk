import React from 'react';
import { motion } from 'framer-motion';
import { FaInfoCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const RecipeFullDescription = ({ fulldesc, isExpanded, onToggle }) => {
  if (!fulldesc || !fulldesc.trim()) return null;

  return (
    <motion.div 
      className="mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {!isExpanded ? (
        <motion.button
          onClick={onToggle}
          className="w-full text-left bg-gray-50 hover:bg-gray-100 rounded-lg p-2.5 sm:p-3 border border-gray-200 shadow-sm hover:shadow transition-all duration-300 group"
          whileHover={{ scale: 1.005 }}
          whileTap={{ scale: 0.995 }}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors duration-200 flex-shrink-0">
                <FaInfoCircle className="w-4 h-4 text-green-600" />
              </div>
              <h2 className="text-sm sm:text-base font-semibold text-gray-800 font-['Playfair_Display']">
                Dowiedz się więcej o potrawie
              </h2>
            </div>
            <FaChevronDown className="w-3.5 h-3.5 text-gray-500 group-hover:text-green-600 group-hover:translate-y-0.5 transition-all duration-200 flex-shrink-0" />
          </div>
        </motion.button>
      ) : (
        <motion.div
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            onClick={onToggle}
            className="w-full flex items-center justify-between gap-3 p-2.5 sm:p-3 mb-2.5 sm:mb-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
            whileHover={{ scale: 1.005 }}
            whileTap={{ scale: 0.995 }}
          >
            <h2 className="text-sm sm:text-base font-semibold text-gray-800 mb-0 font-['Playfair_Display'] flex items-center gap-2 group-hover:text-green-600 transition-colors">
              <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors duration-200 flex-shrink-0">
                <FaInfoCircle className="w-4 h-4 text-green-600" />
              </div>
              <span>Więcej o potrawie</span>
            </h2>
            <div className="flex items-center gap-1.5 text-gray-600 group-hover:text-green-600 font-medium text-sm transition-colors duration-200 flex-shrink-0">
              <span>Zwiń</span>
              <FaChevronUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </div>
          </motion.button>
          <motion.div 
            className="bg-gray-50 rounded-lg border border-gray-200 shadow-sm overflow-hidden"
            initial={{ maxHeight: 0, opacity: 0 }}
            animate={{ 
              maxHeight: isExpanded ? 5000 : 0,
              opacity: isExpanded ? 1 : 0
            }}
            transition={{ 
              maxHeight: {
                duration: 0.4,
                ease: [0.04, 0.62, 0.23, 0.98]
              },
              opacity: {
                duration: 0.25,
                delay: isExpanded ? 0.08 : 0
              }
            }}
          >
            <div className="p-3 sm:p-4 prose max-w-none">
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base whitespace-pre-wrap break-words">
                {fulldesc}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
      {!isExpanded && (
        <div className="sr-only">
          <p>{fulldesc}</p>
        </div>
      )}
    </motion.div>
  );
};

export default RecipeFullDescription;

