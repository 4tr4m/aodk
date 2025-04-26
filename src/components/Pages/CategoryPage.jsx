import React, { useEffect, useCallback, useRef, useState, useLayoutEffect } from 'react';
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
          
          <FaSearch className="text-[2.6rem] sm:text-[2.85rem] md:text-[3.1rem] text-green-600 hover:text-green-500 transition-colors duration-300 drop-shadow-lg relative z-10 search-icon" />
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
  const [showDescription, setShowDescription] = useState(false);

  // State for occasional toggle button attention animation
  const [highlightToggle, setHighlightToggle] = useState(false);

  // Scroll to top when category changes
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [categorySlug]);

  useEffect(() => {
    if (!state.isLoading) {
      setLoading(false);
    }
  }, [state.isLoading]);

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

  // Effect to scroll to top if coming from another category
  useEffect(() => {
    if (location.state?.scrollToTitle) {
      // Small delay to ensure the component is fully rendered
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        // Clean up state to prevent scrolling on future updates
        navigate(location.pathname, { replace: true, state: {} });
      }, 500);
    }
  }, [location.state, navigate, location.pathname]);

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

  // Handle window resize for description visibility
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Occasionally animate the toggle button to draw attention
  useEffect(() => {
    if (isMobile && !showDescription && currentCategory?.description) {
      const timer = setTimeout(() => {
        setHighlightToggle(true);
        
        // Reset after animation completes
        const resetTimer = setTimeout(() => {
          setHighlightToggle(false);
        }, 1500);
        
        return () => clearTimeout(resetTimer);
      }, 5000); // Trigger after 5 seconds on page
      
      return () => clearTimeout(timer);
    }
  }, [isMobile, showDescription, currentCategory]);

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
        className="max-w-7xl mx-auto px-4 md:px-8 mb-8 md:mb-12 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Header with H1 and Search */}
        <div id="category-title" className="flex flex-col items-center justify-center relative">
          {/* Title and SearchBar with transitions */}
          <AnimatePresence mode="wait" initial={false}>
            {!isSearching ? (
              <motion.div
                key="title-container"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex items-center justify-center gap-3 sm:gap-4 flex-nowrap w-full px-4"
              >
                <h1 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#2D3748] font-bold tracking-wide text-center break-words flex-shrink">
                  {currentCategory ? currentCategory.label : 'Wszystkie Przepisy'}
                </h1>
                <div className="flex-shrink-0">
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
            <div className="w-full mt-2 mb-4 md:mb-0 md:mt-4 relative">
              {/* Mobile toggle button - centered with better positioning */}
              <div className="relative md:hidden flex justify-center items-center">
                <motion.button
                  className={`flex items-center justify-center mx-auto px-5 py-1.5 backdrop-blur-sm border rounded-full text-sm shadow-sm hover:shadow-md transition-all duration-300 ${
                    highlightToggle 
                      ? 'bg-green-100 border-green-300 text-green-700' 
                      : 'bg-green-50/70 border-green-100 text-gray-700 hover:bg-green-50/90'
                  }`}
                  onClick={() => setShowDescription(!showDescription)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ y: 0 }}
                  animate={highlightToggle ? 
                    { 
                      y: [0, -4, 0, -4, 0],
                      scale: [1, 1.05, 1, 1.05, 1],
                      transition: { duration: 1.5 }
                    } : 
                    { 
                      y: [0, -2, 0],
                      transition: {
                        y: {
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "loop"
                        }
                      }
                    }
                  }
                >
                  {showDescription ? (
                    <span className="flex items-center">
                      Ukryj opis
                      <motion.span 
                        className="ml-1.5 text-green-600" 
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 180 }}
                        transition={{ duration: 0.3 }}
                      >
                        ▼
                      </motion.span>
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Pokaż opis
                      <motion.span className="ml-1.5 text-green-600">▼</motion.span>
                    </span>
                  )}
                </motion.button>
              </div>
              
              {/* Description with animation */}
              <AnimatePresence mode="wait">
                {(showDescription || !isMobile) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ 
                      opacity: 1, 
                      height: "auto", 
                      marginTop: isMobile ? 4 : 16
                    }}
                    exit={{ 
                      opacity: 0, 
                      height: 0, 
                      marginTop: 0,
                      transition: { 
                        opacity: { duration: 0.2 }, 
                        height: { duration: 0.3 } 
                      }
                    }}
                    transition={{ 
                      duration: 0.4,
                      ease: "easeInOut" 
                    }}
                    className="overflow-hidden"
                  >
                    <p 
                      className="font-['Lato'] text-base md:text-lg lg:text-xl text-gray-600 text-center max-w-3xl mx-auto leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: currentCategory.description.replace(
                          /{LINK}/g,
                          '<span class="inline-block relative group"><a href="/kuchnia/ciastka/mieszanka-1" class="relative z-10 text-green-600 font-medium transition-colors duration-300 group-hover:text-green-700">optymalną domową mieszankę na mąkę bezglutenową</a><span class="absolute bottom-0 left-0 w-full h-[30%] bg-green-100 transform transition-all duration-300 -z-0 group-hover:h-[90%] group-hover:bg-green-50"></span></span>'
                        )
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </motion.div>

      <div className="sticky top-0 z-40 mb-6 shadow-md bg-gray-100">
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