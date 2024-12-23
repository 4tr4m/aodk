import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductModal from './ProductModal';

const CategoryGrid = ({ items, isHomePage = false }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (isHomePage) {
      // On homepage, navigate to category
      navigate(item.link);
    } else {
      // On category page, show modal
      setSelectedProduct(item);
    }
  };

  return (
    <div className="group">
      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-2">
        {items.map((item, index) => (
          <div 
            key={index} 
            className="group/card w-full cursor-pointer relative"
            onClick={() => handleClick(item)}
          >
            {isHomePage ? (
              // Homepage card style (category preview)
              <div className="relative bg-white rounded-xl overflow-hidden shadow-md transition-all duration-500 hover:shadow-lg h-[400px] flex flex-col">
                {/* Image Container - Fixed height */}
                <div className="relative h-[250px] overflow-hidden">
                  <img 
                    src={`/img/${item.image}`} 
                    alt={item.label}
                    className="w-full h-full object-cover transition-all duration-700 ease-out group-hover/card:scale-105"
                  />
                  {/* Credit Badge */}
                  <div className="absolute bottom-3 right-3 text-xs text-gray-300/90 font-['Lato'] italic bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full z-10">
                    TY {item.imageCredit} <span className="text-rose-400">♥</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 bg-white flex flex-col justify-between">
                  <h2 className="font-['Caveat'] text-2xl text-[#2D3748] tracking-wide mb-2 group-hover/card:text-[#1A202C] transition-colors duration-300">
                    {item.label}
                  </h2>
                  <p className="font-['Lato'] text-sm text-gray-600/90 leading-relaxed">
                    {item.shortDesc}
                  </p>
                </div>
              </div>
            ) : (
              // Category page card style (recipe preview)
              <div className="relative bg-white rounded-xl overflow-hidden shadow-md transition-all duration-500 hover:shadow-lg px-6 py-8">
                <h2 className="font-['Caveat'] text-3xl text-center text-[#2D3748] tracking-wide mb-0 group-hover/card:text-[#1A202C] transition-colors duration-300">
                  {item.name}
                </h2>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal - only for category page */}
      {!isHomePage && selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

export default CategoryGrid;