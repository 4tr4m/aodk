import React from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const RecipeDescription = ({ description, isExpanded, onToggle }) => {
  if (!description) return null;

  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4 font-['Playfair_Display'] flex items-center gap-2">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Opis przepisu
      </h2>
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200/50 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="prose max-w-none">
          <p className={`text-gray-700 leading-relaxed text-base sm:text-lg whitespace-pre-wrap transition-all duration-300 ${
            !isExpanded && description.length > 300 
              ? 'overflow-hidden' 
              : ''
          }`} style={{
            display: !isExpanded && description.length > 300 ? '-webkit-box' : 'block',
            WebkitLineClamp: !isExpanded && description.length > 300 ? 4 : 'unset',
            WebkitBoxOrient: 'vertical'
          }}>
            {description}
          </p>
          {description.length > 300 && (
            <motion.button
              onClick={onToggle}
              className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isExpanded ? (
                <>
                  <span>Pokaż mniej</span>
                  <FaChevronUp className="w-3 h-3 group-hover:translate-y-0.5 transition-transform duration-200" />
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
  );
};

export default RecipeDescription;

