import { memo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoLeaf, IoInformationCircle } from 'react-icons/io5';
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
        duration: 0.3 
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.3,
        delay: 0.1
      }
    }
  };

  const modalVariants = {
    hidden: { 
      y: 50, 
      opacity: 0,
      scale: 0.9
    },
    visible: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: { 
        type: 'spring',
        damping: 25,
        stiffness: 300,
        duration: 0.3
      }
    },
    exit: { 
      y: 30, 
      opacity: 0,
      scale: 0.95,
      transition: { 
        duration: 0.2,
        ease: 'easeOut'
      }
    }
  };

  // Staggered animation for content items
  const staggeredItems = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.08,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4 backdrop-blur-md cursor-pointer"
          onClick={togglePopup}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-auto relative overflow-hidden modal-container cursor-default"
            onClick={e => e.stopPropagation()}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ maxHeight: 'calc(100vh - 40px)' }}
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
            
            {/* Header with improved visual design */}
            <div className="relative bg-gradient-to-r from-green-800 to-green-700 p-5 text-white">
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ rotate: -30, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3, type: 'spring' }}
                  className="p-2 bg-white/10 rounded-full"
                >
                  <IoLeaf className="text-2xl text-green-100" />
                </motion.div>
                <h3 className="font-['Caveat'] text-3xl mb-0 relative">
                  Zasady, które stosuję w Autyzm od Kuchni
                </h3>
              </div>
            </div>
            
            {/* Content with grid layout to avoid scrolling */}
            <motion.div 
              className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-gray-700"
              variants={staggeredItems}
              initial="hidden"
              animate="visible"
            >
              <div>
                <motion.p 
                  className="mb-2 text-sm md:text-base modal-item"
                  variants={itemVariants}
                  style={{ animationDelay: '0.1s' }}
                >
                  Na „Autyzm od Kuchni" dzielę się przepisami, które przez ponad 10 lat zbierałam i dostosowywałam do potrzeb mojego syna z autyzmem.
                </motion.p>
                <motion.p 
                  className="mb-2 text-sm md:text-base modal-item"
                  variants={itemVariants}
                  style={{ animationDelay: '0.2s' }}
                >
                  Miały one ogromny wpływ na jego rozwój i wciąż wspierają jego codzienne funkcjonowanie.
                </motion.p>
                
                <motion.div 
                  className="mt-3 p-3 border-l-4 border-green-600 bg-green-50 rounded-r text-xs md:text-sm text-gray-600 flex items-start gap-2"
                  variants={itemVariants}
                  style={{ animationDelay: '0.5s' }}
                >
                  <IoInformationCircle className="text-green-700 text-lg flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="mb-1">Aby poznać naszą drogę, zapraszam do sekcji <Link to="/historia/o-mnie" className="text-green-700 font-semibold hover:text-green-800 transition-colors">HISTORIA</Link>.</p>
                    <p>Po alternatywne przepisy z glutenem, zapraszam na <span className="text-green-700 font-semibold">ZDROWE JEMY</span>.</p>
                  </div>
                </motion.div>
              </div>
              
              <div>
                <motion.p 
                  className="mb-2 font-semibold text-green-800 modal-item"
                  variants={itemVariants}
                  style={{ animationDelay: '0.3s' }}
                >
                  W mojej kuchni:
                </motion.p>
                
                <ul className="list-none pl-0 mb-3 space-y-1.5">
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
                      className="flex items-center gap-2 pl-2 py-1 text-sm rounded-lg bg-green-50/50 hover:bg-green-50 transition-colors duration-200 modal-item"
                      variants={itemVariants}
                      style={{ animationDelay: `${0.4 + index * 0.08}s` }}
                    >
                      <span className="text-green-600 font-bold">•</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
                
                <motion.p 
                  className="text-sm md:text-base modal-item"
                  variants={itemVariants}
                  style={{ animationDelay: '0.9s' }}
                >
                  Chcę, by moje doświadczenia stały się inspiracją dla innych, pokazując, jak świadome wybory żywieniowe mogą wspierać zdrowie.
                </motion.p>
              </div>
            </motion.div>
            
            {/* Improved close button */}
            <motion.button
              className="absolute right-3 top-3 w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors shadow-lg z-10"
              onClick={togglePopup}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Zamknij"
            >
              <IoClose className="text-xl" />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default InfoModal;
