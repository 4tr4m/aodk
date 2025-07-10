import React from 'react';
import { FaUtensils } from 'react-icons/fa';

const ProductPreparation = ({ recipe, formatPreparation }) => (
  <div className="mb-6 sm:mb-8">
    <h3 className="flex items-center gap-2 font-['Playfair_Display'] text-lg sm:text-xl text-[#2D3748] font-bold mb-3 sm:mb-4">
      <FaUtensils className="text-green-600" />
      Przygotowanie
    </h3>
    <div className="space-y-3 sm:space-y-4">
      {formatPreparation(recipe.preparation).map((step, i) => (
        <div key={i} className="flex gap-3 sm:gap-4 items-start">
          <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-green-600 rounded-full flex items-center justify-center text-white font-medium text-xs sm:text-sm">
            {i+1}
          </div>
          <p className="flex-1 text-sm sm:text-base text-gray-700">{step}</p>
        </div>
      ))}
    </div>
  </div>
);

export default ProductPreparation; 