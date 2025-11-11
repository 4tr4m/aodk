import React, { useEffect, useCallback, useRef, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import TopNavBar from '../../Headers/TopNavBar';
import CategoryHeader from './CategoryHeader';
import CategoryNav from './CategoryNav';
import Footer from '../../Footer/Footer';
import RecipeGrid from '../Recipe/RecipeGrid';
import { kuchniaCategories } from '../../../Data/category-data';
import { motion } from 'framer-motion';
import SEO from '../../SEO/SEO';
import categoryService from '../../../services/categoryService';
import IngredientFilter from '../../UI/IngredientFilter';
import NewsletterModal from '../../Modal/NewsletterModal';
import CategoryPageHeader from './CategoryPageHeader';
import CategoryDescription from './CategoryDescription';
import CategoryActiveFilter from './CategoryActiveFilter';
import { useCategorySearch } from './hooks/useCategorySearch';
import { useIngredientFilter } from './hooks/useIngredientFilter';
import { useScrollDetection } from './hooks/useScrollDetection';
import { smartCapitalize } from '../../../utils/categoryUtils';

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const pageRef = useRef(null);
  const { state } = useCart();
  const [loading, setLoading] = useState(true);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [categories, setCategories] = useState([]);

  // Newsletter modal state
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);

  // Custom hooks
  const isScrolled = useScrollDetection(30);
  const {
    isSearching,
    suggestions,
    searchTerm,
    toggleSearch,
    handleSearchClose,
    handleSearchInput,
    handleSuggestionSelect,
    handleSearchSubmit,
  } = useCategorySearch();

  const {
    isIngredientFilterVisible,
    filteredRecipes,
    activeFilter,
    selectedIngredient,
    selectedIngredientsCount,
    handleIngredientFilterClose,
    clearIngredientFilter,
    toggleIngredientFilter,
    handleRecipesFiltered,
  } = useIngredientFilter();

  useEffect(() => {
    if (!state.isLoading) {
      setLoading(false);
    }
  }, [state.isLoading]);

  // Effect to scroll to top if coming from carousel click or footer
  useEffect(() => {
    if (location.state?.scrollToTitle || location.state?.scrollToTop) {
      // Force immediate scroll to top first (critical for mobile)
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Use requestAnimationFrame for better mobile support
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });
      
      // Multiple scroll attempts for mobile browsers
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 0);
      
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 50);
      
      // Then try smooth scroll after a delay
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 100);
      
      // Final backup scroll (important for mobile)
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        // Clean up state to prevent scrolling on future updates
        navigate(location.pathname, { replace: true, state: {} });
      }, 300);
    }
  }, [location.state, navigate, location.pathname]);

  const getCurrentCategory = () => {
    if (!categorySlug) return null;
    
    // First try to find in hardcoded categories
    const hardcodedCategory = kuchniaCategories.mainCategories.find(cat => 
      cat.link.split('/').pop() === categorySlug
    );
    
    if (hardcodedCategory) return hardcodedCategory;
    
    // If not found in hardcoded, create a dynamic category based on the slug
    // This handles cases where the category comes from Supabase
    return {
      label: smartCapitalize(categorySlug),
      link: `/kuchnia/${categorySlug}`,
      shortDesc: ''
    };
  };

  const currentCategory = getCurrentCategory();
  
  const getCategoryRecipes = () => {
    if (!categorySlug) {
      return Object.values(state.allRecipes).flat();
    }
    
    // Create a mapping of slugs to category keys
    const slugToKeyMap = {
      'obiady': 'OBIADY',
      'zupy': 'ZUPY', 
      'chleby': 'CHLEBY',
      'smarowidla': 'SMAROWIDŁA',
      'desery': 'DESERY',
      'babeczki-muffiny': 'BABECZKI i MUFFINY',
      'babeczki-i-muffiny': 'BABECZKI i MUFFINY',
      'ciasta': 'CIASTA',
      'ciastka': 'CIASTKA',
      'smoothie': 'SMOOTHIE',
      'inne': 'INNE',
      'swieta': 'ŚWIĘTA'
    };
    
    // First try direct mapping
    let categoryKey = slugToKeyMap[categorySlug];
    
    // If no direct mapping, try fuzzy matching
    if (!categoryKey) {
      categoryKey = Object.keys(state.allRecipes).find(key => {
        // Convert both to lowercase and replace spaces/special chars for comparison
        const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, '');
        const normalizedSlug = categorySlug.toLowerCase().replace(/[^a-z0-9]/g, '');
        return normalizedKey.includes(normalizedSlug) || normalizedSlug.includes(normalizedKey);
      });
    }
    
    if (categoryKey) {
      const recipes = state.allRecipes[categoryKey] || [];
      return recipes;
    }
    
    // Fallback: return empty array if no match found
    return [];
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

  // Get SEO data based on the current category
  const getSEOData = () => {
    if (!currentCategory) {
      return {
        title: "Przepisy - Autyzm od Kuchni | Dieta eliminacyjna bez glutenu i nabiału",
        description: "Odkryj nasze przepisy bez glutenu, nabiału i cukru wspierające funkcjonowanie osób z autyzmem i zaburzeniami neurorozwojowymi.",
        keywords: "przepisy, dieta eliminacyjna, bez glutenu, bez nabiału, bez cukru, autyzm, zaburzenia neurorozwojowe"
      };
    }
    
    return {
      title: `${currentCategory.label} - Przepisy | Autyzm od Kuchni`,
      description: currentCategory.description || `Przepisy ${currentCategory.label} bez glutenu, nabiału i cukru wspierające osoby z autyzmem i zaburzeniami neurorozwojowymi.`,
      keywords: `${currentCategory.label}, przepisy, dieta eliminacyjna, bez glutenu, bez nabiału, bez cukru, autyzm, zaburzenia neurorozwojowe`
    };
  };

  const seoData = getSEOData();

  const handleCategoryClick = useCallback((categoryLink) => {
    if (location.pathname !== categoryLink) {
      // When navigating to a different category, scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      navigate(categoryLink);
    } else {
      // If already on the category page, scroll to the title
      const titleElement = document.getElementById('category-title');
      if (titleElement) {
        const titlePosition = titleElement.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: titlePosition,
          behavior: 'smooth'
        });
      }
    }
  }, [navigate, location.pathname]);

  // Get recipes to display (either filtered or category recipes)
  const getDisplayRecipes = () => {
    // filteredRecipes can be an empty array (filter active but no results) or null (no filter)
    if (filteredRecipes !== null) {
      return filteredRecipes; // Can be empty array
    }
    return categoryRecipes;
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const cats = await categoryService.getCategories();
      setCategories(cats);
    };
    fetchCategories();
  }, []);

  const handleNewsletterLinkClick = useCallback(() => {
    setPendingNavigation('/przepis/mieszanka-2');
    setIsNewsletterModalOpen(true);
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-gray-100">
      <SEO 
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonical={`https://www.autyzmodkuchni.pl/kuchnia${categorySlug ? `/${categorySlug}` : ''}`}
      />
      <div className="relative mb-8">
        <CategoryHeader showLogo={false} />
        <div className="absolute top-0 left-0 w-full">
          <TopNavBar />
        </div>
      </div>
      
      {/* Sticky header with filter button, title/search, and magnifying glass */}
      <CategoryPageHeader
        currentCategory={currentCategory}
        isSearching={isSearching}
        isScrolled={isScrolled}
        toggleSearch={toggleSearch}
        handleSearchClose={handleSearchClose}
        handleSearchInput={handleSearchInput}
        handleSearchSubmit={handleSearchSubmit}
        suggestions={suggestions}
        searchTerm={searchTerm}
        handleSuggestionSelect={handleSuggestionSelect}
        toggleIngredientFilter={toggleIngredientFilter}
        selectedIngredientsCount={selectedIngredientsCount}
        activeFilter={activeFilter}
        isIngredientFilterVisible={isIngredientFilterVisible}
        fadeIn={fadeIn}
      />

      {/* Description - compact design, hidden when scrolled */}
      <CategoryDescription
        description={currentCategory?.description}
        isExpanded={isDescriptionExpanded}
        onToggleExpand={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
        isSearching={isSearching}
        isScrolled={isScrolled}
        onNewsletterLinkClick={handleNewsletterLinkClick}
      />

      <motion.div 
        className="sticky z-20 mb-6 bg-gray-100 shadow-sm"
        style={{
          top: isScrolled ? '70px' : isSearching ? '70px' : 'auto',
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <CategoryNav 
          categories={categories}
          currentSlug={categorySlug}
          onCategoryClick={handleCategoryClick}
          onSearchToggle={toggleSearch}
        />
      </motion.div>

      <motion.main 
        className="pb-16 transition-all duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Active filter info */}
          <CategoryActiveFilter
            activeFilter={activeFilter}
            filteredRecipesCount={filteredRecipes?.length || 0}
            onClear={clearIngredientFilter}
          />

          <div className="mb-8 text-center">
            <span className="font-['Lato'] text-lg text-gray-600">
              {loading ? (
                "Ładowanie przepisów..."
              ) : (
                <>Znalezione przepisy: <strong>{getDisplayRecipes().length}</strong></>
              )}
            </span>
          </div>

          <div className="w-full transition-opacity duration-300">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mb-4"></div>
                <p className="text-gray-600 text-lg">Ładowanie przepisów...</p>
              </div>
            ) : getDisplayRecipes().length > 0 ? (
              <RecipeGrid recipes={getDisplayRecipes()} />
            ) : (
              <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
                <p className="text-gray-600 text-lg font-['Lato']">
                  {activeFilter 
                    ? `Nie znaleziono przepisów zawierających składnik "${activeFilter}".`
                    : "Nie znaleziono przepisów w tej kategorii."
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.main>

      {/* Ingredient Filter Sidebar - Left Side */}
      <IngredientFilter
        isVisible={isIngredientFilterVisible}
        onClose={handleIngredientFilterClose}
        onRecipesFiltered={handleRecipesFiltered}
        selectedIngredient={selectedIngredient}
        position="left"
        compact={true}
        onClear={clearIngredientFilter}
      />

      <Footer />

      {/* Newsletter Modal */}
      <NewsletterModal
        isOpen={isNewsletterModalOpen}
        onClose={() => {
          setIsNewsletterModalOpen(false);
          // Navigate after modal closes (whether user subscribed or just closed)
          if (pendingNavigation) {
            setTimeout(() => {
              navigate(pendingNavigation);
              setPendingNavigation(null);
            }, 300);
          }
        }}
        onSuccess={() => {
          // Navigate after successful subscription
          if (pendingNavigation) {
            setTimeout(() => {
              navigate(pendingNavigation);
              setPendingNavigation(null);
            }, 2000);
          }
        }}
      />
    </div>
  );
};

export default CategoryPage;
