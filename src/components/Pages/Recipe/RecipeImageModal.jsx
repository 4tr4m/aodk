import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { getRecipeImageSrc } from '../../../utils/recipeUtils';

const RecipeImageModal = ({ isOpen, onClose, recipe }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Reset states when modal opens/closes or recipe changes
  useEffect(() => {
    if (isOpen && recipe) {
      setImageLoaded(false);
      setImageError(false);
    }
  }, [isOpen, recipe]);

  if (!recipe) return null;

  const imageSrc = getRecipeImageSrc(recipe.image);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-2 sm:p-4"
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
            className="relative bg-white rounded-lg sm:rounded-2xl shadow-2xl w-full h-full sm:h-auto sm:max-w-[95vw] sm:max-h-[95vh] flex flex-col"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button - mobile responsive */}
            <button
              onClick={onClose}
              className="absolute -top-10 sm:-top-12 right-0 sm:right-0 text-white hover:text-gray-300 transition-colors z-20 touch-manipulation"
              aria-label="Zamknij"
            >
              <FaTimes size={28} className="sm:w-8 sm:h-8 bg-black/50 rounded-full p-1.5 sm:p-2 hover:bg-black/70" />
            </button>
            
            {/* Image container - full size, responsive */}
            <div className="relative flex-1 overflow-auto rounded-t-lg sm:rounded-t-2xl bg-gray-100 flex items-center justify-center min-h-0">
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
                </div>
              )}
              <img
                src={imageSrc}
                alt={recipe.name}
                className={`max-w-full max-h-[calc(100vh-200px)] sm:max-h-[calc(95vh-120px)] w-auto h-auto object-contain ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                } transition-opacity duration-300`}
                style={{
                  padding: '1rem'
                }}
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  setImageError(true);
                  setImageLoaded(true);
                  e.currentTarget.src = '/img/ciasta.jpg';
                }}
              />
              {imageError && (
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <p className="text-gray-500 text-sm text-center">Nie udało się załadować obrazu</p>
                </div>
              )}
            </div>
            
            {/* Recipe info footer - mobile responsive */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 sm:px-6 py-3 sm:py-4 rounded-b-lg sm:rounded-b-2xl border-t border-gray-200 flex-shrink-0">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 font-['Playfair_Display'] mb-1 line-clamp-2">
                {recipe.name}
              </h3>
              {recipe.shortdesc && (
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 sm:line-clamp-none">
                  {recipe.shortdesc}
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RecipeImageModal;

