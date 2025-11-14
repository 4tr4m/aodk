import React from 'react';
import { FaLeaf, FaHeart } from 'react-icons/fa';
import { replaceLinkPlaceholder } from '../../../utils/recipeUtils';

const RecipePreparation = ({ preparation }) => {
  if (!preparation) return null;

  // Filter out "Zdrowego", "smacznego" and everything after them from database (case-insensitive)
  // This removes everything from "Zdrowego" or "smacznego" onwards, including any special characters, emojis, etc.
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
      
      {/* Hardcoded Zdrowego sign with distinct UX/UI - different from newsletter CTA */}
      <div className="mt-8">
        <div className="flex flex-col items-center justify-center py-8 px-6 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-2xl border-2 border-amber-200 shadow-lg relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200 rounded-full opacity-20 blur-3xl -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-200 rounded-full opacity-15 blur-3xl -ml-20 -mb-20"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 flex-wrap justify-center">
              <FaLeaf className="text-amber-600 text-2xl sm:text-3xl animate-pulse" />
              <span className="text-amber-500 text-xl sm:text-2xl">✨</span>
              <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-amber-700 via-orange-600 to-amber-700 bg-clip-text text-transparent font-['Playfair_Display']">
                Zdrowego!
              </h3>
              <span className="text-amber-500 text-xl sm:text-2xl">✨</span>
              <FaHeart className="text-rose-500 text-2xl sm:text-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
            <p className="text-base sm:text-lg text-amber-800 mt-1 text-center font-medium">
              Smacznego i zdrowego gotowania! 🌱
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePreparation;

