import React, { useEffect } from 'react';
import { FaTimes, FaHeart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

const ProductModal = ({ product, onClose }) => {
  const { dispatch } = useCart();

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const addToFavorites = () => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-modalEntry shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 group z-10"
        >
          <FaTimes className="text-gray-500 group-hover:text-gray-700 text-lg" />
        </button>

        <div className="flex flex-col gap-8 p-8">
          <div className="text-center">
            <h2 className="font-['Caveat'] text-4xl text-[#2D3748] mb-3 leading-tight">
              {product.name}
            </h2>
            <p className="text-gray-600 font-['Lato'] leading-relaxed max-w-2xl mx-auto">
              {product.fullDesc}
            </p>
          </div>

          <div className="max-w-2xl mx-auto w-full">
            <div className="rounded-xl overflow-hidden bg-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300">
              <img 
                src={`/img/${product.image}`}
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="max-w-2xl mx-auto w-full space-y-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="font-['Caveat'] text-2xl text-[#2D3748] mb-4">
                Składniki
              </h3>
              <div className="text-gray-600 font-['Lato'] leading-relaxed whitespace-pre-line">
                {product.ingredients}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="font-['Caveat'] text-2xl text-[#2D3748] mb-4">
                Przygotowanie
              </h3>
              <div className="text-gray-600 font-['Lato'] leading-relaxed whitespace-pre-line">
                {product.preparation}
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                onClick={addToFavorites}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-['Lato'] font-semibold
                  border-2 border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white 
                  transition-all duration-300 hover:-translate-y-0.5"
              >
                <FaHeart className="text-lg" />
                Dodaj do ulubionych
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;