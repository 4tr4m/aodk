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
      {/* Fixed button on mobile when scrolled past ingredients section - icon only, compact */}
      {isMobile && onMobileButtonClick && isMobileButtonVisible && (
        <button
          onClick={onMobileButtonClick}
          className="fixed top-20 right-4 z-[45] flex items-center justify-center bg-green-600 hover:bg-green-700 active:bg-green-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
          style={{
            transform: 'translateZ(0)',
            willChange: 'transform',
            width: '48px',
            height: '48px',
            minWidth: '48px',
            minHeight: '48px',
            padding: '0',
            marginRight: '0',
            marginLeft: 'auto',
            position: 'fixed',
            top: '80px',
            right: '16px',
            zIndex: 45,
          }}
          aria-label="Pokaż składniki"
          title="Składniki"
        >
          <FaUtensils className="w-5 h-5" />
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
          
          {/* Mobile button - inline with heading (hidden when fixed button is visible) */}
          {/* On mobile: icon only, on larger screens: icon + text */}
          {isMobile && onMobileButtonClick && !isMobileButtonVisible && (
            <button
              onClick={onMobileButtonClick}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-base font-semibold flex-shrink-0"
              style={{
                paddingLeft: 'calc(0.75rem - 5px)',
                paddingRight: 'calc(0.75rem - 5px)',
              }}
              aria-label="Pokaż składniki"
            >
              <FaUtensils className="w-4 h-4 flex-shrink-0" />
              <span className="text-base">Składniki</span>
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

