// CategoryCarousel Component - Interactive carousel for displaying category items
// This component creates a seamless, infinite-scrolling carousel with touch/swipe support,
// auto-advance functionality, and responsive design. It's used to showcase categories
// in an engaging, interactive way.
//
// USAGE LOCATIONS:
// - src/components/Section/CategoryBanner.jsx (main categories display on homepage)
// - Can be reused anywhere categories or items need to be displayed in carousel format
//
// FEATURES:
// - Infinite seamless scrolling (no visible loop points)
// - Touch/swipe support for mobile devices
// - Auto-advance with pause on interaction
// - Responsive design (1-4 items per view based on screen size)
// - Smooth animations and hover effects
// - Navigation buttons with hover states
// - Image preloading for better performance
//
// PROPS:
// - items: Array of category/item objects with {id, label, image, shortDesc, link}
// - showViewButton: Boolean to show/hide the "Zobacz" button (default: true)

import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '../../utils/imageUtils';

const CategoryCarousel = ({ items, showViewButton = true }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  
  const timerRef = useRef(null);
  const scrollRef = useRef(null);
  const resetInProgressRef = useRef(false);
  const navigate = useNavigate();
  
  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1280) return 4;
      if (window.innerWidth >= 768) return 3;
      if (window.innerWidth >= 640) return 2;
    }
    return 1;
  };
  
  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());
  
  // Create a larger array for truly seamless scrolling
  // We need enough items to fill the screen several times
  const multiplyCount = Math.max(10, Math.ceil(30 / items.length));
  
  // Create an array with many duplicates [A,B,C, A,B,C, A,B,C, ...]
  const extendedItems = Array(multiplyCount).fill([...items]).flat();
  
  // Total number of original items
  const totalItems = items.length;
  
  // Start from the middle section for balanced scrolling in both directions
  const startIndex = Math.floor(extendedItems.length / 3);

  // Handle next slide with useCallback to avoid recreation on every render
  const handleNext = useCallback(() => {
    if (isAnimating || resetInProgressRef.current) return;
    
    setIsAnimating(true);
    setActiveIndex(prev => prev + 1);
    
    // Reset timer when manually navigating
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    setTimeout(() => {
      setIsAnimating(false);
      
      // Check if we're close to the end
      if (activeIndex > extendedItems.length - itemsPerView - totalItems) {
        resetInProgressRef.current = true;
        
        // Silently reset to the middle section
        requestAnimationFrame(() => {
          const container = document.querySelector('.carousel-container');
          if (container) {
            container.style.transition = 'none';
            setActiveIndex(startIndex);
            
            // Force browser to recognize the style change
            // eslint-disable-next-line no-unused-expressions
            container.offsetHeight;
            
            // Restore transitions after position reset
            requestAnimationFrame(() => {
              container.style.transition = '';
              resetInProgressRef.current = false;
            });
          }
        });
      }
    }, 600);
  }, [activeIndex, isAnimating, extendedItems.length, itemsPerView, totalItems, startIndex]);

  // Handle previous slide
  const handlePrev = useCallback(() => {
    if (isAnimating || resetInProgressRef.current) return;
    
    setIsAnimating(true);
    setActiveIndex(prev => prev - 1);
    
    // Reset timer when manually navigating
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    setTimeout(() => {
      setIsAnimating(false);
      
      // Check if we're close to the beginning
      if (activeIndex < startIndex - totalItems + itemsPerView) {
        resetInProgressRef.current = true;
        
        // Silently reset to the middle section
        requestAnimationFrame(() => {
          const container = document.querySelector('.carousel-container');
          if (container) {
            container.style.transition = 'none';
            setActiveIndex(startIndex);
            
            // Force browser to recognize the style change
            // eslint-disable-next-line no-unused-expressions
            container.offsetHeight;
            
            // Restore transitions after position reset
            requestAnimationFrame(() => {
              container.style.transition = '';
              resetInProgressRef.current = false;
            });
          }
        });
      }
    }, 600);
  }, [activeIndex, isAnimating, startIndex, totalItems, itemsPerView]);

  useEffect(() => {
    const handleResize = () => setItemsPerView(getItemsPerView());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    items.forEach(item => {
      const img = new Image();
      img.src = getImageUrl(item.image);
    });
  }, [items]);
  
  useLayoutEffect(() => {
    // Initialize the carousel at the starting position
    setActiveIndex(startIndex);
    setIsMounted(true);
  }, [startIndex]);

  // Auto-advance carousel
  useEffect(() => {
    if (isMounted) {
      // Clear any existing interval
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      // Set new interval
      timerRef.current = setInterval(() => {
        if (!isAnimating && !resetInProgressRef.current) {
          handleNext();
        }
      }, 5000); // Change to 5 seconds
      
      return () => clearInterval(timerRef.current);
    }
    return () => {};
  }, [isMounted, isAnimating, handleNext]);

  const handleItemClick = useCallback((item) => {
    if (item.link) {
      navigate(item.link, { state: { scrollToTitle: true } });
    }
  }, [navigate]);

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      backgroundColor: "#16a34a",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { 
      scale: 0.95,
      backgroundColor: "#15803d"
    }
  };

  // Handle touch events
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(e.targetTouches[0].clientX);
    setIsDragging(true);
    
    // Pause auto-advance while touching
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    setTouchEnd(e.targetTouches[0].clientX);
    const diff = touchStart - e.targetTouches[0].clientX;
    setDragOffset(diff);
    
    // Prevent default scrolling while swiping
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setDragOffset(0);
    
    if (!touchStart || !touchEnd) return;
    
    const diff = touchStart - touchEnd;
    const minSwipeDistance = 50; // minimum distance for swipe
    
    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        // Swiped left
        handleNext();
      } else {
        // Swiped right
        handlePrev();
      }
    }
    
    setTouchStart(null);
    setTouchEnd(null);
    
    // Resume auto-advance
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      if (!isAnimating && !resetInProgressRef.current) {
        handleNext();
      }
    }, 5000);
  };

  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (!items?.length) {
    return (
      <div className="min-h-[240px] flex items-center justify-center text-gray-500 font-['Lato']">
        Brak kategorii do wyświetlenia.
      </div>
    );
  }

  if (!isMounted) {
    return (
      <div className="relative w-full py-4 px-6 sm:px-4 md:px-8 lg:px-12 mx-auto min-h-[280px] flex items-center justify-center">
        <div className="flex gap-3 w-full max-w-4xl mx-auto justify-center">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-shrink-0 w-[200px] sm:w-[220px] bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 animate-pulse">
              <div className="h-[140px] sm:h-[160px] bg-gray-200" />
              <div className="p-4 space-y-2">
                <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto" />
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-2/3 mx-auto" />
                <div className="h-9 bg-gray-200 rounded-lg w-20 mx-auto mt-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full py-4 px-0 sm:px-4 md:px-8 lg:px-12 mx-auto">
      <div className="relative mx-auto max-w-full">
        {/* Navigation buttons – modern pill-style with ring */}
        <motion.button
          className="absolute -left-1 sm:-left-5 md:-left-6 lg:-left-8 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg z-40 ring-2 ring-white/80 ring-offset-2 ring-offset-gray-100 hover:bg-green-500 hover:ring-green-400/50 transition-all duration-300"
          onClick={handlePrev}
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          aria-label="Poprzednia kategoria"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 sm:w-7 sm:h-7">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
        
        <motion.button
          className="absolute -right-1 sm:-right-5 md:-right-6 lg:-right-8 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg z-40 ring-2 ring-white/80 ring-offset-2 ring-offset-gray-100 hover:bg-green-500 hover:ring-green-400/50 transition-all duration-300"
          onClick={handleNext}
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          aria-label="Następna kategoria"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 sm:w-7 sm:h-7">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
        
        {/* Edge gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-14 md:w-16 lg:w-20 bg-gradient-to-r from-gray-100 via-gray-100/60 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-14 md:w-16 lg:w-20 bg-gradient-to-l from-gray-100 via-gray-100/60 to-transparent z-20 pointer-events-none" />
        
        <div className="overflow-hidden px-6 sm:px-4">
          <div 
            ref={scrollRef}
            className="carousel-container flex gap-0 sm:gap-3 md:gap-4 lg:gap-5 mx-auto touch-pan-y"
            style={{
              width: `${(100 * extendedItems.length) / itemsPerView}%`,
              transform: `translateX(${-((activeIndex * 100) / extendedItems.length) + (isDragging ? -dragOffset / scrollRef.current?.offsetWidth * 100 : 0)}%)`,
              willChange: 'transform',
              transition: isDragging ? 'none' : 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {extendedItems.map((item, index) => (
              <div 
                key={`${index}-${item.id || item.label}`}
                className="flex-shrink-0 px-0 sm:px-1.5 transition-all duration-300"
                style={{ 
                  width: `${100 / extendedItems.length}%`,
                  willChange: 'transform'
                }}
              >
                <motion.div 
                  className="bg-white h-full rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100/80 transition-all duration-300 flex flex-col cursor-pointer mx-auto w-full max-w-[98%] sm:max-w-full"
                  onClick={() => handleItemClick(item)}
                  whileHover={{ y: -6, scale: 1.02 }}
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 24,
                    duration: 0.4
                  }}
                >
                  <div className="relative h-[130px] sm:h-[155px] md:h-[175px] lg:h-[195px] overflow-hidden rounded-t-2xl">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-50 z-10"
                      whileHover={{ opacity: 0.2 }}
                      transition={{ duration: 0.4 }}
                    />
                    <motion.img
                      src={typeof item.image === 'string' && (item.image.startsWith('http') || item.image.startsWith('/')) ? item.image : getImageUrl(item.image)}
                      alt={item.label || item.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      loading="eager"
                      onError={(e) => {
                        const currentSrc = e.target.src;
                        if (!currentSrc.includes('ciasta.jpg')) {
                          e.target.src = getImageUrl('ciasta.jpg');
                        }
                      }}
                    />
                  </div>

                  <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col justify-between items-center">
                    <div className="w-full flex flex-col items-center">
                      <motion.h2 
                        className="font-['Playfair_Display'] text-xl sm:text-2xl md:text-3xl text-[#2D3748] tracking-wide mb-2 md:mb-3 font-semibold text-center w-full"
                        whileHover={{ scale: 1.02, x: 4 }}
                        transition={{ type: "spring", stiffness: 200, duration: 0.4 }}
                      >
                        {item.label || item.name}
                      </motion.h2>
                      <motion.p 
                        className="font-['Lato'] text-sm sm:text-base text-gray-600/90 line-clamp-2 leading-relaxed text-center max-w-[95%] mx-auto"
                        initial={{ opacity: 0.9 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                      >
                        {item.shortDesc || 'Odkryj nasze pyszne i zdrowe przepisy.'}
                      </motion.p>
                    </div>
                    
                    {showViewButton && (
                      <motion.div 
                        className="mt-4 sm:mt-5 flex justify-center w-full"
                        initial={false}
                        animate={{ opacity: 1 }}
                        style={{ opacity: 1 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                            duration: 0.4
                          }}
                        >
                          <Button
                            text="Zobacz"
                            size="sm"
                            variant="primary"
                            to={item.link}
                            animate={false}
                            state={{ scrollToTitle: true }}
                            className="shadow-md hover:shadow-lg transition-all duration-300 bg-green-600 hover:bg-green-500 text-white font-semibold px-10 sm:px-12 py-2.5 sm:py-3 rounded-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
                          />
                        </motion.div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCarousel; 