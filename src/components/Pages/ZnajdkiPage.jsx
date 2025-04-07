import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import TopNavBar from '../Headers/TopNavBar';
import CategoryHeader from './CategoryHeader';
import Footer from '../Footer/Footer';
import { FiFilter, FiShoppingBag, FiX } from 'react-icons/fi';
import { FaLeaf, FaRegHeart, FaHeart } from 'react-icons/fa';
import SEO from '../SEO/SEO';

// Mock data for znajdki products - in a real app, this would come from an API or dedicated data file
const znajdkiProducts = [
  {
    id: 1,
    name: "Jogurt kokosowy naturalny",
    brand: "BioKoko",
    category: "nabiał roślinny",
    tags: ["bez glutenu", "bez laktozy", "bez dodatku cukru"],
    description: "Kremowy jogurt kokosowy bez dodatku cukru. Doskonała alternatywa dla nabiału krowiego, zawiera probiotyki i ma delikatny kokosowy smak.",
    where: ["Auchan", "Carrefour", "Sklepy ze zdrową żywnością"],
    price: "9.99 zł",
    image: "/img/placeholder-product.jpg",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Chleb bezglutenowy z ziarnami",
    brand: "Bezgluten",
    category: "pieczywo",
    tags: ["bez glutenu", "bez dodatku cukru", "źródło błonnika"],
    description: "Pyszny chleb bezglutenowy z dodatkiem ziaren słonecznika, lnu i sezamu. Nie kruszy się i ma przyjemny, lekko orzechowy smak.",
    where: ["Biedronka", "Lidl", "E.Leclerc"],
    price: "12.99 zł",
    image: "/img/placeholder-product.jpg",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Daktyle Medjool",
    brand: "BioVital",
    category: "owoce suszone",
    tags: ["bez dodatków", "100% naturalny", "wegańskie"],
    description: "Naturalnie słodkie, soczyste daktyle Medjool bez dodatku konserwantów i cukru. Idealne jako zdrowa przekąska lub naturalny słodzik.",
    where: ["Auchan", "Rossmann", "Sklepy ze zdrową żywnością"],
    price: "19.99 zł",
    image: "/img/placeholder-product.jpg",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Masło migdałowe",
    brand: "NutNatural",
    category: "zdrowe tłuszcze",
    tags: ["bez dodatku cukru", "bez oleju palmowego", "bez konserwantów"],
    description: "Kremowe masło migdałowe ze 100% migdałów, bez dodatku soli i cukru. Idealne do smarowania, do wypieków lub jako dodatek do smoothie.",
    where: ["Auchan", "Carrefour", "Rossmann"],
    price: "24.99 zł",
    image: "/img/placeholder-product.jpg",
    rating: 4.7,
  },
  {
    id: 5,
    name: "Mąka kokosowa ekologiczna",
    brand: "BioCoconut",
    category: "mąki",
    tags: ["bez glutenu", "niskoglikemiczna", "bogate źródło błonnika"],
    description: "Delikatna mąka kokosowa o subtelnym aromacie, idealna do wypieków bezglutenowych. Zawiera dużo błonnika i mało węglowodanów.",
    where: ["Lidl", "Rossmann", "Sklepy ze zdrową żywnością"],
    price: "14.99 zł",
    image: "/img/placeholder-product.jpg",
    rating: 4.6,
  },
  {
    id: 6,
    name: "Mleko owsiane",
    brand: "OatGood",
    category: "napoje roślinne",
    tags: ["bez dodatku cukru", "wegańskie", "źródło błonnika"],
    description: "Kremowe mleko owsiane bez dodatku cukru i konserwantów. Idealne do kawy, herbaty, płatków śniadaniowych i wypieków.",
    where: ["Biedronka", "Lidl", "Auchan"],
    price: "7.99 zł",
    image: "/img/placeholder-product.jpg",
    rating: 4.4,
  },
  {
    id: 7,
    name: "Kombucha malina-imbir",
    brand: "FermenTea",
    category: "napoje",
    tags: ["probiotyk", "niskosłodzony", "fermentowany"],
    description: "Orzeźwiający napój fermentowany z zielonej herbaty z dodatkiem soku malinowego i imbiru. Zawiera żywe kultury bakterii.",
    where: ["Carrefour", "Rossmann", "Sklepy ze zdrową żywnością"],
    price: "11.99 zł",
    image: "/img/placeholder-product.jpg",
    rating: 4.8,
  },
  {
    id: 8,
    name: "Batony daktylowe z orzechami",
    brand: "RawBar",
    category: "przekąski",
    tags: ["bez dodatku cukru", "wegańskie", "surowe"],
    description: "Zdrowe batony z daktyli i orzechów, bez dodatku cukru i konserwantów. Idealne jako przekąska w podróży lub przed treningiem.",
    where: ["Biedronka", "Lidl", "Auchan", "Rossmann"],
    price: "6.99 zł",
    image: "/img/placeholder-product.jpg",
    rating: 4.5,
  },
];

// Get all unique categories from products
const allCategories = [...new Set(znajdkiProducts.map(product => product.category))];

// Get all unique tags
const allTags = [...new Set(znajdkiProducts.flatMap(product => product.tags))];

const ZnajdkiPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('wszystkie');
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

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

  const filteredProducts = znajdkiProducts.filter(product => {
    const matchesCategory = selectedCategory === 'wszystkie' || product.category === selectedCategory;
    const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => product.tags.includes(tag));
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
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
              <option value="wszystkie">Wszystkie kategorie</option>
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
              <option value="wszystkie">Wszystkie kategorie</option>
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
                  src={product.image} 
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
                    <p className="text-sm text-gray-500">{product.brand}</p>
                  </div>
                  <div className="bg-green-50 text-green-700 px-2 py-1 rounded text-sm font-medium">
                    {product.price}
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {product.tags.map((tag, tagIndex) => (
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
                      {product.where.slice(0, 2).join(', ')}
                      {product.where.length > 2 ? '...' : ''}
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i}
                        className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-1 text-xs text-gray-500">{product.rating}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Empty State */}
        {filteredProducts.length === 0 && (
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