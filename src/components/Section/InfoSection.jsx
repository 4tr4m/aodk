import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '../UI/Button';
import InfoModal from '../Pages/InfoModal';
import { FaUtensils, FaLeaf, FaHeartbeat, FaUserFriends } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const features = [
  {
    id: 'feature-1',
    icon: <FaLeaf className="text-green-600 text-3xl md:text-4xl" />,
    title: 'Naturalne Składniki',
    description: 'Nasze przepisy opierają się na naturalnych, nieprzetworzonych składnikach, aby zapewnić maksymalne korzyści zdrowotne.'
  },
  {
    id: 'feature-2',
    icon: <FaHeartbeat className="text-green-600 text-3xl md:text-4xl" />,
    title: 'Zdrowe Odżywianie',
    description: 'Każdy przepis został opracowany z myślą o dostarczeniu niezbędnych składników odżywczych.'
  },
  {
    id: 'feature-3',
    icon: <FaUtensils className="text-green-600 text-3xl md:text-4xl" />,
    title: 'Łatwe Przygotowanie',
    description: 'Nasze przepisy są łatwe do przygotowania, nawet dla osób bez doświadczenia kulinarnego.'
  },
  {
    id: 'feature-4',
    icon: <FaUserFriends className="text-green-600 text-3xl md:text-4xl" />,
    title: 'Dla Całej Rodziny',
    description: 'Przepisy są dostosowane do potrzeb dzieci ze spektrum autyzmu, ale smakują wszystkim członkom rodziny.'
  }
];

const InfoSection = () => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleClick = () => {
    navigate('/kuchnia');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
          {/* Header Section */}
          <motion.div className="text-center mb-8 sm:mb-10 md:mb-12" variants={fadeInUp}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <motion.div 
                className="relative w-32 h-32 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full shadow-md overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
                onClick={toggleInfoModal}
              >
                <div className="absolute inset-0 bg-black/30"></div>
                <img 
                  src="/img/logo.png" 
                  alt="Logo Autyzm od Kuchni" 
                  className="w-full h-full object-cover relative z-1"
                />
              </motion.div>
              <motion.h2 
                className="font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#2D3748] font-bold tracking-wide mt-2 sm:mt-0"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Autyzm od Kuchni
              </motion.h2>
            </div>
            <motion.p className="text-gray-600 text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto font-['Lato'] leading-relaxed tracking-wide">
              Zdrowe gotowanie wspierające rozwój
            </motion.p>
          </motion.div>

          {/* Main Content */}
          <motion.div className="space-y-8 sm:space-y-10 max-w-3xl mx-auto" variants={fadeInUp}>
            <motion.div className="prose prose-lg text-gray-600 font-['Lato'] space-y-4" variants={fadeInUp}>
              <motion.p className="text-base sm:text-lg leading-relaxed px-2 sm:px-0">
                Dieta w autyzmie odgrywa kluczową rolę w codziennym funkcjonowaniu. 
                <span className="text-green-700 font-semibold"> Odpowiednio dobrane posiłki mogą znacząco 
                wpłynąć na samopoczucie i rozwój</span>. Nasze przepisy zostały stworzone z myślą o 
                specjalnych potrzebach żywieniowych, eliminując składniki, które często powodują problemy.
              </motion.p>

              <motion.p className="text-base sm:text-lg leading-relaxed px-2 sm:px-0">
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
              {features.map((feature, index) => (
                <motion.div 
                  key={feature.id}
                  className="text-center overflow-hidden relative rounded-xl md:rounded-2xl shadow-md hover:shadow-lg transition-all duration-500 group"
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="bg-gradient-to-t from-black/70 via-black/40 to-transparent absolute inset-0 z-10"></div>
                    <div className="h-full w-full bg-gray-200">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="relative z-20 p-5 sm:p-8 md:p-10 min-h-[220px] sm:min-h-[250px] md:min-h-[280px] flex flex-col items-center justify-end text-white">
                    <h3 className="font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 font-semibold tracking-wide group-hover:scale-105 transition-transform duration-300">{feature.title}</h3>
                    <p className="font-['Lato'] text-white/90 text-sm sm:text-base md:text-lg">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Section */}
            <motion.div 
              className="text-center bg-gradient-to-r from-green-50/80 via-green-100/50 to-green-50/80 rounded-xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 shadow-sm"
              variants={fadeInUp}
            >
              <motion.h3 
                className="font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#2D3748] mb-4 sm:mb-6 font-semibold tracking-wide"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Odkryj Nasze Przepisy
              </motion.h3>
              <motion.p className="text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
                Znajdź inspirację wśród naszych sprawdzonych przepisów, które łączą w sobie smak i wartości 
                odżywcze, wspierając prawidłowy rozwój i dobre samopoczucie.
              </motion.p>
              <motion.div 
                className="flex justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  text="Zobacz Przepisy" 
                  size="lg" 
                  variant="primary" 
                  onClick={handleClick}
                  animate={true}
                  className="px-6 sm:px-8 md:px-10 py-2 sm:py-3 text-base sm:text-lg font-semibold shadow-md hover:shadow-lg cursor-pointer"
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