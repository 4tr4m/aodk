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

  // Calculate positioning to avoid feedback button and center the list
  useEffect(() => {
    if (isOpen) {
      const updatePosition = () => {
        // Wait for content to be rendered
        if (!contentRef.current) {
          setTimeout(updatePosition, 50);
          return;
        }
        
        const viewportHeight = window.innerHeight;
        const viewportCenter = viewportHeight / 2;
        
        // Feedback button dimensions
        // Mobile: bottom-4 (16px), h-14 (56px) = ~72px from bottom
        // Desktop: bottom-6 (24px), with text ~80px height = ~104px from bottom
        const isDesktop = window.innerWidth >= 640;
        const feedbackButtonHeight = isDesktop ? 80 : 56;
        const feedbackButtonBottom = isDesktop ? 24 : 16;
        const feedbackButtonTop = viewportHeight - feedbackButtonHeight - feedbackButtonBottom;
        
        const sidebarHeight = contentRef.current.offsetHeight;
        const sidebarCenter = sidebarHeight / 2;
        
        // Calculate ideal top position to center the sidebar's center at viewport center
        let idealTop = viewportCenter - sidebarCenter;
        
        // Minimum top padding
        const minTop = 16;
        idealTop = Math.max(idealTop, minTop);
        
        // Maximum top to avoid feedback button (with 20px gap)
        const gap = 20;
        const maxTop = feedbackButtonTop - sidebarHeight - gap;
        
        // If centered position would overlap with feedback button, adjust
        if (idealTop + sidebarHeight > feedbackButtonTop - gap) {
          idealTop = Math.max(maxTop, minTop);
        }
        
        // If sidebar is too tall to fit, position from top
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
      
      window.addEventListener('resize', updatePosition);
      
      return () => {
        window.removeEventListener('resize', updatePosition);
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        clearTimeout(timeout3);
      };
    } else {
      // Reset style when closed
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
      {isVisible && !isOpen && (
        <motion.button
          key="sticky-button"
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
      
      {isVisible && isOpen && (
        <motion.div
          key="sticky-sidebar"
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
    </AnimatePresence>
  );

  if (typeof document !== 'undefined') {
    return createPortal(content, document.body);
  }
  
  return content;
};

export default StickyIngredientsSidebar;
