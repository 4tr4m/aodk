// CategoryBanner Component - Main categories showcase section for the homepage
// This component displays the main categories in an interactive carousel format with
// search functionality, animated elements, and responsive design. It serves as the
// primary way for users to discover and navigate to different recipe categories.
//
// USAGE LOCATIONS:
// - src/pages/HomePage.jsx (main homepage categories section)
//
// FEATURES:
// - Dynamic category loading from Supabase with fallback to static data
// - Interactive search functionality with suggestions
// - Animated search icon with pulsing effects
// - Responsive carousel using CategoryCarousel component
// - Wave dividers for visual appeal
// - Intersection Observer for scroll-triggered animations
// - Search tutorial tooltip for first-time users
// - Smooth transitions between search and title states
//
// DATA SOURCES:
// - Primary: Supabase 'categories' table
// - Fallback: Static kuchniaCategories from category-data.js
//
// SEARCH INTEGRATION:
// - Uses SearchBar component for search functionality
// - Integrates with searchService for suggestions
// - Navigates to search results page

import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import CategoryCarousel from '../UI/CategoryCarousel';
import { kuchniaCategories } from '../../Data/category-data'; 
import { useInView } from 'react-intersection-observer';
import SearchBar from '../UI/SearchBar';
import { FaSearch } from 'react-icons/fa';
import searchService from '../../services/searchService';
import { useNavigate } from 'react-router-dom';
import supabase from '../../lib/supabase-browser';

// Constants
const BG_COLOR_LIGHTER = "gray-100";
const SECTION_BG = `bg-${BG_COLOR_LIGHTER}`;
const ACCENT_COLOR = 'bg-green-600'; // Solid green for consistency with buttons

// Animation variants
const animations = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1.0], 
      staggerChildren: 0.1
    }
  }
};

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }
  }
};

const titleVariant = {
  hidden: { y: 10, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 400,
      damping: 30
    }
  }
};

// Title with search icon component (memoized)
const TitleWithSearch = memo(({ title, toggleSearch, accentColor, showTooltip }) => {
  return (
    <div className="flex items-center justify-center flex-wrap gap-3 sm:gap-4">
      <h2 
        className={`inline-block font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#1A202C] 
          relative pb-3 sm:pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 
          after:-translate-x-1/2 after:w-24 sm:after:w-28 md:after:w-32 after:h-[3px] after:${accentColor} 
          tracking-wide font-semibold max-w-[80%] sm:max-w-none break-words`}
      >
        {title}
      </h2>
      <div className="flex-shrink-0">
        <SearchIcon toggleSearch={toggleSearch} showTooltip={showTooltip} />
      </div>
    </div>
  );
});

TitleWithSearch.displayName = 'TitleWithSearch';

// Search icon component (memoized)
const SearchIcon = memo(({ toggleSearch, showTooltip }) => {
  const [showTutorial, setShowTutorial] = useState(() => {
    try {
      const hasSeenTutorial = localStorage.getItem('hasSeenSearchTutorial');
      return hasSeenTutorial !== 'true';
    } catch (e) {
      return true;
    }
  });

  useEffect(() => {
    if (showTutorial) {
      const timer = setTimeout(() => {
        setShowTutorial(false);
        try {
          localStorage.setItem('hasSeenSearchTutorial', 'true');
        } catch (e) {}
      }, 16000);
      return () => clearTimeout(timer);
    }
  }, [showTutorial]);

  return (
    <div className="relative inline-block">
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
        style={{ top: '-10px', position: 'relative', left: '0', ...(window.innerWidth < 640 ? { left: '-15px' } : {}) }}
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
          <div className="absolute -inset-1 rounded-full bg-green-400/20 animate-pulse"></div>
          <FaSearch 
            className="text-[2.86rem] sm:text-[2.85rem] md:text-[3.1rem] text-green-600 hover:text-green-500 transition-colors duration-300 drop-shadow-lg relative z-10 search-icon" 
            style={window.innerWidth < 640 ? { fontSize: '2.86rem' } : {}}
          />
        </div>
      </motion.div>
    </div>
  );
});

SearchIcon.displayName = 'SearchIcon';

// Wave divider component (memoized)
const WaveDivider = memo(({ position = 'top', color }) => {
  const isTop = position === 'top';
  const opacity = isTop ? '1' : '0.6'; // Make bottom divider more subtle
  return (
    <div className={`absolute ${isTop ? 'top-0' : 'bottom-0'} left-0 right-0 w-full overflow-hidden ${!isTop ? 'transform rotate-180' : ''}`}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[70px] sm:h-[120px]">
        <path 
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          fill={color}
          opacity={opacity}
        ></path>
      </svg>
    </div>
  );
});

WaveDivider.displayName = 'WaveDivider';

// Main component
const CategoryBanner = () => {
  // State
  const [allCategoryItems, setAllCategoryItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const navigate = useNavigate();
  
  // Refs
  const bannerRef = useRef(null);
  const searchTimeoutRef = useRef(null);
  
  // Animation controls
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Handlers
  const toggleSearch = useCallback(() => {
    setIsSearching(prev => !prev);
    // Reset suggestions when opening search
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
    console.log("Search submitted in banner:", searchTerm);
    
    // Example: Navigate to search results page
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setIsSearching(false);
    }
  }, [navigate]);

  // Load categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data: categories, error } = await supabase
          .from('categories')
          .select('*')
          .order('display_name');

        if (error) {
          console.error("Error fetching categories:", error);
          // Fallback to hardcoded categories
          loadFallbackCategories();
          return;
        }

        // Filter categories to only include those with images
        const items = categories
          .filter(category => category.image_path)
          .map(category => ({
            id: category.id,
            label: category.name,
            image: category.image_path,
            shortDesc: category.description || 'Odkryj nasze pyszne przepisy!',
            link: `/kuchnia/${category.slug || category.id}`
          }));
        
        if (items.length === 0) {
          // If no categories found in Supabase, use fallback
          loadFallbackCategories();
        } else {
          setAllCategoryItems(items);
          setIsLoaded(true);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        // Fallback to hardcoded categories
        loadFallbackCategories();
      }
    };

    // Helper function to use fallback categories
    const loadFallbackCategories = () => {
      const categories = kuchniaCategories.mainCategories;
      
      const items = categories
        .filter(category => category.image) // Only include categories with images
        .map(category => ({
          id: category.label,
          label: category.label,
          image: category.image,
          shortDesc: category.shortDesc || 'Odkryj nasze pyszne przepisy!',
          link: category.link
        }));
      
      setAllCategoryItems(items);
      setIsLoaded(true);
    };

    fetchCategories();
  }, []);

  // Start animations when in view
  useEffect(() => {
    if (inView) {
      controls.start('visible');
      // Make sure search icon animation starts immediately
      document.querySelectorAll('.search-icon-container').forEach(el => {
        const icon = el.querySelector('.search-icon');
        if (icon) {
          icon.style.animation = 'pulse 2.5s infinite ease-in-out';
        }
      });
    }
  }, [controls, inView]);

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

  // Define wave divider color
  const dividerColor = '#F7FAFC'; // tailwind bg-gray-50

  return (
    <section 
      id="categories" 
      ref={bannerRef} 
      className={`relative ${SECTION_BG} min-h-[320px] sm:min-h-[350px] md:min-h-[420px] overflow-hidden pt-6 pb-16 md:pt-10 md:pb-20`}
    >
      {/* Wavy dividers */}
      <WaveDivider position="top" color={dividerColor} />

      <motion.div 
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={animations}
        className="container mx-auto px-4 pt-10 sm:pt-12 md:pt-16 lg:pt-20"
      >
        {/* Header Section */}
        <motion.div 
          className="text-center mb-8 md:mb-12 relative"
          variants={itemAnimation}
        >
          <div className="flex flex-col items-center justify-center">
            {/* Title and SearchBar with smoother transitions */}
            <AnimatePresence mode="wait" initial={false}>
              {!isSearching ? (
                <motion.div
                  key="title-container"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ 
                    duration: 1,
                    ease: [0.25, 0.1, 0.25, 1.0] // Smooth cubic bezier curve
                  }}
                >
                  <TitleWithSearch 
                    title="ODŻYWCZE PRZEPISY" 
                    toggleSearch={toggleSearch} 
                    accentColor={ACCENT_COLOR}
                    showTooltip={!isSearching}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="searchbar-container"
                  initial={{ opacity: 0, y: 20, width: "80%" }}
                  animate={{ opacity: 1, y: 0, width: "100%" }}
                  exit={{ opacity: 0, y: 20, width: "80%" }}
                  transition={{ 
                    duration: 1,
                    ease: [0.25, 0.1, 0.25, 1.0],
                    width: { duration: 0.8 }
                  }}
                  className="w-full mx-auto py-2"
                  style={{ maxWidth: "calc(100% - 40px)" }}
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
          
            {/* Description - always visible */}
            <motion.p 
              className="mt-2 sm:mt-3 md:mt-4 text-gray-600 text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl sm:max-w-3xl mx-auto font-['Lato'] leading-relaxed tracking-wide"
              variants={titleVariant}
            >
              Odkryj nasze starannie wybrane przepisy, które łączą w sobie smak i wartości odżywcze
            </motion.p>
          </div>
        </motion.div>
        
        {/* Carousel Section */}
        <motion.div 
          variants={itemAnimation}
          className="w-full mx-auto"
        >
          {isLoaded ? (
            allCategoryItems.length > 0 ? (
              <div className="relative flex justify-center">
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-r from-transparent via-${BG_COLOR_LIGHTER} to-transparent 
                    opacity-0 pointer-events-none`} 
                  animate={{
                    opacity: [0, 0.4, 0],
                    transition: { 
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }
                  }}
                />
                
                <div className="relative px-1 sm:px-2 md:px-4 lg:px-8 overflow-hidden w-full max-w-[100%] md:max-w-[900px] lg:max-w-[1200px] xl:max-w-[1400px] mx-auto">
                  <CategoryCarousel 
                    items={allCategoryItems}
                    showViewButton={true}
                  />
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 text-lg">Nie znaleziono kategorii.</p>
              </div>
            )
          ) : (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Bottom wavy divider */}
      <WaveDivider position="bottom" color="white" />
    </section>
  );
};

export default memo(CategoryBanner);