import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import CategoryCarousel from '../UI/CategoryCarousel';
import { kuchniaCategories } from '../../Data/category-data'; 
import { useInView } from 'react-intersection-observer';
import SearchBar from '../UI/SearchBar';
import { FaSearch } from 'react-icons/fa';

const BG_COLOR_LIGHTER = "gray-100";
const SECTION_BG = `bg-${BG_COLOR_LIGHTER}`;
const ACCENT_COLOR = 'bg-green-600'; // Solid green for consistency with buttons

const CategoryBanner = () => {
  const [allCategoryItems, setAllCategoryItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const bannerRef = useRef(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

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

  useEffect(() => {
    // Use the kuchniaCategories directly instead of fetching
    const categories = kuchniaCategories.mainCategories;
    
    // Format categories for the carousel
    const items = categories.map(category => ({
      id: category.label,
      label: category.label,
      image: category.image || 'category-default.jpg',
      shortDesc: category.shortDesc || 'Odkryj nasze pyszne przepisy!',
      link: category.link
    }));
    
    setAllCategoryItems(items);
    setIsLoaded(true);
  }, []);

  const headerRef = useRef(null);

  // Create a wavy divider SVG
  const dividerColor = '#F7FAFC'; // tailwind bg-gray-50

  const handleSearchSubmit = (searchTerm) => {
    console.log("Search submitted in banner:", searchTerm);
    // Future implementation: filter recipes based on search term
  };

  const toggleSearch = () => {
    setIsSearching(!isSearching);
  };
  
  // Handle search closing from within the SearchBar component
  const handleSearchClose = () => {
    setIsSearching(false);
  };

  return (
    <section 
      id="categories" 
      ref={bannerRef} 
      className={`relative ${SECTION_BG} min-h-[320px] sm:min-h-[350px] md:min-h-[420px] overflow-hidden pt-6 pb-16 md:pt-10 md:pb-20`}
    >
      {/* Wavy divider at the top */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden text-white">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[70px] sm:h-[120px]">
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill={dividerColor}
          ></path>
        </svg>
      </div>

      <motion.div 
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={animations}
        className="container mx-auto px-4 pt-10 sm:pt-12 md:pt-16 lg:pt-20"
      >
        <motion.div 
          className="text-center mb-8 md:mb-12 relative"
          variants={itemAnimation}
        >
          <div className="flex items-center justify-center">
            <AnimatePresence mode="sync" initial={false}>
              {!isSearching ? (
                <motion.div 
                  key="title"
                  className="flex items-center gap-3 sm:gap-4"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.h2 
                    className={`inline-block font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1A202C] 
                      relative pb-3 sm:pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 
                      after:-translate-x-1/2 after:w-24 sm:after:w-28 md:after:w-32 after:h-[3px] after:${ACCENT_COLOR} tracking-wide font-semibold`}
                    variants={titleVariant}
                    ref={headerRef}
                  >
                    ODŻYWCZE PRZEPISY
                  </motion.h2>
                  <motion.div 
                    className="cursor-pointer relative -top-[10px]"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleSearch}
                    initial={{ scale: 1 }}
                    animate={{ 
                      scale: [1, 1.1, 1],
                      transition: { 
                        repeat: Infinity, 
                        repeatType: "reverse", 
                        duration: 1.5,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    <FaSearch className="text-3xl sm:text-4xl md:text-5xl text-green-600 hover:text-green-700 transition-colors drop-shadow-md" />
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="searchbar"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full mx-auto py-2"
                  style={{ maxWidth: "calc(100% - 40px)" }}
                >
                  <SearchBar 
                    placeholder="Szukaj przepisów..." 
                    onSearchSubmit={handleSearchSubmit} 
                    onClose={handleSearchClose}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <motion.p 
            className="mt-4 sm:mt-5 md:mt-6 text-gray-600 text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl sm:max-w-3xl mx-auto font-['Lato'] leading-relaxed tracking-wide"
            variants={titleVariant}
          >
            Odkryj nasze starannie wybrane przepisy, które łączą w sobie smak i wartości odżywcze
          </motion.p>
        </motion.div>
        
        <motion.div 
          variants={itemAnimation}
          className="w-full mx-auto"
        >
          {isLoaded && (
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
          )}
        </motion.div>
      </motion.div>

      {/* Wavy divider at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden transform rotate-180">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[70px] sm:h-[120px]">
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="white"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default CategoryBanner;