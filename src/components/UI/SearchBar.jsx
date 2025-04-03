import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

function SearchBar({ placeholder = "Search...", onSearchSubmit, onClose, initialOpen = true }) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null); // Ref to focus input when opened

  const openSearch = () => {
    setIsOpen(true);
  };

  const closeSearch = () => {
    setIsOpen(false);
    setSearchTerm(''); // Clear search on close
    
    // Make sure to call the onClose handler after a tiny delay to ensure state updates
    setTimeout(() => {
      if (onClose) {
        onClose(); // Notify parent component
      }
    }, 50);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
      event.preventDefault(); // Prevent page reload on form submit
      console.log("Search Submitted:", searchTerm);
      if (onSearchSubmit) {
          onSearchSubmit(searchTerm);
      }
      // Optionally close search after submitting:
      // closeSearch();
  }

  // Focus input when search opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Timeout helps ensure the element is fully visible after transition
      const timer = setTimeout(() => {
        inputRef.current.focus();
      }, 100); // Reduced timing for smoother experience
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    // Use form for better semantics and handling Enter key
    <form
        onSubmit={handleSubmit}
        // Adjusted layout classes to work better in banner
        className="relative flex items-center justify-center w-full"
    >
      {/* Search Input */}
      {/* Always rendered but width/opacity controlled by state + transitions */}
      <input
        ref={inputRef}
        type="text"
        id="searchbar-input"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder={placeholder}
        // Enhanced styles for better integration in banner
        className={`
          h-12 sm:h-14 border-0 border-b-2 border-green-600 bg-transparent
          text-gray-700 placeholder-gray-500 outline-none focus:ring-0
          text-center text-xl sm:text-2xl font-['Lato'] tracking-wide
          transition-all duration-300 ease-in-out
          ${isOpen
            ? 'w-full max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl opacity-100 px-10 sm:px-12' // Wider with extra 200px
            : 'w-0 opacity-0 p-0 pointer-events-none'  // Closed state: Zero width, hidden
          }
        `}
        aria-label="Search input"
      />

      {/* Search Icon (Submit button) - Right side of input when open */}
      <button
        type="submit"
        aria-label="Submit search"
        className={`
          absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 transform cursor-pointer text-xl sm:text-2xl text-green-600
          hover:text-green-700 hover:scale-110 transition-all duration-300 ease-in-out
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      >
        <FaSearch />
      </button>

      {/* Close Icon - Left side of input when open */}
      <button
        type="button"
        onClick={closeSearch}
        aria-label="Close search"
        className={`
          absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 transform cursor-pointer text-xl sm:text-2xl text-gray-600
          hover:text-gray-800 hover:scale-110 transition-all duration-300 ease-in-out
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      >
        <FaTimes />
      </button>
    </form>
  );
}

export default SearchBar;