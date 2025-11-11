import React from 'react';
import { motion } from 'framer-motion';

const CategoryFilterButton = ({ 
  onClick, 
  selectedIngredientsCount, 
  activeFilter,
  isFilterVisible 
}) => {
  return (
    <motion.button
      onClick={onClick}
      className={`select-none px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 z-20 flex items-center gap-2 group border-2 flex-shrink-0 relative overflow-hidden
        ${selectedIngredientsCount > 0 
          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-blue-400/50' 
          : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-blue-400/30'
        }`}
      whileHover={{ scale: 1.08, y: -3 }}
      whileTap={{ scale: 0.92 }}
      initial={{ scale: 1 }}
      animate={selectedIngredientsCount > 0 ? 
        { 
          boxShadow: [
            "0 20px 25px -5px rgba(59, 130, 246, 0.3), 0 10px 10px -5px rgba(59, 130, 246, 0.2)",
            "0 20px 25px -5px rgba(59, 130, 246, 0.5), 0 10px 10px -5px rgba(59, 130, 246, 0.3)",
            "0 20px 25px -5px rgba(59, 130, 246, 0.3), 0 10px 10px -5px rgba(59, 130, 246, 0.2)"
          ],
          transition: { 
            repeat: Infinity, 
            repeatType: "loop", 
            duration: 2.5,
            ease: "easeInOut"
          }
        } : {}
      }
      aria-label="Filtruj składniki"
    >
      {/* Shimmer/Shine effect */}
      <motion.div
        className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-200%' }}
        animate={{ x: '200%' }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 3,
          ease: "linear"
        }}
      />
      
      {/* Glowing pulse effect when active */}
      {selectedIngredientsCount > 0 && (
        <>
          <motion.div
            className="absolute inset-0 rounded-xl bg-blue-400/30"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-xl bg-blue-300/20"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 0, 0.4],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: "easeInOut",
              delay: 0.3
            }}
          />
        </>
      )}
      
      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-white/20"
        initial={{ scale: 0, opacity: 0.6 }}
        animate={isFilterVisible ? {
          scale: [0, 2, 2.5],
          opacity: [0.6, 0.3, 0],
        } : {}}
        transition={{ duration: 0.6 }}
      />

      <div className="relative flex items-center justify-center z-10">
        {/* Filter icon with enhanced animation */}
        <motion.div
          animate={selectedIngredientsCount > 0 ? {
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.1, 1],
          } : {}}
          transition={{
            duration: 0.6,
            repeat: selectedIngredientsCount > 0 ? Infinity : 0,
            repeatDelay: 1.5
          }}
        >
          <svg 
            className="w-4 h-4 sm:w-5 sm:h-5 text-white transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </motion.div>
        
        {/* Mobile label (short) */}
        <span className="ml-1 inline sm:hidden text-xs font-bold relative z-10">Filtruj</span>
        {/* Desktop/tablet label (full) */}
        <span className="ml-1 hidden sm:inline text-sm font-bold relative z-10">Filtruj składniki</span>
      </div>

      {/* Tooltip showing active filter - appears on hover when filter is active */}
      {activeFilter && (
        <motion.div
          initial={{ opacity: 0, y: 5, scale: 0.95 }}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900/95 backdrop-blur-sm text-white text-xs rounded-lg shadow-xl whitespace-nowrap pointer-events-none z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900/95"></div>
          <span className="font-semibold">Aktywny filtr ({selectedIngredientsCount}):</span> {activeFilter.length > 20 ? activeFilter.substring(0, 20) + '...' : activeFilter}
        </motion.div>
      )}
    </motion.button>
  );
};

export default CategoryFilterButton;

