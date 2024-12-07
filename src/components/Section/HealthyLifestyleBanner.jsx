import React from 'react';
import { kuchniaCategories } from '../../Data/category-data';

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
      <div className="pt-[20px] max-w-[1200px] mx-auto px-[20px] relative flex-1 flex flex-col">
        <h1 className="font-['Architects_Daughter'] text-[#4A5568] text-center mb-10 mt-10 pt-5 text-[42px] font-normal tracking-[3px] shadow-sm relative z-2 opacity-90 hover:opacity-100 transition-opacity duration-300">
          ODŻYWCZE PRZEPISY
        </h1>

        {/* First Row */}
        <div className="mb-[60px]">
          <div className="flex justify-around gap-5 px-5 max-w-[1200px] mx-auto mb-5 relative z-2">
            {firstRowItems.map((item, index) => (
              <div key={index} className="relative flex-1 bg-white rounded-lg overflow-hidden shadow-[0_4px_6px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-[5px] min-h-[200px] max-w-[280px] group after:content-[''] after:absolute after:inset-0 after:bg-[rgba(102,113,126,0.05)] after:pointer-events-none">
                <div className="relative w-full h-full">
                  <img 
                    src={`/img/${item.image}`} 
                    alt={item.label}
                    className="w-full h-full object-cover aspect-square block brightness-95 contrast-95 saturate-90 transition-all duration-300 group-hover:brightness-100 group-hover:contrast-100 group-hover:saturate-100"
                  />
                  <div className="absolute bottom-2 right-2 text-[8px] text-[#66717E] opacity-90 font-['Lato'] italic bg-white/80 px-1 py-0.5 rounded z-10">
                    TY {item.imageCredit} <span className="text-[#ff6b6b] text-[8px]">♥</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-around max-w-[1200px] mx-auto px-5 mt-2.5 relative z-2">
            {firstRowItems.map((item, index) => (
              <h2 key={index} className="flex-1 text-center font-['Lato'] font-semibold text-[#66717E] tracking-[4px] m-0 mb-0.5 text-[22px] opacity-90 hover:opacity-100 transition-all duration-300 max-w-[280px] w-full shadow-[0px_0px_30px_rgba(102,113,126,0.4),0px_0px_15px_rgba(102,113,126,0.3)] hover:shadow-[0px_0px_30px_rgba(102,113,126,0.5),0px_0px_15px_rgba(102,113,126,0.4)]">
                {item.label}
              </h2>
            ))}
          </div>

          <div className="flex justify-around max-w-[1200px] mx-auto px-5 mt-0.5 relative z-2">
            {firstRowItems.map((item, index) => (
              <p key={index} className="flex-1 text-center text-[#66717E] font-['Lato'] text-base px-[15px] max-w-[280px] leading-[1.5] opacity-90 w-full">
                {item.shortDesc}
              </p>
            ))}
          </div>
        </div>

        {/* Second Row */}
        <div className="mb-[60px]">
          <div className="flex justify-around gap-5 px-5 max-w-[1200px] mx-auto mb-5 relative z-2">
            {secondRowItems.map((item, index) => (
              <div key={index} className="relative flex-1 bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-1 min-h-[200px] max-w-[280px] group">
                <div className="relative w-full h-full">
                  <img 
                    src={`/img/${item.image}`} 
                    alt={item.label}
                    className="w-full h-full object-cover aspect-square block brightness-95 contrast-95 saturate-90 transition-[filter] duration-300 group-hover:brightness-100 group-hover:contrast-100 group-hover:saturate-100"
                  />
                  <div className="absolute bottom-2 right-2 text-[8px] text-[#66717E] opacity-90 font-['Lato'] italic bg-white/80 px-1 py-0.5 rounded z-10">
                    TY {item.imageCredit} <span className="text-[#ff6b6b] text-[8px]">♥</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-around max-w-[1200px] mx-auto px-5 mt-2.5 relative z-2">
            {secondRowItems.map((item, index) => (
              <h2 key={index} className="flex-1 text-center font-['Lato'] font-semibold text-[#66717E] tracking-[4px] m-0 mb-0.5 text-[22px] opacity-90 hover:opacity-100 transition-all duration-300 max-w-[280px] w-full shadow-[0_0_30px_rgba(102,113,126,0.4),0_0_15px_rgba(102,113,126,0.3)] hover:shadow-[0_0_30px_rgba(102,113,126,0.5),0_0_15px_rgba(102,113,126,0.4)]">
                {item.label}
              </h2>
            ))}
          </div>

          <div className="flex justify-around max-w-[1200px] mx-auto px-5 mt-0.5 relative z-2">
            {secondRowItems.map((item, index) => (
              <p key={index} className="flex-1 text-center text-[#66717E] font-['Lato'] text-base px-[15px] max-w-[280px] leading-[1.5] opacity-90 w-full">
                {item.shortDesc}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthyLifestyleBanner;