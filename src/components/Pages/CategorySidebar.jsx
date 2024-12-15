import React, { useState } from 'react';
import { 
  FiChevronDown, 
  FiChevronUp,
  FiCoffee,
  FiHeart,
  FiGift,
  FiStar,
  FiPackage,
  FiShoppingBag,
  FiPieChart,
  FiSun
} from 'react-icons/fi';

const CategorySidebar = ({ categories, currentSlug, onCategoryClick }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Map of category icons (using available Feather icons)
  const categoryIcons = {
    desery: FiPieChart,
    ciasta: FiCoffee,
    ciastka: FiHeart,
    smoothie: FiSun,
    inne: FiStar,
    swieta: FiGift,
    zupy: FiPackage
    // Add more mappings as needed
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden w-full bg-white rounded-lg p-4 mb-4 flex items-center justify-between shadow-md"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <span className="font-['Caveat'] text-xl text-[#2D3748]">Kategorie</span>
        {isCollapsed ? <FiChevronDown size={20} /> : <FiChevronUp size={20} />}
      </button>

      {/* Sidebar content */}
      <aside className={`w-full md:w-64 flex-shrink-0 transition-all duration-300 ${
        isCollapsed ? 'hidden md:block' : 'block'
      }`}>
        <div className="md:sticky md:top-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="divide-y divide-gray-100">
              {categories.map((category, index) => {
                const IconComponent = categoryIcons[category.link.split('/').pop()] || FiShoppingBag;
                const isActive = category.link.split('/').pop() === currentSlug;

                return (
                  <button 
                    key={index}
                    onClick={() => onCategoryClick(category.link)}
                    className={`w-full group relative transition-all duration-300 ${
                      isActive ? 'bg-yellow-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="px-6 py-5 text-left">
                      {/* Active indicator line */}
                      <div className={`absolute left-0 top-0 h-full w-1.5 transition-all duration-300
                        ${isActive ? 'bg-yellow-400' : 'bg-transparent group-hover:bg-yellow-200'}`}
                      />
                      
                      <div className="flex items-center gap-3">
                        <IconComponent 
                          size={20}
                          className={`transition-colors duration-300 ${
                            isActive ? 'text-yellow-500' : 'text-gray-400 group-hover:text-yellow-400'
                          }`}
                        />
                        <div>
                          <h3 className={`font-['Caveat'] text-2xl transition-colors duration-300 leading-tight
                            ${isActive 
                              ? 'text-[#2D3748] font-bold' 
                              : 'text-gray-600 group-hover:text-[#2D3748]'}`}
                          >
                            {category.label}
                          </h3>
                          {category.shortDesc && (
                            <p className="text-sm text-gray-500 mt-1 font-['Lato']">
                              {category.shortDesc}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default CategorySidebar;