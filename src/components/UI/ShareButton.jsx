import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaShareAlt } from 'react-icons/fa';

const ShareButton = ({ 
  title, 
  text, 
  url, 
  className = '',
  variant = 'default' // 'default', 'floating', 'inline'
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
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error copying to clipboard:', err);
      // Last resort: show URL in alert
      alert(`Skopiuj link: ${shareUrl}`);
    }
  };

  // Floating variant - fixed position button
  if (variant === 'floating') {
    return (
      <motion.button
        onClick={handleShare}
        className={`fixed bottom-20 right-4 sm:right-6 z-50 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg p-4 sm:p-5 transition-all duration-200 ${className}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Udostępnij"
        title="Udostępnij"
      >
        <FaShareAlt className="text-xl sm:text-2xl" />
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap"
          >
            Skopiowano!
          </motion.div>
        )}
      </motion.button>
    );
  }

  // Inline variant - button with text
  if (variant === 'inline') {
    return (
      <motion.button
        onClick={handleShare}
        className={`flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-200 ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Udostępnij"
      >
        <FaShareAlt />
        <span>{copied ? 'Skopiowano!' : 'Udostępnij'}</span>
      </motion.button>
    );
  }

  // Default variant - icon button
  return (
    <motion.button
      onClick={handleShare}
      className={`flex items-center justify-center p-2 sm:p-3 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Udostępnij"
      title="Udostępnij"
    >
      <FaShareAlt className="text-lg sm:text-xl" />
      {copied && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
        >
          Skopiowano!
        </motion.span>
      )}
    </motion.button>
  );
};

export default ShareButton;

