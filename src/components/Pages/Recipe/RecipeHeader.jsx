import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaHeart } from 'react-icons/fa';
import ShareButton from '../../UI/ShareButton';

const RecipeHeader = ({ onBack, onToggleWishlist, isInWishlist, recipe }) => {
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

        {/* Share and Wishlist buttons - visible on all screen sizes */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Share button - icon-only on mobile, full button on larger screens */}
          <div className="hidden sm:block">
            <ShareButton
              title={recipe?.name}
              text={recipe?.shortdesc}
              url={typeof window !== 'undefined' ? window.location.href : undefined}
            />
          </div>
          <div className="block sm:hidden">
            <ShareButton
              variant="icon-only"
              title={recipe?.name}
              text={recipe?.shortdesc}
              url={typeof window !== 'undefined' ? window.location.href : undefined}
            />
          </div>
          {/* Favorites button - smaller on mobile */}
          <button
            onClick={onToggleWishlist}
            className={`p-2 rounded-full transition-colors ${
              isInWishlist 
                ? 'text-red-500 hover:text-red-600 hover:bg-red-50' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
            title={isInWishlist ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
            aria-label={isInWishlist ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
          >
            <FaHeart className={`text-base sm:text-xl ${isInWishlist ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeHeader;

