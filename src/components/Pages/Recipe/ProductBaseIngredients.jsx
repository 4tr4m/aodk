import React, { useState, useEffect } from 'react';
import { FaUtensils } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import recipeService from '../../../services/recipeService';

const ProductBaseIngredients = ({ recipe }) => {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIngredients = async () => {
      if (recipe?.id) {
        try {
          setLoading(true);
          const recipeIngredients = await recipeService.getIngredientsForRecipe(recipe.id);
          // Sort ingredients alphabetically by name
          const sortedIngredients = [...recipeIngredients].sort((a, b) => {
            const nameA = (a.name || '').toLowerCase().trim();
            const nameB = (b.name || '').toLowerCase().trim();
            return nameA.localeCompare(nameB, 'pl', { sensitivity: 'base' });
          });
          setIngredients(sortedIngredients);
        } catch (error) {
          console.error('Error fetching ingredients:', error);
          setIngredients([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchIngredients();
  }, [recipe?.id]);

  const handleIngredientClick = async (ingredientName) => {
    try {
      // Determine category slug from recipe.category
      const categoryMap = {
        'OBIADY': 'obiady',
        'ZUPY': 'zupy',
        'CHLEBY': 'chleby',
        'SMAROWIDŁA': 'smarowidla',
        'DESERY': 'desery',
        'BABECZKI i MUFFINY': 'babeczki-i-muffiny',
        'CIASTA': 'ciasta',
        'CIASTKA': 'ciastka',
        'SMOOTHIE': 'smoothie',
        'INNE': 'inne',
        'ŚWIĘTA': 'swieta'
      };
      const rawCategory = recipe?.category || '';
      const categorySlug = categoryMap[rawCategory] || rawCategory.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-');

      // Navigate to the resolved category with ingredient filter
      const targetUrl = `/kuchnia/${categorySlug}?ingredient=${encodeURIComponent(ingredientName)}`;
      navigate(targetUrl);
    } catch (error) {
      console.error('Error handling ingredient click:', error);
      // Fallback: navigate anyway
      const rawCategory = recipe?.category || '';
      const categorySlug = rawCategory.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const targetUrl = `/kuchnia/${categorySlug}?ingredient=${encodeURIComponent(ingredientName)}`;
      navigate(targetUrl);
    }
  };

  if (loading) {
    return (
      <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
        <h3 className="flex items-center gap-2 font-['Playfair_Display'] text-lg sm:text-xl text-[#2D3748] font-bold mb-3 sm:mb-4">
          <FaUtensils className="text-green-600" />
          Podstawowe składniki
        </h3>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <div className="animate-pulse bg-gray-200 h-8 w-20 rounded-full"></div>
          <div className="animate-pulse bg-gray-200 h-8 w-24 rounded-full"></div>
          <div className="animate-pulse bg-gray-200 h-8 w-16 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (!ingredients || ingredients.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
      <h3 className="flex items-center gap-2 font-['Playfair_Display'] text-lg sm:text-xl text-[#2D3748] font-bold mb-3 sm:mb-4">
        <FaUtensils className="text-green-600" />
        Podstawowe składniki
      </h3>
      
      {/* Subtle instruction hint */}
      <motion.div 
        className="mb-4 sm:mb-5"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <p className="text-xs sm:text-sm text-gray-400 text-center">
          <span className="inline-block mr-1.5">💡</span>
          <span className="italic">Kliknij składnik, aby zobaczyć inne przepisy</span>
        </p>
      </motion.div>
      
      <div className={`flex flex-wrap gap-2 sm:gap-3 ${ingredients.length > 3 ? 'justify-center' : 'justify-start'}`}>
        {ingredients.map((ingredient, i) => (
          <motion.button
            key={ingredient.ingredient_id || i}
            onClick={() => handleIngredientClick(ingredient.name)}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: i * 0.05, type: "spring", stiffness: 100 }}
            whileHover={{ 
              scale: 1.08, 
              y: -2,
              boxShadow: "0 8px 25px rgba(0,0,0,0.15)"
            }}
            whileTap={{ scale: 0.92 }}
            className={`group relative px-3.5 sm:px-4 md:px-5 py-2.5 sm:py-3 min-h-[44px] sm:min-h-[48px] rounded-xl sm:rounded-2xl text-xs sm:text-sm md:text-base font-semibold cursor-pointer transition-all duration-300 touch-manipulation overflow-hidden active:scale-95 select-none
              ${i % 6 === 0 ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 active:from-emerald-700 active:to-teal-700' :
                i % 6 === 1 ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 active:from-amber-700 active:to-orange-700' :
                i % 6 === 2 ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 active:from-blue-700 active:to-indigo-700' :
                i % 6 === 3 ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 active:from-purple-700 active:to-pink-700' :
                i % 6 === 4 ? 'bg-gradient-to-r from-rose-500 to-red-500 text-white hover:from-rose-600 hover:to-red-600 active:from-rose-700 active:to-red-700' :
                'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 active:from-cyan-700 active:to-blue-700'
              }`}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-white/10 to-transparent"></div>
            
            {/* Active state overlay for mobile */}
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 active:opacity-100 transition-opacity duration-150 bg-white/20"></div>
            
            {/* Content */}
            <div className="relative flex items-center justify-center min-w-0 w-full">
              <span className="truncate max-w-full group-hover:scale-105 transition-transform duration-200 text-center">
                {ingredient.name}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ProductBaseIngredients; 