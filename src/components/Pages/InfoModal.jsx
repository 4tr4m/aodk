import { memo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoLeaf } from 'react-icons/io5';

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4 backdrop-blur-sm"
          onClick={togglePopup}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div 
            className="bg-white rounded-xl shadow-2xl max-w-2xl mx-auto relative overflow-hidden"
            onClick={e => e.stopPropagation()}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header with decorative elements */}
            <div className="bg-gradient-to-r from-green-900 to-green-800 p-5 text-white relative">
              <motion.div 
                className="absolute -right-4 -top-4 w-24 h-24 bg-green-600/20 rounded-full blur-xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1, transition: { delay: 0.2, duration: 0.5 } }}
              />
              <motion.div 
                className="absolute left-12 -bottom-6 w-16 h-16 bg-green-500/20 rounded-full blur-xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1, transition: { delay: 0.3, duration: 0.5 } }}
              />
              
              <div className="flex items-center space-x-3">
                <motion.div
                  initial={{ rotate: -30, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3, type: 'spring' }}
                >
                  <IoLeaf className="text-2xl text-green-200" />
                </motion.div>
                <h3 className="font-['Caveat'] text-2xl mb-0 relative">
                  Zasady, które stosuję w Autyzm od Kuchni
                </h3>
              </div>
            </div>
            
            {/* Modal content with improved layout */}
            <div className="p-6 max-h-[70vh] overflow-y-auto text-gray-700 prose prose-green">
              <p className="mb-4">
                Na „Autyzm od Kuchni" dzielę się przepisami, które przez ponad 10 lat zbierałam i dostosowywałam do potrzeb mojego syna z autyzmem.
              </p>
              <p className="mb-4">
                Miały one ogromny wpływ na jego rozwój i wciąż wspierają jego codzienne funkcjonowanie.
                Łączę pełnowartościowe, odżywcze składniki w prostych i szybkich przepisach, które poprawiają zdrowie i samopoczucie.
              </p>
              
              <motion.p 
                className="mb-4 font-semibold text-green-800"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                W mojej kuchni:
              </motion.p>
              
              <ul className="list-none pl-0 mb-4 space-y-2">
                {[
                  'nie stosuję glutenu',
                  'nie używam nabiału krowiego (sporadycznie sięgam po nabiał kozi)',
                  'nie dodaję cukru (używam ksylitolu i miodu, gdy to konieczne)',
                  'nigdy nie smażę',
                  'nie stosuję margaryny, używam masła klarowanego (ghee) lub oleju kokosowego',
                  'nieodłącznym elementem są JAJKA (wiejskie ze sprawdzonego źródła)'
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center gap-3 pl-2 py-1 rounded-lg bg-green-50/50 hover:bg-green-50 transition-colors duration-200"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <span className="text-green-600 font-bold">•</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
              
              <p className="mb-4">
                Wyznaję zasadę, że wszystko jest dobre w umiarkowanych ilościach, a rzeczy, które szkodzą, staram się ograniczać.
                Opieram się na zasadach diety czystożerczej, ale w sytuacjach, gdy nie mam innych alternatyw, sporadycznie stosuję kukurydzę i ryż.
              </p>
              <p className="mb-4">
                Chcę, by moje doświadczenia stały się inspiracją dla innych, pokazując, jak świadome wybory żywieniowe mogą wspierać zdrowie i poprawiać jakość życia.
              </p>
              
              <motion.div 
                className="mt-6 p-4 border-l-4 border-green-600 bg-green-50 rounded-r text-sm text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="mb-1">Aby poznać naszą drogę i początki, zapraszam do sekcji <span className="text-green-700 font-semibold">HISTORIA</span>.</p>
                <p>Po alternatywne, zdrowe przepisy z glutenem (orkisz i durum), które stosuję dla reszty rodziny, zapraszam na <span className="text-green-700 font-semibold">ZDROWE JEMY</span>.</p>
              </motion.div>
            </div>
            
            {/* Footer with enhanced button */}
            <div className="p-5 bg-gray-50 border-t flex justify-end">
              <motion.button 
                onClick={togglePopup} 
                className="px-6 py-2.5 bg-green-700 text-white rounded-lg hover:bg-green-600 transition-all duration-300 flex items-center gap-2 group shadow-sm hover:shadow-md"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Zamknij
                <IoClose className="text-xl opacity-80 group-hover:opacity-100" />
              </motion.button>
            </div>
            
            {/* Close button in the corner */}
            <motion.button
              className="absolute right-3 top-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
              onClick={togglePopup}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IoClose />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default InfoModal;
