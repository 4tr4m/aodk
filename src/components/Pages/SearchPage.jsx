import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TopNavBar from '../Headers/TopNavBar';
import Footer from '../Footer/Footer';
import RecipeGrid from './RecipeGrid';
import SearchBar from '../UI/SearchBar';
import Spinner from '../UI/Spinner';
import searchService from '../../services/searchService';
import CategoryHeader from './CategoryHeader';
import CategoryNav from './CategoryNav';
import { kuchniaCategories } from '../../Data/category-data';
import { motion, AnimatePresence } from 'framer-motion';

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const suggestionsRef = useRef(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  // Get current category from URL
  useEffect(() => {
    const path = location.pathname.split('/').pop();
    setCurrentCategory(path === 'search' ? null : path);
  }, [location]);

  // Define performSearch BEFORE the useEffect that uses it
  const performSearch = useCallback(async (term) => {
    if (!term || term.trim() === '') return;
    
    setLoading(true);
    setErrorMessage('');
    
    try {
      const searchResults = await searchService.searchRecipes(term);
      setRecipes(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      setErrorMessage('Wystąpił błąd podczas wyszukiwania. Spróbuj ponownie.');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle category selection
  const handleCategoryClick = useCallback((categoryPath) => {
    const category = categoryPath.split('/').pop();
    setCurrentCategory(category === 'kuchnia' ? null : category);
    navigate(categoryPath);
  }, [navigate]);

  // THEN use it in the useEffect
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');
    
    if (query) {
      setSearchTerm(query);
      performSearch(query);
    }
  }, [location.search, performSearch]);

  // Handle search input and live suggestions with reduced debounce
  const handleSearchInput = useCallback(async (value) => {
    setSearchTerm(value);
    
    // Clear existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    if (value.length >= 2) {
      // Set a new, shorter timeout (150ms instead of default)
      const timeout = setTimeout(async () => {
        try {
          const results = await searchService.getSuggestions(value);
          setSuggestions(results);
        } catch (error) {
          console.error('Error getting suggestions:', error);
          setSuggestions([]);
        }
      }, 150); // Reduced from typical 300ms to 150ms for more responsiveness
      
      setSearchTimeout(timeout);
    } else {
      setSuggestions([]);
    }
  }, [searchTimeout]);

  // Handle selecting a suggestion
  const handleSuggestionSelect = useCallback((suggestion) => {
    setSearchTerm(suggestion.name);
    setSuggestions([]);
    performSearch(suggestion.name);
    
    // Update URL with the search query
    const searchParams = new URLSearchParams();
    searchParams.set('q', suggestion.name);
    navigate(`/search?${searchParams.toString()}`);
  }, [navigate, performSearch]);

  // Handle form submission
  const handleSearchSubmit = useCallback((term) => {
    performSearch(term);
    setSuggestions([]);
    
    // Update URL with the search query
    const searchParams = new URLSearchParams();
    searchParams.set('q', term);
    navigate(`/search?${searchParams.toString()}`);
  }, [navigate, performSearch]);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }
    }
  };

  const handleSuggestionClick = (suggestion, index) => {
    setSearchTerm(suggestion.name);
    setSuggestions([]);
    performSearch(suggestion.name);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(index);
  };

  const highlightMatch = (text, searchTerm) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<span class="font-bold">$1</span>');
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative mb-8">
        <CategoryHeader />
        <div className="absolute top-0 left-0 w-full">
          <TopNavBar />
        </div>
      </div>
      
      <motion.div 
        className="max-w-7xl mx-auto px-4 md:px-8 mb-12 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-[#2D3748] mb-4 font-bold tracking-wide">
          Wyszukiwarka Przepisów
        </h1>
        <p className="font-['Lato'] text-base md:text-lg lg:text-xl text-gray-600 text-center max-w-3xl mx-auto leading-relaxed">
          Znajdź przepisy według nazwy, składników lub kategorii
        </p>
      </motion.div>
      
      {/* Search Section */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <SearchBar
            placeholder="Wpisz nazwę przepisu, składnik lub kategorię..."
            onSearchSubmit={handleSearchSubmit}
            onSuggestionSelect={handleSuggestionSelect}
            suggestions={suggestions}
            minCharsForSuggestions={2}
            onChange={handleSearchInput}
            initialOpen={true}
            showCloseButton={false}
            highlightedTerm={searchTerm}
          />
        </div>

        {/* Category Navigation */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <CategoryNav
            categories={kuchniaCategories.mainCategories}
            currentSlug={currentCategory}
            onCategoryClick={handleCategoryClick}
          />
        </motion.div>

        {/* Suggestions dropdown */}
        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 top-full left-0 right-0 mt-2 w-full max-h-[60vh] overflow-y-auto rounded-lg shadow-lg bg-white border border-gray-200"
              ref={suggestionsRef}
            >
              <ul className="py-2 divide-y divide-gray-100">
                {suggestions.map((suggestion, index) => (
                  <li 
                    key={suggestion.id || index}
                    className={`px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors duration-200
                      ${selectedSuggestionIndex === index ? 'bg-gray-100' : ''}
                    `}
                    onClick={() => handleSuggestionClick(suggestion, index)}
                  >
                    <div className="font-medium text-gray-800 text-sm sm:text-base">
                      {highlightMatch(
                        typeof suggestion.name === 'string'
                          ? suggestion.name
                          : '',
                        searchTerm
                      )}
                    </div>
                    
                    {suggestion.ingredients && (
                      <div className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                        {highlightMatch(
                          Array.isArray(suggestion.ingredients) 
                            ? suggestion.ingredients.join(', ') 
                            : typeof suggestion.ingredients === 'string'
                              ? suggestion.ingredients
                              : '',
                          searchTerm
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Section */}
        <div className="mt-8 px-2 sm:px-4">
          {errorMessage && (
            <div className="text-red-600 text-center p-4 bg-red-50 rounded-md shadow mb-6">
              {errorMessage}
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center my-12">
              <Spinner size="lg" color="green" />
            </div>
          ) : recipes.length > 0 ? (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-green-700">
                Wyniki wyszukiwania dla: <span className="font-bold">"{searchTerm}"</span>
                {currentCategory && <span className="ml-2 text-gray-600">w kategorii: {currentCategory}</span>}
              </h2>
              <RecipeGrid recipes={recipes} />
            </div>
          ) : searchTerm ? (
            <div className="text-center my-12">
              <h2 className="text-xl font-semibold mb-2">Brak wyników dla "{searchTerm}"</h2>
              <p className="text-gray-600">
                Spróbuj innego wyrażenia lub sprawdź pisownię.
              </p>
            </div>
          ) : (
            <div className="text-center my-12">
              <h2 className="text-xl font-semibold mb-2">Wpisz szukaną frazę</h2>
              <p className="text-gray-600">
                Możesz wyszukiwać po nazwie przepisu, składnikach lub kategorii.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SearchPage; 