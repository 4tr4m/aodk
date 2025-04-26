import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TopNavBar from '../Headers/TopNavBar';
import Footer from '../Footer/Footer';
import { FiClock, FiAward } from 'react-icons/fi';
import { FaUtensils } from 'react-icons/fa';
import { motion } from 'framer-motion';
import supabase from '../../lib/supabase-browser';

const ProductPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const { data, error } = await supabase
          .from('recipes')
          .select('*')
          .eq('id', id)
          .single();
        if (error) throw error;
        setRecipe(data);
      } catch (error) {
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchRecipe();
  }, [id]);

  const formatPreparation = (preparation) => {
    if (!preparation) return [];
    const steps = preparation.split(/\d+\.\s+/).filter(Boolean);
    return steps.length > 1 ? steps : [preparation];
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col">
        <TopNavBar />
        <div className="flex-grow flex items-center justify-center bg-gray-50">
          <div className="text-center text-gray-600 text-xl font-semibold">Nie znaleziono przepisu.</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <TopNavBar />
      <main className="flex-1 w-full max-w-3xl mx-auto px-2 sm:px-6 md:px-10 py-6 sm:py-10">
        {/* Category badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-green-600 text-white px-4 py-1 rounded-full text-xs sm:text-sm font-medium uppercase tracking-wide shadow-md">
            {recipe.category}
          </span>
        </div>
        {/* Image */}
        <motion.div 
          className="relative w-full bg-gray-100 rounded-2xl overflow-hidden mb-6 shadow-lg"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img 
            src={`/img/${recipe.image}`} 
            alt={recipe.name}
            className="w-full h-[220px] sm:h-[320px] md:h-[400px] object-cover object-center transition-all duration-500"
          />
          {recipe.imageCredit && (
            <div className="absolute bottom-2 right-2 text-xs text-white/90 font-['Lato'] italic bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
              TY {recipe.imageCredit} <span className="text-rose-400">♥</span>
            </div>
          )}
        </motion.div>
        {/* Title and meta */}
        <div className="mb-4 sm:mb-6">
          <h1 className="font-['Playfair_Display'] text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-[#2D3748] font-bold mb-2 sm:mb-3">
            {recipe.name}
          </h1>
          <div className="italic text-gray-600 mb-2 sm:mb-3 text-sm sm:text-base">
            {recipe.shortdesc}
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
            {recipe.time && (
              <div className="flex items-center gap-1.5 text-gray-600">
                <FiClock className="text-green-600" />
                <span>{recipe.time}</span>
              </div>
            )}
            {recipe.difficulty && (
              <div className="flex items-center gap-1.5 text-gray-600">
                <FiAward className="text-green-600" />
                <span>Poziom: {recipe.difficulty}</span>
              </div>
            )}
          </div>
        </div>
        {/* Tags */}
        {recipe.tags && (
          <div className="mb-6 sm:mb-8 flex flex-wrap gap-2">
            {recipe.tags.split(',').map((tag, i) => (
              <span 
                key={i}
                className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-sm transition-all duration-300
                  ${i % 3 === 0 ? 'bg-green-100 text-green-800' :
                    i % 3 === 1 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'}
                `}
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        )}
        {/* Description */}
        {recipe.fulldesc && (
          <section className="mb-6 sm:mb-8">
            <h2 className="flex items-center gap-2 font-['Playfair_Display'] text-lg sm:text-xl text-[#2D3748] font-bold mb-3 sm:mb-4">
              <FaUtensils className="text-green-600" />
              Opis
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              {recipe.fulldesc}
            </p>
          </section>
        )}
        {/* Ingredients */}
        {recipe.ingredients && (
          <section className="mb-6 sm:mb-8">
            <h2 className="flex items-center gap-2 font-['Playfair_Display'] text-lg sm:text-xl text-[#2D3748] font-bold mb-3 sm:mb-4">
              <FaUtensils className="text-green-600" />
              Składniki
            </h2>
            <ul className="space-y-2">
              {recipe.ingredients.split('\n').map((ingredient, i) => (
                <li 
                  key={i}
                  className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-gray-700"
                >
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-green-600" />
                  <span className="flex-1">{ingredient.trim()}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
        {/* Preparation */}
        {recipe.preparation && (
          <section className="mb-6 sm:mb-8">
            <h2 className="flex items-center gap-2 font-['Playfair_Display'] text-lg sm:text-xl text-[#2D3748] font-bold mb-3 sm:mb-4">
              <FaUtensils className="text-green-600" />
              Przygotowanie
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {formatPreparation(recipe.preparation).map((step, i) => (
                <div key={i} className="flex gap-3 sm:gap-4 items-start">
                  <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-green-600 rounded-full flex items-center justify-center text-white font-medium text-xs sm:text-sm">
                    {i+1}
                  </div>
                  <p className="flex-1 text-sm sm:text-base text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        {/* Subscribe Section */}
        <section className="mt-8 pt-6 border-t border-gray-200">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-green-200 rounded-full opacity-50 blur-2xl"></div>
            <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-green-300 rounded-full opacity-30 blur-3xl"></div>
            <div className="relative">
              <h3 className="font-['Playfair_Display'] text-xl sm:text-2xl text-green-800 font-bold mb-3">
                Dołącz do naszej społeczności!
              </h3>
              <p className="text-sm sm:text-base text-green-700 mb-4 leading-relaxed">
                Odkryj więcej przepisów dostosowanych do potrzeb dzieci z autyzmem. 
                Otrzymuj powiadomienia o nowych przepisach i ekskluzywne porady prosto na swoją skrzynkę.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <input
                  type="email"
                  placeholder="Twój adres email"
                  className="flex-1 px-4 py-2.5 rounded-lg border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-300 text-sm sm:text-base placeholder-green-400/70"
                />
                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg \
                    transition-all duration-300 font-medium text-sm sm:text-base shadow-lg hover:shadow-xl
                    flex items-center justify-center gap-2 hover:-translate-y-0.5"
                >
                  <span>Zapisz się</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
              <p className="mt-3 text-xs text-green-600/80 italic">
                Dołączając do newslettera, zgadzasz się na otrzymywanie od nas wiadomości email. 
                Możesz zrezygnować w każdej chwili.
              </p>
            </div>
          </div>
        </section>
        {/* Base Ingredients */}
        {recipe.base_ingredients && (
          <section className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
            <h2 className="flex items-center gap-2 font-['Playfair_Display'] text-lg sm:text-xl text-[#2D3748] font-bold mb-3 sm:mb-4">
              <FaUtensils className="text-green-600" />
              Podstawowe składniki
            </h2>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {recipe.base_ingredients.split('\n').map((ingredient, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-sm
                    ${i % 4 === 0 ? 'bg-green-100 text-green-800 border border-green-200' :
                      i % 4 === 1 ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                      i % 4 === 2 ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                      'bg-purple-100 text-purple-800 border border-purple-200'
                    }`}
                >
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-base sm:text-lg">•</span>
                    <span>{ingredient.trim()}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage; 