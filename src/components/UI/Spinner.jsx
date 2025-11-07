/**
 * Spinner Component - Loading Indicator
 * 
 * A reusable loading spinner component that displays an animated circular indicator
 * to show that content is being loaded or processed.
 * 
 * USAGE:
 *   <Spinner size="lg" color="green" />
 *   <Spinner size="md" color="blue" className="my-4" />
 * 
 * USAGE LOCATIONS:
 *   - src/components/Pages/Search/SearchPage.jsx (search results loading)
 * 
 * FEATURES:
 *   - Configurable size (sm, md, lg, xl)
 *   - Configurable color (green, blue, red, gray, yellow)
 *   - Accessible with ARIA labels for screen readers
 *   - Smooth CSS animation using Tailwind's animate-spin
 *   - Customizable with additional className prop
 * 
 * PROPS:
 *   @param {string} size - Size of the spinner: 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
 *   @param {string} color - Color of the spinner: 'green' | 'blue' | 'red' | 'gray' | 'yellow' (default: 'green')
 *   @param {string} className - Additional CSS classes to apply (default: '')
 * 
 * SIZE OPTIONS:
 *   - sm: 16x16px (h-4 w-4) with border-2
 *   - md: 32x32px (h-8 w-8) with border-2
 *   - lg: 48x48px (h-12 w-12) with border-3
 *   - xl: 64x64px (h-16 w-16) with border-4
 * 
 * ACCESSIBILITY:
 *   - Uses role="status" to indicate loading state
 *   - Includes aria-label="Loading" for screen readers
 *   - Contains hidden text "Loading..." for additional context
 */

import React from 'react';

// Size configuration mapping
// Maps size prop values to Tailwind CSS classes for height, width, and border
const sizes = {
  sm: 'h-4 w-4 border-2',      // Small: 16x16px
  md: 'h-8 w-8 border-2',      // Medium: 32x32px (default)
  lg: 'h-12 w-12 border-3',    // Large: 48x48px
  xl: 'h-16 w-16 border-4'     // Extra Large: 64x64px
};

// Color configuration mapping
// Maps color prop values to Tailwind CSS border color classes
const colors = {
  'green': 'border-green-600',   // Primary brand color
  'blue': 'border-blue-600',     // Secondary color option
  'red': 'border-red-600',       // Error/warning color
  'gray': 'border-gray-600',     // Neutral color
  'yellow': 'border-yellow-500'  // Warning/attention color
};

/**
 * Spinner Component
 * 
 * @param {Object} props - Component props
 * @param {string} props.size - Size variant ('sm' | 'md' | 'lg' | 'xl')
 * @param {string} props.color - Color variant ('green' | 'blue' | 'red' | 'gray' | 'yellow')
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} Spinner component
 */
const Spinner = ({ size = 'md', color = 'green', className = '' }) => {
  // Get size classes, fallback to 'md' if invalid size provided
  const sizeClass = sizes[size] || sizes.md;
  
  // Get color classes, fallback to 'green' if invalid color provided
  const colorClass = colors[color] || colors.green;
  
  return (
    <div 
      className={`inline-block animate-spin rounded-full 
        border-t-transparent ${colorClass} ${sizeClass} ${className}`} 
      role="status"           // ARIA role for loading state
      aria-label="Loading"    // Accessible label for screen readers
    >
      {/* Hidden text for screen readers - provides additional context */}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner; 