import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = memo(function SearchBar({ 
  placeholder = "Search...", 
  onSearchSubmit, 
  onClose, 
  initialOpen = true,
  suggestions = [],
  onSuggestionSelect,
  highlightedTerm = '',
  minCharsForSuggestions = 3
}) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Create closeSearch with useCallback to ensure stable reference
  const closeSearch = useCallback(() => {
    setIsOpen(false);
    setSearchTerm(''); // Clear search on close
    setShowSuggestions(false);
    
    // Call the onClose handler immediately
    if (onClose) {
      onClose(); // Notify parent component
    }
  }, [onClose]);

  const handleInputChange = useCallback((event) => {
    const value = event.target.value;
    setSearchTerm(value);
    
    // Show suggestions only if we have more than minimum characters
    setShowSuggestions(value.length >= minCharsForSuggestions && suggestions.length > 0);
    setSelectedSuggestionIndex(-1); // Reset selection when typing
  }, [suggestions, minCharsForSuggestions]);

  const handleSuggestionClick = useCallback((suggestion) => {
    if (onSuggestionSelect) {
      onSuggestionSelect(suggestion);
    } else {
      setSearchTerm(suggestion.name);
      setShowSuggestions(false);
      // Submit the search
      if (onSearchSubmit) {
        onSearchSubmit(suggestion.name);
      }
    }
  }, [onSuggestionSelect, onSearchSubmit]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault(); // Prevent page reload on form submit
    
    // If a suggestion is selected, use that
    if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < suggestions.length) {
      handleSuggestionClick(suggestions[selectedSuggestionIndex]);
      return;
    }
    
    // Otherwise submit the current search term
    if (onSearchSubmit && searchTerm.trim()) {
      onSearchSubmit(searchTerm);
      setShowSuggestions(false);
    }
  }, [onSearchSubmit, searchTerm, selectedSuggestionIndex, suggestions, handleSuggestionClick]);

  // Handle keyboard navigation for suggestions
  const handleKeyDown = useCallback((e) => {
    // Only process if suggestions are showing
    if (!showSuggestions) return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : -1
        );
        break;
      case 'Escape':
        e.preventDefault();
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
      case 'Enter':
        // Let the form submit handler deal with this
        break;
      default:
        break;
    }
  }, [showSuggestions, suggestions.length]);

  // Focus input when search opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Timeout helps ensure the element is fully visible after transition
      const timer = setTimeout(() => {
        inputRef.current.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Scroll selected suggestion into view
  useEffect(() => {
    if (selectedSuggestionIndex >= 0 && suggestionsRef.current) {
      const selectedElement = suggestionsRef.current.children[selectedSuggestionIndex];
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }
  }, [selectedSuggestionIndex]);

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle ESC key press to close search
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        if (showSuggestions) {
          setShowSuggestions(false);
        } else if (isOpen) {
          closeSearch();
        }
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, closeSearch, showSuggestions]);

  // Helper function to highlight the matching text
  const highlightMatch = (text, term) => {
    if (!term || typeof text !== 'string') return text;
    
    const lowerText = text.toLowerCase();
    const lowerTerm = term.toLowerCase();
    
    if (!lowerText.includes(lowerTerm)) return text;
    
    const parts = text.split(new RegExp(`(${term})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === lowerTerm ? 
        <span key={index} className="bg-green-100 text-green-800 font-medium">{part}</span> : 
        part
    );
  };

  return (
    <div className="relative w-full">
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center justify-center w-full"
        onKeyDown={handleKeyDown}
      >
        <input
          ref={inputRef}
          type="text"
          id="searchbar-input"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`
            h-12 sm:h-14 border-0 border-b-2 border-green-600 bg-transparent
            text-gray-700 placeholder-gray-500 outline-none focus:ring-0
            text-center text-xl sm:text-2xl font-['Lato'] tracking-wide
            transition-all duration-[1000ms] ease-in-out
            ${isOpen
              ? 'w-full max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl opacity-100 px-10 sm:px-12'
              : 'w-0 opacity-0 p-0 pointer-events-none'
            }
          `}
          aria-label="Search input"
        />

        {/* Search Icon (Submit button) */}
        <button
          type="submit"
          aria-label="Submit search"
          className={`
            absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 transform cursor-pointer text-xl sm:text-2xl text-green-600
            hover:text-green-700 hover:scale-110 transition-all duration-[800ms] ease-in-out
            ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'}
          `}
        >
          <FaSearch />
        </button>

        {/* Close Icon */}
        <button
          type="button"
          onClick={closeSearch}
          aria-label="Close search"
          className={`
            absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 transform cursor-pointer text-xl sm:text-2xl text-gray-600
            hover:text-gray-800 hover:scale-110 transition-all duration-[800ms] ease-in-out
            ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 pointer-events-none'}
          `}
        >
          <FaTimes />
        </button>
      </form>

      {/* Suggestions dropdown */}
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 mt-2 w-full max-w-3xl sm:max-w-4xl md:max-w-5xl max-h-[60vh] overflow-y-auto rounded-lg shadow-lg bg-white border border-gray-200 left-1/2 transform -translate-x-1/2"
            ref={suggestionsRef}
          >
            <ul className="py-2 divide-y divide-gray-100">
              {suggestions.map((suggestion, index) => (
                <li 
                  key={suggestion.id || index}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors duration-200
                    ${selectedSuggestionIndex === index ? 'bg-gray-100' : ''}
                  `}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div className="font-medium text-gray-800">
                    {highlightMatch(suggestion.name, highlightedTerm || searchTerm)}
                  </div>
                  
                  {suggestion.category && (
                    <div className="text-sm text-gray-500">
                      Kategoria: {highlightMatch(suggestion.category, highlightedTerm || searchTerm)}
                    </div>
                  )}
                  
                  {suggestion.ingredients && (
                    <div className="text-sm text-gray-500 line-clamp-1">
                      Składniki: {highlightMatch(suggestion.ingredients.join(', '), highlightedTerm || searchTerm)}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;