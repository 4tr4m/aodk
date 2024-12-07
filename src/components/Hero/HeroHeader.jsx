import React from 'react';
import { Link } from 'react-router-dom';

const HeroHeader = () => {
  return (
    <>
      <div 
        className="absolute top-0 left-0 w-full h-screen z-0"
        style={{
          backgroundImage: 'url(./img/main-hero.webp)',
          backgroundPosition: 'center -130px',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black/30 -z-10"></div>
      </div>

      <header className="pt-20 pb-4 static text-gray-50 z-1 shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between gap-5 static">
          <div className="flex-[0.8] max-w-[450px] -translate-y-20">
            <Link to="/">
              <img src="/img/logo.png" alt="Autyzm od kuchni" className="w-full h-auto block overflow-visible relative z-1" />
            </Link>
          </div>
          
          <div className="flex-2 flex flex-col items-center justify-center gap-[60px] max-w-3xl mx-auto px-[90px] py-[35px] relative -translate-y-[50px]">
            <div>
              <h1 className="mt-[-20px] font-['Caveat'] text-xl font-semibold text-gray-50 leading-relaxed text-center tracking-[2px] px-[25px] w-full shadow-sm transition-all duration-300">
                DIETA ELIMINACYJNA TRANSFORMUJĄCA FUNKCJONOWANIE W AUTYŹMIE I ZABURZENIACH NEUROROZWOJOWYCH
              </h1>
            </div>
          </div>

          <div className="flex-[0.8]"></div>
        </div>
      </header>
    </>
  );
};

export default HeroHeader;