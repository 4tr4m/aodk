import React, { useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import TopNavBar from '../Headers/TopNavBar';
import CategoryHeader from './CategoryHeader';
import CategorySidebar from './CategorySidebar';
import Footer from '../Footer/Footer';
import RecipeGrid from './RecipeGrid';
import { kuchniaCategories } from '../../Data/category-data';

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const pageRef = useRef(null);
  const { state } = useCart();

  const scrollToTop = useCallback(() => {
    if (pageRef.current) {
      pageRef.current.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCategoryClick = useCallback((categoryLink) => {
    scrollToTop();
    if (location.pathname !== categoryLink) {
      navigate(categoryLink);
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
    return state.allRecipes[currentCategory.label] || [];
  };

  const categoryRecipes = getCategoryRecipes();

  return (
    <div ref={pageRef} className="min-h-screen bg-[#F6EFE9]">
      <div className="relative">
        <CategoryHeader />
        <div className="absolute top-0 left-0 w-full">
          <TopNavBar />
        </div>
      </div>
      
      <div className="pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-5">
          <h1 className="font-['Caveat'] text-5xl text-[#2D3748] mb-3 text-center font-bold">
            {currentCategory ? currentCategory.label : 'Wszystkie Przepisy'}
          </h1>
          <p className="font-['Lato'] text-lg text-gray-600 text-center max-w-2xl mx-auto leading-relaxed">
            {currentCategory?.description || 'Odkryj wszystkie nasze przepisy z różnych kategorii'}
          </p>
        </div>
      </div>

      <main className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-5">
          <div className="mb-6">
            <span className="font-['Lato'] text-gray-500">
              Znalezione przepisy: <strong>{categoryRecipes.length}</strong>
            </span>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <CategorySidebar 
              categories={kuchniaCategories.mainCategories}
              currentSlug={categorySlug}
              onCategoryClick={handleCategoryClick}
            />
            
            <div className="flex-1 min-w-0">
              {categoryRecipes.length > 0 ? (
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;