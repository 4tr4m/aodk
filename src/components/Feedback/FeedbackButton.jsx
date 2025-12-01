import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCommentAlt } from 'react-icons/fa';
import FeedbackModal from './FeedbackModal';

const FeedbackButton = ({ isImageModalOpen = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const buttonVariants = {
    hidden: { 
      scale: 0,
      opacity: 0,
      rotate: -180
    },
    visible: { 
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 300,
        duration: 0.5
      }
    },
    exit: {
      scale: 0,
      opacity: 0,
      rotate: 180,
      transition: {
        duration: 0.2
      }
    },
    hover: {
      scale: 1.1,
      boxShadow: "0 10px 25px rgba(34, 197, 94, 0.4)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 0, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Show button always (hide when modal is open)
  // Small delay on initial render for better UX
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // Small delay to ensure page is rendered (reduced for faster appearance)
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  const shouldShow = !isOpen && mounted && !isImageModalOpen;

  return (
    <>
      <AnimatePresence>
        {shouldShow && (
          <motion.button
            className={`group fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-green-600 hover:bg-green-700 text-white shadow-2xl flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 rounded-full sm:px-4 sm:pr-5 sm:py-4 w-14 h-14 sm:w-auto sm:h-auto ${isImageModalOpen ? 'z-[40]' : 'z-[60]'}`}
            onClick={toggleModal}
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            whileHover="hover"
            whileTap="tap"
            aria-label="Podziel się opinią"
            aria-expanded={isOpen}
          >
            {/* Pulsing ring effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-green-600 opacity-50"
              variants={pulseVariants}
              animate="animate"
            />
            
            {/* Icon */}
            <FaCommentAlt className="relative z-10 text-xl sm:text-2xl flex-shrink-0" />
            
            {/* Text label - visible on desktop, hidden on mobile */}
            <span className="relative z-10 hidden sm:inline-block font-['Patrick_Hand'] text-base sm:text-lg font-semibold whitespace-nowrap">
              Podziel się opinią
            </span>

            {/* Enhanced tooltip for mobile - appears above on hover */}
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 transform scale-95 group-hover:scale-100 translate-y-1 group-hover:translate-y-0 sm:hidden pointer-events-none z-20">
              Podziel się opinią
              {/* Arrow pointing down */}
              <span className="absolute left-1/2 -translate-x-1/2 top-full border-4 border-transparent border-t-gray-900"></span>
            </span>

            {/* Desktop tooltip - appears on hover with helpful message */}
            <span className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 transform scale-95 group-hover:scale-100 translate-x-2 group-hover:translate-x-0 hidden sm:block pointer-events-none z-20">
              Twoja opinia pomaga nam ulepszać treści
              {/* Arrow pointing right */}
              <span className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <FeedbackModal isOpen={isOpen} onClose={toggleModal} />
    </>
  );
};

export default FeedbackButton;

