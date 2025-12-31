import React from 'react';
import { FaUtensils } from 'react-icons/fa';
import { processIngredients, replaceLinkPlaceholder } from '../../../utils/recipeUtils';

const RecipeIngredients = ({ ingredients, ingredientsRef, onMobileButtonClick, isMobileButtonVisible }) => {
  const { groups, hasGroups, normalized } = processIngredients(ingredients);
  
  if (!normalized || normalized.length === 0) return null;

  // Check if mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  return (
    <>
      {/* Fixed button on mobile when scrolled past ingredients section - follows scroll */}
      {isMobile && onMobileButtonClick && isMobileButtonVisible && (
        <button
          onClick={onMobileButtonClick}
          className="fixed top-20 right-4 z-40 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-sm font-semibold"
          style={{
            transform: 'translateZ(0)',
            willChange: 'transform',
          }}
          aria-label="Pokaż składniki"
        >
          <FaUtensils className="w-4 h-4" />
          <span>Składniki</span>
        </button>
      )}
      
      <div 
        className="mb-8" 
        ref={ingredientsRef}
      >
        <div className="flex items-center justify-between gap-3 mb-4">
          <h2 className="text-xl font-bold text-gray-800 font-['Playfair_Display'] flex items-center gap-2">
            <FaUtensils className="text-green-600" />
            Składniki
          </h2>
          
          {/* Mobile button - inline with heading when ingredients section is still visible */}
          {isMobile && onMobileButtonClick && !isMobileButtonVisible && (
            <button
              onClick={onMobileButtonClick}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm font-semibold flex-shrink-0"
              aria-label="Pokaż składniki"
            >
              <FaUtensils className="w-4 h-4" />
              <span>Składniki</span>
            </button>
          )}
        </div>
      
      {hasGroups ? (
        <div className="space-y-6">
          {groups.map((group, groupIdx) => (
            <div key={groupIdx} className="bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl p-4 sm:p-5 border border-gray-200">
              {group.title && (
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 font-['Playfair_Display'] pb-2 border-b border-gray-300">
                  {group.title}
                </h3>
              )}
              <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-gray-800">
                {group.items.map((ing, i) => (
                  <li key={i} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: replaceLinkPlaceholder(ing) }} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <ul className="list-disc pl-6 space-y-1 text-gray-800">
          {normalized.map((ing, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: replaceLinkPlaceholder(ing) }} />
          ))}
        </ul>
      )}
      </div>
    </>
  );
};

export default RecipeIngredients;

