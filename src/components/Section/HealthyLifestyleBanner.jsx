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
    <div className="w-full min-h-[120vh] bg-[#F6EFE9] p-0 m-0 relative z-10 overflow-hidden">
      <img 
        src="/img/logo_bckgd.png" 
        alt="" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-auto opacity-20 z-0 contrast-[1.3] pointer-events-none"
      />
      <div className="pt-[40px] max-w-[1200px] mx-auto px-[20px] relative flex-1 flex flex-col">
        <h1 className="font-['Architects_Daughter'] text-[#4A5568] text-center mb-16 mt-6 pt-5 text-[42px] font-normal tracking-[3px] shadow-sm relative z-2 opacity-90 hover:opacity-100 transition-opacity duration-300 bg-white/30 py-4 rounded-lg">
          ODŻYWCZE PRZEPISY
        </h1>

        <ProductGrid items={firstRowItems} />
        <ProductGrid items={secondRowItems} />
      </div>
    </div>
  );
};

export default HealthyLifestyleBanner;