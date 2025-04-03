import React, { useState } from 'react';
import ProductModal from './ProductModal';
import { FiClock, FiArrowRight, FiAward } from 'react-icons/fi';

const RecipeGrid = ({ recipes }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleRecipeClick = (recipe) => {
    // First scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Then set the selected recipe to show the modal
    setTimeout(() => {
      setSelectedRecipe(recipe);
    }, 1000); // Small delay to ensure smooth scrolling
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
      {recipes.map((recipe, index) => (
        <article 
          key={index} 
          className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg 
            transition-all duration-300 transform hover:scale-[1.02] cursor-pointer
            max-w-sm mx-auto w-full"
          onClick={() => handleRecipeClick(recipe)}
        >
          <div className="relative h-36 overflow-hidden">
            <img 
              src={`/img/${recipe.image}`}
              alt={recipe.name}
              className="w-full h-full object-cover transition-transform duration-700 
                group-hover:scale-110 group-hover:rotate-1"
            />
            {recipe.imageCredit && (
              <div className="absolute bottom-3 right-3 text-xs text-gray-300/90 
                font-['Lato'] italic bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                TY {recipe.imageCredit} <span className="text-rose-400">♥</span>
              </div>
            )}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm 
              px-3 py-1 rounded-full shadow-sm">
              <span className="text-sm font-medium text-gray-700">{recipe.category}</span>
            </div>
          </div>

          <div className="p-5">
            <h2 className="font-['Patrick_Hand'] text-xl mb-2 text-gray-800 leading-tight 
              group-hover:text-[#2D3748] transition-colors duration-300">
              {recipe.name}
            </h2>

            <p className="text-gray-600 text-sm mb-3 line-clamp-2 font-['Lato']">
              {recipe.shortDesc}
            </p>

            <div className="flex items-center gap-4 mb-4">
              {recipe.time && (
                <div className="flex items-center gap-1 text-gray-500">
                  <FiClock className="text-yellow-500" />
                  <span className="text-sm">{recipe.time}</span>
                </div>
              )}
              {recipe.difficulty && (
                <div className="flex items-center gap-1 text-gray-500">
                  <FiAward className="text-yellow-500" />
                  <span className="text-sm">Poziom: {recipe.difficulty}</span>
                </div>
              )}
            </div>

            <button className="w-full flex items-center justify-center gap-2 bg-yellow-500 
              hover:bg-yellow-600 text-white py-2.5 px-4 rounded-lg transition-all duration-300 
              transform group-hover:scale-[1.02] font-['Patrick_Hand'] text-lg">
              Zobacz przepis
              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </article>
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