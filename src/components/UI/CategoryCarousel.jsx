import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';

const CategoryCarousel = ({ items, showViewButton = true }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
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
    }, 1100);
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
    }, 1100);
  }, [activeIndex, isAnimating, startIndex, totalItems, itemsPerView]);

  useEffect(() => {
    const handleResize = () => setItemsPerView(getItemsPerView());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    items.forEach(item => {
      const img = new Image();
      img.src = `/img/${item.image}`;
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
      // Navigate to the page and scroll to top
      navigate(item.link);
      window.scrollTo({ top: 0, behavior: 'smooth' });
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

  if (!isMounted) return <div className="min-h-[200px] bg-gray-100/50"></div>;

  return (
    <div className="relative w-full py-4 px-0 sm:px-4 md:px-8 lg:px-12 mx-auto">
      <div className="relative mx-auto max-w-full">
        {/* Navigation buttons positioned outside grid */}
        <motion.button
          className="absolute -left-1 sm:-left-6 md:-left-8 lg:-left-10 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg z-40 backdrop-blur-sm bg-opacity-90 hover:bg-green-500 transition-all duration-300"
          onClick={handlePrev}
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          aria-label="Previous item"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
        
        <motion.button
          className="absolute -right-1 sm:-right-6 md:-right-8 lg:-right-10 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg z-40 backdrop-blur-sm bg-opacity-90 hover:bg-green-500 transition-all duration-300"
          onClick={handleNext}
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          aria-label="Next item"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
        
        {/* Improved edge gradients with more subtle appearance */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 lg:w-20 bg-gradient-to-r from-gray-100 via-gray-100/70 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 lg:w-20 bg-gradient-to-l from-gray-100 via-gray-100/70 to-transparent z-20 pointer-events-none" />
        
        <div className="overflow-hidden px-6 sm:px-4">
          <div 
            ref={scrollRef}
            className="carousel-container flex gap-0 sm:gap-2 md:gap-3 lg:gap-4 mx-auto"
            style={{
              width: `${(100 * extendedItems.length) / itemsPerView}%`,
              transform: `translateX(-${(activeIndex * 100) / extendedItems.length}%)`,
              willChange: 'transform',
              transition: 'transform 1s cubic-bezier(0.22, 1, 0.36, 1)'
            }}
          >
            {extendedItems.map((item, index) => (
              <div 
                key={`${index}-${item.id || item.label}`}
                className="flex-shrink-0 px-0 sm:px-1 transition-all duration-800"
                style={{ 
                  width: `${100 / extendedItems.length}%`,
                  willChange: 'transform'
                }}
              >
                <motion.div 
                  className="bg-white h-full rounded-2xl overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)] transition-all duration-700 flex flex-col cursor-pointer mx-auto w-full max-w-[98%] sm:max-w-full"
                  onClick={() => handleItemClick(item)}
                  whileHover={{ y: -8, scale: 1.02 }}
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                    duration: 0.7
                  }}
                >
                  <div className="relative h-[130px] sm:h-[150px] md:h-[170px] lg:h-[190px] overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-40"
                      whileHover={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.img
                      src={`/img/${item.image}`}
                      alt={item.label || item.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>

                  <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col justify-between items-center">
                    <div className="w-full flex flex-col items-center">
                      <motion.h2 
                        className="font-['Playfair_Display'] text-xl sm:text-2xl md:text-3xl text-[#2D3748] tracking-wide mb-2 md:mb-3 font-semibold text-center w-full"
                        whileHover={{ scale: 1.02, x: 4 }}
                        transition={{ type: "spring", stiffness: 200, duration: 0.5 }}
                      >
                        {item.label || item.name}
                      </motion.h2>
                      <motion.p 
                        className="font-['Lato'] text-sm sm:text-base text-gray-600/90 line-clamp-2 leading-relaxed text-center max-w-[95%] mx-auto"
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
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
                            duration: 0.5
                          }}
                        >
                          <Button
                            text="Zobacz"
                            size="sm"
                            variant="primary"
                            to={item.link}
                            animate={false}
                            className="shadow-md hover:shadow-lg transition-all duration-300 bg-green-600 hover:bg-green-500 text-white font-semibold px-7 sm:px-9 py-2 sm:py-2.5 rounded-lg transform hover:-translate-y-0.5 relative overflow-hidden before:absolute before:inset-0 before:bg-white/20 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-300 before:ease-out will-change-transform text-sm sm:text-base"
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