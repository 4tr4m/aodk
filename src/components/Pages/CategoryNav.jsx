import React, { useRef, useEffect } from 'react';

const CategoryNav = ({ categories, currentSlug, onCategoryClick }) => {
  const scrollRef = useRef(null);
  const containerRef = useRef(null);

  const smoothScrollToCategory = (element) => {
    const container = scrollRef.current;
    if (!container || !element) return;

    const containerWidth = container.offsetWidth;
    const scrollLeft = container.scrollLeft;
    const elementLeft = element.offsetLeft;
    const elementWidth = element.offsetWidth;

    // Calculate the center position
    const targetScroll = elementLeft - (containerWidth / 2) + (elementWidth / 2);

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  // Handle arrow navigation
  const handleScroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth * 0.8;
    const targetScroll = container.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  // Scroll active item into view on mount and category change
  useEffect(() => {
    const activeButton = scrollRef.current?.querySelector('[data-active="true"]');
    if (activeButton) {
      setTimeout(() => {
        smoothScrollToCategory(activeButton);
      }, 100);
    }
  }, [currentSlug]);

  // Show/hide arrows based on scroll position
  const [showLeftArrow, setShowLeftArrow] = React.useState(false);
  const [showRightArrow, setShowRightArrow] = React.useState(true);

  const updateArrows = () => {
    const container = scrollRef.current;
    if (!container) return;

    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(
      container.scrollLeft < (container.scrollWidth - container.offsetWidth - 10)
    );
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', updateArrows);
      updateArrows();
      return () => container.removeEventListener('scroll', updateArrows);
    }
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#F6EFE9]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-gradient-to-r from-[#F6EFE9] to-transparent"
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-gradient-to-l from-[#F6EFE9] to-transparent"
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        <div 
          ref={scrollRef}
          className="w-full overflow-x-auto pb-4 pt-2 hide-scrollbar scroll-smooth"
          onScroll={updateArrows}
          style={{
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          <div className="flex flex-nowrap gap-3 min-w-min pb-2">
            <button
              data-active={!currentSlug}
              onClick={() => onCategoryClick('/kuchnia')}
              className={`
                whitespace-nowrap px-6 py-2.5 rounded-full font-['Lato'] text-base 
                transition-all duration-300 border border-transparent
                ${!currentSlug 
                  ? 'bg-green-600 text-white shadow-md scale-105' 
                  : 'bg-white/90 text-gray-700 hover:bg-white hover:border-gray-100 hover:scale-105'
                }
              `}
            >
              Wszystkie
            </button>
            
            {categories.map((category, index) => {
              const categorySlug = category.link.split('/').pop();
              const isActive = categorySlug === currentSlug;
              
              return (
                <button
                  key={index}
                  data-active={isActive}
                  onClick={() => onCategoryClick(category.link)}
                  className={`
                    whitespace-nowrap px-6 py-2.5 rounded-full font-['Lato'] text-base
                    transition-all duration-300 border border-transparent
                    ${isActive 
                      ? 'bg-green-600 text-white shadow-md scale-105' 
                      : 'bg-white/90 text-gray-700 hover:bg-white hover:border-gray-100 hover:scale-105'
                    }
                  `}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;