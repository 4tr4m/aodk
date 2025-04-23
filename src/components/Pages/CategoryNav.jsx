import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const CategoryNav = ({ categories, currentSlug, onCategoryClick }) => {
  const scrollRef = useRef(null);
  const containerRef = useRef(null);

  const smoothScrollToCategory = (element) => {
    const container = scrollRef.current;
    if (!container || !element) return;

    const containerWidth = container.offsetWidth;
    const elementLeft = element.offsetLeft;
    const elementWidth = element.offsetWidth;

    // Calculate the center position
    const targetScroll = elementLeft - (containerWidth / 2) + (elementWidth / 2);

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  // Handle arrow navigation
  const handleScroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth * 0.8;
    const targetScroll = container.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  // Scroll active item into view on mount and category change
  useEffect(() => {
    const activeButton = scrollRef.current?.querySelector('[data-active="true"]');
    if (activeButton) {
      setTimeout(() => {
        smoothScrollToCategory(activeButton);
      }, 100);
    }
  }, [currentSlug]);

  // Handle category click with scroll to top
  const handleCategoryClick = (link) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onCategoryClick(link);
  };

  // Show/hide arrows based on scroll position
  const [showLeftArrow, setShowLeftArrow] = React.useState(false);
  const [showRightArrow, setShowRightArrow] = React.useState(true);

  const updateArrows = () => {
    const container = scrollRef.current;
    if (!container) return;

    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(
      container.scrollLeft < (container.scrollWidth - container.offsetWidth - 10)
    );
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', updateArrows);
      updateArrows();
      return () => container.removeEventListener('scroll', updateArrows);
    }
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <motion.button
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-gradient-to-r from-gray-100 to-transparent"
            aria-label="Scroll left"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{ transform: 'translateY(-50%)' }}
          >
            <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
        )}

        {/* Right Arrow */}
        {showRightArrow && (
          <motion.button
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-gradient-to-l from-gray-100 to-transparent"
            aria-label="Scroll right"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{ transform: 'translateY(-50%)' }}
          >
            <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        )}

        <div 
          ref={scrollRef}
          className="w-full overflow-x-auto py-4 hide-scrollbar scroll-smooth touch-pan-x"
          onScroll={updateArrows}
          style={{
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
            scrollSnapType: 'x mandatory'
          }}
        >
          <div className="flex flex-nowrap gap-4 min-w-min pb-2">
            <motion.button
              data-active={!currentSlug}
              onClick={() => handleCategoryClick('/kuchnia')}
              className={`
                whitespace-nowrap px-7 py-3 rounded-full font-['Lato'] text-base sm:text-lg
                transition-all duration-300 border-2 shadow-md hover:shadow-lg
                ${!currentSlug 
                  ? 'bg-green-600 text-white border-green-600 scale-105' 
                  : 'bg-white text-gray-700 border-gray-200 hover:border-green-200'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
              style={{ scrollSnapAlign: 'start' }}
            >
              Wszystkie
            </motion.button>
            
            {categories.map((category, index) => {
              const categorySlug = category.link.split('/').pop();
              const isActive = categorySlug === currentSlug;
              
              return (
                <motion.button
                  key={index}
                  data-active={isActive}
                  onClick={() => handleCategoryClick(category.link)}
                  className={`
                    whitespace-nowrap px-7 py-3 rounded-full font-['Lato'] text-base sm:text-lg
                    transition-all duration-300 border-2 shadow-md hover:shadow-lg
                    ${isActive 
                      ? 'bg-green-600 text-white border-green-600 scale-105' 
                      : 'bg-white text-gray-700 border-gray-200 hover:border-green-200'
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10, transition: { delay: index * 0.05 } }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: index * 0.05 } }}
                  style={{ scrollSnapAlign: 'start' }}
                >
                  {category.label}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;