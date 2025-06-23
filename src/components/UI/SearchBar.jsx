import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { FaSearch, FaTimes, FaUtensils, FaList } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = memo(function SearchBar({ 
  placeholder = "Search...", 
  onSearchSubmit, 
  onClose, 
  initialOpen = false,
  suggestions = [],
  onSuggestionSelect,
  highlightedTerm = '',
  minCharsForSuggestions = 2,
  onChange,
  showCloseButton = true,
  tooltipText = ""
}) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const closeSearch = useCallback(() => {
    setIsOpen(false);
    setSearchTerm('');
    setShowSuggestions(false);
    
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  const handleSearchOpen = useCallback((e) => {
    if (e) e.preventDefault();
    setIsOpen(true);
    setShowSuggestions(false);
  }, []);

  const handleInputChange = useCallback((event) => {
    if (!isOpen) return;
    const value = event.target.value;
    setSearchTerm(value);
    
    if (onChange) {
      onChange(value);
    }
    
    setShowSuggestions(value.length >= minCharsForSuggestions && suggestions.length > 0);
    setSelectedSuggestionIndex(-1);
  }, [suggestions, minCharsForSuggestions, onChange, isOpen]);

  const handleSuggestionClick = useCallback((suggestion, index) => {
    if (!suggestion || !suggestion.name) return;
    
    if (onSuggestionSelect) {
      onSuggestionSelect(suggestion);
    } else {
      setSearchTerm(suggestion.name);
      setShowSuggestions(false);
      setSelectedSuggestionIndex(index);
      if (onSearchSubmit) {
        onSearchSubmit(suggestion.name);
      }
    }
  }, [onSuggestionSelect, onSearchSubmit]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    if (!isOpen) return;
    
    if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < suggestions.length) {
      handleSuggestionClick(suggestions[selectedSuggestionIndex], selectedSuggestionIndex);
      return;
    }
    
    if (onSearchSubmit && searchTerm.trim()) {
      onSearchSubmit(searchTerm);
      setShowSuggestions(false);
    }
  }, [onSearchSubmit, searchTerm, selectedSuggestionIndex, suggestions, handleSuggestionClick, isOpen]);

  const handleKeyDown = useCallback((e) => {
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
        break;
      default:
        break;
    }
  }, [showSuggestions, suggestions.length]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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
            transition-all duration-[800ms] ease-in-out
            ${isOpen
              ? 'w-full max-w-full opacity-100 px-10 sm:px-12'
              : 'w-0 opacity-0 p-0 pointer-events-none'
            }
          `}
          aria-label="Search input"
          tabIndex={isOpen ? 0 : -1}
          readOnly={!isOpen}
        />

        <div className="relative">
          <button
            type="button"
            onClick={handleSearchOpen}
            aria-label="Open search"
            className={`
              absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 transform cursor-pointer text-xl sm:text-2xl text-green-600
              hover:text-green-700 hover:scale-110 transition-all duration-[800ms] ease-in-out
              opacity-100 translate-x-0
            `}
          >
            <FaSearch />
          </button>
        </div>

        {showCloseButton !== false && (
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
        )}
      </form>

      <AnimatePresence>
        {showSuggestions && suggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 top-full w-full mx-auto left-0 right-0 mt-2 max-h-[60vh] overflow-y-auto rounded-lg shadow-lg bg-white border border-gray-200"
            ref={suggestionsRef}
          >
            <ul className="py-2 divide-y divide-gray-100">
              {suggestions.filter(s => s && s.name).map((suggestion, index) => (
                <li 
                  key={suggestion.id || index}
                  className={`px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors duration-200
                    ${selectedSuggestionIndex === index ? 'bg-gray-100' : ''}
                  `}
                  onClick={() => handleSuggestionClick(suggestion, index)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {suggestion.type === 'recipe' ? (
                        <FaUtensils className="text-green-600" />
                      ) : (
                        <FaList className="text-blue-600" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-800 text-sm sm:text-base">
                        {suggestion.name}
                      </div>

                      {suggestion.shortdesc && (
                        <div className="mt-1 text-xs text-gray-600 line-clamp-2">
                          {suggestion.shortdesc}
                        </div>
                      )}

                      {suggestion.ingredients && (
                        <div className="mt-1 flex flex-wrap gap-1 justify-center">
                          {suggestion.ingredients.split(',').map((ingredient, i) => (
                            <span 
                              key={i}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800"
                            >
                              {ingredient.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
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