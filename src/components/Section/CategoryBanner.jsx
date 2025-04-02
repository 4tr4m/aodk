import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import CategoryCarousel from '../UI/CategoryCarousel';
import { getCategories } from '../../data/categories';
import { useInView } from 'react-intersection-observer';

const BG_COLOR_LIGHTER = "gray-100";
const SECTION_BG = `bg-${BG_COLOR_LIGHTER}`;

const CategoryBanner = () => {
  const [categories, setCategories] = useState([]);
  const [allCategoryItems, setAllCategoryItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
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

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
        
        // Format categories for the carousel with images and links
        const items = data.map(category => ({
          id: category.id,
          label: category.name,
          image: category.image || 'category-default.jpg',
          shortDesc: category.description || 'Odkryj nasze pyszne przepisy!',
          link: `/kategoria/${category.id}`
        }));
        
        setAllCategoryItems(items);
        setIsLoaded(true);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };
    
    loadCategories();
  }, []);

  const headerRef = useRef(null);

  // Create a wavy divider SVG
  const dividerHeight = 120;
  const dividerColor = '#F7FAFC'; // tailwind bg-gray-50

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
          className="text-center mb-8 md:mb-12"
          variants={itemAnimation}
        >
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-['Playfair_Display'] font-bold text-gray-800 mb-4"
            variants={itemAnimation}
            ref={headerRef}
          >
            Kategorie
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
            variants={itemAnimation}
          >
            Odkryj przepisy dopasowane do różnych potrzeb dietetycznych i preferencji kulinarnych.
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