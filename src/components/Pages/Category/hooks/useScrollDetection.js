import { useState, useEffect } from 'react';

/**
 * Custom hook for scroll detection
 * @param {number} threshold - Scroll threshold in pixels
 * @returns {boolean} Whether scrolled past threshold
 */
export const useScrollDetection = (threshold = 30) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial scroll position
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return isScrolled;
};

