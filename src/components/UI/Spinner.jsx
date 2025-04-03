import React from 'react';

const sizes = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-3',
  xl: 'h-16 w-16 border-4'
};

const colors = {
  'green': 'border-green-600',
  'blue': 'border-blue-600',
  'red': 'border-red-600',
  'gray': 'border-gray-600',
  'yellow': 'border-yellow-500'
};

const Spinner = ({ size = 'md', color = 'green', className = '' }) => {
  const sizeClass = sizes[size] || sizes.md;
  const colorClass = colors[color] || colors.green;
  
  return (
    <div className={`inline-block animate-spin rounded-full 
      border-t-transparent ${colorClass} ${sizeClass} ${className}`} 
      role="status" 
      aria-label="Loading">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner; 