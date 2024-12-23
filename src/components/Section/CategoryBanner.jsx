import React from 'react';
import { kuchniaCategories } from '../../Data/category-data';
import CategoryGrid from '../Pages/CategoryGrid';

const CategoryBanner = () => {
  const firstRowItems = kuchniaCategories.mainCategories.filter(item => 
    kuchniaCategories.displayGroups.firstRow.includes(item.label)
  );

  const secondRowItems = kuchniaCategories.mainCategories.filter(item => 
    kuchniaCategories.displayGroups.secondRow.includes(item.label)
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#2D3748] via-[#F6EFE9]/90 to-[#F6EFE9] p-0 m-0 relative z-10">
      {/* Top decorative food banner */}
      <div className="w-full h-16 sm:h-20 md:h-24 bg-cover bg-center opacity-90" 
           style={{ backgroundImage: 'url(/img/food-banner.jpg)' }} />
      
      <div className="pt-8 sm:pt-12 md:pt-16 max-w-7xl mx-auto px-4 sm:px-5 relative">
        <h1 className="font-['Caveat'] text-[#2D3748] text-center mb-8 sm:mb-12 md:mb-20 
          text-3xl sm:text-4xl tracking-wider relative z-2 transition-all duration-300">
          ODŻYWCZE PRZEPISY
        </h1>

        <div className="space-y-12 sm:space-y-16 md:space-y-24">
          {/* First Row */}
          <div className="px-2 sm:px-4 md:px-0">
            <CategoryGrid items={firstRowItems} isHomePage={true} />
          </div>

          {/* Second Row */}
          <div className="px-2 sm:px-4 md:px-0">
            <CategoryGrid items={secondRowItems} isHomePage={true} />
          </div>
        </div>
      </div>

      {/* Optional: Add bottom spacing for mobile */}
      <div className="h-12 sm:h-16 md:h-20" />
    </div>
  );
};

export default CategoryBanner;