import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCommentAlt } from 'react-icons/fa';
import FeedbackModal from './FeedbackModal';

const FeedbackButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Track scroll position to optionally hide button at top of page
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Show button only if scrolled down a bit (hide when modal is open)
  const shouldShow = !isOpen && scrollY > 100;

  return (
    <>
      <AnimatePresence>
        {shouldShow && (
          <motion.button
            className="group fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-2xl flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300"
            onClick={toggleModal}
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            whileHover="hover"
            whileTap="tap"
            aria-label="Podziel się opinią"
            aria-expanded={isOpen}
            title="Podziel się opinią o treści"
          >
            {/* Pulsing ring effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-green-600"
              variants={pulseVariants}
              animate="animate"
            />
            
            {/* Icon */}
            <FaCommentAlt className="relative z-10 text-2xl" />
            
            {/* Tooltip on hover */}
            <span className="absolute right-full mr-4 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Podziel się opinią
              <span className="absolute right-0 top-1/2 translate-y-[-50%] translate-x-full border-4 border-transparent border-l-gray-900"></span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <FeedbackModal isOpen={isOpen} onClose={toggleModal} />
    </>
  );
};

export default FeedbackButton;

