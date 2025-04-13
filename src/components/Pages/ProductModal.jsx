import React, { useRef, useEffect, useState } from 'react';
import { FiX, FiClock, FiAward, FiInfo } from 'react-icons/fi';
import { FaUtensils } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import supabase from '../../lib/supabase-browser';

const ProductModal = ({ product, onClose }) => {
  const modalRef = useRef();
  const { dispatch } = useCart();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const { data, error } = await supabase
          .from('recipes')
          .select('*')
          .eq('id', product.id)
          .single();

        if (error) throw error;
        setRecipe(data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      } finally {
        setLoading(false);
      }
    };

    if (product?.id) {
      fetchRecipe();
    }
  }, [product?.id]);

  // Add to cart functionality
  const handleAddToCart = () => {
    if (recipe) {
      dispatch({ type: 'ADD_TO_CART', payload: recipe });
      onClose();
    }
  };

  // Add to wishlist functionality
  const handleAddToWishlist = () => {
    if (recipe) {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: recipe });
    }
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto'; // Re-enable scrolling when modal is closed
    };
  }, [onClose]);

  // Format preparation steps by splitting numbered steps
  const formatPreparation = (preparation) => {
    if (!preparation) return [];
    
    // Split by numbered steps if they exist
    const steps = preparation.split(/\d+\.\s+/).filter(Boolean);
    return steps.length > 1 ? steps : [preparation];
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return null;
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white w-full max-w-5xl rounded-xl shadow-2xl max-h-[90vh] overflow-hidden"
          ref={modalRef}
        >
          <div className="flex flex-col h-full">
            {/* Product Image - Now full width on all screens */}
            <div className="w-full h-48 sm:h-64 md:h-72 lg:h-80 bg-gray-100 relative overflow-hidden">
              <img 
                src={`/img/${recipe.image}`} 
                alt={recipe.name}
                className="w-full h-full object-cover"
              />
              {recipe.imageCredit && (
                <div className="absolute bottom-3 right-3 text-xs text-gray-300/90 
                  font-['Lato'] italic bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                  TY {recipe.imageCredit} <span className="text-rose-400">♥</span>
                </div>
              )}
              <div className="absolute top-0 left-0 bg-green-600/90 text-white px-3 py-1 rounded-br-lg text-sm font-medium">
                {recipe.category}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#2D3748] mb-2 font-bold leading-tight">
                  {recipe.name}
                </h2>
                <button 
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>

              {/* Tags Section */}
              {(recipe.tags || recipe.tags2 || recipe.tags3) && (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {[...(recipe.tags?.split(',') || []), 
                      ...(recipe.tags2?.split(',') || []),
                      ...(recipe.tags3?.split(',') || [])]
                      .filter(Boolean)
                      .map((tag, i) => (
                        <span 
                          key={i}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800"
                        >
                          {tag.trim()}
                        </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Recipe details */}
              <div className="mb-6">
                {/* Recipe metadata */}
                <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
                  {recipe.time && (
                    <div className="flex items-center gap-1.5 text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      <FiClock className="text-yellow-500" />
                      <span>{recipe.time}</span>
                    </div>
                  )}
                  {recipe.difficulty && (
                    <div className="flex items-center gap-1.5 text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      <FiAward className="text-yellow-500" />
                      <span>Poziom: {recipe.difficulty}</span>
                    </div>
                  )}
                  {recipe.category && (
                    <div className="flex items-center gap-1.5 text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      <FiInfo className="text-yellow-500" />
                      <span>{recipe.category}</span>
                    </div>
                  )}
                </div>
                
                {/* Short description */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <p className="text-gray-600 text-sm md:text-base font-['Lato'] italic leading-relaxed">
                    {recipe.shortdesc}
                  </p>
                </div>
                
                {/* Full description */}
                {recipe.fulldesc && (
                  <div className="prose prose-sm sm:prose-base max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {recipe.fulldesc}
                    </p>
                  </div>
                )}
              </div>

              {/* Ingredients Section - Enhanced */}
              {recipe.base_ingredients && (
                <div className="mb-6 bg-green-50/50 p-4 rounded-lg border border-green-100">
                  <div className="flex items-center gap-2 mb-4">
                    <FaUtensils className="text-green-600" />
                    <h3 className="font-['Playfair_Display'] text-lg text-[#2D3748] font-bold">
                      Składniki
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-start">
                    {recipe.base_ingredients.split(',').map((ingredient, i) => (
                      <span 
                        key={i}
                        className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800"
                      >
                        {ingredient.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Base Ingredients Details */}
              {recipe.base_ingredients && (
                <div className="mb-6 bg-gray-50/50 p-4 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-2 mb-4">
                    <FaUtensils className="text-gray-600" />
                    <h3 className="font-['Playfair_Display'] text-lg text-[#2D3748] font-bold">
                      Szczegółowe proporcje
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {recipe.base_ingredients.split('\n').map((ingredient, i) => (
                      <li 
                        key={i}
                        className="flex items-start gap-3 text-gray-700"
                      >
                        <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-gray-400" />
                        <span className="flex-1">{ingredient.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Preparation - Enhanced */}
              <div className="mb-6 bg-yellow-50/50 p-4 rounded-lg border border-yellow-100">
                <div className="flex items-center gap-2 mb-4">
                  <FaUtensils className="text-yellow-600" />
                  <h3 className="font-['Playfair_Display'] text-lg text-[#2D3748] font-bold">
                    Przygotowanie
                  </h3>
                </div>
                <div className="text-gray-700 space-y-4">
                  {formatPreparation(recipe.preparation).map((step, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      {formatPreparation(recipe.preparation).length > 1 && (
                        <div className="flex-shrink-0 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm mt-0.5">
                          {i+1}
                        </div>
                      )}
                      <p className="flex-1 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6 sticky bottom-0 bg-white py-4 border-t border-gray-100 -mx-4 px-4 sm:-mx-6 sm:px-6">
                <button
                  onClick={handleAddToCart}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg 
                  transition-all duration-300 flex-1 flex items-center justify-center gap-2 font-medium
                  shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/30"
                >
                  <span>Dodaj do koszyka</span>
                </button>
                <button
                  onClick={handleAddToWishlist}
                  className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-50 
                  py-3 px-6 rounded-lg transition-all duration-300 flex-1 flex items-center 
                  justify-center gap-2 font-medium"
                >
                  <span>Zapisz na później</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductModal;