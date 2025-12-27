import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShareAlt, FaCheck } from 'react-icons/fa';

const ShareButton = ({ 
  title, 
  text, 
  url, 
  className = '',
  variant = 'default' // 'default', 'floating', 'inline', 'icon-only'
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = url || window.location.href;
    const shareTitle = title || document.title;
    const shareText = text || '';

    // Use Web Share API if available (mobile devices)
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (err) {
        // User cancelled or error occurred, fallback to copy
        if (err.name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    }

    // Fallback: Copy to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Error copying to clipboard:', err);
      // Last resort: show URL in alert
      alert(`Skopiuj link: ${shareUrl}`);
    }
  };

  // Floating variant - fixed position button with text
  if (variant === 'floating') {
    return (
      <motion.button
        onClick={handleShare}
        className={`fixed bottom-20 right-4 sm:right-6 z-50 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white rounded-full shadow-lg hover:shadow-xl p-4 sm:p-5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-300 ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Udostępnij tę stronę"
        title="Udostępnij"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          {copied ? (
            <>
              <FaCheck className="text-xl sm:text-2xl" />
              <span className="text-sm sm:text-base font-medium hidden sm:inline">Skopiowano!</span>
            </>
          ) : (
            <>
              <FaShareAlt className="text-xl sm:text-2xl" />
              <span className="text-sm sm:text-base font-medium hidden sm:inline">Udostępnij</span>
            </>
          )}
        </div>
      </motion.button>
    );
  }

  // Inline variant - button with text
  if (variant === 'inline') {
    return (
      <motion.button
        onClick={handleShare}
        className={`flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-green-300 ${className}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Udostępnij tę stronę"
      >
        {copied ? (
          <>
            <FaCheck className="text-base" />
            <span>Skopiowano!</span>
          </>
        ) : (
          <>
            <FaShareAlt className="text-base" />
            <span>Udostępnij</span>
          </>
        )}
      </motion.button>
    );
  }

  // Icon-only variant - just icon button (for tight spaces)
  if (variant === 'icon-only') {
    return (
      <motion.button
        onClick={handleShare}
        className={`relative flex items-center justify-center p-2.5 sm:p-3 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-300 ${className}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Udostępnij tę stronę"
        title="Udostępnij"
      >
        {copied ? (
          <FaCheck className="text-lg sm:text-xl" />
        ) : (
          <FaShareAlt className="text-lg sm:text-xl" />
        )}
        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg z-10 pointer-events-none"
            >
              Skopiowano link!
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    );
  }

  // Default variant - button with icon and text (more accessible)
  return (
    <motion.button
      onClick={handleShare}
      className={`relative flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-300 ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label="Udostępnij tę stronę"
      title="Udostępnij"
    >
      {copied ? (
        <>
          <FaCheck className="text-base sm:text-lg" />
          <span className="text-sm sm:text-base">Skopiowano!</span>
        </>
      ) : (
        <>
          <FaShareAlt className="text-base sm:text-lg" />
          <span className="text-sm sm:text-base">Udostępnij</span>
        </>
      )}
    </motion.button>
  );
};

export default ShareButton;

