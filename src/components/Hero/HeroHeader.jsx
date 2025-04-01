// HeroHeader.jsx
import { useState, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import InfoModal from '../Pages/InfoModal';

const HeroHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const scrollToCategory = useCallback(() => {
    const element = document.getElementById('category-banner');
    element?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <div 
        className="absolute top-0 left-0 w-full h-screen z-0 will-change-transform"
        style={{
          backgroundImage: 'url(./img/main-hero.webp)',
          backgroundPosition: 'center -130px',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black/30 -z-10"></div>
      </div>

      <header className="min-h-screen flex flex-col">
        <div className="pt-8 pb-4 static text-gray-50 z-1 shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
          <div className="max-w-7xl mx-auto px-5 flex items-start justify-between gap-5 static">
            <div className="flex-[0.8] max-w-[450px] relative" style={{ top: '-40px' }}>
              <div onClick={togglePopup} className="cursor-pointer transition-transform duration-300 hover:scale-105">
                <img src="/img/logo.png" alt="Autyzm od kuchni" className="w-full h-auto block overflow-visible relative z-1" />
              </div>
            </div>
            
            <Link to="/przepisy" className="flex-2 group relative z-10">
              <div className="max-w-3xl mx-auto py-6 px-16 relative">
                <div className="absolute inset-0 bg-gradient-radial from-black/10 via-transparent to-transparent transition-all duration-300 group-hover:from-black/20"></div>
                <div className="relative transform transition-all duration-300 group-hover:translate-y-[-8px]">
                  <h1 className="font-['Caveat'] text-4xl font-bold text-white leading-relaxed text-center tracking-wide mb-6 transition-all duration-300 group-hover:text-gray-50 drop-shadow-lg group-hover:drop-shadow-xl">
                    DIETA ELIMINACYJNA <br/>
                    <span className="text-3xl font-normal tracking-wider opacity-95 transition-all duration-300 group-hover:opacity-100">
                      TRANSFORMUJĄCA <br/>
                      FUNKCJONOWANIE <br/>
                      W AUTYŹMIE I ZABURZENIACH <br/>
                      NEUROROZWOJOWYCH
                    </span>
                  </h1>
                  <h2 className="mt-6 font-['Patrick_Hand'] text-xl font-normal text-gray-50/90 leading-relaxed text-center tracking-wide transition-all duration-300 group-hover:text-white">
                    Proste, odżywcze przepisy bez glutenu, nabiału krowiego, cukru i <br/>
                    bez smażenia – wspierające zdrowie i rozwój
                  </h2>
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="relative">
                      <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 w-[1px] h-6 bg-white/40"></span>
                      <span className="font-['Patrick_Hand'] text-xl text-gray-50 tracking-wider drop-shadow-lg uppercase">
                        odkryj przepisy
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <div className="flex-[0.8]"></div>
          </div>
        </div>

        <div className="flex justify-center items-end flex-grow mb-8 lg:mb-16">
          <button 
            onClick={scrollToCategory}
            className="px-12 py-4 bg-green-900/80 text-gray-50/95 rounded-xl uppercase tracking-wider font-['Patrick_Hand'] text-xl transition-all duration-300 hover:text-gray-50 hover:scale-105 backdrop-blur-sm border-t border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.25)] hover:bg-green-800/80 group"
          >
            Kuchnia, która Odżywia: Przepisy wspierające w Autyźmie
          </button>
        </div>
      </header>

      <InfoModal isOpen={isOpen} togglePopup={togglePopup} />
    </>
  );
};

export default memo(HeroHeader);