import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TopNavBar from '../Headers/TopNavBar';
import CategoryHeader from './CategoryHeader';
import Footer from '../Footer/Footer';
import ProductNewsletter from '../ProductModal/ProductNewsletter';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiShoppingBag, FiShare2 } from 'react-icons/fi';
import { FaLeaf, FaRegHeart, FaHeart } from 'react-icons/fa';
import supabase from '../../lib/supabase-browser';

const ZnajdkiProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Newsletter state
  const [newsletterName, setNewsletterName] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

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

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setNewsletterSubmitting(true);
    
    // Simulate newsletter submission
    setTimeout(() => {
      setNewsletterSubmitted(true);
      setNewsletterSubmitting(false);
      setNewsletterName('');
      setNewsletterEmail('');
    }, 1000);
  };

  const allTags = [
    ...(product?.tags ? product.tags.split(',') : []),
    ...(product?.tags2 ? product.tags2.split(',') : []),
    ...(product?.tags3 ? product.tags3.split(',') : [])
  ].map(tag => tag.trim()).filter(Boolean);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
        <TopNavBar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center text-gray-600 text-xl font-semibold">Nie znaleziono produktu.</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="relative mb-8">
        <CategoryHeader />
        <div className="absolute top-0 left-0 w-full">
          <TopNavBar />
        </div>
      </div>
      
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-10">
        {/* Back Button */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors font-medium hover:bg-white/50 px-3 py-2 rounded-lg"
          >
            <FiArrowLeft size={20} />
            <span>Powrót do znajdki</span>
          </button>
        </motion.div>

        {/* Category Badge */}
        <motion.div 
          className="flex items-center gap-2 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wide shadow-lg">
            {product.category}
          </span>
        </motion.div>

        {/* Enhanced Product Image */}
        <motion.div 
          className="relative w-full bg-white rounded-3xl overflow-hidden mb-8 shadow-2xl"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
            <img 
              src={product.image ? `/img/${product.image}` : `/img/znajdki/${product.id}.jpg`} 
              alt={product.name}
              className="w-full h-full object-contain object-center transition-all duration-700 hover:scale-105"
              onError={(e) => {
                e.target.src = '/img/znajdki/default.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Enhanced Action Buttons */}
            <div className="absolute top-4 right-4 flex gap-3">
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 hover:shadow-xl"
              >
                {isFavorite ? (
                  <FaHeart className="text-red-500" size={20} />
                ) : (
                  <FaRegHeart className="text-gray-600 hover:text-red-500" size={20} />
                )}
              </button>
              <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 hover:shadow-xl">
                <FiShare2 className="text-gray-600" size={20} />
              </button>
            </div>
            
            {/* Enhanced Badge */}
            <div className="absolute top-4 left-4 bg-green-600 text-white text-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-lg backdrop-blur-sm">
              <FaLeaf size={14} />
              <span className="font-medium">Polecane</span>
            </div>
          </div>
        </motion.div>

        {/* Product Information */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h1 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#2D3748] font-bold mb-4 leading-tight">
            {product.name}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 leading-relaxed italic">
            {product.shortdesc}
          </p>
        </motion.div>

        {/* Enhanced Tags */}
        {allTags.length > 0 && (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="font-['Playfair_Display'] text-lg sm:text-xl md:text-2xl text-[#2D3748] font-bold mb-4">
              Charakterystyka produktu
            </h3>
            <div className="flex flex-wrap gap-3">
              {allTags.map((tag, i) => (
                <motion.span 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className={`px-4 py-2 rounded-full text-sm font-semibold shadow-md transition-all duration-300 hover:scale-105
                    ${i % 4 === 0 ? 'bg-green-100 text-green-800 border border-green-200' :
                      i % 4 === 1 ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                      i % 4 === 2 ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                      'bg-purple-100 text-purple-800 border border-purple-200'
                    }`}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Enhanced Description */}
        {product.fulldesc && (
          <motion.section 
            className="mb-8 bg-white rounded-2xl p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="font-['Playfair_Display'] text-xl sm:text-2xl text-[#2D3748] font-bold mb-4">
              Opis produktu
            </h2>
            <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
              {product.fulldesc}
            </p>
          </motion.section>
        )}

        {/* Enhanced Ingredients */}
        {product.ingredients && (
          <motion.section 
            className="mb-8 bg-white rounded-2xl p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="font-['Playfair_Display'] text-xl sm:text-2xl text-[#2D3748] font-bold mb-4">
              Składniki
            </h2>
            <ul className="space-y-3">
              {product.ingredients.split('\n').map((ingredient, i) => (
                <li 
                  key={i}
                  className="flex items-start gap-3 text-base sm:text-lg text-gray-700"
                >
                  <span className="flex-shrink-0 w-2 h-2 mt-3 rounded-full bg-green-600" />
                  <span className="flex-1">{ingredient.trim()}</span>
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* Enhanced Base Ingredients */}
        {product.base_ingredients && (
          <motion.section 
            className="mb-8 bg-white rounded-2xl p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <h2 className="font-['Playfair_Display'] text-xl sm:text-2xl text-[#2D3748] font-bold mb-4">
              Podstawowe składniki
            </h2>
            <div className="flex flex-wrap gap-3">
              {product.base_ingredients.split('\n').map((ingredient, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium shadow-md
                    ${i % 4 === 0 ? 'bg-green-100 text-green-800 border border-green-200' :
                      i % 4 === 1 ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                      i % 4 === 2 ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                      'bg-purple-100 text-purple-800 border border-purple-200'
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">•</span>
                    <span>{ingredient.trim()}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Where to Buy Section */}
        <motion.section 
          className="mb-8 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <FiShoppingBag className="text-green-600" size={24} />
            <h2 className="font-['Playfair_Display'] text-xl sm:text-2xl text-[#2D3748] font-bold">
              Gdzie kupić?
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Ten produkt jest dostępny w popularnych sieciach sklepów. Sprawdź lokalne sklepy 
            spożywcze, supermarkety lub sklepy ze zdrową żywnością w Twojej okolicy.
          </p>
        </motion.section>
      </main>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          <ProductNewsletter
            newsletterName={newsletterName}
            setNewsletterName={setNewsletterName}
            newsletterEmail={newsletterEmail}
            setNewsletterEmail={setNewsletterEmail}
            newsletterSubmitting={newsletterSubmitting}
            newsletterSubmitted={newsletterSubmitted}
            handleNewsletterSubmit={handleNewsletterSubmit}
          />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ZnajdkiProductPage; 