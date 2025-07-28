import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TopNavBar from '../Headers/TopNavBar';
import CategoryHeader from './CategoryHeader';
import Footer from '../Footer/Footer';
import { FiFilter, FiShoppingBag, FiX } from 'react-icons/fi';
import { FaLeaf, FaRegHeart, FaHeart } from 'react-icons/fa';
import SEO from '../SEO/SEO';
import supabase from '../../lib/supabase-browser';

const ZnajdkiPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('wszystkie');
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('znajdki').select('*');
      console.log('Fetched:', data, error);
      setProducts(data || []);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // Get all unique categories and tags from products
  const allCategories = [
    'wszystkie',
    ...Array.from(new Set(products.map(product => product.category).filter(Boolean)))
  ];
  const allTags = Array.from(
    new Set(
      products.flatMap(product => [
        ...(product.tags ? product.tags.split(',') : []),
        ...(product.tags2 ? product.tags2.split(',') : []),
        ...(product.tags3 ? product.tags3.split(',') : [])
      ].map(tag => tag.trim()).filter(Boolean))
    )
  );

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'wszystkie' || product.category === selectedCategory;
    const productTags = [
      ...(product.tags ? product.tags.split(',') : []),
      ...(product.tags2 ? product.tags2.split(',') : []),
      ...(product.tags3 ? product.tags3.split(',') : [])
    ].map(tag => tag.trim()).filter(Boolean);
    const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => productTags.includes(tag));
    const matchesSearch =
      product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.shortdesc?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.fulldesc?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesTags && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <SEO 
        title="Znajdki - Autyzm od Kuchni | Polecane produkty bezglutenowe i dietetyczne"
        description="Odkryj sprawdzone produkty spożywcze dostępne w sklepach, które pasują do diety eliminacyjnej - bez glutenu, nabiału i cukru."
        keywords="zdrowa żywność, produkty bezglutenowe, bez nabiału, bez cukru, dieta eliminacyjna, autyzm, produkty polecane"
        canonical="https://autyzmkuchni.pl/znajdki"
      />
      <div className="relative mb-8">
        <CategoryHeader />
        <div className="absolute top-0 left-0 w-full">
          <TopNavBar />
        </div>
      </div>
      <motion.div 
        className="max-w-7xl mx-auto px-4 md:px-8 mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-[#2D3748] mb-4 font-bold tracking-wide">
          Znajdki
        </h1>
        <p className="font-['Lato'] text-base md:text-lg lg:text-xl text-gray-600 text-center max-w-3xl mx-auto leading-relaxed">
          Sprawdzone i polecane produkty spożywcze dostępne w sklepach, 
          które pasują do diety eliminacyjnej i zdrowego stylu życia.
        </p>
      </motion.div>
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
        {/* Search and Filters - Desktop */}
        <div className="hidden md:flex justify-between items-center mb-8">
          <div className="w-1/3">
            <input
              type="text"
              placeholder="Szukaj produktu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
            />
          </div>
          <div className="flex gap-4">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-white rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
            >
              {allCategories.map((category, index) => (
                <option key={index} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
              ))}
            </select>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-all"
            >
              <FiFilter className="text-gray-600" />
              <span>Filtry</span>
              {selectedTags.length > 0 && (
                <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {selectedTags.length}
                </span>
              )}
            </button>
          </div>
        </div>
        {/* Search and Filters - Mobile */}
        <div className="flex flex-col md:hidden gap-4 mb-6">
          <input
            type="text"
            placeholder="Szukaj produktu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:outline-none transition-all"
          />
          <div className="flex gap-2">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex-1 px-3 py-2 bg-white rounded-lg border border-gray-200 text-sm"
            >
              {allCategories.map((category, index) => (
                <option key={index} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
              ))}
            </select>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1 px-3 py-2 bg-white rounded-lg border border-gray-200 text-sm"
            >
              <FiFilter className="text-gray-600" />
              <span>Filtry</span>
              {selectedTags.length > 0 && (
                <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-1">
                  {selectedTags.length}
                </span>
              )}
            </button>
          </div>
        </div>
        {/* Filter Tags Popup */}
        {showFilters && (
          <motion.div 
            className="bg-white rounded-xl p-6 mb-8 shadow-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-['Patrick_Hand'] text-xl text-gray-800">Filtry</h3>
              <button 
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={20} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag, index) => (
                <button
                  key={index}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedTags.includes(tag) 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            {selectedTags.length > 0 && (
              <div className="mt-4 flex justify-end">
                <button 
                  onClick={() => setSelectedTags([])}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Wyczyść wszystkie filtry
                </button>
              </div>
            )}
          </motion.div>
        )}
        {/* Product Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img 
                    src={product.image ? product.image : `/img/znajdki/${product.id}.jpg`} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <button 
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-sm hover:bg-white transition-colors"
                  >
                    {favorites.includes(product.id) ? (
                      <FaHeart className="text-red-500" size={18} />
                    ) : (
                      <FaRegHeart className="text-gray-400 hover:text-gray-600" size={18} />
                    )}
                  </button>
                  <div className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <FaLeaf size={12} />
                    <span>Polecane</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-['Patrick_Hand'] text-lg font-medium text-gray-800 mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-500">{product.category}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.shortdesc}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {[
                      ...(product.tags ? product.tags.split(',') : []),
                      ...(product.tags2 ? product.tags2.split(',') : []),
                      ...(product.tags3 ? product.tags3.split(',') : [])
                    ].map((tag, tagIndex) => (
                      <span 
                        key={tagIndex} 
                        className="inline-block bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center">
                      <FiShoppingBag className="text-gray-400 mr-1" size={14} />
                      <span className="text-xs text-gray-500">
                        {/* You can display where to buy or other info here if available in DB */}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="bg-white rounded-xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <FiShoppingBag size={24} className="text-gray-400" />
            </div>
            <h3 className="font-['Patrick_Hand'] text-xl text-gray-800 mb-2">Nie znaleziono produktów</h3>
            <p className="text-gray-600">
              Nie znaleźliśmy produktów spełniających wybrane kryteria. Spróbuj zmienić filtry lub frazę wyszukiwania.
            </p>
            <button 
              onClick={() => {
                setSelectedCategory('wszystkie');
                setSelectedTags([]);
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors"
            >
              Wyczyść wszystkie filtry
            </button>
          </div>
        )}
      </div>
      {/* Featured Section */}
      <div className="bg-green-50 py-12 mb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="font-['Playfair_Display'] text-3xl text-center text-gray-800 mb-8">
            Jak wybieramy produkty?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <span className="text-green-600 text-xl font-bold">1</span>
              </div>
              <h3 className="font-['Patrick_Hand'] text-xl text-gray-800 mb-2">
                Sprawdzone składniki
              </h3>
              <p className="text-gray-600">
                Wszystkie polecane produkty są dokładnie sprawdzane pod kątem składu. 
                Wybieramy tylko te, które nie zawierają glutenu, nabiału krowiego, dodatku cukru 
                i szkodliwych dodatków.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <span className="text-green-600 text-xl font-bold">2</span>
              </div>
              <h3 className="font-['Patrick_Hand'] text-xl text-gray-800 mb-2">
                Dostępność w sklepach
              </h3>
              <p className="text-gray-600">
                Koncentrujemy się na produktach, które są łatwo dostępne w popularnych 
                sieciach sklepów. Nie ma sensu polecać produktów, których nie da się 
                kupić lub trzeba ich długo szukać.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <span className="text-green-600 text-xl font-bold">3</span>
              </div>
              <h3 className="font-['Patrick_Hand'] text-xl text-gray-800 mb-2">
                Praktyczne zastosowanie
              </h3>
              <p className="text-gray-600">
                Każdy produkt jest przez nas testowany w kuchni. Polecamy 
                tylko te, które sprawdziły się podczas przygotowywania posiłków 
                i mają dobry wpływ na zdrowie.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ZnajdkiPage; 