import React from 'react';
import { FaUtensils } from 'react-icons/fa';

const ProductIngredients = ({ recipe }) => (
  recipe.ingredients ? (
    <div className="mb-6 sm:mb-8">
      <h3 className="flex items-center gap-2 font-['Playfair_Display'] text-lg sm:text-xl text-[#2D3748] font-bold mb-3 sm:mb-4">
        <FaUtensils className="text-green-600" />
        Składniki
      </h3>
      <ul className="space-y-2">
        {recipe.ingredients.split('\n').map((ingredient, i) => (
          <li 
            key={i}
            className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-gray-700"
          >
            <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-green-600" />
            <span className="flex-1">{ingredient.trim()}</span>
          </li>
        ))}
      </ul>
    </div>
  ) : null
);

export default ProductIngredients; 