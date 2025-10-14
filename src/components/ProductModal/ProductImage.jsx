import React from 'react';
import { motion } from 'framer-motion';
import { getRecipeImageUrl } from '../../utils/imageUtils';

const ProductImage = ({ recipe, isMobile, imageHeight, imageOpacity }) => (
  <motion.div 
    className="relative w-full bg-gray-100 origin-top"
    style={{ 
      height: isMobile ? `${imageHeight}px` : '250px',
      opacity: isMobile ? imageOpacity : 1,
      transition: 'height 0.2s ease-out, opacity 0.2s ease-out',
      overflow: 'hidden'
    }}
  >
    <img 
      src={getRecipeImageUrl(recipe)} 
      alt={recipe.name}
      className="w-full h-full object-cover"
    />
    {recipe.imageCredit && (
      <motion.div 
        className="absolute bottom-2 right-2 text-xs text-white/90 font-['Lato'] italic bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full"
        style={{ opacity: isMobile ? imageOpacity : 1 }}
      >
        TY {recipe.imageCredit} <span className="text-rose-400">♥</span>
      </motion.div>
    )}
  </motion.div>
);

export default ProductImage; 