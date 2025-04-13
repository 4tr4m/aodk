// HeroSection.jsx
import { useState, useCallback, memo } from 'react';
import InfoModal from '../Pages/InfoModal';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HeroActionButton } from '../UI/Button';

const HeroSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax effect for the background
  const backgroundY = useTransform(scrollY, [0, 500], ['0%', '30%']);
  
  // Opacity effect for text when scrolling
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const textY = useTransform(scrollY, [0, 300], [0, -50]);

  const togglePopup = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <>
      <motion.div 
        className="absolute top-0 left-0 w-full h-screen z-0 will-change-transform"
        style={{
          backgroundImage: 'url(./img/main-hero.webp)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          y: backgroundY,
          backfaceVisibility: 'hidden'
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black/30 -z-10"></div>
      </motion.div>

      <header className="min-h-screen flex flex-col">
        <div className="pt-8 pb-4 static text-gray-50 z-1 shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
          <div className="max-w-7xl mx-auto px-3 sm:px-5 flex flex-col md:flex-row items-center md:items-start justify-between gap-3 sm:gap-5 static">
            <div className="flex-[0.8] max-w-[200px] sm:max-w-[250px] md:max-w-[450px] relative md:top-[-40px]">
              <motion.div 
                onClick={togglePopup} 
                className="cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <img 
                  src="/img/logo.png" 
                  alt="Autyzm od kuchni" 
                  className="w-full h-auto block overflow-visible relative z-1 scale-125 sm:scale-100" 
                />
              </motion.div>
            </div>
            
            {/* Hero text content - separated from the Link component */}
            <div className="flex-2 group relative z-10 mt-4 md:mt-0">
              <div className="max-w-3xl mx-auto py-4 sm:py-6 px-4 sm:px-8 md:px-16 relative">
                <div className="absolute inset-0 bg-gradient-radial from-black/10 via-transparent to-transparent transition-all duration-300 group-hover:from-black/20"></div>
                <motion.div 
                  className="relative transform transition-all duration-300 group-hover:translate-y-[-8px]"
                  style={{ opacity: textOpacity, y: textY }}
                  initial="rest"
                  whileHover="hover"
                >
                  <h1 className="font-['Caveat'] text-xl sm:text-2xl md:text-4xl font-bold text-white leading-relaxed text-center tracking-wide mb-4 sm:mb-6 transition-all duration-300 group-hover:text-gray-50 drop-shadow-lg group-hover:drop-shadow-xl">
                    DIETA ELIMINACYJNA <br/>
                    <span className="text-lg sm:text-xl md:text-3xl font-normal tracking-wider opacity-95 transition-all duration-300 group-hover:opacity-100">
                      TRANSFORMUJĄCA <br/>
                      FUNKCJONOWANIE <br/>
                      W AUTYŹMIE I ZABURZENIACH <br className="hidden sm:block" />
                      <span className="hidden sm:inline">NEUROROZWOJOWYCH</span>
                      <span className="sm:hidden">NEURO-<br/>ROZWOJOWYCH</span>
                    </span>
                  </h1>
                  <h2 className="hidden sm:block mt-4 sm:mt-6 font-['Patrick_Hand'] text-base sm:text-lg md:text-xl font-normal text-gray-50/90 leading-relaxed text-center tracking-wide transition-all duration-300 group-hover:text-white">
                    Proste, odżywcze przepisy bez glutenu, nabiału krowiego, cukru i <br className="hidden sm:block" />
                    bez smażenia – wspierające zdrowie i rozwój
                  </h2>
                </motion.div>
              </div>
            </div>

            <div className="hidden md:block flex-[0.8]"></div>
          </div>
        </div>

        <div className="flex justify-center items-end flex-grow">
          {/* Empty space above the transition */}
        </div>
        
        {/* Improved header transition */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          {/* Enhanced gradient overlay with text integration */}
          <div className="w-full h-48 sm:h-56 md:h-64 bg-gradient-to-b from-transparent via-[#2D3748]/60 to-[#2D3748]/95">
            {/* Integrated banner text */}
            <div className="hidden sm:block absolute bottom-[120px] sm:bottom-[130px] md:bottom-[150px] w-full text-center">
              <div className="transform scale-125 origin-center">
                <p className="text-white/80 text-xs sm:text-base md:text-lg font-['Patrick_Hand'] tracking-wide px-4">
                  KUCHNIA, KTÓRA ODŻYWIA: PRZEPISY WSPIERAJĄCE W AUTYŹMIE
                </p>
                {/* Subtle divider line */}
                <div className="w-16 sm:w-20 md:w-24 h-[1px] bg-green-300/50 mx-auto mt-2"></div>
              </div>
            </div>
          </div>
          
          {/* Integrated button using reusable component */}
          <div className="absolute bottom-[85px] sm:bottom-[90px] md:bottom-[100px] left-0 right-0 mx-auto flex justify-center z-30">
            <a href="#categories" onClick={(e) => {
              e.preventDefault();
              document.getElementById('categories').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
            }}>
              <HeroActionButton 
                text="ODKRYJ PRZEPISY" 
                size="hero"
                className="transform scale-110"
              />
            </a>
          </div>
          
          {/* Dodatkowy gradient dla płynniejszego przejścia */}
          <div className="absolute bottom-8 sm:bottom-10 md:bottom-14 left-0 w-full h-16 sm:h-20 md:h-24 z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(45,55,72,0), rgba(247,250,252,0.3))'
            }}
          ></div>

          {/* Smooth curved transition like between banner and info section */}
          <div className="absolute bottom-0 left-0 w-full h-10 sm:h-12 md:h-16 overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-36 z-10 pointer-events-none"
               style={{
                 background: 'linear-gradient(to top, rgba(247,250,252,1), rgba(247,250,252,0.6), rgba(247,250,252,0))'
               }}
            ></div>
            <div 
              className="w-[150%] h-10 sm:h-12 md:h-16 bg-[#F7FAFC] absolute -left-[25%]"
              style={{
                borderTopLeftRadius: '100%',
                borderTopRightRadius: '100%',
                boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.05)',
                backgroundImage: 'linear-gradient(to bottom, rgba(247,250,252,0.7), rgba(247,250,252,1))'
              }}
            ></div>
          </div>
        </div>
      </header>

      <InfoModal isOpen={isOpen} togglePopup={togglePopup} />
    </>
  );
};

export default memo(HeroSection);