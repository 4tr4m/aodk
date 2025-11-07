import React, { useEffect, useCallback, useRef, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import TopNavBar from '../../Headers/TopNavBar';
import CategoryHeader from './CategoryHeader';
import CategoryNav from './CategoryNav';
import Footer from '../../Footer/Footer';
import RecipeGrid from '../Recipe/RecipeGrid';
import { kuchniaCategories } from '../../../Data/category-data';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from '../../UI/SearchBar';
import { FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import searchService from '../../../services/searchService';
import SEO from '../../SEO/SEO';
import categoryService from '../../../services/categoryService';
import recipeService from '../../../services/recipeService';
import IngredientFilter from '../../UI/IngredientFilter';
import NewsletterModal from '../../Modal/NewsletterModal';

// SearchIcon component taken from CategoryBanner
const SearchIcon = ({ toggleSearch }) => {
  return (
    <div className="relative" style={{ overflow: 'visible', padding: '0.5rem', margin: '-0.5rem' }}>
      <motion.div 
        className="cursor-pointer relative select-none search-icon-container"
        style={{ overflow: 'visible', position: 'relative', zIndex: 50 }}
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
        <div className="relative flex items-center justify-center" style={{ overflow: 'visible', position: 'relative' }}>
          <div 
            className="absolute inset-0 rounded-full animate-ping opacity-30" 
            style={{
              background: 'radial-gradient(circle, rgba(34,197,94,0.5) 0%, rgba(34,197,94,0) 70%)',
              transform: 'scale(1.8)',
              animationDuration: '3s',
              margin: '-20%',
            }}
          ></div>
          <div 
            className="absolute inset-0 rounded-full animate-pulse" 
            style={{
              background: 'radial-gradient(circle, rgba(34,197,94,0.3) 0%, rgba(34,197,94,0) 70%)',
              transform: 'scale(1.5)',
              margin: '-15%',
            }}
          ></div>
          {/* Attention ring */}
          <div className="absolute -inset-1 rounded-full bg-green-400/20 animate-pulse" style={{ margin: '-4px' }}></div>
          
          <FaSearch className="text-[2rem] sm:text-[2.5rem] md:text-[2.8rem] lg:text-[3.1rem] text-green-600 hover:text-green-500 transition-colors duration-300 drop-shadow-lg relative z-10 search-icon" style={{ position: 'relative', zIndex: 50, display: 'block' }} />
        </div>
      </motion.div>
    </div>
  );
};

// Helper function to format category names - capitalize first letter, rest lowercase
const formatCategoryName = (name) => {
  if (!name) return '';
  // Words that should remain lowercase (Polish prepositions and conjunctions)
  const lowercaseWords = ['i', 'a', 'w', 'z', 'na', 'do', 'od', 'po', 'przy', 'bez', 'dla', 'o', 'u', 'ze', 'we', 'ku', 'przeciw', 'między', 'nad', 'pod', 'przed', 'za', 'obok', 'wśród', 'dzięki', 'wobec', 'względem'];
  
  return name
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
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // Ingredient filter states
  const [isIngredientFilterVisible, setIsIngredientFilterVisible] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [selectedIngredientsCount, setSelectedIngredientsCount] = useState(0);

  // Scroll detection for hiding/showing header elements
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollThreshold = 30; // Hide elements after scrolling 30px for faster response

  // Newsletter modal state
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);


  useEffect(() => {
    if (!state.isLoading) {
      setLoading(false);
    }
  }, [state.isLoading]);

  // Scroll detection effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial scroll position
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollThreshold]);

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
              setSelectedIngredientsCount(1); // Single ingredient from URL
              
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

  // Effect to scroll to top if coming from carousel click or footer
  useEffect(() => {
    if (location.state?.scrollToTitle || location.state?.scrollToTop) {
      const reason = location.state?.scrollToTitle ? 'scrollToTitle' : 'scrollToTop';
      console.log(`CategoryPage: Scrolling to top due to ${reason} state`);
      console.log('Current scroll position before:', window.scrollY);
      
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
        console.log('Current scroll position after smooth scroll:', window.scrollY);
      }, 100);
      
      // Final backup scroll (important for mobile)
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        console.log('Final scroll position:', window.scrollY);
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
    setSelectedIngredientsCount(0);
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
    if (recipes && ingredientName) {
      setFilteredRecipes(recipes);
      setActiveFilter(ingredientName);
      // Count ingredients - if comma-separated, count after splitting and trimming
      const count = ingredientName.includes(',') 
        ? ingredientName.split(',').map(s => s.trim()).filter(s => s.length > 0).length
        : 1;
      setSelectedIngredientsCount(count);
    } else {
      setFilteredRecipes(null);
      setActiveFilter(null);
      setSelectedIngredientsCount(0);
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
      
      {/* Sticky header with filter button, title/search, and magnifying glass */}
      <div className="sticky top-0 z-30 bg-gray-100 mb-6 md:mb-8" style={{ overflow: 'visible', paddingTop: '1rem', paddingBottom: '1rem' }}>
        <motion.div 
          className="max-w-7xl mx-auto px-4 md:px-8 text-center"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          style={{ overflow: 'visible' }}
        >
        {/* Header with H1 and Search */}
        <div id="category-title" className="flex flex-col items-center justify-center relative" style={{ overflow: 'visible' }}>
          {/* Fixed container for filter button, title/search, and magnifying glass */}
          <motion.div 
            className="relative w-full flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 px-2 sm:px-3 md:px-4"
            style={{ overflow: 'visible', zIndex: 40, paddingTop: '0.5rem', paddingBottom: '0.5rem', display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center' }}
            animate={{
              paddingTop: isScrolled ? '0.25rem' : '0.5rem',
              paddingBottom: isScrolled ? '0.25rem' : '0.5rem',
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Enhanced Magical Ingredient Filter Button */}
            <motion.button
              onClick={toggleIngredientFilter}
              className={`select-none px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 z-20 flex items-center gap-2 group border-2 flex-shrink-0 relative overflow-hidden
                ${selectedIngredientsCount > 0 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-blue-400/50' 
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-blue-400/30'
                }`}
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.92 }}
              initial={{ scale: 1 }}
              animate={selectedIngredientsCount > 0 ? 
                { 
                  boxShadow: [
                    "0 20px 25px -5px rgba(59, 130, 246, 0.3), 0 10px 10px -5px rgba(59, 130, 246, 0.2)",
                    "0 20px 25px -5px rgba(59, 130, 246, 0.5), 0 10px 10px -5px rgba(59, 130, 246, 0.3)",
                    "0 20px 25px -5px rgba(59, 130, 246, 0.3), 0 10px 10px -5px rgba(59, 130, 246, 0.2)"
                  ],
                  transition: { 
                    repeat: Infinity, 
                    repeatType: "loop", 
                    duration: 2.5,
                    ease: "easeInOut"
                  }
                } : {}
              }
              aria-label="Filtruj składniki"
            >
              {/* Shimmer/Shine effect */}
              <motion.div
                className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-200%' }}
                animate={{ x: '200%' }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 3,
                  ease: "linear"
                }}
              />
              
              {/* Glowing pulse effect when active */}
              {selectedIngredientsCount > 0 && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-blue-400/30"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-blue-300/20"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.4, 0, 0.4],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.5,
                      ease: "easeInOut",
                      delay: 0.3
                    }}
                  />
                </>
              )}
              
              {/* Ripple effect on click */}
              <motion.div
                className="absolute inset-0 rounded-xl bg-white/20"
                initial={{ scale: 0, opacity: 0.6 }}
                animate={isIngredientFilterVisible ? {
                  scale: [0, 2, 2.5],
                  opacity: [0.6, 0.3, 0],
                } : {}}
                transition={{ duration: 0.6 }}
              />

              <div className="relative flex items-center justify-center z-10">
                {/* Active filter indicator badge with count */}
                {selectedIngredientsCount > 0 && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full min-w-[22px] h-[22px] flex items-center justify-center shadow-lg border-2 border-white px-1"
                  >
                    {selectedIngredientsCount}
                  </motion.div>
                )}
                
                {/* Filter icon with enhanced animation */}
                <motion.div
                  animate={selectedIngredientsCount > 0 ? {
                    rotate: [0, 10, -10, 10, 0],
                    scale: [1, 1.1, 1],
                  } : {}}
                  transition={{
                    duration: 0.6,
                    repeat: selectedIngredientsCount > 0 ? Infinity : 0,
                    repeatDelay: 1.5
                  }}
                >
                  <svg 
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </motion.div>
                
                {/* Mobile label (short) */}
                <span className="ml-1 inline sm:hidden text-xs font-bold relative z-10">Filtruj</span>
                {/* Desktop/tablet label (full) */}
                <span className="ml-1 hidden sm:inline text-sm font-bold relative z-10">Filtruj składniki</span>
              </div>

              {/* Tooltip showing active filter - appears on hover when filter is active */}
              {activeFilter && (
                <motion.div
                  initial={{ opacity: 0, y: 5, scale: 0.95 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900/95 backdrop-blur-sm text-white text-xs rounded-lg shadow-xl whitespace-nowrap pointer-events-none z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900/95"></div>
                  <span className="font-semibold">Aktywny filtr ({selectedIngredientsCount}):</span> {activeFilter.length > 20 ? activeFilter.substring(0, 20) + '...' : activeFilter}
                </motion.div>
              )}
            </motion.button>

            {/* Title and SearchBar with transitions - centered layout using grid column */}
            <div className="flex items-center justify-center min-w-0" style={{ gridColumn: '2', justifySelf: 'center', width: '100%' }}>
              <AnimatePresence mode="wait">
                {!isSearching ? (
                  <motion.div
                    key="category-title"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ 
                      opacity: isScrolled ? 0 : 1, 
                      y: 0,
                      height: isScrolled ? 0 : 'auto',
                      marginTop: isScrolled ? 0 : undefined,
                      marginBottom: isScrolled ? 0 : undefined,
                    }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6"
                    style={{ overflow: 'visible', width: '100%', justifyContent: 'center' }}
                  >
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
                      
                      <h1 className="relative font-['Playfair_Display'] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-[#2D3748] font-bold tracking-wide text-center break-words group-hover:text-green-600 transition-colors duration-300 px-2 sm:px-3">
                        {/* Mobile: Split multi-word titles into two lines */}
                        <span className="block sm:hidden">
                          {(() => {
                            const title = currentCategory ? formatCategoryName(currentCategory.label) : 'Wszystkie Przepisy';
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
                          {currentCategory ? formatCategoryName(currentCategory.label) : 'Wszystkie Przepisy'}
                        </span>
                      </h1>
                    </motion.div>
                    
                    {/* Search icon - with proper spacing to prevent clipping */}
                    <motion.div 
                      className="flex-shrink-0"
                      style={{ overflow: 'visible', zIndex: 50, position: 'relative', padding: '0.5rem', margin: '-0.5rem' }}
                      animate={{
                        opacity: isScrolled ? 0 : 1,
                        scale: isScrolled ? 0.8 : 1,
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <SearchIcon toggleSearch={toggleSearch} />
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="search-bar"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full flex items-center justify-center"
                    style={{ gridColumn: '2', width: '100%' }}
                  >
                    {/* Search bar - always visible when open */}
                    <div className="flex-1 w-full max-w-full">
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Right spacer for symmetry - same width as filter button */}
            <div style={{ gridColumn: '3', minWidth: '120px' }} className="hidden sm:block"></div>
          </motion.div>
        </div>
        </motion.div>
      </div>

      {/* Description - compact design, hidden when scrolled */}
      <AnimatePresence>
        {currentCategory?.description && !isSearching && !isScrolled && (
          <motion.div 
            className="w-full max-w-7xl mx-auto px-4 md:px-8 mb-4 md:mb-6"
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              height: 'auto',
            }}
            exit={{ 
              opacity: 0, 
              y: -10,
              height: 0,
              marginBottom: 0,
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className="bg-white rounded-lg p-4 md:p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 max-w-3xl mx-auto">
              <div className="prose prose-sm max-w-none">
                <p 
                  className={`font-['Lato'] text-sm md:text-base text-gray-600 text-center max-w-2xl mx-auto leading-relaxed transition-all duration-200 ${
                    !isDescriptionExpanded && currentCategory.description.length > 150 
                      ? 'overflow-hidden' 
                      : ''
                  }`}
                  style={{
                    display: !isDescriptionExpanded && currentCategory.description.length > 150 ? '-webkit-box' : 'block',
                    WebkitLineClamp: !isDescriptionExpanded && currentCategory.description.length > 150 ? 3 : 'unset',
                    WebkitBoxOrient: 'vertical'
                  }}
                  onClick={(e) => {
                    // Handle click on the link to mieszanka-2
                    const target = e.target.closest('a[data-newsletter-trigger]');
                    if (target) {
                      e.preventDefault();
                      setPendingNavigation('/przepis/mieszanka-2');
                      setIsNewsletterModalOpen(true);
                    }
                  }}
                  dangerouslySetInnerHTML={{
                    __html: currentCategory.description.replace(
                      /{LINK}/g,
                      '<span class="inline-block relative group"><a href="/przepis/mieszanka-2" data-newsletter-trigger class="relative z-10 text-green-600 font-medium transition-colors duration-200 group-hover:text-green-700 underline decoration-1 underline-offset-2 cursor-pointer">optymalną domową mieszankę na mąkę bezglutenową</a><span class="absolute bottom-0 left-0 w-full h-[25%] bg-green-100/40 transform transition-all duration-200 -z-0 group-hover:h-[80%] group-hover:bg-green-50/20"></span></span>'
                    )
                  }}
                />
                {currentCategory.description.length > 150 && (
                  <motion.button
                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                    className="mt-3 flex items-center justify-center gap-1.5 text-green-600 hover:text-green-700 font-medium text-sm transition-all duration-200 group mx-auto px-3 py-1.5 rounded-md hover:bg-green-50/50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isDescriptionExpanded ? (
                      <>
                        <span>Pokaż mniej</span>
                        <FaChevronUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform duration-200" />
                      </>
                    ) : (
                      <>
                        <span>Czytaj więcej</span>
                        <FaChevronDown className="w-3 h-3 group-hover:translate-y-0.5 transition-transform duration-200" />
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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