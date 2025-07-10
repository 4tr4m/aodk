import React from 'react';
import { FaUtensils } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ProductBaseIngredients = ({ recipe }) => (
  recipe.base_ingredients ? (
    <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
      <h3 className="flex items-center gap-2 font-['Playfair_Display'] text-lg sm:text-xl text-[#2D3748] font-bold mb-3 sm:mb-4">
        <FaUtensils className="text-green-600" />
        Podstawowe składniki
      </h3>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {recipe.base_ingredients
          .split(/[,\n]/)
          .map(ing => ing.trim())
          .filter(Boolean)
          .map((ingredient, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-sm
                ${i % 4 === 0 ? 'bg-green-100 text-green-800 border border-green-200' :
                  i % 4 === 1 ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                  i % 4 === 2 ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                  'bg-purple-100 text-purple-800 border border-purple-200'
                }`}
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-base sm:text-lg">•</span>
                <span>{ingredient}</span>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  ) : null
);

export default ProductBaseIngredients; 