import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUtensils, FaTimes } from 'react-icons/fa';

const StickyIngredientsSidebar = ({ 
  isVisible, 
  isOpen, 
  onOpen, 
  onClose, 
  ingredients, 
  processIngredients, 
  replaceLinkPlaceholder,
  isNewsletterModalOpen = false,
  isImageModalOpen = false
}) => {
  const buttonRef = useRef(null);
  const sidebarRef = useRef(null);
  const contentRef = useRef(null);
  const [sidebarStyle, setSidebarStyle] = useState({});
  const [animateTop, setAnimateTop] = useState(undefined);
  
  // DESKTOP ONLY - check if mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  // Calculate positioning to avoid feedback button (desktop only)
  useEffect(() => {
    if (!isOpen || window.innerWidth < 1024) {
      // Reset when closed or on mobile
      if (sidebarRef.current) {
        sidebarRef.current.style.removeProperty('top');
        sidebarRef.current.style.removeProperty('bottom');
        sidebarRef.current.style.removeProperty('transform');
      }
      if (contentRef.current) {
        contentRef.current.style.maxHeight = '';
      }
      setAnimateTop(undefined);
      setSidebarStyle({});
      return;
    }

    const updatePosition = () => {
      if (!sidebarRef.current) {
        setTimeout(updatePosition, 50);
        return;
      }
      
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;
      
      const feedbackButton = document.querySelector('[aria-label="Podziel się opinią"]');
      const feedbackButtonTop = feedbackButton 
        ? feedbackButton.getBoundingClientRect().top 
        : viewportHeight - 94;
      
      const sidebarContainer = sidebarRef.current.querySelector('.bg-white');
      if (!sidebarContainer) {
        setTimeout(updatePosition, 50);
        return;
      }
      
      let sidebarHeight = sidebarContainer.offsetHeight;
      if (sidebarHeight === 0) {
        setTimeout(updatePosition, 100);
        return;
      }
      
      const minTop = 100;
      const gap = 100;
      const maxBottom = feedbackButtonTop - gap;
      const availableHeight = maxBottom - minTop;
      
      if (sidebarHeight > availableHeight && contentRef.current) {
        contentRef.current.style.maxHeight = `${availableHeight - 60}px`;
        sidebarHeight = availableHeight;
      } else if (contentRef.current) {
        contentRef.current.style.maxHeight = '';
      }
      
      const sidebarCenter = sidebarHeight / 2;
      let idealTop = Math.max(viewportCenter - sidebarCenter, minTop);
      
      const sidebarBottom = idealTop + sidebarHeight;
      if (sidebarBottom > maxBottom) {
        idealTop = Math.max(maxBottom - sidebarHeight, minTop);
      }
      
      const maxAllowedBottom = viewportHeight * 0.6;
      if (idealTop + sidebarHeight > maxAllowedBottom) {
        idealTop = Math.max(maxAllowedBottom - sidebarHeight, minTop);
      }
      
      if (isNaN(idealTop) || idealTop < 0 || idealTop > viewportHeight) {
        idealTop = Math.max(80, (viewportHeight - sidebarHeight) / 2);
      }
      
      if (sidebarRef.current) {
        sidebarRef.current.style.removeProperty('bottom');
        sidebarRef.current.style.removeProperty('margin-bottom');
        
        const currentTransform = window.getComputedStyle(sidebarRef.current).transform;
        if (currentTransform?.includes('translateY')) {
          sidebarRef.current.style.setProperty('transform', 'translateX(0)', 'important');
        }
        
        sidebarRef.current.style.setProperty('top', `${idealTop}px`, 'important');
        sidebarRef.current.style.setProperty('visibility', 'visible', 'important');
        sidebarRef.current.style.setProperty('position', 'fixed', 'important');
        void sidebarRef.current.offsetHeight;
      }
      
      setAnimateTop(idealTop);
      setSidebarStyle({ top: `${idealTop}px` });
    };
    
    updatePosition();
    const timeouts = [
      setTimeout(updatePosition, 50),
      setTimeout(updatePosition, 100),
      setTimeout(updatePosition, 200),
      setTimeout(updatePosition, 500),
    ];
    
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, { passive: true });
    
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
      timeouts.forEach(clearTimeout);
    };
  }, [isOpen]);

  // Force repaint to ensure proper rendering
  useEffect(() => {
    if (!isVisible) return;
    
    const forceRepaint = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (buttonRef.current && !isOpen) {
            void buttonRef.current.offsetHeight;
            buttonRef.current.style.display = 'flex';
          }
          if (sidebarRef.current && isOpen) {
            void sidebarRef.current.offsetHeight;
            sidebarRef.current.style.display = 'block';
          }
        });
      });
    };
    
    forceRepaint();
    const timeouts = [
      setTimeout(forceRepaint, 0),
      setTimeout(forceRepaint, 50),
      setTimeout(forceRepaint, 100),
    ];
    
    return () => timeouts.forEach(clearTimeout);
  }, [isVisible, isOpen]);

  if (!ingredients) {
    return null;
  }

  // Process ingredients
  let groups, hasGroups, normalized;
  try {
    const result = processIngredients(ingredients);
    groups = result.groups;
    hasGroups = result.hasGroups;
    normalized = result.normalized;
  } catch (error) {
    console.error('Error processing ingredients:', error);
    return null;
  }

  if ((!hasGroups && (!normalized || normalized.length === 0)) || 
      (hasGroups && (!groups || groups.length === 0))) {
    return null;
  }

  // DESKTOP ONLY - return null on mobile
  if (isMobile) {
    return null;
  }

  const content = (
    <AnimatePresence>
      {/* Desktop Button - Only show on desktop */}
      {isVisible && !isOpen && !isImageModalOpen && (
        <motion.button
          key="sticky-button-desktop"
          ref={buttonRef}
          onClick={onOpen}
          className={`fixed right-4 top-1/2 -translate-y-1/2 items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 group flex ${isNewsletterModalOpen ? 'z-[5000]' : isImageModalOpen ? 'z-[40]' : 'z-[10000]'}`}
          style={{ 
            willChange: 'transform, opacity',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            isolation: 'isolate'
          }}
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.9 }}
          whileHover={{ scale: 1.08, x: -4 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Pokaż składniki"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <FaUtensils className="w-5 h-5" />
          </motion.div>
          <span className="font-semibold">Składniki</span>
          <motion.div
            className="absolute -right-1 -top-1 w-3 h-3 bg-green-400 rounded-full"
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
      )}
      
      {/* Desktop Sidebar - Only show on desktop */}
      {isVisible && isOpen && !isImageModalOpen && (
        <motion.div
          key="sticky-sidebar-desktop"
          ref={sidebarRef}
          className={`fixed right-4 ${isNewsletterModalOpen ? 'z-[5000]' : isImageModalOpen ? 'z-[40]' : 'z-[10000]'}`}
          style={{ 
            ...sidebarStyle,
            willChange: 'opacity',
            backfaceVisibility: 'hidden',
            isolation: 'isolate',
            // Top position will be set by useEffect with !important to override animations
            // Use a safe default that's high up on the screen (not centered)
            top: sidebarStyle.top || (animateTop !== undefined ? `${animateTop}px` : '120px'),
          }}
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            x: 0, 
            scale: 1,
            // Explicitly don't animate y/top - let inline style handle it
            y: 0,
          }}
          exit={{ opacity: 0, x: 100, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            ref={contentRef}
            className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 max-h-[calc(100vh-8rem)] overflow-hidden flex flex-col backdrop-blur-sm"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="bg-gradient-to-r from-green-50 to-green-100 px-4 py-3 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <FaUtensils className="text-green-600 flex-shrink-0" />
                <h3 className="font-bold text-gray-800 font-['Playfair_Display'] text-base">Składniki</h3>
              </div>
              <motion.button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white/80 transition-colors text-gray-600 hover:text-gray-800 flex-shrink-0"
                aria-label="Zamknij"
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.85 }}
              >
                <FaTimes className="w-4 h-4" />
              </motion.button>
            </div>

            <div className="overflow-y-auto flex-1 p-4 scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-gray-100">
              {hasGroups ? (
                <div className="space-y-4">
                  {groups.map((group, groupIdx) => (
                    <motion.div
                      key={groupIdx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: groupIdx * 0.1 }}
                      className="bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-lg p-3 border border-gray-200"
                    >
                      {group.title && (
                        <h4 className="text-sm font-bold text-gray-800 mb-2 font-['Playfair_Display'] pb-1.5 border-b border-gray-300">
                          {group.title}
                        </h4>
                      )}
                      <ul className="list-disc pl-4 space-y-1.5 text-gray-800 text-sm">
                        {group.items.map((ing, i) => (
                          <li key={i} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: replaceLinkPlaceholder(ing) }} />
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <ul className="list-disc pl-5 space-y-1.5 text-gray-800 text-sm">
                  {normalized.map((ing, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: replaceLinkPlaceholder(ing) }}
                    />
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (typeof document !== 'undefined') {
    return createPortal(content, document.body);
  }
  
  return content;
};

export default StickyIngredientsSidebar;
