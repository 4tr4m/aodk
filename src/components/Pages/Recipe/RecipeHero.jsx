import React from 'react';
import { FaClock, FaUtensils, FaUser } from 'react-icons/fa';
import { getRecipeImageSrc } from '../../../utils/recipeUtils';

const RecipeHero = ({ recipe, onImageClick }) => {
  return (
    <div className="relative h-48 sm:h-64 lg:h-72 cursor-pointer" onClick={onImageClick}>
      <img
        src={getRecipeImageSrc(recipe.image)}
        alt={recipe.name}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        onError={(e) => { e.currentTarget.src = '/img/ciasta.jpg'; }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      
      {/* Category tag in top left corner */}
      {recipe.category && (
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-green-800 rounded-full text-xs sm:text-sm font-semibold shadow-lg border border-green-200/50">
            {recipe.category}
          </span>
        </div>
      )}
      
      <div className="absolute bottom-4 left-4 right-4 text-white">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 font-['Playfair_Display']">
          {recipe.name}
        </h1>
        <p className="text-sm sm:text-base opacity-90 mb-4">
          {recipe.shortdesc}
        </p>
        
        <div className="flex flex-wrap gap-4 text-sm">
          {recipe.time && (
            <div className="flex items-center gap-1">
              <FaClock className="text-yellow-400" />
              <span>{recipe.time}</span>
            </div>
          )}
          {recipe.difficulty && (
            <div className="flex items-center gap-1">
              <FaUtensils className="text-green-400" />
              <span>{recipe.difficulty}</span>
            </div>
          )}
          {recipe.servings && (
            <div className="flex items-center gap-1">
              <FaUser className="text-blue-400" />
              <span>{recipe.servings} porcji</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeHero;

