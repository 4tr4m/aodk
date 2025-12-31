import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from '../../UI/SearchBar';
import CategorySearchIcon from './CategorySearchIcon';
import CategoryFilterButton from './CategoryFilterButton';
import ShareButton from '../../UI/ShareButton';
import { formatCategoryName } from '../../../utils/categoryUtils';

const CategoryPageHeader = ({
  currentCategory,
  isSearching,
  isScrolled,
  toggleSearch,
  handleSearchClose,
  handleSearchInput,
  handleSearchSubmit,
  suggestions,
  searchTerm,
  handleSuggestionSelect,
  toggleIngredientFilter,
  selectedIngredientsCount,
  activeFilter,
  isIngredientFilterVisible,
  fadeIn,
}) => {
  return (
    <div className="sticky top-0 z-30 bg-gray-100 mb-6 md:mb-8" style={{ overflow: 'visible', paddingTop: '1rem', paddingBottom: '1rem' }}>
      <motion.div 
        className="max-w-7xl mx-auto px-4 md:px-8 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        style={{ overflow: 'visible' }}
      >
        {/* Header with H1 and Search */}
        <div id="category-title" className="flex flex-col items-center justify-center relative" style={{ overflow: 'visible' }}>
          {/* Fixed container for filter button, title/search, and magnifying glass */}
          <motion.div 
            className="relative w-full flex items-center gap-3 sm:gap-3 md:gap-4 lg:gap-6 px-2 sm:px-3 md:px-4"
            style={{ overflow: 'visible', zIndex: 40, paddingTop: '0.5rem', paddingBottom: '0.5rem', display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: '0.75rem' }}
            animate={{
              paddingTop: isScrolled ? '0.25rem' : '0.5rem',
              paddingBottom: isScrolled ? '0.25rem' : '0.5rem',
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Enhanced Magical Ingredient Filter Button */}
            <div className="flex-shrink-0" style={{ gridColumn: '1' }}>
              <CategoryFilterButton
                onClick={toggleIngredientFilter}
                selectedIngredientsCount={selectedIngredientsCount}
                activeFilter={activeFilter}
                isFilterVisible={isIngredientFilterVisible}
              />
            </div>

            {/* Title and SearchBar with transitions - centered layout using grid column */}
            <div className="flex items-center justify-center min-w-0 px-1 sm:px-2" style={{ gridColumn: '2', justifySelf: 'center', width: '100%' }}>
              <AnimatePresence mode="wait">
                {!isSearching ? (
                  <motion.div
                    key="category-title"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ 
                      opacity: isScrolled ? 0 : 1, 
                      y: 0,
                      height: isScrolled ? 0 : 'auto',
                      marginTop: isScrolled ? 0 : undefined,
                      marginBottom: isScrolled ? 0 : undefined,
                    }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6"
                    style={{ overflow: 'visible', width: '100%', justifyContent: 'center' }}
                  >
                    {/* Centered title */}
                    <motion.div
                      className="relative group cursor-pointer flex-shrink-0"
                      onClick={toggleSearch}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      title="Kliknij, aby wyszukać przepisy"
                    >
                      {/* Subtle background effect on hover */}
                      <motion.div 
                        className="absolute inset-0 -m-2 rounded-lg bg-green-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      />
                      
                      <h1 className="relative font-['Playfair_Display'] text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-[#2D3748] font-bold tracking-wide text-center break-words group-hover:text-green-600 transition-colors duration-300 px-1 sm:px-3">
                        {/* Mobile: Split multi-word titles into two lines */}
                        <span className="block sm:hidden">
                          {(() => {
                            const title = currentCategory ? formatCategoryName(currentCategory.label) : 'Wszystkie Przepisy';
                            const words = title.split(' ');
                            if (words.length > 1) {
                              return (
                                <>
                                  {words[0]}
                                  <br />
                                  {words.slice(1).join(' ')}
                                </>
                              );
                            }
                            return title;
                          })()}
                        </span>
                        {/* Desktop: Single line */}
                        <span className="hidden sm:block">
                          {currentCategory ? formatCategoryName(currentCategory.label) : 'Wszystkie Przepisy'}
                        </span>
                      </h1>
                    </motion.div>
                    
                    {/* Search icon - with proper spacing to prevent clipping */}
                    <motion.div 
                      className="flex-shrink-0 ml-1 sm:ml-2"
                      style={{ overflow: 'visible', zIndex: 50, position: 'relative' }}
                      animate={{
                        opacity: isScrolled ? 0 : 1,
                        scale: isScrolled ? 0.8 : 1,
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <CategorySearchIcon toggleSearch={toggleSearch} />
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="search-bar"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full flex items-center justify-center"
                    style={{ gridColumn: '2', width: '100%' }}
                  >
                    {/* Search bar - always visible when open */}
                    <div className="flex-1 w-full max-w-full">
                      <SearchBar 
                        placeholder="Szukaj przepisów..." 
                        onSearchSubmit={handleSearchSubmit}
                        onClose={handleSearchClose}
                        onChange={handleSearchInput}
                        initialOpen={isSearching}
                        suggestions={suggestions}
                        onSuggestionSelect={handleSuggestionSelect}
                        highlightedTerm={searchTerm}
                        minCharsForSuggestions={3}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Share button - icon-only on mobile, full button on larger screens */}
            <div style={{ gridColumn: '3' }} className="flex items-center justify-end flex-shrink-0">
              <div className="hidden sm:block">
                <ShareButton
                  title={currentCategory ? formatCategoryName(currentCategory.label) : 'Wszystkie Przepisy'}
                  text={currentCategory?.description || 'Przepisy bez glutenu, nabiału i cukru'}
                  url={typeof window !== 'undefined' ? window.location.href : undefined}
                />
              </div>
              <div className="block sm:hidden">
                <ShareButton
                  variant="icon-only"
                  title={currentCategory ? formatCategoryName(currentCategory.label) : 'Wszystkie Przepisy'}
                  text={currentCategory?.description || 'Przepisy bez glutenu, nabiału i cukru'}
                  url={typeof window !== 'undefined' ? window.location.href : undefined}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CategoryPageHeader;

