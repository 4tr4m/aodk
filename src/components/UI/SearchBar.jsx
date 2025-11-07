/**
 * SearchBar Component - Search Input with Suggestions
 * 
 * A reusable search input component that displays an animated search bar with
 * live suggestions dropdown, keyboard navigation, and form submission handling.
 * 
 * USAGE LOCATIONS:
 *   - src/components/Pages/Search/SearchPage.jsx (main search page)
 *   - src/components/Section/CategoryBanner.jsx (homepage search)
 *   - src/components/Pages/Category/CategoryPage.jsx (category page search)
 * 
 * FEATURES:
 *   - Animated expand/collapse with smooth transitions
 *   - Live suggestions dropdown with keyboard navigation (Arrow keys, Enter, Escape)
 *   - Click outside to close suggestions
 *   - Controlled by parent component (can be opened/closed externally)
 *   - Accessible with proper ARIA labels
 *   - Responsive design for mobile and desktop
 *   - Icon indicators for recipe vs ingredient suggestions
 * 
 * DATA FLOW:
 *   1. User types → handleInputChange → calls onChange(value) → parent fetches suggestions
 *   2. Parent passes suggestions as prop → SearchBar displays dropdown
 *   3. User selects/clicks → handleSuggestionClick → calls onSuggestionSelect(suggestion)
 *   4. User submits form → handleSubmit → calls onSearchSubmit(searchTerm)
 * 
 * RELATED COMPONENTS:
 *   - SearchPage: Main search page that uses SearchBar
 *   - CategoryBanner: Homepage banner with search functionality
 *   - CategoryPage: Category page with search integration
 *   - searchService: Service that provides getSuggestions() and searchRecipes()
 *   - RecipeGrid: Displays search results (used in SearchPage)
 *   - Spinner: Loading indicator (used in SearchPage)
 * 
 * PROPS:
 *   @param {string} placeholder - Placeholder text for input (default: "Search...")
 *   @param {Function} onSearchSubmit - Callback when form is submitted (Enter key or button click)
 *   @param {Function} onClose - Callback when search is closed
 *   @param {boolean} initialOpen - Whether search bar should be open initially (default: false)
 *   @param {Array} suggestions - Array of suggestion objects to display in dropdown
 *   @param {Function} onSuggestionSelect - Callback when a suggestion is clicked/selected
 *   @param {string} highlightedTerm - Term to highlight in suggestions (currently not used in rendering)
 *   @param {number} minCharsForSuggestions - Minimum characters before showing suggestions (default: 2)
 *   @param {Function} onChange - Callback for every input change (for live suggestions)
 *   @param {boolean} showCloseButton - Whether to show close button (default: true)
 *   @param {string} tooltipText - Tooltip text (currently not used)
 * 
 * SUGGESTION OBJECT FORMAT:
 *   {
 *     id: string | number,
 *     name: string,              // Display name
 *     shortdesc?: string,         // Optional description
 *     ingredients?: string,       // Comma-separated ingredients
 *     type?: 'recipe' | 'ingredient',
 *     original?: object          // Full recipe object
 *   }
 */

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
  // Internal state management
  const [isOpen, setIsOpen] = useState(initialOpen);              // Whether search bar is open/visible
  const [searchTerm, setSearchTerm] = useState('');              // Current input value
  const [showSuggestions, setShowSuggestions] = useState(false); // Whether to show suggestions dropdown
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1); // Keyboard navigation index
  const inputRef = useRef(null);                                  // Reference to input element
  const suggestionsRef = useRef(null);                            // Reference to suggestions dropdown

  // Sync internal state with external initialOpen prop
  // This allows parent component to control search bar visibility
  useEffect(() => {
    setIsOpen(initialOpen);
    if (initialOpen && inputRef.current) {
      // Focus the input when opened externally
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [initialOpen]);

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

  /**
   * Handle input change - called on every keystroke
   * Updates internal state and notifies parent via onChange callback
   * Parent is responsible for fetching suggestions and passing them back as prop
   */
  const handleInputChange = useCallback((event) => {
    if (!isOpen) return;
    const value = event.target.value;
    setSearchTerm(value);
    
    // Notify parent component of input change (parent will fetch suggestions)
    if (onChange) {
      onChange(value);
    }
    
    // Only show suggestions if we have suggestions available and min chars met
    // Note: suggestions are fetched by parent, not here
    const shouldShow = value.length >= minCharsForSuggestions && suggestions.length > 0;
    setShowSuggestions(shouldShow);
    if (!shouldShow) {
      setSelectedSuggestionIndex(-1);
    }
  }, [suggestions.length, minCharsForSuggestions, onChange, isOpen]);

  /**
   * Handle suggestion click/selection
   * If onSuggestionSelect is provided, calls it (parent handles search)
   * Otherwise, sets search term and calls onSearchSubmit directly
   */
  const handleSuggestionClick = useCallback((suggestion, index) => {
    if (!suggestion || !suggestion.name) return;
    
    if (onSuggestionSelect) {
      // Parent component handles the search (e.g., SearchPage)
      onSuggestionSelect(suggestion);
    } else {
      // Fallback: handle search directly if no callback provided
      setSearchTerm(suggestion.name);
      setShowSuggestions(false);
      setSelectedSuggestionIndex(index);
      if (onSearchSubmit) {
        onSearchSubmit(suggestion.name);
      }
    }
  }, [onSuggestionSelect, onSearchSubmit]);

  /**
   * Handle form submission (Enter key or submit button)
   * If a suggestion is selected via keyboard, uses that
   * Otherwise, submits the current search term
   */
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    if (!isOpen) return;
    
    // If user navigated to a suggestion with keyboard, use that
    if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < suggestions.length) {
      handleSuggestionClick(suggestions[selectedSuggestionIndex], selectedSuggestionIndex);
      return;
    }
    
    // Otherwise, submit the current search term
    if (onSearchSubmit && searchTerm.trim()) {
      onSearchSubmit(searchTerm);
      setShowSuggestions(false);
    }
  }, [onSearchSubmit, searchTerm, selectedSuggestionIndex, suggestions, handleSuggestionClick, isOpen]);

  /**
   * Handle keyboard navigation in suggestions dropdown
   * ArrowDown/ArrowUp: Navigate through suggestions
   * Escape: Close suggestions dropdown
   * Enter: Handled by handleSubmit
   */
  const handleKeyDown = useCallback((e) => {
    if (!showSuggestions) return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        // Move to next suggestion, or stay at last one
        setSelectedSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        // Move to previous suggestion, or deselect if at first
        setSelectedSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : -1
        );
        break;
      case 'Escape':
        e.preventDefault();
        // Close suggestions dropdown
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
      case 'Enter':
        // Handled by handleSubmit
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

  /**
   * Escape key handler - only handles suggestions dropdown
   * When suggestions are shown, Escape closes them
   * Otherwise, parent component (e.g., CategoryBanner) handles closing the search bar
   * Uses stopPropagation to prevent parent from handling Escape when suggestions are open
   */
  useEffect(() => {
    if (!isOpen) return;
    
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && showSuggestions) {
        event.stopPropagation(); // Prevent parent from handling this
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, showSuggestions]);

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

      {/* Suggestions Dropdown - Animated with Framer Motion */}
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
                    {/* Icon indicator: recipe (utensils) or ingredient (list) */}
                    <div className="mt-1">
                      {suggestion.type === 'recipe' ? (
                        <FaUtensils className="text-green-600" />
                      ) : (
                        <FaList className="text-blue-600" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Suggestion name */}
                      <div className="font-medium text-gray-800 text-sm sm:text-base">
                        {suggestion.name}
                      </div>

                      {/* Optional description */}
                      {suggestion.shortdesc && (
                        <div className="mt-1 text-xs text-gray-600 line-clamp-2">
                          {suggestion.shortdesc}
                        </div>
                      )}

                      {/* Ingredients as tags */}
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