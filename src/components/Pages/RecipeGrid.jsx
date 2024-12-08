import React, { useState } from 'react';
import ProductModal from './ProductModal';

const RecipeGrid = ({ recipes }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {recipes.map((recipe, index) => (
        <div 
          key={index} 
          className="group cursor-pointer"
          onClick={() => setSelectedRecipe(recipe)}
        >
          <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
            <div className="aspect-square overflow-hidden relative">
              <img 
                src={`/img/${recipe.image}`}
                alt={recipe.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {recipe.imageCredit && (
                <div className="absolute bottom-3 right-3 text-xs text-gray-300/90 font-['Lato'] italic bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                  TY {recipe.imageCredit} <span className="text-rose-400">♥</span>
                </div>
              )}
            </div>
            <div className="p-6">
              <h3 className="font-['Caveat'] text-2xl text-[#2D3748] mb-3 group-hover:text-[#1A202C] transition-colors duration-300">
                {recipe.name}
              </h3>
              <p className="text-gray-600/90 text-sm mb-4 line-clamp-2 font-['Lato']">
                {recipe.shortDesc}
              </p>
              <button 
                className="w-full py-3 px-4 rounded-lg text-sm font-semibold 
                  border-2 border-[#2D3748] text-[#2D3748] 
                  hover:bg-[#2D3748] hover:text-white 
                  transition-all duration-300 hover:-translate-y-0.5
                  font-['Lato']"
              >
                Zobacz Przepis
              </button>
            </div>
          </div>
        </div>
      ))}

      {selectedRecipe && (
        <ProductModal 
          product={selectedRecipe} 
          onClose={() => setSelectedRecipe(null)} 
        />
      )}
    </div>
  );
};

export default RecipeGrid;