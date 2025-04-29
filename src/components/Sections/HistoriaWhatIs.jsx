import React from 'react';
import { motion } from 'framer-motion';

const HistoriaWhatIs = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="mt-16 mb-16"
    >
      <h2 className="text-3xl font-['Playfair_Display'] text-gray-900 mb-8 text-center">
        O co chodzi z tym autyzmem?
      </h2>
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="prose prose-lg max-w-none text-gray-600 font-['Lato'] leading-relaxed">
          <p>
            Autyzm to zaburzenie neurorozwojowe, które wpływa na sposób, w jaki dana osoba postrzega świat, komunikuje się i wchodzi w interakcje społeczne. Chociaż autyzm ma podłoże genetyczne i neurologiczne, coraz więcej badań wskazuje, że to środowisko, w tym żywienie i ogólny stan zdrowia metabolicznego, mają znaczący wpływ na funkcjonowanie osoby ze spektrum autyzmu, a odpowiednie zmiany mogą pomóc w złagodzeniu niektórych objawów.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default HistoriaWhatIs; 