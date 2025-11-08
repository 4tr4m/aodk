import React from 'react';
import { replaceLinkPlaceholder } from '../../../utils/recipeUtils';

const RecipePreparation = ({ preparation }) => {
  if (!preparation) return null;

  const lines = preparation
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

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4 font-['Playfair_Display']">
        Sposób przygotowania
      </h2>
      <div className="space-y-6">
        {steps.map((s, idx) => (
          <div key={idx}>
            {s.title && (
              <h3 className="text-base font-semibold text-gray-700 mb-2">{s.title}</h3>
            )}
            {s.items.length > 0 && (
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                {s.items.map((it, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: replaceLinkPlaceholder(it) }} />
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipePreparation;

