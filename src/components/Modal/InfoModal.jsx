/**
 * InfoModal Component - Informational modal about website principles and approach
 * 
 * PURPOSE:
 * This modal displays comprehensive information about the website's cooking principles,
 * dietary approach, and methodology. It appears when users click the logo in the Footer
 * component, providing context about the "Autyzm od Kuchni" philosophy and practices.
 * 
 * USAGE LOCATIONS:
 * - src/components/Footer/Footer.jsx (opened via logo click)
 * 
 * HOW IT WORKS:
 * 1. Opens/closes via props: isOpen (boolean) and togglePopup (function)
 * 2. Displays information about:
 *    - The website's 10+ years of recipe collection and adaptation
 *    - Dietary principles: no gluten, no dairy, no sugar (uses xylitol), no frying
 *    - Cooking philosophy and approach to supporting autism through nutrition
 * 3. Provides links to the "Historia" (History) section
 * 4. Blocks body scroll when modal is open for better UX
 * 
 * FEATURES:
 *   - Smooth animations using framer-motion (spring animations, staggered content)
 *   - Responsive design (mobile and desktop layouts)
 *   - Decorative animated background elements
 *   - Scrollable content area for smaller screens
 *   - Click outside to close functionality
 *   - Keyboard accessible close button
 *   - Links to related pages (Historia section)
 * 
 * CONTENT DISPLAYED:
 *   - Introduction about recipe collection for autism support
 *   - Dietary principles list (6 key principles with icons)
 *   - Link to "Historia" section for more information
 *   - Reference to alternative recipes website "ZDROWE JEMY"
 * 
 * PROPS:
 *   - isOpen: boolean - Controls modal visibility
 *   - togglePopup: function - Function to open/close the modal
 * 
 * ANIMATIONS:
 *   - Backdrop fade in/out
 *   - Modal spring animation (scale, translate)
 *   - Staggered content items appearance
 *   - Decorative background elements pulse animation
 *   - Hover effects on interactive elements
 */

import { memo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoLeaf, IoInformationCircle, IoHeart, IoNutrition } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const InfoModal = memo(({ isOpen, togglePopup }) => {
  // Zablokuj scrollowanie strony gdy modal jest otwarty
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const modalVariants = {
    hidden: { 
      y: 20, 
      opacity: 0,
      scale: 0.95
    },
    visible: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: { 
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.4
      }
    },
    exit: { 
      y: 10, 
      opacity: 0,
      scale: 0.98,
      transition: { 
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  // Staggered animation for content items
  const staggeredItems = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center bg-black/80 z-50 p-2 sm:p-4 backdrop-blur-sm"
          onClick={togglePopup}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div 
            className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl mx-auto relative overflow-hidden flex flex-col"
            onClick={e => e.stopPropagation()}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ 
              maxHeight: 'calc(100vh - 16px)',
            }}
          >
            {/* Decorative elements */}
            <motion.div 
              className="absolute -left-20 -top-20 w-40 h-40 rounded-full bg-green-100 blur-2xl opacity-50"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute right-0 bottom-0 w-60 h-60 rounded-full bg-green-50 blur-3xl opacity-40"
              animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            
            {/* Header */}
            <div className="relative bg-gradient-to-r from-green-700 to-green-600 p-4 sm:p-5 md:p-6 text-white flex-shrink-0 rounded-t-3xl">
              <div className="flex items-center gap-3 sm:gap-4 pr-10 sm:pr-12">
                <motion.div
                  initial={{ rotate: -30, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3, type: 'spring' }}
                  className="p-2 sm:p-3 bg-white/10 rounded-full flex-shrink-0"
                >
                  <IoLeaf className="text-xl sm:text-2xl text-green-100" />
                </motion.div>
                <h3 className="font-['Caveat'] text-xl sm:text-2xl md:text-3xl mb-0 relative leading-tight">
                  Zasady, które stosuję w Autyzm od Kuchni
                </h3>
              </div>
            </div>
            
            {/* Content */}
            <motion.div 
              className="flex-1 overflow-y-auto overflow-x-hidden md:overflow-y-visible p-4 sm:p-5 md:p-6"
              variants={staggeredItems}
              initial="hidden"
              animate="visible"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 text-gray-700">
                <div>
                  <motion.p 
                    className="mb-3 sm:mb-4 text-sm sm:text-base md:text-lg leading-relaxed"
                    variants={itemVariants}
                  >
                    Na „Autyzm od Kuchni" dzielę się przepisami, które przez ponad 10 lat zbierałam i dostosowywałam do potrzeb mojego syna z autyzmem.
                  </motion.p>
                  <motion.p 
                    className="mb-3 sm:mb-4 text-sm sm:text-base md:text-lg leading-relaxed"
                    variants={itemVariants}
                  >
                    Miały one ogromny wpływ na jego rozwój i wciąż wspierają jego codzienne funkcjonowanie.
                  </motion.p>
                  
                  <motion.div 
                    className="mt-3 sm:mt-4 p-3 sm:p-4 border-l-4 border-green-600 bg-green-50 rounded-r-lg flex items-start gap-2 sm:gap-3"
                    variants={itemVariants}
                  >
                    <IoInformationCircle className="text-green-700 text-lg sm:text-xl flex-shrink-0 mt-0.5 sm:mt-1" />
                    <div>
                      <p className="mb-2 text-xs sm:text-sm md:text-base leading-relaxed">
                        Aby poznać naszą drogę, zapraszam do sekcji{' '}
                        <Link 
                          to="/historia/o-mnie" 
                          className="text-green-700 font-semibold hover:text-green-800 transition-colors inline-flex items-center group"
                        >
                          HISTORIA
                          <motion.span 
                            className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            initial={{ x: -10 }}
                            animate={{ x: 0 }}
                          >
                            →
                          </motion.span>
                        </Link>
                      </p>
                      <p className="text-xs sm:text-sm md:text-base leading-relaxed">
                        Po alternatywne przepisy z glutenem, zapraszam na{' '}
                        <span className="text-green-700 font-semibold">ZDROWE JEMY</span>.
                      </p>
                    </div>
                  </motion.div>
                </div>
                
                <div>
                  <motion.div 
                    className="mb-3 sm:mb-4 flex items-center gap-2 text-green-800"
                    variants={itemVariants}
                  >
                    <IoNutrition className="text-lg sm:text-xl" />
                    <h4 className="text-base sm:text-lg font-semibold">W mojej kuchni:</h4>
                  </motion.div>
                  
                  <ul className="space-y-1.5 sm:space-y-2">
                    {[
                      'nie stosuję glutenu',
                      'nie używam nabiału krowiego',
                      'nie dodaję cukru (używam ksylitolu)',
                      'nigdy nie smażę',
                      'nie stosuję margaryny',
                      'używam jaj (wiejskie ze sprawdzonego źródła)'
                    ].map((item, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-center gap-2 pl-2 py-1 sm:py-1.5 text-xs sm:text-sm md:text-base rounded-lg bg-green-50/50 hover:bg-green-50 transition-colors duration-200"
                        variants={itemVariants}
                        style={{ transitionDelay: `${index * 0.05}s` }}
                      >
                        <IoHeart className="text-green-600 text-xs sm:text-sm flex-shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <motion.p 
                    className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg leading-relaxed"
                    variants={itemVariants}
                  >
                    Chcę, by moje doświadczenia stały się inspiracją dla innych, pokazując, jak świadome wybory żywieniowe mogą wspierać zdrowie.
                  </motion.p>
                </div>
              </div>
              
              {/* Mobile bottom close button - appears at bottom of scrollable content */}
              <div className="md:hidden pt-4 pb-2 flex justify-center">
                <motion.button
                  className="w-14 h-14 flex items-center justify-center rounded-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white transition-colors shadow-xl touch-manipulation"
                  onClick={togglePopup}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Zamknij modal"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <IoClose className="text-2xl" />
                </motion.button>
              </div>
            </motion.div>
            
            {/* Close button - Top right (larger on mobile for easy tapping) */}
            <motion.button
              className="absolute right-3 top-3 sm:right-4 sm:top-4 w-12 h-12 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 active:bg-white/40 text-white transition-colors shadow-lg z-20 touch-manipulation"
              onClick={togglePopup}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Zamknij"
            >
              <IoClose className="text-2xl sm:text-xl" />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default InfoModal;
