import React, { useEffect, useCallback, useRef, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import TopNavBar from '../Headers/TopNavBar';
import CategoryHeader from './CategoryHeader';
import CategoryNav from './CategoryNav';
import Footer from '../Footer/Footer';
import RecipeGrid from './RecipeGrid';
import { kuchniaCategories } from '../../Data/category-data';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from '../UI/SearchBar';
import { FaSearch } from 'react-icons/fa';
import searchService from '../../services/searchService';
import SEO from '../SEO/SEO';

// SearchIcon component taken from CategoryBanner
const SearchIcon = ({ toggleSearch }) => {
  return (
    <div className="relative">
      <motion.div 
        className="cursor-pointer relative select-none search-icon-container"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleSearch}
        initial={{ scale: 1 }}
        animate={{ 
          scale: [1, 1.15, 1],
          transition: { 
            repeat: Infinity, 
            repeatType: "loop", 
            duration: 2.5,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            delay: 0
          }
        }}
      >
        <div className="relative flex items-center justify-center">
          <div 
            className="absolute inset-0 rounded-full animate-ping opacity-30" 
            style={{
              background: 'radial-gradient(circle, rgba(34,197,94,0.5) 0%, rgba(34,197,94,0) 70%)',
              transform: 'scale(1.8)',
              animationDuration: '3s',
            }}
          ></div>
          <div 
            className="absolute inset-0 rounded-full animate-pulse" 
            style={{
              background: 'radial-gradient(circle, rgba(34,197,94,0.3) 0%, rgba(34,197,94,0) 70%)',
              transform: 'scale(1.5)',
            }}
          ></div>
          {/* Attention ring */}
          <div className="absolute -inset-1 rounded-full bg-green-400/20 animate-pulse"></div>
          
          <FaSearch className="text-[2.5rem] sm:text-[2.75rem] md:text-[3rem] text-green-600 hover:text-green-500 transition-colors duration-300 drop-shadow-lg relative z-10 search-icon" />
        </div>
      </motion.div>
    </div>
  );
};

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const pageRef = useRef(null);
  const { state } = useCart();
  const [loading, setLoading] = useState(true);
  
  // Search states
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const searchTimeoutRef = useRef(null);

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

  // Search functions
  const toggleSearch = useCallback(() => {
    setIsSearching(prev => !prev);
    setSuggestions([]);
  }, []);
  
  const handleSearchClose = useCallback(() => {
    setIsSearching(false);
    setSuggestions([]);
  }, []);

  // Search function with debounce
  const performSearch = useCallback(async (term) => {
    if (term.length < 3) {
      setSuggestions([]);
      return;
    }
    
    try {
      setSearchTerm(term);
      
      // Clear any existing timeout
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      
      // Set a new timeout to debounce the search
      searchTimeoutRef.current = setTimeout(async () => {
        // Get search suggestions from service
        const formattedSuggestions = await searchService.getSuggestions(term);
        setSuggestions(formattedSuggestions);
      }, 300); // 300ms debounce delay
    } catch (error) {
      console.error("Error performing search:", error);
      setSuggestions([]);
    }
  }, []);

  // Handle search input changes
  const handleSearchInput = useCallback((term) => {
    performSearch(term);
  }, [performSearch]);

  // Handle selecting a suggestion
  const handleSuggestionSelect = useCallback((suggestion) => {
    if (suggestion && suggestion.original) {
      // Navigate to search page with the suggestion name as query
      navigate(`/search?q=${encodeURIComponent(suggestion.name)}`);
      setIsSearching(false);
      setSuggestions([]);
    }
  }, [navigate]);

  // Handle search submission
  const handleSearchSubmit = useCallback((searchTerm) => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setIsSearching(false);
    }
  }, [navigate]);

  // Escape key handler
  useEffect(() => {
    if (!isSearching) return;
    
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        setIsSearching(false);
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isSearching]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-gray-100">
      <SEO 
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonical={`https://autyzmkuchni.pl/kuchnia${categorySlug ? `/${categorySlug}` : ''}`}
      />
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
        {/* Header with H1 and Search */}
        <div className="flex flex-col items-center justify-center relative">
          {/* Title and SearchBar with transitions */}
          <AnimatePresence mode="wait" initial={false}>
            {!isSearching ? (
              <motion.div
                key="title-container"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex items-center justify-center gap-4"
              >
                <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-[#2D3748] font-bold tracking-wide">
                  {currentCategory ? currentCategory.label : 'Wszystkie Przepisy'}
                </h1>
                <div className="ml-5">
                  <SearchIcon toggleSearch={toggleSearch} />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="search-bar"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full max-w-4xl md:max-w-5xl mx-auto"
              >
                <SearchBar 
                  placeholder="Szukaj przepisów..." 
                  onSearchSubmit={handleSearchSubmit}
                  onClose={handleSearchClose}
                  onChange={handleSearchInput}
                  initialOpen={true}
                  suggestions={suggestions}
                  onSuggestionSelect={handleSuggestionSelect}
                  highlightedTerm={searchTerm}
                  minCharsForSuggestions={3}
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Description - shown only when not searching */}
          {currentCategory?.description && !isSearching && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-['Lato'] text-base md:text-lg lg:text-xl text-gray-600 text-center max-w-3xl mx-auto leading-relaxed mt-4"
            >
              {currentCategory.description}
            </motion.p>
          )}
        </div>
      </motion.div>

      <div className="sticky top-0 z-40 mb-8 shadow-md bg-gray-100">
        <CategoryNav 
          categories={kuchniaCategories.mainCategories.filter(cat => cat.image)}
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