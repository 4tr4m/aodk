import React, { useMemo } from 'react';
import { replaceLinkPlaceholder } from '../../../utils/recipeUtils';

const RecipePreparation = ({ preparation }) => {
  // CRITICAL: Process steps ONCE using useMemo to prevent multiple processing on re-renders
  const processedSteps = useMemo(() => {
    if (!preparation) return [];
    
    // Filter out "Zdrowego", "smacznego" and everything after them from database (case-insensitive)
    const cleanPreparation = preparation
      .replace(/zdrowego.*$/gis, '')
      .replace(/smacznego.*$/gis, '')
      .trim();

    const lines = cleanPreparation
      .split(/\r?\n/)
      .map(l => l.trim())
      .filter(Boolean);
    
    const steps = [];
    let current = { title: null, items: [] };
    
    lines.forEach(l => {
      if (/^\d+\./.test(l) || l.endsWith(':')) {
        if (current.title || current.items.length) steps.push(current);
        current = { title: l.replace(/^\d+\.\s*/, '').replace(/:$/, ''), items: [] };
      } else {
        current.items.push(l);
      }
    });
    
    if (current.title || current.items.length) steps.push(current);
    
    // Process links in all items
    return steps.map(step => ({
      ...step,
      items: step.items.map(item => replaceLinkPlaceholder(item))
    }));
  }, [preparation]);
  
  if (!preparation || processedSteps.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4 font-['Playfair_Display']">
        Sposób przygotowania
      </h2>
      <div className="space-y-6">
        {processedSteps.map((s, idx) => (
          <div key={idx}>
            {s.title && (
              <h3 className="text-base font-semibold text-gray-700 mb-2">{s.title}</h3>
            )}
            {s.items.length > 0 && (
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                {s.items.map((processedHtml, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: processedHtml }} />
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      
      {/* Closing message - bold, no bullet point, one line under preparation */}
      <p className="mt-4 text-gray-700 font-bold text-base">
        Zdrowego! 🌱✨💚
      </p>
    </div>
  );
};

export default RecipePreparation;

