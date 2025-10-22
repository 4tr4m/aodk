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
import categoryService from '../../services/categoryService';
import recipeService from '../../services/recipeService';
import IngredientFilter from '../UI/IngredientFilter';

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

  // Ingredient filter states
  const [isIngredientFilterVisible, setIsIngredientFilterVisible] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  // State for occasional toggle button attention animation
  const [highlightToggle, setHighlightToggle] = useState(false);

  useEffect(() => {
    if (!state.isLoading) {
      setLoading(false);
    }
  }, [state.isLoading]);

  // Handle URL parameter for ingredient filtering
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const ingredientParam = urlParams.get('ingredient');
    
    if (ingredientParam) {
      // Open the ingredient filter and automatically search for the ingredient
      setIsIngredientFilterVisible(true);
      
      // Automatically search for recipes with this ingredient
      const searchForIngredient = async () => {
        try {
          const recipes = await recipeService.getRecipesByIngredient(ingredientParam);
          setFilteredRecipes(recipes);
          setActiveFilter(ingredientParam);
          
          // Set the selected ingredient for the filter
          setSelectedIngredient({ name: ingredientParam });
        } catch (error) {
          console.error('Error searching for ingredient from URL:', error);
        }
      };
      
      searchForIngredient();
    }
  }, [location.search]);

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

  // Effect to scroll to top if coming from carousel click
  useEffect(() => {
    if (location.state?.scrollToTitle) {
      console.log('CategoryPage: Scrolling to top due to scrollToTitle state');
      console.log('Current scroll position before:', window.scrollY);
      
      // Force immediate scroll to top first
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Then try smooth scroll after a delay
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        console.log('Current scroll position after smooth scroll:', window.scrollY);
      }, 50);
      
      // Final backup scroll
      setTimeout(() => {
        window.scrollTo(0, 0);
        console.log('Final scroll position:', window.scrollY);
        // Clean up state to prevent scrolling on future updates
        navigate(location.pathname, { replace: true, state: {} });
      }, 200);
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
    const smartCapitalize = (str) => {
      // Words that should remain lowercase (Polish prepositions and conjunctions)
      const lowercaseWords = ['i', 'a', 'w', 'z', 'na', 'do', 'od', 'po', 'przy', 'bez', 'dla', 'o', 'u', 'ze', 'we', 'ku', 'przeciw', 'między', 'nad', 'pod', 'przed', 'za', 'obok', 'wśród', 'dzięki', 'wobec', 'względem'];
      
      return str
        .replace(/-/g, ' ')
        .split(' ')
        .map((word, index) => {
          // Always capitalize the first word
          if (index === 0) {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          }
          // For other words, check if they should be lowercase
          if (lowercaseWords.includes(word.toLowerCase())) {
            return word.toLowerCase();
          }
          // Capitalize other words
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(' ');
    };
    
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
    }
  }, [navigate]);

  // Ingredient filter functions
  // Remove ?ingredient from URL
  const removeIngredientQueryParam = useCallback(() => {
    const params = new URLSearchParams(location.search);
    if (params.has('ingredient')) {
      params.delete('ingredient');
      navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
    }
  }, [location.pathname, location.search, navigate]);

  const handleIngredientFilterClose = useCallback(() => {
    setIsIngredientFilterVisible(false);
    setFilteredRecipes(null);
    setActiveFilter(null);
    setSelectedIngredient(null);
    removeIngredientQueryParam();
  }, [removeIngredientQueryParam]);

  const toggleIngredientFilter = useCallback(() => {
    setIsIngredientFilterVisible(prev => !prev);
    if (isIngredientFilterVisible) {
      // Clear filter when closing
      handleIngredientFilterClose();
    }
  }, [isIngredientFilterVisible, handleIngredientFilterClose]);

  const handleRecipesFiltered = useCallback((recipes, ingredientName) => {
    if (recipes) {
      setFilteredRecipes(recipes);
      setActiveFilter(ingredientName);
    } else {
      setFilteredRecipes(null);
      setActiveFilter(null);
    }
  }, []);

  // Get recipes to display (either filtered or category recipes)
  const getDisplayRecipes = () => {
    if (filteredRecipes) {
      return filteredRecipes;
    }
    return categoryRecipes;
  };

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

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const cats = await categoryService.getCategories();
      setCategories(cats);
    };
    fetchCategories();
  }, []);

  // Note: Scroll to top is handled by App.jsx ScrollToTop component
  // This effect is removed to prevent conflicts with scrollToTitle state

  return (
    <div ref={pageRef} className="min-h-screen bg-gray-100">
      <SEO 
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonical={`https://autyzmkuchni.pl/kuchnia${categorySlug ? `/${categorySlug}` : ''}`}
      />
      <div className="relative mb-8">
        <CategoryHeader showLogo={false} />
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
          <AnimatePresence>
            {!isSearching ? (
              <motion.div
                key="category-title"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative flex items-center justify-center w-full px-2 sm:px-4"
              >
                {/* Ingredient Filter Button - Sticky on desktop, positioned on mobile */}
                <motion.button
                  onClick={toggleIngredientFilter}
                  className="select-none px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 z-20 flex items-center gap-2 group border-2 border-blue-400/30 flex-shrink-0 absolute left-[10px] md:left-[100px] top-1/2 -translate-y-1/2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ scale: 1 }}
                  animate={isIngredientFilterVisible ? 
                    { 
                      scale: [1, 1.05, 1],
                      transition: { 
                        repeat: Infinity, 
                        repeatType: "loop", 
                        duration: 2,
                        ease: "easeInOut"
                      }
                    } : {}
                  }
                  aria-label="Filtruj składniki"
                >
                  <div className="relative flex items-center justify-center">
                    <div 
                      className="absolute inset-0 rounded-xl animate-ping opacity-30" 
                      style={{
                        background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)',
                        transform: 'scale(1.2)',
                        animationDuration: '3s',
                      }}
                    ></div>
                    
                    <svg 
                      className="w-4 h-4 sm:w-5 sm:h-5 text-white transition-transform duration-300 group-hover:rotate-12" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    {/* Mobile label (short) */}
                    <span className="ml-1 inline sm:hidden text-xs font-bold">Filtruj</span>
                    {/* Desktop/tablet label (full) */}
                    <span className="ml-1 hidden sm:inline text-sm font-bold">Filtruj składniki</span>
                  </div>
                </motion.button>

                {/* Centered title and search icon container */}
                <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 ml-16 sm:ml-20 md:ml-24 mr-4">
                  {/* Centered title */}
                  <motion.div
                    className="relative group cursor-pointer flex-shrink-0"
                    onClick={toggleSearch}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    title="Kliknij, aby wyszukać przepisy"
                  >
                    {/* Subtle background effect on hover */}
                    <motion.div 
                      className="absolute inset-0 -m-2 rounded-lg bg-green-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                    
                    <h1 className="relative font-['Playfair_Display'] text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-[#2D3748] font-bold tracking-wide text-center break-words group-hover:text-green-600 transition-colors duration-300">
                      {/* Mobile: Split multi-word titles into two lines */}
                      <span className="block sm:hidden">
                        {(() => {
                          const title = currentCategory ? currentCategory.label : 'Wszystkie Przepisy';
                          const words = title.split(' ');
                          if (words.length > 1) {
                            return (
                              <>
                                {words[0]}
                                <br />
                                {words.slice(1).join(' ')}
                              </>
                            );
                          }
                          return title;
                        })()}
                      </span>
                      {/* Desktop: Single line */}
                      <span className="hidden sm:block">
                        {currentCategory ? currentCategory.label : 'Wszystkie Przepisy'}
                      </span>
                    </h1>
                  </motion.div>
                  
                  {/* Search icon */}
                  <div className="flex-shrink-0">
                    <SearchIcon toggleSearch={toggleSearch} />
                  </div>
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
                <div className="relative flex items-center w-full px-2 sm:px-4">
                  {/* Keep filter button visible during search - same positioning as normal state */}
                  <motion.button
                    onClick={toggleIngredientFilter}
                    className="select-none px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 z-20 flex items-center gap-2 group border-2 border-blue-400/30 flex-shrink-0 absolute left-[10px] md:left-[100px] top-1/2 -translate-y-1/2"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ scale: 1 }}
                    animate={isIngredientFilterVisible ? 
                      { 
                        scale: [1, 1.05, 1],
                        transition: { 
                          repeat: Infinity, 
                          repeatType: "loop", 
                          duration: 2,
                          ease: "easeInOut"
                        }
                      } : {}
                    }
                    aria-label="Filtruj składniki"
                  >
                    <div className="relative flex items-center justify-center">
                      <div 
                        className="absolute inset-0 rounded-xl animate-ping opacity-30" 
                        style={{
                          background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)',
                          transform: 'scale(1.2)',
                          animationDuration: '3s',
                        }}
                      ></div>
                      
                      <svg 
                        className="w-4 h-4 sm:w-5 sm:h-5 text-white transition-transform duration-300 group-hover:rotate-12" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                      <span className="ml-1 inline sm:hidden text-xs font-bold">Filtruj</span>
                      <span className="ml-1 hidden sm:inline text-sm font-bold">Filtruj składniki</span>
                    </div>
                  </motion.button>

                  {/* Search bar */}
                  <div className="flex-1 ml-16 sm:ml-20 md:ml-24">
                    <SearchBar 
                      placeholder="Szukaj przepisów..." 
                      onSearchSubmit={handleSearchSubmit}
                      onClose={handleSearchClose}
                      onChange={handleSearchInput}
                      initialOpen={isSearching}
                      suggestions={suggestions}
                      onSuggestionSelect={handleSuggestionSelect}
                      highlightedTerm={searchTerm}
                      minCharsForSuggestions={3}
                    />
                  </div>
                </div>
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

      <div className="sticky top-0 z-40 mb-6 bg-gray-100">
        <CategoryNav 
          categories={categories}
          currentSlug={categorySlug}
          onCategoryClick={handleCategoryClick}
          onSearchToggle={toggleSearch}
        />
      </div>

      <motion.main 
        className="pb-16 transition-all duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Active filter info */}
          {activeFilter && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-green-800 font-medium">
                    Filtrowanie po składniku: {activeFilter}
                  </span>
                  <span className="text-green-600 text-sm">
                    ({filteredRecipes?.length || 0} przepisów)
                  </span>
                </div>
                <button
                  onClick={handleIngredientFilterClose}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                >
                  Wyczyść filtr
                </button>
              </div>
            </motion.div>
          )}

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
        onClear={handleIngredientFilterClose}
      />

      <Footer />
    </div>
  );
};

export default CategoryPage;