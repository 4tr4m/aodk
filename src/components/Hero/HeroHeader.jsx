// HeroHeader.jsx
import { useState, useCallback, memo } from 'react';
import InfoModal from '../Pages/InfoModal';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HeroActionButton } from '../UI/Button';

const HeroHeader = () => {
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

  const scrollToCategory = useCallback(() => {
    const element = document.getElementById('category-banner');
    element?.scrollIntoView({ behavior: 'smooth' });
  }, []);

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
            <div className="flex-[0.8] max-w-[156px] sm:max-w-[250px] md:max-w-[450px] relative md:top-[-40px]">
              <motion.div 
                onClick={togglePopup} 
                className="cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <img src="/img/logo.png" alt="Autyzm od kuchni" className="w-full h-auto block overflow-visible relative z-1" />
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
                  <h1 className="font-['Caveat'] text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-relaxed text-center tracking-wide mb-4 sm:mb-6 transition-all duration-300 group-hover:text-gray-50 drop-shadow-lg group-hover:drop-shadow-xl">
                    DIETA ELIMINACYJNA <br/>
                    <span className="text-xl sm:text-2xl md:text-3xl font-normal tracking-wider opacity-95 transition-all duration-300 group-hover:opacity-100">
                      TRANSFORMUJĄCA <br/>
                      FUNKCJONOWANIE <br/>
                      W AUTYŹMIE I ZABURZENIACH <br className="hidden sm:block" />
                      <span className="hidden sm:inline">NEUROROZWOJOWYCH</span>
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
            <div className="absolute bottom-20 sm:bottom-24 md:bottom-32 w-full text-center">
              <p className="text-white/80 text-xs sm:text-sm md:text-base font-['Patrick_Hand'] tracking-wide px-4">
                KUCHNIA, KTÓRA ODŻYWIA: PRZEPISY WSPIERAJĄCE W AUTYŹMIE
              </p>
              {/* Subtle divider line */}
              <div className="w-16 sm:w-20 md:w-24 h-[1px] bg-green-300/50 mx-auto mt-2"></div>
            </div>
          </div>
          
          {/* Integrated button using reusable component */}
          <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 left-0 right-0 mx-auto flex justify-center z-20">
            <HeroActionButton 
              onClick={scrollToCategory} 
              text="ODKRYJ PRZEPISY"
              size="hero"
            />
          </div>

          {/* Smooth curved transition like between banner and info section */}
          <div className="absolute bottom-0 left-0 w-full h-8 sm:h-10 md:h-12 overflow-hidden">
            <div 
              className="w-[120%] h-8 sm:h-10 md:h-12 bg-[#F6EFE9] absolute -left-[10%]"
              style={{
                borderTopLeftRadius: '100%',
                borderTopRightRadius: '100%',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
              }}
            ></div>
          </div>
        </div>
      </header>

      <InfoModal isOpen={isOpen} togglePopup={togglePopup} />
    </>
  );
};

export default memo(HeroHeader);