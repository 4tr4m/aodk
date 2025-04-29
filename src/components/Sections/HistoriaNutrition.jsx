import React from 'react';
import { motion } from 'framer-motion';
import { FaBreadSlice, FaVial, FaAllergies, FaTablets } from 'react-icons/fa';
import { GiMushrooms, GiFoodChain, GiStomach } from 'react-icons/gi';
import { MdOutlineCleaningServices } from 'react-icons/md';
import { TbOmega } from 'react-icons/tb';

const HistoriaNutrition = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.8 }}
      className="mt-16 mb-16"
    >
      <h2 className="text-3xl font-['Playfair_Display'] text-gray-900 mb-8 text-center">
        Żywienie a autyzm: kluczowe aspekty
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Dieta eliminacyjna */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <FaBreadSlice className="text-green-600 text-xl" />
            </div>
            <h3 className="text-xl font-['Playfair_Display'] text-gray-800">Dieta eliminacyjna</h3>
          </div>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span>U niektórych osób z autyzmem gluten (białko obecne w pszenicy, jęczmieniu i życie) oraz kazeina (białko mleka) mogą wpływać negatywnie na zachowanie i funkcjonowanie.</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span>Te składniki są rozkładane na opioidy (peptydy opioidowe), które mogą przenikać przez "nieszczelne jelita" i wpływać na funkcjonowanie mózgu.</span>
            </li>
          </ul>
        </motion.div>

        {/* Zdrowie jelit */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <GiStomach className="text-green-600 text-xl" />
            </div>
            <h3 className="text-xl font-['Playfair_Display'] text-gray-800">Zdrowie jelit i mikrobiom</h3>
          </div>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span>Osoby z autyzmem często mają problemy żołądkowo-jelitowe (biegunki, zaparcia, bóle brzucha).</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span>Zdrowie jelit wpływa na mózg poprzez oś jelitowo-mózgową. Dysbioza może nasilać objawy autyzmu.</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span>Probiotyki, fermentowane produkty i dieta bogata w błonnik mogą wspierać równowagę mikrobiomu.</span>
            </li>
          </ul>
        </motion.div>

        {/* Candida */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <GiMushrooms className="text-green-600 text-xl" />
            </div>
            <h3 className="text-xl font-['Playfair_Display'] text-gray-800">Candida</h3>
          </div>
          <p className="text-gray-600">
            U osób z autyzmem istnieje wysokie prawdopodobieństwo przerostu Candida albicans, co może powodować wytwarzanie toksycznych metabolitów wpływających na zachowanie i funkcje poznawcze. Dieta niskowęglowodanowa oraz wsparcie mikrobioty jelitowej (probiotyki, kiszonki) mogą pomóc ograniczyć przerost drożdżaków.
          </p>
        </motion.div>

        {/* Unikanie sztucznych dodatków */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <FaAllergies className="text-green-600 text-xl" />
            </div>
            <h3 className="text-xl font-['Playfair_Display'] text-gray-800">Unikanie sztucznych dodatków</h3>
          </div>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span>Barwniki, konserwanty i sztuczne słodziki mogą nasilać nadpobudliwość i inne trudności w zachowaniu.</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span>Dieta oparta na naturalnych, nieprzetworzonych produktach jest korzystniejsza.</span>
            </li>
          </ul>
        </motion.div>

        {/* Wspieranie metabolizmu */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <MdOutlineCleaningServices className="text-green-600 text-xl" />
            </div>
            <h3 className="text-xl font-['Playfair_Display'] text-gray-800">Wspieranie metabolizmu i detoksykacji</h3>
          </div>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span>Osoby z autyzmem mogą mieć trudności z neutralizowaniem toksyn (np. metali ciężkich).</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span>Żywność bogata w siarkę (np. brokuły, cebula, czosnek) wspiera detoksykację.</span>
            </li>
          </ul>
        </motion.div>

        {/* Kluczowe niedobory */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <GiFoodChain className="text-green-600 text-xl" />
            </div>
            <h3 className="text-xl font-['Playfair_Display'] text-gray-800">Kluczowe niedobory żywieniowe</h3>
          </div>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="inline-block w-6 text-center mr-2"><TbOmega className="inline text-green-500" /></span>
              <span><strong>Omega-3:</strong> Pomagają w rozwoju mózgu, wspierają koncentrację i zmniejszają stany zapalne.</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-6 text-center mr-2"><FaVial className="inline text-green-500" /></span>
              <span><strong>Cynk i magnez:</strong> Wspierają funkcjonowanie układu nerwowego.</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-6 text-center mr-2"><FaTablets className="inline text-green-500" /></span>
              <span><strong>Witaminy z grupy B:</strong> Szczególnie B6 i B12 są istotne dla procesów metabolicznych mózgu.</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-6 text-center mr-2">D</span>
              <span><strong>Witamina D:</strong> Jej niedobór może nasilać objawy autyzmu, a suplementacja wspiera układ nerwowy i odpornościowy.</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HistoriaNutrition; 