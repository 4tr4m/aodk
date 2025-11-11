import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

const CategorySearchIcon = ({ toggleSearch }) => {
  return (
    <div className="relative" style={{ overflow: 'visible', padding: '0.5rem', margin: '-0.5rem' }}>
      <motion.div 
        className="cursor-pointer relative select-none search-icon-container"
        style={{ overflow: 'visible', position: 'relative', zIndex: 50 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleSearch}
        initial={{ scale: 1 }}
        animate={{ 
          scale: [1, 1.15, 1],
          transition: { 
            repeat: Infinity, 
            repeatType: "loop", 
            duration: 2.5,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            delay: 0
          }
        }}
      >
        <div className="relative flex items-center justify-center" style={{ overflow: 'visible', position: 'relative' }}>
          <div 
            className="absolute inset-0 rounded-full animate-ping opacity-30" 
            style={{
              background: 'radial-gradient(circle, rgba(34,197,94,0.5) 0%, rgba(34,197,94,0) 70%)',
              transform: 'scale(1.8)',
              animationDuration: '3s',
              margin: '-20%',
            }}
          ></div>
          <div 
            className="absolute inset-0 rounded-full animate-pulse" 
            style={{
              background: 'radial-gradient(circle, rgba(34,197,94,0.3) 0%, rgba(34,197,94,0) 70%)',
              transform: 'scale(1.5)',
              margin: '-15%',
            }}
          ></div>
          {/* Attention ring */}
          <div className="absolute -inset-1 rounded-full bg-green-400/20 animate-pulse" style={{ margin: '-4px' }}></div>
          
          <FaSearch className="text-[2rem] sm:text-[2.5rem] md:text-[2.8rem] lg:text-[3.1rem] text-green-600 hover:text-green-500 transition-colors duration-300 drop-shadow-lg relative z-10 search-icon" style={{ position: 'relative', zIndex: 50, display: 'block' }} />
        </div>
      </motion.div>
    </div>
  );
};

export default CategorySearchIcon;

