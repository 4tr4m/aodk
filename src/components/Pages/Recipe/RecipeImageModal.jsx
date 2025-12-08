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

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!recipe) return null;

  const imageSrc = getRecipeImageSrc(recipe.image);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-2 sm:p-4 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            // Close when clicking outside the modal content
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-[95vw] h-[95vh] sm:h-auto sm:max-h-[90vh] flex flex-col overflow-hidden"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button - positioned inside modal, top-right corner */}
            <motion.button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 rounded-full p-2 sm:p-2.5 shadow-lg hover:shadow-xl transition-all duration-200 touch-manipulation flex items-center justify-center"
              aria-label="Zamknij"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <FaTimes className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>
            
            {/* Image container - full size, responsive */}
            <div className="relative flex-1 overflow-auto rounded-t-xl sm:rounded-t-2xl bg-gray-50 flex items-center justify-center min-h-0">
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                  <div className="flex flex-col items-center gap-3">
                    <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-3 border-green-600 border-t-transparent"></div>
                    <p className="text-sm text-gray-500">Ładowanie obrazu...</p>
                  </div>
                </div>
              )}
              <motion.img
                src={imageSrc}
                alt={recipe.name}
                className={`max-w-full max-h-full w-auto h-auto object-contain ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                } transition-opacity duration-300`}
                style={{
                  padding: 'clamp(1rem, 2vw, 2rem)'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: imageLoaded ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  setImageError(true);
                  setImageLoaded(true);
                  e.currentTarget.src = '/img/ciasta.jpg';
                }}
              />
              {imageError && (
                <div className="absolute inset-0 flex items-center justify-center p-4 bg-gray-50">
                  <div className="text-center">
                    <p className="text-gray-500 text-sm sm:text-base mb-2">Nie udało się załadować obrazu</p>
                    <button
                      onClick={onClose}
                      className="text-green-600 hover:text-green-700 text-sm font-medium underline"
                    >
                      Zamknij
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Recipe info footer - mobile responsive */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 sm:px-6 py-3 sm:py-4 rounded-b-xl sm:rounded-b-2xl border-t border-gray-200 flex-shrink-0">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 font-['Playfair_Display'] mb-1 line-clamp-2">
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

