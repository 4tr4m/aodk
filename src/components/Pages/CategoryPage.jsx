import React, { useEffect, useCallback, useRef, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import TopNavBar from '../Headers/TopNavBar';
import CategoryHeader from './CategoryHeader';
import CategoryNav from './CategoryNav';
import Footer from '../Footer/Footer';
import RecipeGrid from './RecipeGrid';
import { kuchniaCategories } from '../../Data/category-data';
import { motion } from 'framer-motion';

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const pageRef = useRef(null);
  const { state } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!state.isLoading) {
      setLoading(false);
    }
  }, [state.isLoading]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const handleCategoryClick = useCallback((categoryLink) => {
    if (location.pathname !== categoryLink) {
      scrollToTop();
      
      setTimeout(() => {
        navigate(categoryLink);
      }, 300);
    }
  }, [navigate, location.pathname, scrollToTop]);

  useEffect(() => {
    scrollToTop();
  }, [categorySlug, scrollToTop]);

  const getCurrentCategory = () => {
    if (!categorySlug) return null;
    return kuchniaCategories.mainCategories.find(cat => 
      cat.link.split('/').pop() === categorySlug
    );
  };

  const currentCategory = getCurrentCategory();
  
  const getCategoryRecipes = () => {
    if (!categorySlug) {
      return Object.values(state.allRecipes).flat();
    }
    
    if (!currentCategory) return [];
    
    const categoryKey = currentCategory.label;
    return state.allRecipes[categoryKey] || [];
  };

  const categoryRecipes = getCategoryRecipes();

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }
    }
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-gray-100">
      <div className="relative mb-8">
        <CategoryHeader />
        <div className="absolute top-0 left-0 w-full">
          <TopNavBar />
        </div>
      </div>
      
      <motion.div 
        className="max-w-7xl mx-auto px-4 md:px-8 mb-12 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-[#2D3748] mb-4 font-bold tracking-wide">
          {currentCategory ? currentCategory.label : 'Wszystkie Przepisy'}
        </h1>
        {currentCategory?.description && (
          <p className="font-['Lato'] text-base md:text-lg lg:text-xl text-gray-600 text-center max-w-3xl mx-auto leading-relaxed">
            {currentCategory.description}
          </p>
        )}
      </motion.div>

      <div className="sticky top-0 z-40 mb-8 shadow-md bg-gray-100">
        <CategoryNav 
          categories={kuchniaCategories.mainCategories}
          currentSlug={categorySlug}
          onCategoryClick={handleCategoryClick}
        />
      </div>

      <motion.main 
        className="pb-16 transition-all duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-8 text-center">
            <span className="font-['Lato'] text-lg text-gray-600">
              {loading ? (
                "Ładowanie przepisów..."
              ) : (
                <>Znalezione przepisy: <strong>{categoryRecipes.length}</strong></>
              )}
            </span>
          </div>

          <div className="w-full transition-opacity duration-300">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mb-4"></div>
                <p className="text-gray-600 text-lg">Ładowanie przepisów...</p>
              </div>
            ) : categoryRecipes.length > 0 ? (
              <RecipeGrid recipes={categoryRecipes} />
            ) : (
              <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
                <p className="text-gray-600 text-lg font-['Lato']">
                  Nie znaleziono przepisów w tej kategorii.
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.main>

      <Footer />
    </div>
  );
};

export default CategoryPage;