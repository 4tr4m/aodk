import React from 'react';
import { motion } from 'framer-motion';

const RecipeNewsletterCTA = ({ onOpenModal }) => {
  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 sm:p-8 relative overflow-hidden text-center">
        <div className="absolute -right-8 -top-8 w-24 h-24 bg-green-200 rounded-full opacity-50 blur-2xl"></div>
        <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-green-300 rounded-full opacity-30 blur-3xl"></div>
        <div className="relative z-10">
          <h3 className="font-['Playfair_Display'] text-xl sm:text-2xl text-green-800 font-bold mb-3">
            Dołącz do naszej społeczności!
          </h3>
          <p className="text-sm sm:text-base text-green-700 mb-6 leading-relaxed max-w-2xl mx-auto">
            Odkryj więcej przepisów dostosowanych do potrzeb dzieci z autyzmem. 
            Otrzymuj powiadomienia o nowych przepisach i ekskluzywne porady prosto na swoją skrzynkę.
          </p>
          <motion.button
            onClick={onOpenModal}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg transition-all duration-300 font-semibold text-base shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Zapisz się do newslettera</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default RecipeNewsletterCTA;

