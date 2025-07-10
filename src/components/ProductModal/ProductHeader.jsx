import React from 'react';
import { FiClock, FiAward } from 'react-icons/fi';

const ProductHeader = ({ recipe }) => (
  <div className="mb-4 sm:mb-6">
    <h2 className="font-['Playfair_Display'] text-xl xs:text-2xl sm:text-3xl md:text-4xl text-[#2D3748] font-bold mb-2 sm:mb-3">
      {recipe.name}
    </h2>
    <div className="italic text-gray-600 mb-2 sm:mb-3 text-sm sm:text-base">
      {recipe.shortdesc}
    </div>
    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
      {recipe.time && (
        <div className="flex items-center gap-1.5 text-gray-600">
          <FiClock className="text-green-600" />
          <span>{recipe.time}</span>
        </div>
      )}
      {recipe.difficulty && (
        <div className="flex items-center gap-1.5 text-gray-600">
          <FiAward className="text-green-600" />
          <span>Poziom: {recipe.difficulty}</span>
        </div>
      )}
    </div>
    {recipe.tags3 && (
      <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2 mb-2">
        {recipe.tags3
          .split(/[,\n]/)
          .map(tag => tag.trim())
          .filter(Boolean)
          .map((tag, i) => (
            <span 
              key={"tag3-"+i}
              className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${
                i % 3 === 0 ? 'bg-green-100 text-green-800' :
                i % 3 === 1 ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}
            >
              {tag}
            </span>
          ))}
      </div>
    )}
  </div>
);

export default ProductHeader; 