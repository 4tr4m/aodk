import React, { useRef, useEffect, useState } from 'react';
import { FiX, FiClock, FiAward } from 'react-icons/fi';
import { FaUtensils } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import supabase from '../../lib/supabase-browser';

const ProductModal = ({ product, onClose }) => {
  const modalRef = useRef();
  const scrollContainerRef = useRef();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageHeight, setImageHeight] = useState(160);
  const [imageOpacity, setImageOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollY = scrollContainerRef.current.scrollTop;
        const maxScroll = 100;
        const newHeight = Math.max(0, 160 * (1 - scrollY / maxScroll));
        const newOpacity = Math.max(0, 1 - scrollY / maxScroll);
        
        setImageHeight(newHeight);
        setImageOpacity(newOpacity);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

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
      <div 
        className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-0 sm:p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative bg-white w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-4xl rounded-none sm:rounded-2xl shadow-2xl sm:my-4 sm:mx-4 overflow-hidden"
          ref={modalRef}
        >
          {/* Category badge */}
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-green-600 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium uppercase tracking-wide">
              {recipe.category}
            </span>
          </div>

          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm rounded-full p-2 
              hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            aria-label="Close modal"
          >
            <FiX size={20} className="text-gray-600" />
          </button>

          <div className="flex flex-col h-full sm:max-h-[90vh]">
            {/* Image Section */}
            <motion.div 
              className="relative w-full bg-gray-100 origin-top"
              style={{ 
                height: `${imageHeight}px`,
                opacity: imageOpacity,
                transition: 'height 0.3s ease-out, opacity 0.3s ease-out'
              }}
            >
              <img 
                src={`/img/${recipe.image}`} 
                alt={recipe.name}
                className="w-full h-full object-cover"
              />
              {recipe.imageCredit && (
                <motion.div 
                  className="absolute bottom-2 right-2 text-xs text-white/90 
                    font-['Lato'] italic bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full"
                  style={{ opacity: imageOpacity }}
                >
                  TY {recipe.imageCredit} <span className="text-rose-400">♥</span>
                </motion.div>
              )}
            </motion.div>

            {/* Content Section */}
            <div 
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto px-3 xs:px-4 sm:px-6 md:px-8 py-4 sm:py-6 overscroll-contain scroll-smooth"
            >
              {/* Title and Metadata */}
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
              </div>

              {/* Tags */}
              <div className="mb-6 sm:mb-8 space-y-2">
                {recipe.tags && (
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {recipe.tags.split(',').map((tag, i) => (
                      <span 
                        key={i}
                        className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${
                          i % 3 === 0 ? 'bg-green-100 text-green-800' :
                          i % 3 === 1 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Rest of the content sections with adjusted spacing */}
              {recipe.fulldesc && (
                <div className="mb-6 sm:mb-8">
                  <h3 className="flex items-center gap-2 font-['Playfair_Display'] text-lg sm:text-xl text-[#2D3748] font-bold mb-3 sm:mb-4">
                    <FaUtensils className="text-green-600" />
                    Opis
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    {recipe.fulldesc}
                  </p>
                </div>
              )}

              {/* Ingredients with adjusted spacing */}
              {recipe.ingredients && (
                <div className="mb-6 sm:mb-8">
                  <h3 className="flex items-center gap-2 font-['Playfair_Display'] text-lg sm:text-xl text-[#2D3748] font-bold mb-3 sm:mb-4">
                    <FaUtensils className="text-green-600" />
                    Składniki
                  </h3>
                  <ul className="space-y-2">
                    {recipe.ingredients.split('\n').map((ingredient, i) => (
                      <li 
                        key={i}
                        className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-gray-700"
                      >
                        <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-green-600" />
                        <span className="flex-1">{ingredient.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Preparation with adjusted spacing */}
              <div className="mb-6 sm:mb-8">
                <h3 className="flex items-center gap-2 font-['Playfair_Display'] text-lg sm:text-xl text-[#2D3748] font-bold mb-3 sm:mb-4">
                  <FaUtensils className="text-green-600" />
                  Przygotowanie
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {formatPreparation(recipe.preparation).map((step, i) => (
                    <div key={i} className="flex gap-3 sm:gap-4 items-start">
                      <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-green-600 rounded-full flex items-center justify-center text-white font-medium text-xs sm:text-sm">
                        {i+1}
                      </div>
                      <p className="flex-1 text-sm sm:text-base text-gray-700">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Subscribe Section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 relative overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute -right-8 -top-8 w-24 h-24 bg-green-200 rounded-full opacity-50 blur-2xl"></div>
                  <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-green-300 rounded-full opacity-30 blur-3xl"></div>
                  
                  <div className="relative">
                    <h3 className="font-['Playfair_Display'] text-xl sm:text-2xl text-green-800 font-bold mb-3">
                      Dołącz do naszej społeczności!
                    </h3>
                    <p className="text-sm sm:text-base text-green-700 mb-4 leading-relaxed">
                      Odkryj więcej przepisów dostosowanych do potrzeb dzieci z autyzmem. 
                      Otrzymuj powiadomienia o nowych przepisach i ekskluzywne porady prosto na swoją skrzynkę.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <input
                        type="email"
                        placeholder="Twój adres email"
                        className="flex-1 px-4 py-2.5 rounded-lg border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-300 text-sm sm:text-base placeholder-green-400/70"
                      />
                      <button
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg 
                          transition-all duration-300 font-medium text-sm sm:text-base shadow-lg hover:shadow-xl
                          flex items-center justify-center gap-2 hover:-translate-y-0.5"
                      >
                        <span>Zapisz się</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                    <p className="mt-3 text-xs text-green-600/80 italic">
                      Dołączając do newslettera, zgadzasz się na otrzymywanie od nas wiadomości email. 
                      Możesz zrezygnować w każdej chwili.
                    </p>
                  </div>
                </div>
              </div>

              {/* Base Ingredients with adjusted spacing */}
              {recipe.base_ingredients && (
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                  <h3 className="flex items-center gap-2 font-['Playfair_Display'] text-lg sm:text-xl text-[#2D3748] font-bold mb-3 sm:mb-4">
                    <FaUtensils className="text-green-600" />
                    Podstawowe składniki
                  </h3>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {recipe.base_ingredients.split('\n').map((ingredient, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-sm
                          ${i % 4 === 0 ? 'bg-green-100 text-green-800 border border-green-200' :
                            i % 4 === 1 ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                            i % 4 === 2 ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                            'bg-purple-100 text-purple-800 border border-purple-200'
                          }`}
                      >
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <span className="text-base sm:text-lg">•</span>
                          <span>{ingredient.trim()}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductModal;