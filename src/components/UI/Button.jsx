import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Standard button dimensions and styles to maintain consistency
const BUTTON_STYLES = {
  sm: {
    padding: 'px-4 py-1.5',
    fontSize: 'text-sm',
  },
  md: {
    padding: 'px-6 py-2',
    fontSize: 'text-base',
  },
  lg: {
    padding: 'px-8 py-2.5',
    fontSize: 'text-lg',
  },
  hero: {
    padding: 'px-10 py-3',
    fontSize: 'text-lg',
  }
};

// Variant classes with better visibility and alignment with the new gray color scheme
const variantClasses = {
  primary: 'bg-green-600 hover:bg-green-700 text-white border border-white/10 shadow-sm',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 border border-gray-300/50 shadow-sm',
  hero: 'bg-green-600/80 backdrop-blur-sm text-white border border-white/50 shadow-md',
  ghost: 'bg-transparent hover:bg-white/20 text-white border border-white/30'
};

/**
 * Reusable Button component with animation effects
 * 
 * @param {Object} props - Component props
 * @param {string} props.text - Button text
 * @param {string} props.to - Link destination (if button is a link)
 * @param {Function} props.onClick - Click handler (if button is not a link)
 * @param {string} props.variant - Button variant ('primary', 'secondary', 'hero', 'ghost')
 * @param {string} props.size - Button size ('sm', 'md', 'lg', 'hero')
 * @param {boolean} props.animate - Whether to add animation effects
 * @param {boolean} props.fullWidth - Whether the button should take full width
 * @param {Object} props.customStyles - Additional custom styles to apply
 */
export const Button = ({ 
  text, 
  to, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  animate = true,
  fullWidth = false,
  className = '',
  customStyles = {},
  children,
  ...props 
}) => {
  // Size classes
  const sizeClasses = {
    sm: BUTTON_STYLES.sm.padding + ' ' + BUTTON_STYLES.sm.fontSize,
    md: BUTTON_STYLES.md.padding + ' ' + BUTTON_STYLES.md.fontSize,
    lg: BUTTON_STYLES.lg.padding + ' ' + BUTTON_STYLES.lg.fontSize,
    hero: BUTTON_STYLES.hero.padding + ' ' + BUTTON_STYLES.hero.fontSize
  };
  
  // Animation variants
  const buttonVariants = {
    initial: { scale: 0.98, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    hover: { 
      scale: 1.05,
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      y: -2,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };
  
  // Float animation (used in hero button)
  const floatAnimation = {
    y: [0, -3, 0],
    transition: { 
      y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
    }
  };
  
  // Combine all classes
  const buttonClass = `
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${fullWidth ? 'w-full' : 'w-auto'}
    rounded-full 
    font-['Patrick_Hand']
    tracking-wider
    hover:shadow-lg 
    transition-all 
    duration-300 
    flex 
    items-center 
    justify-center
    ${className}
  `;
  
  // Button content
  const buttonContent = (
    <>
      {children || text}
    </>
  );
  
  // Choose between motion button and regular button
  const MotionButton = ({ children }) => (
    <motion.div
      className={buttonClass}
      initial={animate ? "initial" : undefined}
      animate={animate ? "animate" : undefined}
      whileHover={animate ? "hover" : undefined}
      whileTap={animate ? "tap" : undefined}
      variants={buttonVariants}
      {...(variant === 'hero' && animate ? { animate: floatAnimation } : {})}
      style={customStyles}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );

  // Render as link or button
  if (to) {
    return (
      <Link to={to} className="inline-block">
        <MotionButton>
          {buttonContent}
        </MotionButton>
      </Link>
    );
  }
  
  return (
    <MotionButton>
      {buttonContent}
    </MotionButton>
  );
};

/**
 * Hero section action button with enhanced animations
 */
export const HeroActionButton = ({ text = 'ODKRYJ PRZEPISY', to = '/przepisy', onClick, size = 'hero' }) => {
  // Use the standardized button dimensions
  const { padding, fontSize } = BUTTON_STYLES[size];

  return (
    <div className="inline-block">
      <motion.div
        className={`${padding} bg-green-600/80 backdrop-blur-sm rounded-full border border-white/50 cursor-pointer
                shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center relative`}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: 1,
          transition: {
            scale: { 
              repeat: Infinity, 
              duration: 1.5, 
              ease: "easeInOut",
              repeatType: "reverse" 
            },
            opacity: { duration: 0.3 }
          }
        }}
        whileHover={{ 
          backgroundColor: "rgba(22, 163, 74, 0.9)",
          scale: 1.08,
          transition: {
            duration: 0.2
          }
        }}
        whileTap={{ scale: 0.97 }}
        onClick={onClick}
      >
        {/* Pulse ring effect */}
        <motion.span 
          className="absolute inset-0 rounded-full border-2 border-green-400/40"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ 
            opacity: [0.7, 0, 0.7], 
            scale: [0.85, 1.2, 0.85],
            transition: { 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut"
            }
          }}
        />
        
        <motion.span 
          className={`font-['Patrick_Hand'] ${fontSize} text-white tracking-wider drop-shadow-md uppercase px-2 whitespace-nowrap`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.2 }}
        >
          {text}
        </motion.span>
      </motion.div>
    </div>
  );
};


export default Button; 