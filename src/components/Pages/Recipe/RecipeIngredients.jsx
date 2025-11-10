import React from 'react';
import { FaUtensils } from 'react-icons/fa';
import { processIngredients, replaceLinkPlaceholder } from '../../../utils/recipeUtils';

const RecipeIngredients = ({ ingredients, ingredientsRef }) => {
  const { groups, hasGroups, normalized } = processIngredients(ingredients);
  
  if (!normalized || normalized.length === 0) return null;

  return (
    <div 
      className="mb-8" 
      ref={ingredientsRef}
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4 font-['Playfair_Display'] flex items-center gap-2">
        <FaUtensils className="text-green-600" />
        Składniki
      </h2>
      
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
  );
};

export default RecipeIngredients;

