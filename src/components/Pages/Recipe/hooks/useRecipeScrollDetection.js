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
      // Use a small offset (like 100px) to account for the header area
      const shouldShow = rect.top < 100;
      
      setIsStickyIngredientsVisible(prev => {
        if (prev !== shouldShow) {
          return shouldShow;
        }
        return prev;
      });
    };

    // Check immediately and on scroll
    checkVisibility();
    setTimeout(checkVisibility, 100);
    setTimeout(checkVisibility, 300);
    setTimeout(checkVisibility, 500);
    setTimeout(checkVisibility, 1000);

    const handleScroll = () => {
      checkVisibility();
    };

    const handleResize = () => {
      checkVisibility();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [recipe?.ingredients, loading]);

  return { isStickyIngredientsVisible, ingredientsRef };
};

