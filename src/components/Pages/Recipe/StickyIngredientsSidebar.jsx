import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
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

  // Force repaint when visibility changes - fixes browser rendering bug
  useEffect(() => {
    console.log('StickyIngredientsSidebar visibility changed:', { isVisible, isOpen });
    
    if (isVisible) {
      // Multiple repaint triggers to ensure browser renders the element
      const forceRepaint = () => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (buttonRef.current) {
              void buttonRef.current.offsetHeight; // Force reflow
              void buttonRef.current.offsetWidth; // Force reflow
              // Trigger style recalculation - ensure visibility
              buttonRef.current.style.display = 'flex';
              buttonRef.current.style.visibility = 'visible';
              buttonRef.current.style.opacity = '1';
              console.log('Button repainted:', buttonRef.current.getBoundingClientRect());
            }
            if (sidebarRef.current) {
              void sidebarRef.current.offsetHeight; // Force reflow
              void sidebarRef.current.offsetWidth; // Force reflow
              // Trigger style recalculation - ensure visibility
              sidebarRef.current.style.display = 'block';
              sidebarRef.current.style.visibility = 'visible';
              sidebarRef.current.style.opacity = '1';
              console.log('Sidebar repainted:', sidebarRef.current.getBoundingClientRect());
            }
          });
        });
      };

      // Immediate repaint
      forceRepaint();
      
      // Additional repaints at different intervals to catch all render cycles
      setTimeout(forceRepaint, 0);
      setTimeout(forceRepaint, 16); // One frame
      setTimeout(forceRepaint, 50);
      setTimeout(forceRepaint, 100);
      setTimeout(forceRepaint, 200);
    }
  }, [isVisible, isOpen]);

  if (!ingredients) return null;

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

  // Don't render if no ingredients to show
  if ((!hasGroups && (!normalized || normalized.length === 0)) || 
      (hasGroups && (!groups || groups.length === 0))) {
    return null;
  }

  // Debug logging
  console.log('StickyIngredientsSidebar render:', { 
    isVisible, 
    isOpen, 
    hasGroups, 
    normalizedLength: normalized?.length, 
    groupsLength: groups?.length 
  });

  const content = (
    <>
      {/* Always render button in DOM, just control visibility */}
      <motion.button
        key="sticky-button"
        ref={buttonRef}
        onClick={onOpen}
        className="hidden lg:flex fixed right-4 top-1/2 -translate-y-1/2 z-[10000] items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 group"
        style={{ 
          willChange: 'transform, opacity',
          transform: 'translateZ(0)', // Force GPU acceleration
          backfaceVisibility: 'hidden',
          isolation: 'isolate', // Create new stacking context
          pointerEvents: isVisible && !isOpen ? 'auto' : 'none', // Ensure it's clickable
          visibility: isVisible && !isOpen ? 'visible' : 'hidden',
          opacity: isVisible && !isOpen ? 1 : 0
        }}
          initial={false}
          animate={isVisible && !isOpen ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 100, scale: 0.9 }}
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
      
      {/* Always render sidebar in DOM, just control visibility */}
      <motion.div
        key="sticky-sidebar"
        ref={sidebarRef}
        className="hidden lg:block fixed right-4 top-1/2 -translate-y-1/2 z-[10000]"
        style={{ 
          willChange: 'transform, opacity',
          transform: 'translateZ(0)', // Force GPU acceleration
          backfaceVisibility: 'hidden',
          isolation: 'isolate', // Create new stacking context
          pointerEvents: isVisible && isOpen ? 'auto' : 'none', // Ensure it's interactive
          visibility: isVisible && isOpen ? 'visible' : 'hidden',
          opacity: isVisible && isOpen ? 1 : 0
        }}
        initial={false}
        animate={isVisible && isOpen ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 100, scale: 0.9 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 max-h-[calc(100vh-8rem)] overflow-hidden flex flex-col backdrop-blur-sm"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Header with close button */}
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

            {/* Ingredients Content */}
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
                      dangerouslySetInnerHTML={{ __html: replaceLinkPlaceholder(ing) }}
                    />
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </motion.div>
    </>
  );

  // Use portal to render at document root to avoid stacking context issues
  // Always render a container to ensure browser establishes rendering context
  if (typeof document !== 'undefined') {
    return createPortal(
      <div 
        id="sticky-ingredients-portal-container"
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          pointerEvents: 'none',
          zIndex: 10000,
          isolation: 'isolate'
        }}
      >
        {content}
      </div>,
      document.body
    );
  }
  
  return content;
};

export default StickyIngredientsSidebar;

