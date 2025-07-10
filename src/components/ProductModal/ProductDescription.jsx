import React from 'react';
import { FaUtensils } from 'react-icons/fa';

const ProductDescription = ({ recipe }) => (
  recipe.fulldesc ? (
    <div className="mb-6 sm:mb-8">
      <h3 className="flex items-center gap-2 font-['Playfair_Display'] text-lg sm:text-xl text-[#2D3748] font-bold mb-3 sm:mb-4">
        <FaUtensils className="text-green-600" />
        Opis
      </h3>
      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
        {recipe.fulldesc}
      </p>
    </div>
  ) : null
);

export default ProductDescription; 