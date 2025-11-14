import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaHeart, FaShareAlt } from 'react-icons/fa';

const RecipeHeader = ({ onBack, onShare, onToggleWishlist, isInWishlist }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 -mt-6 mb-2">
      <div className="flex items-center justify-between">
        <motion.button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 rounded-lg transition-all duration-200 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="font-medium">Wróć do kategorii</span>
        </motion.button>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onShare}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
            title="Udostępnij"
          >
            <FaShareAlt />
          </button>
          <button
            onClick={onToggleWishlist}
            className={`p-2 rounded-full transition-colors ${
              isInWishlist 
                ? 'text-red-500 hover:text-red-600 hover:bg-red-50' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
            title={isInWishlist ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
          >
            <FaHeart className={isInWishlist ? 'fill-current' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeHeader;

