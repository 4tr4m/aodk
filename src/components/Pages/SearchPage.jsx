import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CategoryNav from './CategoryNav';
import Footer from '../Footer/Footer';
import RecipeGrid from './RecipeGrid';
import searchService from '../../services/searchService';
import { motion } from 'framer-motion';
import { FaSearch, FaArrowLeft } from 'react-icons/fa';
import SearchBar from '../UI/SearchBar';

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  
  // Extract search query from URL
  useEffect(() => {
    const query = new URLSearchParams(location.search).get('q');
    if (query) {
      setSearchTerm(query);
      performSearch(query);
    } else {
      setLoading(false);
    }
  }, [location.search]);

  // Perform search
  const performSearch = async (term) => {
    if (!term || term.length < 2) {
      setRecipes([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const results = await searchService.searchRecipes(term, 50); // Get up to 50 results
      setRecipes(results);
    } catch (error) {
      console.error("Error searching recipes:", error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle search input changes for live suggestions
  const handleSearchInput = async (term) => {
    setSearchTerm(term);
    
    if (term.length < 3) {
      setSuggestions([]);
      return;
    }
    
    try {
      const results = await searchService.searchRecipes(term, 10);
      setSuggestions(searchService.formatSuggestions(results));
    } catch (error) {
      console.error("Error getting search suggestions:", error);
      setSuggestions([]);
    }
  };

  // Handle selecting a suggestion
  const handleSuggestionSelect = (suggestion) => {
    setSearchTerm(suggestion.name);
    setSuggestions([]);
    performSearch(suggestion.name);
    navigate(`/search?q=${encodeURIComponent(suggestion.name)}`, { replace: true });
  };

  // Handle search form submission
  const handleSearchSubmit = (term) => {
    if (term.trim()) {
      performSearch(term);
      navigate(`/search?q=${encodeURIComponent(term)}`, { replace: true });
      setSuggestions([]);
    }
  };

  // Go back to previous page
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <CategoryNav />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-10">
            <div className="flex items-center mb-6">
              <button 
                onClick={handleGoBack}
                className="mr-4 text-gray-600 hover:text-gray-800 transition-colors duration-300"
                aria-label="Go back"
              >
                <FaArrowLeft className="text-2xl" />
              </button>
              <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl text-gray-800 font-semibold">
                Wyszukiwarka Przepisów
              </h1>
            </div>
            
            <div className="relative max-w-3xl mx-auto mb-8">
              <SearchBar 
                placeholder="Wyszukaj przepisy..."
                initialOpen={true}
                onChange={handleSearchInput}
                onSearchSubmit={handleSearchSubmit}
                suggestions={suggestions}
                onSuggestionSelect={handleSuggestionSelect}
                highlightedTerm={searchTerm}
              />
            </div>
            
            {searchTerm && (
              <div className="text-center mb-6">
                <p className="text-lg text-gray-600 font-['Lato']">
                  Wyniki wyszukiwania dla: <span className="font-semibold text-green-700">{searchTerm}</span>
                </p>
              </div>
            )}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mb-4"></div>
              <p className="text-gray-600 text-lg">Wyszukiwanie przepisów...</p>
            </div>
          ) : recipes.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6 text-center">
                <p className="text-gray-600">
                  Znaleziono przepisów: <strong>{recipes.length}</strong>
                </p>
              </div>
              <RecipeGrid recipes={recipes} />
            </motion.div>
          ) : searchTerm ? (
            <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
              <FaSearch className="mx-auto text-5xl text-gray-400 mb-4" />
              <p className="text-xl text-gray-600 mb-2">Nie znaleziono przepisów dla zapytania</p>
              <p className="text-gray-500">
                Spróbuj wyszukać używając innych słów kluczowych lub przeglądnij kategorie przepisów.
              </p>
            </div>
          ) : (
            <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
              <FaSearch className="mx-auto text-5xl text-gray-400 mb-4" />
              <p className="text-xl text-gray-600 mb-2">
                Wpisz nazwę przepisu, kategorię lub składnik
              </p>
              <p className="text-gray-500">
                Przykłady: "czekoladowy", "ciasto", "orzechy", "obiad"
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchPage; 