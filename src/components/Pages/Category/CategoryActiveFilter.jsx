import React from 'react';
import { motion } from 'framer-motion';

const CategoryActiveFilter = ({ activeFilter, filteredRecipesCount, onClear }) => {
  if (!activeFilter) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-green-800 font-medium">
            Filtrowanie po składniku: {activeFilter}
          </span>
          <span className="text-green-600 text-sm">
            ({filteredRecipesCount || 0} przepisów)
          </span>
        </div>
        <button
          onClick={onClear}
          className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
        >
          Wyczyść filtr
        </button>
      </div>
    </motion.div>
  );
};

export default CategoryActiveFilter;

