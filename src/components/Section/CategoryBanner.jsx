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
    <section 
      id="category-banner"
      className="relative w-full min-h-screen bg-[#F6EFE9] scroll-mt-16"
    >
      {/* Top decorative wave overlay */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#2D3748]/90 to-transparent pointer-events-none" />
      
      {/* Content wrapper */}
      <div className="relative z-10 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title section */}
          <div className="text-center mb-16 md:mb-24">
            <h2 className="inline-block font-['Caveat'] text-4xl md:text-5xl lg:text-6xl text-[#2D3748] 
              relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 
              after:-translate-x-1/2 after:w-24 after:h-1 after:bg-green-600">
              ODŻYWCZE PRZEPISY
            </h2>
            <p className="mt-6 text-gray-600 text-lg md:text-xl max-w-2xl mx-auto font-['Lato']">
              Odkryj nasze starannie wybrane przepisy, które łączą w sobie smak i wartości odżywcze
            </p>
          </div>

          {/* Categories grid container */}
          <div className="space-y-16 md:space-y-24">
            {/* First Row */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-50/30 to-transparent 
                transform -skew-y-3 rounded-3xl" />
              <div className="relative px-2 sm:px-4 md:px-0">
                <CategoryGrid items={firstRowItems} isHomePage={true} />
              </div>
            </div>

            {/* Second Row */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-50/30 to-transparent 
                transform skew-y-3 rounded-3xl" />
              <div className="relative px-2 sm:px-4 md:px-0">
                <CategoryGrid items={secondRowItems} isHomePage={true} />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute left-0 top-1/4 w-24 h-24 md:w-32 md:h-32 bg-green-50/40 rounded-full 
          blur-3xl -translate-x-1/2" />
        <div className="absolute right-0 bottom-1/4 w-32 h-32 md:w-40 md:h-40 bg-green-50/40 rounded-full 
          blur-3xl translate-x-1/2" />
      </div>
    </section>
  );
};

export default CategoryBanner;