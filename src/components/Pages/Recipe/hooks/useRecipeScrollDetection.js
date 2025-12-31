import { useEffect, useState, useRef } from 'react';

export const useRecipeScrollDetection = (recipe, loading) => {
  const [isStickyIngredientsVisible, setIsStickyIngredientsVisible] = useState(false);
  const ingredientsRef = useRef(null);

  useEffect(() => {
    if (!recipe?.ingredients || loading) {
      setIsStickyIngredientsVisible(false);
      return;
    }

    const checkVisibility = () => {
      // Wait for ref
      if (!ingredientsRef.current) {
        setTimeout(checkVisibility, 100);
        return;
      }

      const rect = ingredientsRef.current.getBoundingClientRect();
      
      // Show fixed button only when ingredients section header has scrolled past the top of viewport
      // Use offset to account for the header area (top nav + recipe header)
      // On mobile, typically around 80-100px for headers
      const headerOffset = 120;
      const shouldShow = rect.top < headerOffset;
      
      setIsStickyIngredientsVisible(prev => {
        if (prev !== shouldShow) {
          return shouldShow;
        }
        return prev;
      });
    };

    // Use requestAnimationFrame for smoother updates on mobile
    let rafId = null;
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        if (rafId) {
          cancelAnimationFrame(rafId);
        }
        ticking = true;
        rafId = requestAnimationFrame(() => {
          checkVisibility();
          ticking = false;
          rafId = null;
        });
      }
    };

    const handleResize = () => {
      checkVisibility();
    };

    // Check immediately and after delays to ensure proper initialization
    checkVisibility();
    setTimeout(checkVisibility, 100);
    setTimeout(checkVisibility, 300);
    setTimeout(checkVisibility, 500);
    setTimeout(checkVisibility, 1000);

    // Use multiple event listeners for better mobile support
    // Listen on both window and document for maximum compatibility
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    window.addEventListener('touchend', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Also check on wheel events for desktop trackpads
    window.addEventListener('wheel', handleScroll, { passive: true });

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      window.removeEventListener('touchend', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [recipe?.ingredients, loading]);

  return { isStickyIngredientsVisible, ingredientsRef };
};

