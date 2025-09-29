import React, { useState, useEffect } from 'react';
import { FaUtensils } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import recipeService from '../../services/recipeService';

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
      
      {/* Instruction with improved UX */}
      <motion.div 
        className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/60"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-xs sm:text-sm text-blue-900 text-center">
          <span className="font-semibold">Kliknij składnik</span> — pokażę Ci inne przepisy z tym składnikiem.
        </p>
      </motion.div>
      
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {ingredients.map((ingredient, i) => (
          <motion.button
            key={ingredient.ingredient_id || i}
            onClick={() => handleIngredientClick(ingredient.name)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 sm:px-4 py-2 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-sm cursor-pointer transition-all duration-200 hover:shadow-md touch-manipulation active:scale-95
              bg-white text-gray-700 border border-gray-200 hover:border-green-300 hover:bg-green-50`}
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>
              <span className="truncate max-w-[160px] sm:max-w-none">{ingredient.name}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ProductBaseIngredients; 