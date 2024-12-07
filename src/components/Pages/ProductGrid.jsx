import React from 'react';

// ProductGrid.jsx
const ProductGrid = ({ items }) => {
    return (
      <div className="mb-[60px] group px-5">
        {/* Card Grid with improved shadows */}
        <div className="flex justify-around gap-5 max-w-[1200px] mx-auto mb-8 relative z-2 shadow-lg bg-white/5 rounded-xl p-6">
          {items.map((item, index) => (
            <div key={index} className="relative flex-1 bg-white rounded-lg overflow-hidden shadow-[0_4px_6px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.15)] transition-all duration-500 hover:-translate-y-[5px] min-h-[200px] max-w-[280px] group">
              <div className="relative w-full h-full overflow-hidden">
                <img 
                  src={`/img/${item.image}`} 
                  alt={item.label}
                  className="w-full h-full object-cover aspect-square block brightness-95 contrast-95 saturate-90 transition-all duration-500 ease-in-out group-hover:brightness-100 group-hover:contrast-100 group-hover:saturate-100 group-hover:scale-105"
                />
                <div className="absolute bottom-2 right-2 text-[8px] text-[#66717E] opacity-90 font-['Lato'] italic bg-white/80 px-1 py-0.5 rounded z-10">
                  TY {item.imageCredit} <span className="text-[#ff6b6b] text-[8px]">♥</span>
                </div>
              </div>
            </div>
          ))}
        </div>
  
        {/* Titles with improved background */}
        <div className="flex justify-around max-w-[1200px] mx-auto px-5 mt-2.5 relative z-2">
          {items.map((item, index) => (
            <h2 key={index} className="flex-1 text-center font-['Lato'] font-semibold text-[#66717E] tracking-[4px] m-0 mb-0.5 text-[22px] opacity-90 hover:opacity-100 transition-all duration-300 max-w-[280px] w-full bg-white/50 py-2 rounded-lg shadow-[0px_0px_30px_rgba(102,113,126,0.4),0px_0px_15px_rgba(102,113,126,0.3)] hover:shadow-[0px_0px_30px_rgba(102,113,126,0.5),0px_0px_15px_rgba(102,113,126,0.4)]">
              {item.label}
            </h2>
          ))}
        </div>
  
        {/* Descriptions with improved spacing */}
        <div className="flex justify-around max-w-[1200px] mx-auto px-5 mt-4 relative z-2">
          {items.map((item, index) => (
            <p key={index} className="flex-1 text-center text-[#66717E] font-['Lato'] text-base px-[15px] max-w-[280px] leading-[1.5] opacity-90 w-full hover:opacity-100 transition-all duration-300">
              {item.shortDesc}
            </p>
          ))}
        </div>
      </div>
    );
  };

export default ProductGrid;