import React, { useState } from 'react';

import { motion, useReducedMotion } from 'framer-motion';
import { InfoActionButton } from '../UI/Button';
import InfoModal from '../Pages/InfoModal';

const InfoSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const [showInfoModal, setShowInfoModal] = useState(false);

  // const handleClick = () => {
  //   navigate('/kuchnia');
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // };

  const toggleInfoModal = () => {
    setShowInfoModal(!showInfoModal);
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <>
      <section className="relative bg-[#F6EFE9] py-10 sm:py-14 md:py-20 overflow-hidden will-change-transform">
        {/* Decorative elements */}
        {!prefersReducedMotion && (
          <>
            <motion.div 
              className="absolute left-0 top-1/4 w-20 h-20 md:w-32 md:h-32 bg-green-50/40 rounded-full blur-3xl -translate-x-1/2"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.4, 0.3] 
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
            <motion.div 
              className="absolute right-0 bottom-1/4 w-24 h-24 md:w-40 md:h-40 bg-green-50/40 rounded-full blur-3xl translate-x-1/2"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3] 
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

        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {/* Header Section - Enhanced UX/UI */}
          <motion.div className="text-center mb-6 sm:mb-8 relative" variants={fadeInUp}>
            <div className="inline-flex flex-col items-center relative mb-2">
              <motion.div 
                className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full shadow-lg overflow-hidden cursor-pointer border-4 border-white/50 mb-4"
                whileHover={{ scale: 1.08, boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.1)' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                onClick={toggleInfoModal}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-400/30 to-gray-600/40 backdrop-blur-[1px]"></div>
                <img 
                  src="/img/logo.png" 
                  alt="Logo Autyzm od Kuchni" 
                  className="w-full h-full object-contain p-1 sm:p-2 relative z-10 filter drop-shadow(0 2px 2px rgba(0,0,0,0.5)) contrast-[1.25] brightness-[1.15]"
                />
              </motion.div>
              <motion.h2 
                className="font-['Playfair_Display'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#1A202C] font-extrabold tracking-tight mt-2 sm:mt-0 drop-shadow-sm"
                whileHover={{ scale: 1.02, color: '#2C5282' }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Autyzm od Kuchni
              </motion.h2>
              <motion.p 
                className="text-gray-500 text-2xl md:text-3xl lg:text-4xl max-w-2xl mx-auto font-['Lato'] leading-relaxed tracking-wide mt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Zdrowe gotowanie wspierające rozwój
              </motion.p>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div className="space-y-4 sm:space-y-6 max-w-3xl mx-auto" variants={fadeInUp}>
            <motion.div className="prose prose-lg text-gray-600 font-['Lato'] space-y-4" variants={fadeInUp}>
              <motion.p className="text-lg sm:text-xl md:text-2xl leading-relaxed px-2 sm:px-0">
                Dieta w autyzmie odgrywa kluczową rolę w codziennym funkcjonowaniu. 
                <span className="text-green-700 font-semibold"> Odpowiednio dobrane posiłki mogą znacząco 
                wpłynąć na samopoczucie i rozwój</span>. Nasze przepisy zostały stworzone z myślą o 
                specjalnych potrzebach żywieniowych, eliminując składniki, które często powodują problemy.
              </motion.p>

              <motion.p className="text-lg sm:text-xl md:text-2xl leading-relaxed px-2 sm:px-0">
                Wszystkie nasze przepisy są <span className="text-green-700 font-semibold">bezglutenowe, 
                bez nabiału krowiego i bez zbędnego cukru</span>. Stawiamy na naturalne składniki i proste 
                metody przygotowania, które nie wymagają smażenia.
              </motion.p>
            </motion.div>

            {/* Features Section */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 py-4 sm:py-6"
              variants={staggerContainer}
            >
              <motion.div 
                className="text-center overflow-hidden relative rounded-xl md:rounded-2xl shadow-md hover:shadow-lg transition-all duration-500 group"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <div className="bg-gradient-to-t from-black/70 via-black/40 to-transparent absolute inset-0 z-10"></div>
                  <div className="h-full w-full bg-gray-200">
                    <img src="/img/noGluten.jpg" alt="Bez glutenu" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="relative z-20 p-5 sm:p-8 md:p-10 min-h-[220px] sm:min-h-[250px] md:min-h-[280px] flex flex-col items-center justify-end text-white">
                  <h3 className="font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 font-semibold tracking-wide group-hover:scale-105 transition-transform duration-300">Bez Glutenu</h3>
                  <p className="font-['Lato'] text-white/90 text-sm sm:text-base md:text-lg">Wszystkie przepisy są bezpieczne dla osób z celiakią</p>
                </div>
              </motion.div>

              <motion.div 
                className="text-center overflow-hidden relative rounded-xl md:rounded-2xl shadow-md hover:shadow-lg transition-all duration-500 group"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <div className="bg-gradient-to-t from-black/70 via-black/40 to-transparent absolute inset-0 z-10"></div>
                  <div className="h-full w-full bg-gray-200">
                    <img src="/img/noDairy.jpg" alt="Bez nabiału" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="relative z-20 p-5 sm:p-8 md:p-10 min-h-[220px] sm:min-h-[250px] md:min-h-[280px] flex flex-col items-center justify-end text-white">
                  <h3 className="font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 font-semibold tracking-wide group-hover:scale-105 transition-transform duration-300">Bez Nabiału</h3>
                  <p className="font-['Lato'] text-white/90 text-sm sm:text-base md:text-lg">Wykluczamy nabiał krowi ze wszystkich przepisów</p>
                </div>
              </motion.div>

              <motion.div 
                className="text-center overflow-hidden relative rounded-xl md:rounded-2xl shadow-md hover:shadow-lg transition-all duration-500 group sm:col-span-2 md:col-span-1"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <div className="bg-gradient-to-t from-black/70 via-black/40 to-transparent absolute inset-0 z-10"></div>
                  <div className="h-full w-full bg-gray-200">
                    <img src="/img/noFry.jpg" alt="Bez smażenia" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="relative z-20 p-5 sm:p-8 md:p-10 min-h-[220px] sm:min-h-[250px] md:min-h-[280px] flex flex-col items-center justify-end text-white">
                  <h3 className="font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 font-semibold tracking-wide group-hover:scale-105 transition-transform duration-300">Bez Smażenia</h3>
                  <p className="font-['Lato'] text-white/90 text-sm sm:text-base md:text-lg">Zdrowe metody przygotowania potraw</p>
                </div>
              </motion.div>
            </motion.div>

            {/* CTA Section - Enhanced UX/UI */}
            <motion.div 
              className="text-center bg-gradient-to-br from-green-100 via-green-50 to-yellow-50/80 rounded-2xl sm:rounded-3xl md:rounded-[30px] p-6 sm:p-8 md:p-12 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden relative"
              variants={fadeInUp}
              whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
            >
              {/* Subtle background elements */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-green-200/50 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-yellow-100/50 rounded-full blur-3xl"></div>
              </div>
              
              <motion.h3 
                className="relative font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-green-800 mb-4 sm:mb-6 font-bold tracking-tight drop-shadow-sm"
                whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 400 } }}
              >
                Odkryj Nasze Przepisy
              </motion.h3>
              <motion.p className="relative text-gray-700 mb-8 sm:mb-10 max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed">
                Znajdź inspirację wśród naszych sprawdzonych przepisów, które łączą w sobie smak i wartości 
                odżywcze, wspierając prawidłowy rozwój i dobre samopoczucie.
              </motion.p>
              <motion.div 
                className="relative flex justify-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <InfoActionButton 
                  text="ODKRYJ PRZEPISY" 
                  to="/kuchnia"
                  size="lg" 
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Modal positioned outside the section to appear in the center of the page */}
      <InfoModal isOpen={showInfoModal} togglePopup={toggleInfoModal} />
    </>
  );
};

export default InfoSection;