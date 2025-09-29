/**
 * RecipeGrid component
 * 
 * This component displays a responsive, animated grid of recipe cards.
 * Each card shows a recipe's image, name, short description, category, time, and difficulty.
 * When a card is clicked, the page scrolls to the top and a modal (ProductModal) opens,
 * showing detailed information about the selected recipe.
 * 
 * Props:
 * - recipes: Array of recipe objects to display.
 * 
 * Features:
 * - Animated grid and card appearance using Framer Motion.
 * - Card hover effects for interactivity.
 * - Modal popup for recipe details.
 * - Handles image credits and category display.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiClock, FiArrowRight, FiAward } from 'react-icons/fi';
import { motion } from 'framer-motion';

const RecipeGrid = ({ recipes }) => {
  const navigate = useNavigate();

  // When a recipe card is clicked, navigate to the recipe page
  const handleRecipeClick = (recipe) => {
    navigate(`/przepis/${recipe.id}`);
  };

  // Animation variants for the grid and cards
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {recipes.map((recipe, index) => (
        <motion.article 
          key={index} 
          className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl 
            transition-all duration-300 transform hover:scale-[1.02] cursor-pointer
            max-w-sm mx-auto w-full flex flex-col"
          onClick={() => handleRecipeClick(recipe)}
          variants={item}
          whileHover={{ y: -5 }}
        >
          <div className="relative h-48 overflow-hidden">
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

          <div className="p-5 flex flex-col h-[230px]">
            {/* Title and description with fixed min-height for alignment */}
            <div className="flex-grow flex flex-col items-center min-h-[80px] justify-start">
              <h2 className="font-['Playfair_Display'] text-xl text-center mb-3 text-gray-800 leading-tight 
                group-hover:text-[#2D3748] transition-colors duration-300">
                {recipe.name}
              </h2>
              <p className="text-gray-600 text-sm mb-0 line-clamp-2 text-center font-['Lato']">
                {recipe.shortDesc}
              </p>
            </div>

            {/* Tags from tags2, always in the same place */}
            {recipe.tags2 && (
              <div className="flex flex-wrap gap-1 mb-4 justify-center min-h-[28px] items-center">
                {recipe.tags2
                  .split(/[,\n]/) // Split by both comma and newline
                  .map(tag => tag.trim())
                  .filter(Boolean)
                  .slice(0, 3)
                  .map((tag, i) => (
                    <span 
                      key={i}
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
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

            <div className="flex items-center justify-center gap-6 mb-auto w-full">
              {recipe.time && (
                <div className="flex items-center gap-1.5 text-gray-600">
                  <FiClock className="text-green-500" />
                  <span className="text-sm">{recipe.time}</span>
                </div>
              )}
              {recipe.difficulty && (
                <div className="flex items-center gap-1.5 text-gray-600">
                  <FiAward className="text-green-500" />
                  <span className="text-sm">Poziom: {recipe.difficulty}</span>
                </div>
              )}
            </div>

            <motion.button 
              className="w-full mt-4 flex items-center justify-center gap-2 bg-green-600 
                hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-all duration-300 
                shadow-md hover:shadow-lg font-['Lato'] font-medium text-lg"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Zobacz przepis
              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </div>
        </motion.article>
      ))}

    </motion.div>
  );
};

export default RecipeGrid;