import React, { useRef, useEffect } from 'react';
import { FiX, FiClock, FiAward } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';

const ProductModal = ({ product, onClose }) => {
  const modalRef = useRef();
  const { dispatch } = useCart();

  // Add to cart functionality
  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    onClose();
  };

  // Add to wishlist functionality
  const handleAddToWishlist = () => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
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

  // Format ingredients to handle newlines
  const formatIngredients = (ingredients) => {
    if (!ingredients) return [];
    // If ingredients is already an array, return it
    if (Array.isArray(ingredients)) return ingredients;
    
    // If ingredients is a string, split by newlines
    return ingredients.split('\n').filter(line => line.trim());
  };

  // Format preparation steps
  const formatPreparation = (preparation) => {
    if (!preparation) return '';
    return preparation;
  };

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
          <div className="flex flex-col md:flex-row h-full">
            {/* Product Image */}
            <div className="w-full md:w-2/5 bg-gray-100 relative overflow-hidden">
              <img 
                src={`/img/${product.image}`} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.imageCredit && (
                <div className="absolute bottom-3 right-3 text-xs text-gray-300/90 
                  font-['Lato'] italic bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                  TY {product.imageCredit} <span className="text-rose-400">♥</span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="w-full md:w-3/5 p-6 overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-start mb-4">
                <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl lg:text-4xl text-[#2D3748] mb-4 font-bold">
                  {product.name}
                </h2>
                <button 
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>

              {/* Recipe details */}
              <div className="mb-6">
                <p className="text-gray-700 mb-4">{product.fulldesc || product.shortdesc}</p>
                
                <div className="flex items-center gap-4 mb-4">
                  {product.time && (
                    <div className="flex items-center gap-1 text-gray-500">
                      <FiClock className="text-yellow-500" />
                      <span>{product.time}</span>
                    </div>
                  )}
                  {product.difficulty && (
                    <div className="flex items-center gap-1 text-gray-500">
                      <FiAward className="text-yellow-500" />
                      <span>Poziom: {product.difficulty}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Ingredients - Hidden for now */}
              {/* <div className="mb-6">
                <h3 className="font-['Playfair_Display'] text-xl text-[#2D3748] mb-3 font-bold">
                  Składniki
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  {formatIngredients(product.ingredients).map((ingredient, index) => (
                    <li key={index} className="text-gray-700">{ingredient}</li>
                  ))}
                </ul>
              </div> */}

              {/* Preparation */}
              <div className="mb-6">
                <h3 className="font-['Playfair_Display'] text-xl text-[#2D3748] mb-3 font-bold">
                  Przygotowanie
                </h3>
                <div className="text-gray-700 whitespace-pre-line">
                  {formatPreparation(product.preparation)}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row gap-3 mt-6">
                <button
                  onClick={handleAddToCart}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg 
                  transition-all duration-300 flex-1 flex items-center justify-center gap-2 font-medium"
                >
                  <span>Dodaj do koszyka</span>
                </button>
                <button
                  onClick={handleAddToWishlist}
                  className="border border-yellow-500 text-yellow-500 hover:bg-yellow-50 
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