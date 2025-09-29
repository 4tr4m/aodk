import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiX, FiSearch } from 'react-icons/fi';
import recipeService from '../../services/recipeService';

const IngredientFilter = ({ onRecipesFiltered, onClose, isVisible, selectedIngredient: initialSelectedIngredient, position = "right", excludeNames = [], compact = false, onClear }) => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const suppressAutoSearchRef = React.useRef(false);

  // Apply search for currently selected ingredients and close filter
  const handleApplySearch = useCallback(async () => {
    try {
      setIsFiltering(true);
      if (selectedIngredients.length === 0) {
        setFilteredRecipes([]);
        onRecipesFiltered([], null);
        if (typeof onClose === 'function') onClose();
        return;
      }

      if (selectedIngredients.length === 1) {
        const name = selectedIngredients[0].name;
        const recipes = await recipeService.getRecipesByIngredient(name);
        setFilteredRecipes(recipes);
        onRecipesFiltered(recipes, name);
        if (typeof onClose === 'function') onClose();
        return;
      }

      // Multiple ingredients → intersection of recipe ids
      const allRecipes = await Promise.all(
        selectedIngredients.map(ing => recipeService.getRecipesByIngredient(ing.name))
      );
      const base = allRecipes[0] || [];
      const baseIds = new Set(base.map(r => r.id));
      const common = base.filter(r =>
        Array.isArray(allRecipes) && allRecipes.every(list => Array.isArray(list) && list.some(x => x.id === r.id))
      );
      setFilteredRecipes(common);
      onRecipesFiltered(common, selectedIngredients.map(i => i.name).join(', '));
      if (typeof onClose === 'function') onClose();
    } catch (err) {
      console.error('Error applying ingredient filter:', err);
    } finally {
      setIsFiltering(false);
    }
  }, [selectedIngredients, onRecipesFiltered, onClose]);

  // Set selected ingredient when passed as prop (run only when the value changes meaningfully)
  useEffect(() => {
    if (!initialSelectedIngredient) return;
    setSelectedIngredient(prev => {
      if (!prev || prev.name?.toLowerCase() !== initialSelectedIngredient.name?.toLowerCase()) {
        return initialSelectedIngredient;
      }
      return prev;
    });
  }, [initialSelectedIngredient]);

  // Load ingredients on component mount
  useEffect(() => {
    const loadIngredients = async () => {
      try {
        setLoading(true);
        const data = await recipeService.getAllIngredients();
        setIngredients(data);
      } catch (error) {
        console.error('Error loading ingredients:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isVisible) {
      loadIngredients();
    }
  }, [isVisible]);

  // Filter ingredients based on search term and exclusions
  const excludedSet = new Set(excludeNames.map(n => n?.toLowerCase().trim()).filter(Boolean));
  const filteredIngredients = ingredients
    .filter(ing => !excludedSet.has(ing.name?.toLowerCase().trim()))
    .filter(ingredient => ingredient.name?.toLowerCase().includes(searchTerm.toLowerCase()));

  // Handle ingredient click and fetch recipes
  const handleIngredientClick = useCallback(async (ingredient) => {
    try {
      setIsFiltering(true);
      
      // Validate ingredient object
      if (!ingredient || !ingredient.ingredient_id || !ingredient.name) {
        console.error('Invalid ingredient object:', ingredient);
        return;
      }
      
      // Toggle ingredient selection
      const isSelected = selectedIngredients.some(sel => sel.ingredient_id === ingredient.ingredient_id);
      let newSelectedIngredients;
      
      if (isSelected) {
        // Remove ingredient
        newSelectedIngredients = selectedIngredients.filter(sel => sel.ingredient_id !== ingredient.ingredient_id);
      } else {
        // Add ingredient
        newSelectedIngredients = [...selectedIngredients, ingredient];
      }
      
      setSelectedIngredients(newSelectedIngredients);
      setSelectedIngredient(ingredient); // Keep for backward compatibility
      
      if (newSelectedIngredients.length === 0) {
        // No ingredients selected, clear filter
        setFilteredRecipes([]);
        onRecipesFiltered([], null);
      } else if (newSelectedIngredients.length === 1) {
        // Single ingredient, use existing logic
        try {
          const recipes = await recipeService.getRecipesByIngredient(ingredient.name);
          setFilteredRecipes(recipes);
          onRecipesFiltered(recipes, ingredient.name);
        } catch (error) {
          console.error('Error fetching recipes for single ingredient:', error);
          setFilteredRecipes([]);
          onRecipesFiltered([], ingredient.name);
        }
      } else {
        // Multiple ingredients, find recipes that contain ALL selected ingredients
        const allRecipes = await Promise.all(
          newSelectedIngredients.map(ing => recipeService.getRecipesByIngredient(ing.name))
        );
        
        // Check if we have any recipes from the first ingredient
        if (allRecipes.length === 0 || !allRecipes[0] || allRecipes[0].length === 0) {
          setFilteredRecipes([]);
          onRecipesFiltered([], newSelectedIngredients.map(i => i.name).join(', '));
          return;
        }
        
        // Find recipes that appear in ALL ingredient results
        const recipeIds = allRecipes[0].map(recipe => recipe.id);
        const commonRecipes = recipeIds.filter(recipeId => 
          allRecipes.every(recipes => recipes && recipes.length > 0 && recipes.some(recipe => recipe.id === recipeId))
        );
        
        const finalRecipes = allRecipes[0].filter(recipe => commonRecipes.includes(recipe.id));
        setFilteredRecipes(finalRecipes);
        onRecipesFiltered(finalRecipes, newSelectedIngredients.map(i => i.name).join(', '));
      }
    } catch (error) {
      console.error('Error filtering recipes by ingredient:', error);
      setFilteredRecipes([]);
    } finally {
      setIsFiltering(false);
    }
  }, [onRecipesFiltered, selectedIngredients]);

  // Auto-search when selected ingredient changes and ingredients are loaded (guard against loops)
  const hasAutoSearchedRef = React.useRef(false);
  useEffect(() => {
    if (suppressAutoSearchRef.current) return;
    if (!initialSelectedIngredient || ingredients.length === 0) return;
    if (hasAutoSearchedRef.current && selectedIngredient && selectedIngredient.name?.toLowerCase() === initialSelectedIngredient.name?.toLowerCase()) {
      return;
    }
    hasAutoSearchedRef.current = true;

    const foundIngredient = ingredients.find(ing => 
      ing.name?.toLowerCase() === initialSelectedIngredient.name?.toLowerCase()
    );

    if (foundIngredient) {
      handleIngredientClick(foundIngredient);
    } else {
      handleIngredientClick(initialSelectedIngredient);
    }
  }, [ingredients, initialSelectedIngredient, handleIngredientClick, selectedIngredient]);

  // Clear filter
  const clearFilter = () => {
    suppressAutoSearchRef.current = true; // prevent re-triggering auto-search from URL param
    setSelectedIngredient(null);
    setSelectedIngredients([]);
    setFilteredRecipes([]);
    setSearchTerm('');
    onRecipesFiltered(null, null);
    if (typeof onClear === 'function') onClear();
  };

  // Animation variants
  const containerVariants = {
    hidden: { 
      opacity: 0, 
      x: position === "left" ? '-100%' : '100%' 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      x: position === "left" ? '-100%' : '100%',
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed inset-y-0 w-full ${compact ? 'sm:w-64' : 'sm:w-80'} bg-white shadow-2xl z-50 overflow-hidden flex flex-col ${
          position === "left" ? "left-0" : "right-0"
        }`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FiFilter className="text-lg sm:text-xl" />
              <h2 className="text-base sm:text-lg font-semibold">Filtruj po składnikach</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-1 hover:bg-white/20 rounded-full transition-colors touch-manipulation"
            >
              <FiX className="text-lg sm:text-xl" />
            </button>
          </div>
        </div>

        {/* Mobile Instructions */}
        <div className="sm:hidden p-3 bg-blue-50 border-b border-blue-200">
          <div className="flex items-start gap-2">
            <div className="flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
              <span className="text-white text-xs font-bold">i</span>
            </div>
            <p className="text-xs text-blue-800">
              <strong>Dotknij składnik</strong> aby znaleźć przepisy z tym składnikiem. Możesz wybrać kilka składników!
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-3 sm:p-4 border-b border-gray-200">
          <div className="relative">
            <FiSearch className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
            <input
              type="text"
              placeholder="Szukaj składników..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 sm:pl-10 pr-4 py-2 sm:py-1.5 text-sm sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Selected Ingredient Info */}
        {selectedIngredient && (
          <motion.div
            className="p-3 sm:p-4 bg-green-50 border-b border-green-200"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-green-800 text-sm sm:text-base">
                  {selectedIngredients.length > 1 
                    ? `Wybrane składniki (${selectedIngredients.length}): ${selectedIngredients.map(i => i.name).join(', ')}`
                    : `Wybrany składnik: ${selectedIngredients[0]?.name || selectedIngredient?.name}`
                  }
                </h3>
                <p className="text-xs sm:text-sm text-green-600">
                  Znaleziono {filteredRecipes.length} przepisów
                </p>
              </div>
              <button
                onClick={clearFilter}
                className="px-2 sm:px-3 py-1 bg-green-600 text-white text-xs sm:text-sm rounded-lg hover:bg-green-700 transition-colors touch-manipulation flex-shrink-0 ml-2"
              >
                Wyczyść
              </button>
            </div>
          </motion.div>
        )}

        {/* Ingredients List */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-green-600"></div>
            </div>
          ) : (
            <motion.div
              className="space-y-1.5 sm:space-y-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredIngredients.length === 0 ? (
                <p className="text-center text-gray-500 py-8 text-sm sm:text-base">
                  {searchTerm ? 'Nie znaleziono składników' : 'Brak składników'}
                </p>
              ) : (
                filteredIngredients.map((ingredient, index) => (
                  <motion.button
                    key={ingredient.ingredient_id}
                    onClick={() => handleIngredientClick(ingredient)}
                    disabled={isFiltering}
                    className={`w-full p-2 sm:p-2 text-left rounded-lg border transition-all duration-200 touch-manipulation ${
                      selectedIngredients.some(sel => sel.ingredient_id === ingredient.ingredient_id) ||
                      (selectedIngredient?.ingredient_id === ingredient.ingredient_id) || 
                      (selectedIngredient?.name === ingredient.name)
                        ? 'bg-green-100 border-green-300 text-green-800 shadow-sm'
                        : 'bg-white border-gray-200 hover:border-green-300 hover:bg-green-50 active:bg-green-100'
                    } ${isFiltering ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.05 }}
                    whileHover={!isFiltering ? { scale: 1.01 } : {}}
                    whileTap={!isFiltering ? { scale: 0.99 } : {}}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-xs sm:text-sm truncate pr-2">{ingredient.name}</span>
                      <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
                        <span className="text-[10px] sm:text-xs text-gray-500">
                          {ingredient.recipe_count}
                        </span>
                        {selectedIngredients.some(sel => sel.ingredient_id === ingredient.ingredient_id) && (
                          <span className="text-green-600 text-sm sm:text-base">✓</span>
                        )}
                        {isFiltering && selectedIngredients.some(sel => sel.ingredient_id === ingredient.ingredient_id) && (
                          <div className="animate-spin rounded-full h-3 w-3 sm:h-3 sm:w-3 border-b-2 border-green-600"></div>
                        )}
                      </div>
                    </div>
                    {ingredient.description && (
                      <p className="text-[10px] sm:text-xs text-gray-600 mt-1">{ingredient.description}</p>
                    )}
                  </motion.button>
                ))
              )}
            </motion.div>
          )}
        </div>

        {/* Footer (desktop) */}
        <div className="hidden sm:block p-3 sm:p-4 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-500 text-center">
            {selectedIngredients.length > 1 ? (
              <span>Znajdź przepisy zawierające <strong>wszystkie</strong> wybrane składniki</span>
            ) : selectedIngredients.length === 1 ? (
              <span>Znajdź przepisy zawierające <strong>{selectedIngredients[0].name}</strong></span>
            ) : (
              <span>Kliknij na składnik, aby zobaczyć przepisy</span>
            )}
          </p>
        </div>

        {/* Sticky action (mobile) */}
        <div className="sm:hidden sticky bottom-0 bg-white border-t border-gray-200 p-3">
          <button
            onClick={handleApplySearch}
            disabled={selectedIngredients.length === 0 || isFiltering}
            className={`w-full py-2.5 rounded-lg text-white text-sm font-semibold transition-colors ${
              selectedIngredients.length === 0 || isFiltering
                ? 'bg-green-300 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isFiltering ? 'Wyszukiwanie...' : `Wyszukaj (${selectedIngredients.length || 0})`}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default IngredientFilter;
