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
      <div className="mt-6">
        <div className="flex flex-col items-center justify-center py-4 px-4 sm:py-5 sm:px-5 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-xl sm:rounded-2xl border border-amber-200 sm:border-2 shadow-sm sm:shadow-md relative overflow-hidden">
          {/* Decorative background elements - more subtle */}
          <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-amber-200 rounded-full opacity-15 blur-2xl -mr-10 -mt-10 sm:-mr-12 sm:-mt-12"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-orange-200 rounded-full opacity-10 blur-2xl -ml-12 -mb-12 sm:-ml-16 sm:-mb-16"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-2 flex-wrap justify-center">
              <FaLeaf className="text-amber-600 text-base sm:text-lg animate-pulse" />
              <span className="text-amber-500 text-sm sm:text-base">✨</span>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold bg-gradient-to-r from-amber-700 via-orange-600 to-amber-700 bg-clip-text text-transparent font-['Playfair_Display']">
                Zdrowego!
              </h3>
              <span className="text-amber-500 text-sm sm:text-base">✨</span>
              <FaHeart className="text-rose-500 text-base sm:text-lg animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
            <p className="text-xs sm:text-sm text-amber-800/80 mt-0.5 text-center font-normal">
              Smacznego i zdrowego gotowania! 🌱
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePreparation;

