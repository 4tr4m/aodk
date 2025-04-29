import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TopNavBar from '../Headers/TopNavBar';
import Footer from '../Footer/Footer';
import { motion } from 'framer-motion';
import supabase from '../../lib/supabase-browser';

const ZnajdkiProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('znajdki')
        .select('*')
        .eq('id', Number(id))
        .single();
      console.log('Fetched:', data, error);
      setProduct(data);
      setLoading(false);
    };
    if (id) fetchProduct();
  }, [id]);

  const allTags = [
    ...(product?.tags ? product.tags.split(',') : []),
    ...(product?.tags2 ? product.tags2.split(',') : []),
    ...(product?.tags3 ? product.tags3.split(',') : [])
  ].map(tag => tag.trim()).filter(Boolean);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <TopNavBar />
        <div className="flex-grow flex items-center justify-center bg-gray-50">
          <div className="text-center text-gray-600 text-xl font-semibold">Nie znaleziono produktu.</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <TopNavBar />
      <main className="flex-1 w-full max-w-2xl mx-auto px-2 sm:px-6 md:px-10 py-6 sm:py-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-green-600 text-white px-4 py-1 rounded-full text-xs sm:text-sm font-medium uppercase tracking-wide shadow-md">
            {product.category}
          </span>
        </div>
        <motion.div 
          className="relative w-full bg-gray-100 rounded-2xl overflow-hidden mb-6 shadow-lg"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img 
            src={product.image ? product.image : `/znajdki/${product.id}.jpg`} 
            alt={product.name}
            className="w-full h-[220px] sm:h-[320px] md:h-[400px] object-cover object-center transition-all duration-500"
          />
        </motion.div>
        <div className="mb-4 sm:mb-6">
          <h1 className="font-['Playfair_Display'] text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-[#2D3748] font-bold mb-2 sm:mb-3">
            {product.name}
          </h1>
          <div className="italic text-gray-600 mb-2 sm:mb-3 text-sm sm:text-base">
            {product.shortdesc}
          </div>
        </div>
        {allTags.length > 0 && (
          <div className="mb-6 sm:mb-8 flex flex-wrap gap-2">
            {allTags.map((tag, i) => (
              <span 
                key={i}
                className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-sm transition-all duration-300
                  ${i % 3 === 0 ? 'bg-green-100 text-green-800' :
                    i % 3 === 1 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'}
                `}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {product.fulldesc && (
          <section className="mb-6 sm:mb-8">
            <h2 className="font-['Playfair_Display'] text-lg sm:text-xl text-[#2D3748] font-bold mb-3 sm:mb-4">
              Opis
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              {product.fulldesc}
            </p>
          </section>
        )}
        {product.ingredients && (
          <section className="mb-6 sm:mb-8">
            <h2 className="font-['Playfair_Display'] text-lg sm:text-xl text-[#2D3748] font-bold mb-3 sm:mb-4">
              Składniki
            </h2>
            <ul className="space-y-2">
              {product.ingredients.split('\n').map((ingredient, i) => (
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
        {product.base_ingredients && (
          <section className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
            <h2 className="font-['Playfair_Display'] text-lg sm:text-xl text-[#2D3748] font-bold mb-3 sm:mb-4">
              Podstawowe składniki
            </h2>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {product.base_ingredients.split('\n').map((ingredient, i) => (
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

export default ZnajdkiProductPage; 