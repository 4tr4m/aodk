/**
 * SearchPage Component - Main Search Results Page
 * 
 * The main search page that displays search results for recipes. Users can search
 * by recipe name, ingredients, or category. The page integrates SearchBar component
 * for input and displays results using RecipeGrid.
 * 
 * USAGE LOCATIONS:
 *   - Route: /search?q=query (handled by App.jsx routing)
 *   - Navigated to from: CategoryBanner, CategoryPage, Footer links, etc.
 * 
 * FEATURES:
 *   - Live search suggestions as user types (debounced 150ms)
 *   - Full search results display with RecipeGrid
 *   - URL query parameter support (?q=term)
 *   - Category navigation integration
 *   - Loading states with Spinner component
 *   - Error handling and empty states
 *   - Smooth animations with Framer Motion
 * 
 * DATA FLOW:
 *   1. User types in SearchBar → handleSearchInput → searchService.getSuggestions()
 *   2. Suggestions passed to SearchBar → displayed in dropdown
 *   3. User submits/selects → handleSearchSubmit/handleSuggestionSelect
 *   4. performSearch() → searchService.searchRecipes() → setRecipes()
 *   5. RecipeGrid displays results
 * 
 * RELATED COMPONENTS:
 *   - SearchBar: Input component with suggestions dropdown
 *   - RecipeGrid: Displays search results as a grid
 *   - Spinner: Loading indicator during search
 *   - CategoryNav: Category navigation bar
 *   - CategoryHeader: Page header with logo
 *   - TopNavBar: Top navigation bar
 *   - Footer: Site footer
 * 
 * RELATED SERVICES:
 *   - searchService: Provides getSuggestions() and searchRecipes() methods
 *     - getSuggestions(term): Returns top 5 matching suggestions
 *     - searchRecipes(term): Returns all matching recipes with scoring
 * 
 * STATE MANAGEMENT:
 *   - searchTerm: Current search query
 *   - recipes: Array of recipe objects from search results
 *   - loading: Boolean indicating if search is in progress
 *   - suggestions: Array of suggestion objects for dropdown
 *   - errorMessage: Error message if search fails
 *   - currentCategory: Current category filter (if any)
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TopNavBar from '../../Headers/TopNavBar';
import Footer from '../../Footer/Footer';
import RecipeGrid from '../Recipe/RecipeGrid';
import SearchBar from '../../UI/SearchBar';
import Spinner from '../../UI/Spinner';
import searchService from '../../../services/searchService';
import CategoryHeader from '../Category/CategoryHeader';
import CategoryNav from '../Category/CategoryNav';
import { kuchniaCategories } from '../../../Data/category-data';
import { motion, AnimatePresence } from 'framer-motion';
import IngredientFilter from '../../UI/IngredientFilter';

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
  
  // Ingredient filter states
  const [isIngredientFilterVisible, setIsIngredientFilterVisible] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  // Get current category from URL path
  useEffect(() => {
    const path = location.pathname.split('/').pop();
    setCurrentCategory(path === 'search' ? null : path);
  }, [location]);

  /**
   * Perform full search for recipes
   * Called when user submits search or selects a suggestion
   * Uses searchService.searchRecipes() to get all matching recipes
   * 
   * @param {string} term - Search query term
   */
  const performSearch = useCallback(async (term) => {
    if (!term || term.trim() === '') return;
    
    setLoading(true);
    setErrorMessage('');
    
    try {
      const searchResults = await searchService.searchRecipes(term);
      setRecipes(searchResults);
      // Clear ingredient filter when performing text search
      setFilteredRecipes(null);
      setActiveFilter(null);
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

  /**
   * Initialize search from URL query parameter
   * If page is loaded with ?q=term, automatically perform search
   * This allows direct links to search results and browser back/forward
   */
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');
    
    if (query) {
      setSearchTerm(query);
      performSearch(query);
    }
  }, [location.search, performSearch]);

  /**
   * Handle search input changes - fetches live suggestions
   * Called on every keystroke via SearchBar's onChange callback
   * Uses debounce (150ms) to reduce API calls
   * Fetches suggestions using searchService.getSuggestions()
   * 
   * @param {string} value - Current input value
   */
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

  /**
   * Handle suggestion selection from dropdown
   * Called when user clicks a suggestion in SearchBar
   * Performs full search and updates URL
   * 
   * @param {Object} suggestion - Selected suggestion object with name, id, etc.
   */
  const handleSuggestionSelect = useCallback((suggestion) => {
    setSearchTerm(suggestion.name);
    setSuggestions([]);
    performSearch(suggestion.name);
    
    // Update URL with the search query (allows sharing/bookmarking)
    const searchParams = new URLSearchParams();
    searchParams.set('q', suggestion.name);
    navigate(`/search?${searchParams.toString()}`);
  }, [navigate, performSearch]);

  /**
   * Handle form submission (Enter key or submit button)
   * Called from SearchBar when user submits the form
   * Performs full search and updates URL
   * 
   * @param {string} term - Search query term
   */
  const handleSearchSubmit = useCallback((term) => {
    performSearch(term);
    setSuggestions([]);
    
    // Update URL with the search query (allows sharing/bookmarking)
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

  // Ingredient filter handlers
  const handleIngredientFilterClose = useCallback(() => {
    setIsIngredientFilterVisible(false);
    setFilteredRecipes(null);
    setActiveFilter(null);
    setSelectedIngredient(null);
  }, []);

  const toggleIngredientFilter = useCallback(() => {
    setIsIngredientFilterVisible(prev => !prev);
    if (isIngredientFilterVisible) {
      handleIngredientFilterClose();
    }
  }, [isIngredientFilterVisible, handleIngredientFilterClose]);

  const handleRecipesFiltered = useCallback((filteredRecipesList, ingredientName) => {
    if (filteredRecipesList && ingredientName) {
      setFilteredRecipes(filteredRecipesList);
      setActiveFilter(ingredientName);
      // Clear text search results when filtering by ingredient
      setRecipes([]);
      setSearchTerm('');
    } else {
      setFilteredRecipes(null);
      setActiveFilter(null);
    }
  }, []);

  // Get recipes to display (either filtered by ingredient or text search results)
  const getDisplayRecipes = () => {
    if (filteredRecipes) {
      return filteredRecipes;
    }
    return recipes;
  };

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
        <div className="mb-8 flex flex-col sm:flex-row items-center gap-4">
          {/* Filter Button */}
          <motion.button
            onClick={toggleIngredientFilter}
            className="select-none px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 z-20 flex items-center gap-2 group border-2 flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-blue-400/30"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Filtruj składniki"
          >
            <svg 
              className="w-4 h-4 sm:w-5 sm:h-5 text-white transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <span className="text-sm sm:text-base font-bold">Filtruj składniki</span>
          </motion.button>
          
          <div className="flex-1 w-full">
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

        {/* Active filter info */}
        {activeFilter && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <span className="text-green-800 font-medium text-sm sm:text-base">
                  Filtrowanie po składniku: {activeFilter}
                </span>
                <span className="text-green-600 text-xs sm:text-sm">
                  ({filteredRecipes?.length || 0} przepisów)
                </span>
              </div>
              <button
                onClick={handleIngredientFilterClose}
                className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
              >
                Wyczyść filtr
              </button>
            </div>
          </motion.div>
        )}

        {/* Results Section - Conditionally renders based on state */}
        <div className="mt-8 px-2 sm:px-4">
          {/* Error message display */}
          {errorMessage && (
            <div className="text-red-600 text-center p-4 bg-red-50 rounded-md shadow mb-6">
              {errorMessage}
            </div>
          )}
          
          {/* Conditional rendering based on loading and results state */}
          {loading ? (
            // Loading state: Show spinner
            <div className="flex justify-center my-12">
              <Spinner size="lg" color="green" />
            </div>
          ) : getDisplayRecipes().length > 0 ? (
            // Results found: Display RecipeGrid with results
            <div>
              <div className="mb-6 text-center">
                {activeFilter ? (
                  <>
                    <h2 className="text-xl font-semibold mb-2 text-green-700">
                      Filtrowanie po składniku: <span className="font-bold">"{activeFilter}"</span>
                    </h2>
                    <p className="text-lg text-gray-600">
                      Znalezione przepisy: <strong className="text-green-700">{getDisplayRecipes().length}</strong>
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold mb-2 text-green-700">
                      Wyniki wyszukiwania dla: <span className="font-bold">"{searchTerm}"</span>
                      {currentCategory && <span className="ml-2 text-gray-600">w kategorii: {currentCategory}</span>}
                    </h2>
                    <p className="text-lg text-gray-600">
                      Znalezione przepisy: <strong className="text-green-700">{getDisplayRecipes().length}</strong>
                    </p>
                  </>
                )}
              </div>
              {/* RecipeGrid component displays recipes in a responsive grid */}
              <RecipeGrid recipes={getDisplayRecipes()} />
            </div>
          ) : (activeFilter || searchTerm) ? (
            // No results: Show empty state message
            <div className="text-center my-12">
              <h2 className="text-xl font-semibold mb-2">
                {activeFilter 
                  ? `Brak wyników dla składnika "${activeFilter}"`
                  : `Brak wyników dla "${searchTerm}"`
                }
              </h2>
              <p className="text-gray-600">
                {activeFilter 
                  ? "Spróbuj wybrać inny składnik lub wyczyść filtr."
                  : "Spróbuj innego wyrażenia lub sprawdź pisownię."
                }
              </p>
            </div>
          ) : (
            // Initial state: Prompt user to search
            <div className="text-center my-12">
              <h2 className="text-xl font-semibold mb-2">Wpisz szukaną frazę</h2>
              <p className="text-gray-600">
                Możesz wyszukiwać po nazwie przepisu, składnikach lub kategorii.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Ingredient Filter Sidebar */}
      <IngredientFilter
        isVisible={isIngredientFilterVisible}
        onClose={handleIngredientFilterClose}
        onRecipesFiltered={handleRecipesFiltered}
        selectedIngredient={selectedIngredient}
        position="right"
        compact={false}
        onClear={handleIngredientFilterClose}
        navigateToSearch={false}
      />

      <Footer />
    </div>
  );
};

export default SearchPage; 