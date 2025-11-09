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
  replaceLinkPlaceholder 
}) => {
  const buttonRef = useRef(null);
  const sidebarRef = useRef(null);
  const contentRef = useRef(null);
  const [sidebarStyle, setSidebarStyle] = useState({});

  // Calculate positioning to avoid feedback button and center the list (desktop only)
  useEffect(() => {
    if (isOpen && window.innerWidth >= 1024) {
      const updatePosition = () => {
        // Wait for content to be rendered
        if (!contentRef.current) {
          setTimeout(updatePosition, 50);
          return;
        }
        
        const viewportHeight = window.innerHeight;
        const viewportCenter = viewportHeight / 2;
        
        // Try to find the actual feedback button element
        const feedbackButton = document.querySelector('[aria-label="Podziel się opinią"]');
        let feedbackButtonTop = viewportHeight;
        
        if (feedbackButton) {
          const feedbackRect = feedbackButton.getBoundingClientRect();
          feedbackButtonTop = feedbackRect.top;
        } else {
          // Fallback estimation: Desktop button is bottom-6 (24px) with text, ~90px height
          const feedbackButtonHeight = 90;
          const feedbackButtonBottom = 24;
          feedbackButtonTop = viewportHeight - feedbackButtonHeight - feedbackButtonBottom;
        }
        
        const sidebarHeight = contentRef.current.offsetHeight;
        const sidebarCenter = sidebarHeight / 2;
        
        // Calculate ideal top position to center the sidebar's center at viewport center
        let idealTop = viewportCenter - sidebarCenter;
        
        // Minimum top padding
        const minTop = 20;
        idealTop = Math.max(idealTop, minTop);
        
        // Maximum top to avoid feedback button (with larger gap for better spacing)
        const gap = 40; // Increased gap to ensure no overlap
        const maxTop = feedbackButtonTop - sidebarHeight - gap;
        
        // If centered position would overlap with feedback button, adjust upward
        if (idealTop + sidebarHeight > feedbackButtonTop - gap) {
          idealTop = Math.max(maxTop, minTop);
        }
        
        // If sidebar is too tall to fit, position from top with padding
        if (sidebarHeight > feedbackButtonTop - minTop - gap) {
          idealTop = minTop;
        }
        
        setSidebarStyle({
          top: `${idealTop}px`,
        });
      };
      
      // Initial update with delays to ensure DOM is ready
      updatePosition();
      const timeout1 = setTimeout(updatePosition, 50);
      const timeout2 = setTimeout(updatePosition, 100);
      const timeout3 = setTimeout(updatePosition, 200);
      const timeout4 = setTimeout(updatePosition, 500); // Extra delay for feedback button to render
      
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, { passive: true });
      
      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition);
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        clearTimeout(timeout3);
        clearTimeout(timeout4);
      };
    } else {
      // Reset style when closed or on mobile
      setSidebarStyle({});
    }
  }, [isOpen]);

  // Aggressive repaint forcing - CRITICAL for browser rendering bug
  useEffect(() => {
    if (isVisible) {
      const forceRepaint = () => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (buttonRef.current && !isOpen) {
              void buttonRef.current.offsetHeight;
              void buttonRef.current.offsetWidth;
              buttonRef.current.style.display = 'flex';
            }
            if (sidebarRef.current && isOpen) {
              void sidebarRef.current.offsetHeight;
              void sidebarRef.current.offsetWidth;
              sidebarRef.current.style.display = 'block';
            }
          });
        });
      };
      forceRepaint();
      setTimeout(forceRepaint, 0);
      setTimeout(forceRepaint, 50);
      setTimeout(forceRepaint, 100);
    }
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

  const content = (
    <AnimatePresence mode="wait">
      {/* Desktop Button */}
      {isVisible && !isOpen && (
        <motion.button
          key="sticky-button-desktop"
          ref={buttonRef}
          onClick={onOpen}
          className="hidden lg:flex fixed right-4 top-1/2 -translate-y-1/2 z-[10000] items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 group"
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

      {/* Mobile Button - Compact floating button */}
      {isVisible && !isOpen && (
        <motion.button
          key="sticky-button-mobile"
          onClick={onOpen}
          className="lg:hidden fixed bottom-20 right-4 z-[10000] w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300"
          style={{ 
            willChange: 'transform, opacity',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            isolation: 'isolate'
          }}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Pokaż składniki"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <FaUtensils className="w-6 h-6" />
          </motion.div>
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"
            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
      )}
      
      {/* Desktop Sidebar */}
      {isVisible && isOpen && (
        <motion.div
          key="sticky-sidebar-desktop"
          ref={sidebarRef}
          className="hidden lg:block fixed right-4 z-[10000] [transform:translateZ(0)]"
          style={{ 
            ...sidebarStyle,
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
            isolation: 'isolate'
          }}
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
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
                        <h4 className="text-sm font-bold text-gray-800 mb-2 font-['Playfair_Display'] flex items-center gap-1.5 pb-1.5 border-b border-gray-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
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

      {/* Mobile Sidebar - Bottom Sheet */}
      {isVisible && isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="mobile-backdrop"
            className="lg:hidden fixed inset-0 bg-black/50 z-[9999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Bottom Sheet */}
          <motion.div
            key="sticky-sidebar-mobile"
            ref={sidebarRef}
            className="lg:hidden fixed bottom-0 left-0 right-0 z-[10000] bg-white rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col [transform:translateZ(0)]"
            style={{ 
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              isolation: 'isolate'
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>

            {/* Header */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 px-4 py-3 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <FaUtensils className="text-green-600 flex-shrink-0 w-5 h-5" />
                <h3 className="font-bold text-gray-800 font-['Playfair_Display'] text-lg">Składniki</h3>
              </div>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/80 transition-colors text-gray-600 hover:text-gray-800 flex-shrink-0"
                aria-label="Zamknij"
                whileTap={{ scale: 0.85 }}
              >
                <FaTimes className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Content */}
            <div 
              ref={contentRef}
              className="overflow-y-auto flex-1 p-4 scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-gray-100"
            >
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
                        <h4 className="text-sm font-bold text-gray-800 mb-2 font-['Playfair_Display'] flex items-center gap-1.5 pb-1.5 border-b border-gray-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
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
        </>
      )}
    </AnimatePresence>
  );

  if (typeof document !== 'undefined') {
    return createPortal(content, document.body);
  }
  
  return content;
};

export default StickyIngredientsSidebar;
