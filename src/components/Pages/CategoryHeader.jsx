import React from 'react';
import { Link } from 'react-router-dom';

const CategoryHeader = ({ showLogo = true }) => {
  return (
    <div className="relative h-[110px] overflow-hidden">
      {/* Background */}
      <div 
        className="absolute top-0 left-0 w-full h-full transform-gpu transition-transform duration-[2s] ease-out"
        style={{
          backgroundImage: 'url(/img/main-hero.webp)',
          backgroundPosition: 'center 25%',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          willChange: 'transform'
        }}
      >
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#F6EFE9] via-[#F6EFE9]/50 to-transparent opacity-90"></div>
      </div>

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 h-full">
        <div className="flex items-center justify-between h-full py-2">
          {/* Logo Section (optional to avoid duplicate with TopNavBar) */}
          {showLogo && (
            <Link 
              to="/"
              className="transform transition-all duration-300 hover:scale-105 hover:-rotate-2 relative group"
            >
              <div className="absolute inset-0 bg-black/20 rounded-full blur-xl scale-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img 
                src="/img/logo.png" 
                alt="Autyzm od kuchni" 
                className="h-14 w-auto object-contain relative z-10"
              />
            </Link>
          )}

          {/* Navigation icons on the right - optional */}
          <div className="flex items-center gap-6">
            <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all duration-300">
              <Link to="/search" className="text-gray-100/90 hover:text-white">
                {/* You can add icons here if needed */}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient effect */}
      <div 
        className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#F6EFE9] to-transparent"
        style={{ mixBlendMode: 'multiply' }}
      />

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-400/20 to-transparent"></div>
    </div>
  );
};

export default CategoryHeader;