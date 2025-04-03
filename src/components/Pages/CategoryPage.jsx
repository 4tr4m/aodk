import React, { useEffect, useCallback, useRef, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import TopNavBar from '../Headers/TopNavBar';
import CategoryHeader from './CategoryHeader';
import CategoryNav from './CategoryNav';
import Footer from '../Footer/Footer';
import RecipeGrid from './RecipeGrid';
import { kuchniaCategories } from '../../Data/category-data';

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

  return (
    <div ref={pageRef} className="min-h-screen bg-[#F6EFE9]">
      <div className="relative mb-8">
        <CategoryHeader />
        <div className="absolute top-0 left-0 w-full">
          <TopNavBar />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12">
        <h1 className="font-['Caveat'] text-4xl md:text-5xl text-[#2D3748] mb-4 text-center font-bold">
          {currentCategory ? currentCategory.label : 'Wszystkie Przepisy'}
        </h1>
        {currentCategory?.description && (
          <p className="font-['Lato'] text-base md:text-lg text-gray-600 text-center max-w-3xl mx-auto leading-relaxed">
            {currentCategory.description}
          </p>
        )}
      </div>

      <div className="sticky top-0 z-40 mb-8 shadow-sm bg-[#F6EFE9]">
        <CategoryNav 
          categories={kuchniaCategories.mainCategories}
          currentSlug={categorySlug}
          onCategoryClick={handleCategoryClick}
        />
      </div>

      <main className="pb-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-8">
            <span className="font-['Lato'] text-gray-500">
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
                <p className="text-gray-500 text-lg mb-4">Ładowanie przepisów...</p>
              </div>
            ) : categoryRecipes.length > 0 ? (
              <RecipeGrid recipes={categoryRecipes} />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Nie znaleziono przepisów w tej kategorii.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;