import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchBar = memo(function SearchBar({ placeholder = "Search...", onSearchSubmit, onClose, initialOpen = true }) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  // Create closeSearch with useCallback to ensure stable reference
  const closeSearch = useCallback(() => {
    setIsOpen(false);
    setSearchTerm(''); // Clear search on close
    
    // Call the onClose handler immediately
    if (onClose) {
      onClose(); // Notify parent component
    }
  }, [onClose]);

  const handleInputChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault(); // Prevent page reload on form submit
    if (onSearchSubmit && searchTerm.trim()) {
      onSearchSubmit(searchTerm);
    }
  }, [onSearchSubmit, searchTerm]);

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

  // Handle ESC key press to close search
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        closeSearch();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, closeSearch]);

  return (
    <form
        onSubmit={handleSubmit}
        className="relative flex items-center justify-center w-full"
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
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;