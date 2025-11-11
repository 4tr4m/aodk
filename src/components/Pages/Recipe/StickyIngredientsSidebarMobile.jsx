import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUtensils, FaTimes } from 'react-icons/fa';

const StickyIngredientsSidebarMobile = ({ 
  isVisible, 
  isOpen, 
  onOpen, 
  onClose, 
  ingredients, 
  processIngredients, 
  replaceLinkPlaceholder,
  isNewsletterModalOpen = false
}) => {
  // MOBILE ONLY - check if mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!ingredients) {
    return null;
  }

  // MOBILE ONLY - return null on desktop
  if (!isMobile) {
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
    <AnimatePresence>
      {/* Mobile Floating Button */}
      {isVisible && !isOpen && (
        <motion.button
          key="sticky-button-mobile"
          onClick={onOpen}
          className={`fixed bottom-6 right-4 items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 group flex ${isNewsletterModalOpen ? 'z-[5000]' : 'z-[10000]'}`}
          style={{ 
            willChange: 'transform, opacity',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            isolation: 'isolate'
          }}
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
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
          <span className="font-semibold text-sm sm:text-base">Składniki</span>
          <motion.div
            className="absolute -right-1 -top-1 w-3 h-3 bg-green-400 rounded-full"
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
      )}
      
      {/* Mobile Bottom Sheet */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop-mobile"
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm ${isNewsletterModalOpen ? 'z-[4999]' : 'z-[9999]'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Bottom Sheet */}
          <motion.div
            key="sticky-sidebar-mobile"
            className={`fixed inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl ${isNewsletterModalOpen ? 'z-[5000]' : 'z-[10000]'}`}
            style={{ 
              maxHeight: '85vh',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
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
            <div className="bg-gradient-to-r from-green-50 to-green-100 px-4 py-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <FaUtensils className="text-green-600 flex-shrink-0" />
                <h3 className="font-bold text-gray-800 font-['Playfair_Display'] text-lg">Składniki</h3>
              </div>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/80 transition-colors text-gray-600 hover:text-gray-800 flex-shrink-0"
                aria-label="Zamknij"
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.85 }}
              >
                <FaTimes className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto flex-1 p-4 pb-8 max-h-[calc(85vh-80px)] scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-gray-100">
              {hasGroups ? (
                <div className="space-y-4">
                  {groups.map((group, groupIdx) => (
                    <motion.div
                      key={groupIdx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: groupIdx * 0.1 }}
                      className="bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-lg p-4 border border-gray-200"
                    >
                      {group.title && (
                        <h4 className="text-base font-bold text-gray-800 mb-3 font-['Playfair_Display'] pb-2 border-b border-gray-300">
                          {group.title}
                        </h4>
                      )}
                      <ul className="list-disc pl-5 space-y-2 text-gray-800 text-sm sm:text-base">
                        {group.items.map((ing, i) => (
                          <li key={i} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: replaceLinkPlaceholder(ing) }} />
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <ul className="list-disc pl-6 space-y-2 text-gray-800 text-sm sm:text-base">
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

export default StickyIngredientsSidebarMobile;

