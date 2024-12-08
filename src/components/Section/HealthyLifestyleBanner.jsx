import React from 'react';
import { kuchniaCategories } from '../../Data/category-data';
import ProductGrid from '../Pages/ProductGrid';

const HealthyLifestyleBanner = () => {
  const firstRowItems = kuchniaCategories.mainCategories.filter(item => 
    kuchniaCategories.displayGroups.firstRow.includes(item.label)
  );

  const secondRowItems = kuchniaCategories.mainCategories.filter(item => 
    kuchniaCategories.displayGroups.secondRow.includes(item.label)
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#2D3748] via-[#F6EFE9]/90 to-[#F6EFE9] p-0 m-0 relative z-10">
      {/* Top decorative food banner */}
      <div className="w-full h-24 bg-cover bg-center opacity-90" 
           style={{ backgroundImage: 'url(/img/food-banner.jpg)' }} />
      
      <div className="pt-16 max-w-7xl mx-auto px-5 relative">
        <h1 className="font-['Caveat'] text-[#2D3748] text-center mb-20 text-4xl tracking-wider relative z-2 transition-all duration-300">
          ODŻYWCZE PRZEPISY
        </h1>

        <div className="space-y-24">
          <ProductGrid items={firstRowItems} isHomePage={true} />
          <ProductGrid items={secondRowItems} isHomePage={true} />
        </div>
      </div>
    </div>
  );
};

export default HealthyLifestyleBanner;