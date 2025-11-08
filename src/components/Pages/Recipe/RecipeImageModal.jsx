import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { getRecipeImageSrc } from '../../../utils/recipeUtils';

const RecipeImageModal = ({ isOpen, onClose, recipe }) => {
  if (!recipe) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] flex flex-col"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Zamknij"
            >
              <FaTimes size={32} className="bg-black/50 rounded-full p-2 hover:bg-black/70" />
            </button>
            
            <div className="relative flex-1 overflow-hidden rounded-t-2xl bg-gray-100 min-h-[400px]">
              <img
                src={getRecipeImageSrc(recipe.image)}
                alt={recipe.name}
                className="w-full h-full object-contain p-4 sm:p-8"
                onError={(e) => { e.currentTarget.src = '/img/ciasta.jpg'; }}
              />
            </div>
            
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 rounded-b-2xl border-t border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 font-['Playfair_Display'] mb-1">
                {recipe.name}
              </h3>
              <p className="text-sm text-gray-600">
                {recipe.shortdesc}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RecipeImageModal;

