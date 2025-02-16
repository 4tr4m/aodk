import React from 'react';
import { Link } from 'react-router-dom';
import { kuchniaCategories } from '../../Data/category-data';

const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Split categories into two groups for the footer columns
  const firstColumnCategories = kuchniaCategories.mainCategories.slice(0, 5);
  const secondColumnCategories = kuchniaCategories.mainCategories.slice(5, 10);

  return (
    <div className="relative w-full">
      <div className="relative pb-20">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/img/main-hero.webp)',
            backgroundPosition: 'center 25%',
            backgroundSize: 'cover'
          }}
        >
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-12 pt-8 lg:pt-12">
            <div 
              onClick={handleScrollToTop}
              className="cursor-pointer group relative transform hover:scale-105 transition-all duration-300"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleScrollToTop()}
              aria-label="Scroll to top"
            >
              <div className="absolute inset-0 bg-white/10 rounded-full blur-xl scale-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img 
                src="/img/logo.png" 
                alt="Autyzm od kuchni" 
                className="h-32 sm:h-40 w-auto object-contain relative z-10"
              />
            </div>

            <nav className="flex-1 lg:ml-16 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                {/* First Column - Main Categories */}
                <div className="space-y-6 text-center lg:text-left">
                  <h4 className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg">Przepisy</h4>
                  <ul className="space-y-4">
                    {firstColumnCategories.map((category) => (
                      <li key={category.label}>
                        <Link 
                          to={category.link}
                          className="text-gray-200 hover:text-white transition-colors duration-200 flex items-center justify-center lg:justify-start group"
                          onClick={handleScrollToTop}
                        >
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mr-2">→</span>
                          {category.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Second Column - More Categories */}
                <div className="space-y-6 text-center lg:text-left">
                  <h4 className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg">Więcej przepisów</h4>
                  <ul className="space-y-4">
                    {secondColumnCategories.map((category) => (
                      <li key={category.label}>
                        <Link 
                          to={category.link}
                          className="text-gray-200 hover:text-white transition-colors duration-200 flex items-center justify-center lg:justify-start group"
                          onClick={handleScrollToTop}
                        >
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mr-2">→</span>
                          {category.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Third Column - Contact Links */}
                <div className="space-y-6 text-center lg:text-left">
                  <h4 className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg">Kontakt</h4>
                  <ul className="space-y-4">
                    {[
                      { label: 'Pomoc', link: '/pomoc' },
                      { label: 'O nas', link: '/o-nas' },
                      { label: 'Kontakt', link: '/kontakt' }
                    ].map((item) => (
                      <li key={item.label}>
                        <Link 
                          to={item.link}
                          className="text-gray-200 hover:text-white transition-colors duration-200 flex items-center justify-center lg:justify-start group"
                          onClick={handleScrollToTop}
                        >
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mr-2">→</span>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>

      <div 
        className="absolute bottom-0 left-0 w-full h-48"
        style={{
          backgroundImage: 'url(/img/main-hero.webp)',
          backgroundPosition: 'center bottom',
          backgroundSize: 'cover',
          maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))'
        }}
      />
    </div>
  );
};

export default Footer;