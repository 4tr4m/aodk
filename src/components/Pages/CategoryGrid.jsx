import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductModal from '../ProductModal/ProductModal';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '../UI/Button';

const CategoryGrid = ({ items, isHomePage = false, isSecondRow = false, showViewButton = false }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const navigate = useNavigate();
  // Detect if user prefers reduced motion
  const prefersReducedMotion = useReducedMotion();

  // Preload images for this specific grid component
  useEffect(() => {
    const preloadImages = async () => {
      try {
        const preloadPromises = items.map(item => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => resolve(); // Resolve even on error
            img.src = `/img/${item.image}`;
          });
        });
        
        await Promise.all(preloadPromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error preloading images:', error);
        setImagesLoaded(true); // Set to true even on error to allow rendering
      }
    };
    
    preloadImages();
  }, [items]);

  const handleClick = (item) => {
    if (isHomePage) {
      // On homepage, navigate to category
      navigate(item.link);
    } else {
      // On category page, show modal
      setSelectedProduct(item);
    }
  };

  // Animation variants for cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: isSecondRow ? 0.1 : 0.2
      }
    }
  };

  // Optimized variants for cards
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 10
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="group">
      {/* Card Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-2"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {items.map((item, index) => (
          <motion.div 
            key={index} 
            className="group/card w-full relative"
            variants={cardVariants}
            whileHover={!prefersReducedMotion ? { 
              y: -5, 
              transition: { duration: 0.2 } 
            } : {}}
            style={{ opacity: imagesLoaded ? 1 : 0.2 }}
          >
            {isHomePage ? (
              // Homepage card style (category preview)
              <motion.div 
                className="relative bg-white rounded-xl overflow-hidden shadow-md transition-all duration-500 hover:shadow-lg h-[400px] flex flex-col"
                whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
              >
                {/* Image Container - Fixed height */}
                <div 
                  className="relative h-[250px] overflow-hidden cursor-pointer"
                  onClick={() => handleClick(item)}
                >
                  <motion.img 
                    src={`/img/${item.image}`} 
                    alt={item.label}
                    className="w-full h-full object-cover"
                    whileHover={!prefersReducedMotion ? { scale: 1.05 } : {}}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                  {/* Credit Badge */}
                  <div className="absolute bottom-3 right-3 text-xs text-gray-300/90 font-['Lato'] italic bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full z-10">
                    
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 bg-white flex flex-col justify-between items-center">
                  <div className="w-full text-center">
                    <motion.h2 
                      className="font-['Playfair_Display'] text-2xl sm:text-3xl lg:text-4xl text-[#2D3748] tracking-wide mb-3 font-bold group-hover/card:text-[#1A202C] transition-colors duration-300 cursor-pointer text-center"
                      onClick={() => handleClick(item)}
                    >
                      {item.label}
                    </motion.h2>
                    <motion.p 
                      className="font-['Lato'] text-sm sm:text-base text-gray-600/90 leading-relaxed text-center mx-auto"
                      initial={{ opacity: 0.8 }}
                      whileHover={!prefersReducedMotion ? { opacity: 1 } : {}}
                    >
                      {item.shortDesc}
                    </motion.p>
                  </div>
                  
                  {/* View Button */}
                  {showViewButton && (
                    <div className="mt-4 flex justify-center w-full">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 15
                        }}
                      >
                        <Button 
                          text="Zobacz" 
                          size="sm" 
                          variant="primary" 
                          to={item.link}
                          animate={true}
                          state={{ scrollToTitle: true }}
                          className="shadow-md hover:shadow-lg transition-all duration-300 bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-2.5 rounded-lg transform hover:-translate-y-0.5 relative overflow-hidden before:absolute before:inset-0 before:bg-white/20 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-300 before:ease-out"
                        />
                      </motion.div>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              // Category page card style (recipe preview)
              <motion.div 
                className="relative bg-white rounded-xl overflow-hidden shadow-md transition-all duration-500 hover:shadow-lg p-6 cursor-pointer text-center"
                whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
                onClick={() => handleClick(item)}
              >
                <motion.h2 
                  className="font-['Playfair_Display'] text-3xl text-center text-[#2D3748] tracking-wide mb-2 group-hover/card:text-[#1A202C] transition-colors duration-300"
                >
                  {item.name}
                </motion.h2>
                {/* Short description under the title (replaces tags) */}
                {(item.shortdesc || item.shortDesc) && (
                  <p className="font-['Lato'] text-gray-600 text-sm md:text-base leading-relaxed mb-2 line-clamp-2">
                    {item.shortdesc || item.shortDesc}
                  </p>
                )}
                
                {/* View Button for recipe page if needed */}
                {showViewButton && (
                  <div className="mt-4 flex justify-center w-full">
                    <Button 
                      text="Zobacz" 
                      size="sm" 
                      variant="primary"
                      onClick={() => handleClick(item)}
                      animate={true}
                    />
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Modal - only for category page */}
      {!isHomePage && selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

export default CategoryGrid;