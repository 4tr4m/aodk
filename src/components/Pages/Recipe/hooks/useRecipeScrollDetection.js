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
      // Desktop only
      if (window.innerWidth < 1024) {
        setIsStickyIngredientsVisible(false);
        return;
      }

      // Wait for ref
      if (!ingredientsRef.current) {
        setTimeout(checkVisibility, 100);
        return;
      }

      const rect = ingredientsRef.current.getBoundingClientRect();
      
      // Show sidebar when ingredients section is in the viewport or has scrolled past the top
      const shouldShow = rect.top < window.innerHeight;
      
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

