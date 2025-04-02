import React, { useMemo, memo, useEffect } from 'react';
import { kuchniaCategories } from '../../Data/category-data';
import { motion, useReducedMotion } from 'framer-motion';
import CategoryCarousel from '../UI/CategoryCarousel';

// Option 1: Neutral Light Grey - bg-gray-50 or bg-gray-100
// Option 2: Neutral Mid-Grey - bg-gray-200
const BG_COLOR = 'bg-gray-100'; // Chosen: Light Grey for a clean, modern look
const BG_COLOR_LIGHTER = 'bg-gray-50/60'; // Lighter shade for accents
const GRADIENT_FROM = 'from-[#2D3748]/40';
const ACCENT_COLOR = 'bg-green-600'; // Solid green for consistency with buttons

const CategoryBanner = () => {
  const prefersReducedMotion = useReducedMotion();
  
  // Load all data upfront - combine both category rows
  const allCategoryItems = useMemo(() => {
    const categories = kuchniaCategories.mainCategories;
    
    // Sort items to put firstRow items first, then secondRow items
    return categories.sort((a, b) => {
      const aInFirstRow = kuchniaCategories.displayGroups.firstRow.includes(a.label);
      const bInFirstRow = kuchniaCategories.displayGroups.firstRow.includes(b.label);
      
      if (aInFirstRow && !bInFirstRow) return -1;
      if (!aInFirstRow && bInFirstRow) return 1;
      return 0;
    });
  }, []);
  
  // Preload all images immediately when component mounts
  useEffect(() => {
    allCategoryItems.forEach(item => {
      const img = new Image();
      img.src = `/img/${item.image}`;
    });
  }, [allCategoryItems]);

  // Load required scripts for Owl Carousel
  useEffect(() => {
    // Check if scripts are already loaded
    if (!window.jQuery) {
      const loadScript = (src, callback) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = callback;
        document.head.appendChild(script);
      };

      // Load jQuery first, then Owl Carousel
      loadScript('https://code.jquery.com/jquery-3.6.0.min.js', () => {
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js', () => {
          console.log('Owl Carousel loaded');
        });
      });
    }
  }, []);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Faster staggering to reduce overall animation time
        delayChildren: 0.2
      }
    }
  };

  const titleVariant = {
    hidden: { y: 10, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    }
  };

  return (
    <section 
      id="category-banner"
      className={`relative w-full min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh] ${BG_COLOR} scroll-mt-16 will-change-transform`}
      style={{
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    >
      <div 
        className={`absolute top-0 left-0 w-full h-16 sm:h-20 md:h-24 bg-gradient-to-b ${GRADIENT_FROM} to-transparent pointer-events-none`}
      />
      
      <motion.div 
        className="relative z-10 pt-8 pb-12 sm:pt-10 sm:pb-14 md:pt-12 md:pb-16 lg:pt-16 lg:pb-20"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <motion.h2 
              className={`inline-block font-['Playfair_Display'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#1A202C] 
                relative pb-3 sm:pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 
                after:-translate-x-1/2 after:w-24 sm:after:w-28 md:after:w-32 after:h-[3px] after:${ACCENT_COLOR} tracking-wide font-semibold`}
              variants={titleVariant}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              ODŻYWCZE PRZEPISY
            </motion.h2>
            <motion.p 
              className="mt-4 sm:mt-5 md:mt-6 text-gray-600 text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl sm:max-w-3xl mx-auto font-['Lato'] leading-relaxed tracking-wide"
              variants={titleVariant}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Odkryj nasze starannie wybrane przepisy, które łączą w sobie smak i wartości odżywcze
            </motion.p>
          </div>

          <div className="relative">
            <motion.div 
              className={`absolute inset-0 bg-gradient-to-r from-transparent via-${BG_COLOR_LIGHTER} to-transparent 
                rounded-xl overflow-hidden opacity-60`}
              whileHover={{ opacity: 0.4 }}
              transition={{ duration: 0.3 }}
            />
            
            <div className="relative px-1 sm:px-2 md:px-4 lg:px-8 overflow-hidden">
              <CategoryCarousel 
                items={allCategoryItems}
                showViewButton={true}
              />
            </div>
          </div>
        </div>

        {!prefersReducedMotion && (
          <>
            <motion.div 
              className={`absolute left-0 top-1/4 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 ${BG_COLOR_LIGHTER} rounded-full 
                blur-3xl -translate-x-1/2`}
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.3, 0.2] 
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
            <motion.div 
              className={`absolute right-0 bottom-1/4 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 ${BG_COLOR_LIGHTER} rounded-full 
                blur-3xl translate-x-1/2`}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2] 
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1 
              }}
            />
          </>
        )}
        
        {prefersReducedMotion && (
          <>
            <div className={`absolute left-0 top-1/4 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 ${BG_COLOR_LIGHTER} rounded-full 
              blur-3xl -translate-x-1/2 opacity-20`} />
            <div className={`absolute right-0 bottom-1/4 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 ${BG_COLOR_LIGHTER} rounded-full 
              blur-3xl translate-x-1/2 opacity-20`} />
          </>
        )}
      </motion.div>
      
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <div className={`w-full h-8 sm:h-10 md:h-12 bg-gradient-to-b from-transparent to-${BG_COLOR}/20`}></div>
        <div className={`w-full h-8 sm:h-10 md:h-12 ${BG_COLOR} relative`} style={{
          borderBottomLeftRadius: '100%', 
          borderBottomRightRadius: '100%',
          transform: 'translateY(-9px) scaleX(1.1)',
          marginBottom: '-9px',
          boxShadow: 'inset 0 -7px 7px -7px rgba(0,0,0,0.1)'
        }}></div>
      </div>
    </section>
  );
};

// Use React.memo with a custom comparison function to prevent unnecessary re-renders
export default memo(CategoryBanner, (prevProps, nextProps) => true);