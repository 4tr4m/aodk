import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { replaceLinkPlaceholder } from '../../../utils/recipeUtils';

const RecipeFullDescription = ({ fulldesc, isExpanded, onToggle }) => {
  // Helper function to get preview text with fade calculation
  const getPreviewText = (htmlText) => {
    if (!htmlText || !htmlText.trim()) return { preview: '', fadeStart: 0, hasMore: false };
    
    // Extract plain text for length calculation
    const tempDiv = typeof document !== 'undefined' ? document.createElement('div') : null;
    if (tempDiv) {
      tempDiv.innerHTML = htmlText;
    }
    const cleanText = tempDiv ? (tempDiv.textContent || tempDiv.innerText || '') : htmlText.replace(/<[^>]*>/g, '');
    
    // Estimate characters per line (roughly 50-60 chars for mobile, 70-80 for desktop)
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const charsPerLine = isMobile ? 50 : 70;
    
    // Calculate preview length - add more words (increase to ~75-80% of line)
    const previewLength = Math.floor(charsPerLine * 0.78);
    
    if (cleanText.length <= previewLength) {
      return { preview: htmlText, fadeStart: 0, hasMore: false };
    }
    
    // Find the last space before the preview length to avoid cutting words
    const lastSpaceBeforeCutoff = cleanText.lastIndexOf(' ', previewLength);
    const textCutoff = lastSpaceBeforeCutoff > 0 ? lastSpaceBeforeCutoff : previewLength;
    
    // Get preview text (plain text for preview)
    const previewText = cleanText.substring(0, textCutoff).trim();
    
    // Find last four words for fade effect (3-4 words greying out)
    const words = previewText.split(/\s+/).filter(w => w.length > 0);
    if (words.length < 4) {
      // If less than 4 words, fade from an earlier position
      if (words.length < 2) {
        return { preview: previewText, fadeStart: previewText.length, hasMore: true };
      }
      // If 2-3 words, fade from the first word or second word
      if (words.length === 2) {
        const firstWordEnd = previewText.indexOf(' ');
        return { preview: previewText, fadeStart: firstWordEnd >= 0 ? firstWordEnd + 1 : 0, hasMore: true };
      }
      // If 3 words, fade from the first word
      const firstSpaceIndex = previewText.indexOf(' ');
      const secondSpaceIndex = previewText.indexOf(' ', firstSpaceIndex + 1);
      return { preview: previewText, fadeStart: secondSpaceIndex >= 0 ? secondSpaceIndex + 1 : firstSpaceIndex + 1, hasMore: true };
    }
    
    // Find the start position of the last four words
    // Get the index of the space before the fourth-to-last word
    const previewLastSpaceIndex = previewText.lastIndexOf(' ');
    if (previewLastSpaceIndex < 0) {
      return { preview: previewText, fadeStart: 0, hasMore: true };
    }
    
    // Find the space before the second-to-last word
    const secondLastSpaceIndex = previewText.lastIndexOf(' ', previewLastSpaceIndex - 1);
    if (secondLastSpaceIndex < 0) {
      return { preview: previewText, fadeStart: previewLastSpaceIndex + 1, hasMore: true };
    }
    
    // Find the space before the third-to-last word
    const thirdLastSpaceIndex = previewText.lastIndexOf(' ', secondLastSpaceIndex - 1);
    if (thirdLastSpaceIndex < 0) {
      return { preview: previewText, fadeStart: secondLastSpaceIndex + 1, hasMore: true };
    }
    
    // Find the space before the fourth-to-last word (start of fade area for 4 words)
    const fourthLastSpaceIndex = previewText.lastIndexOf(' ', thirdLastSpaceIndex - 1);
    // Start fading from the fourth-to-last word to create a larger, more visible fade area
    const fadeStart = fourthLastSpaceIndex >= 0 ? fourthLastSpaceIndex + 1 : thirdLastSpaceIndex + 1;
    
    return { preview: previewText, fadeStart, hasMore: true };
  };

  // Hook must be called before any early returns
  const { preview, fadeStart, hasMore } = useMemo(() => getPreviewText(fulldesc || ''), [fulldesc]);
  
  // Split preview into parts for fade effect
  const getFadeParts = (text, fadeStartIndex) => {
    if (fadeStartIndex === 0 || fadeStartIndex >= text.length) {
      return { visible: text, fade: '' };
    }
    return {
      visible: text.substring(0, fadeStartIndex),
      fade: text.substring(fadeStartIndex)
    };
  };
  
  const { visible, fade } = useMemo(() => getFadeParts(preview, fadeStart), [preview, fadeStart]);

  if (!fulldesc || !fulldesc.trim()) return null;

  return (
    <motion.div 
      className="mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <motion.div
        className="bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 shadow-sm hover:shadow transition-all duration-300 cursor-pointer"
        onClick={onToggle}
        whileHover={{ scale: 1.002 }}
        whileTap={{ scale: 0.998 }}
      >
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="px-3 py-2 sm:px-4 sm:py-2.5"
            >
              <div className="flex items-center gap-2">
                <div className="flex-1 relative overflow-hidden">
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base relative">
                    <span>{visible}</span>
                    {fade && (
                      <span className="inline-block fade-gradient">
                        {fade.split('').map((char, idx) => {
                          // Better fade effect - more visible and smoother
                          // Use a cubic ease-in-out curve for a more natural fade
                          const progress = idx / fade.length;
                          // Start with full opacity and fade more gradually
                          // Use cubic curve for smoother, more visible transition
                          // Make the fade start earlier and be more pronounced
                          const easedProgress = progress < 0.5 
                            ? 2 * progress * progress 
                            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                          const opacity = Math.max(0.08, 1 - (easedProgress * 0.92));
                          return (
                            <span
                              key={idx}
                              style={{
                                opacity: opacity,
                                color: `rgba(55, 65, 81, ${opacity})`,
                                transition: 'opacity 0.1s ease-out'
                              }}
                            >
                              {char === ' ' ? '\u00A0' : char}
                            </span>
                          );
                        })}
                      </span>
                    )}
                    {hasMore && (
                      <span className="text-green-600 font-medium ml-1 hover:text-green-700 transition-colors inline-block">
                        czytaj więcej
                      </span>
                    )}
                  </p>
                </div>
                {hasMore && (
                  <motion.div
                    className="flex-shrink-0 flex items-center"
                    animate={{ y: [0, 2, 0] }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <FaChevronDown className="w-3.5 h-3.5 text-green-600" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <motion.div
                className="px-3 py-2.5 sm:px-4 sm:py-3"
                initial={{ maxHeight: 0, opacity: 0 }}
                animate={{ 
                  maxHeight: 5000,
                  opacity: 1 
                }}
                exit={{ 
                  maxHeight: 0, 
                  opacity: 0 
                }}
                transition={{ 
                  maxHeight: {
                    duration: 0.4,
                    ease: [0.04, 0.62, 0.23, 0.98]
                  },
                  opacity: {
                    duration: 0.25,
                    delay: 0.08
                  }
                }}
              >
                <div className="prose max-w-none mb-2.5">
                  <p 
                    className="text-gray-700 leading-relaxed text-sm sm:text-base whitespace-pre-wrap break-words"
                    dangerouslySetInnerHTML={{ __html: replaceLinkPlaceholder(fulldesc) }}
                  />
                </div>
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-200">
                  <span className="text-green-600 font-medium text-sm hover:text-green-700 transition-colors">
                    Zwiń
                  </span>
                  <motion.div
                    className="flex items-center"
                    animate={{ y: [0, -2, 0] }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <FaChevronUp className="w-3.5 h-3.5 text-green-600" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {!isExpanded && (
        <div className="sr-only">
          <p dangerouslySetInnerHTML={{ __html: replaceLinkPlaceholder(fulldesc) }} />
        </div>
      )}
    </motion.div>
  );
};

export default RecipeFullDescription;

