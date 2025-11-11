import React from 'react';
import { FaLeaf, FaHeart } from 'react-icons/fa';
import { replaceLinkPlaceholder } from '../../../utils/recipeUtils';

const RecipePreparation = ({ preparation }) => {
  if (!preparation) return null;

  // Filter out "Zdrowego" and everything after it from database (case-insensitive)
  // This removes everything from "Zdrowego" onwards, including any special characters, emojis, etc.
  const cleanPreparation = preparation.replace(/zdrowego.*$/gis, '').trim();

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
      
      {/* Hardcoded Zdrowego sign with nice UX/UI */}
      <div className="mt-8">
        <div className="flex flex-col items-center justify-center py-6 px-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap justify-center">
            <FaLeaf className="text-green-600 text-xl sm:text-2xl animate-pulse" />
            <span className="text-green-500 text-lg sm:text-xl">✨</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 font-['Playfair_Display']">
              Zdrowego!
            </h3>
            <span className="text-green-500 text-lg sm:text-xl">✨</span>
            <FaHeart className="text-red-400 text-xl sm:text-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          <p className="text-sm sm:text-base text-gray-600 mt-2 text-center">
            Smacznego i zdrowego gotowania! 🌱
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipePreparation;

