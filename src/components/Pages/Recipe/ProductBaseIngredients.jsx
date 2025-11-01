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
          setIngredients(recipeIngredients);
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
      
      {/* Enhanced instruction with modern design */}
      <motion.div 
        className="mb-6 p-4 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl border border-indigo-200/50 shadow-sm"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
          <p className="text-sm sm:text-base text-indigo-800 text-center font-medium">
            <span className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Kliknij składnik
            </span>
            <span className="mx-2">—</span>
            <span>pokażę Ci inne przepisy z tym składnikiem</span>
          </p>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
        </div>
      </motion.div>
      
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {ingredients.map((ingredient, i) => (
          <motion.button
            key={ingredient.ingredient_id || i}
            onClick={() => handleIngredientClick(ingredient.name)}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
            whileHover={{ 
              scale: 1.08, 
              y: -2,
              boxShadow: "0 8px 25px rgba(0,0,0,0.15)"
            }}
            whileTap={{ scale: 0.95 }}
            className={`group relative px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-sm sm:text-base font-semibold cursor-pointer transition-all duration-300 touch-manipulation overflow-hidden
              ${i % 6 === 0 ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600' :
                i % 6 === 1 ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600' :
                i % 6 === 2 ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600' :
                i % 6 === 3 ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600' :
                i % 6 === 4 ? 'bg-gradient-to-r from-rose-500 to-red-500 text-white hover:from-rose-600 hover:to-red-600' :
                'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600'
              }`}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-white/10 to-transparent"></div>
            
            {/* Content */}
            <div className="relative flex items-center gap-2">
              <span className="truncate max-w-[140px] sm:max-w-[180px] group-hover:scale-105 transition-transform duration-200">
                {ingredient.name}
              </span>
              <motion.span 
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                initial={{ x: -5 }}
                whileHover={{ x: 0 }}
              >
                →
              </motion.span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ProductBaseIngredients; 
