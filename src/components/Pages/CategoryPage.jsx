import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import TopNavBar from '../Headers/TopNavBar';
import CategoryHeader from './CategoryHeader';
import Footer from '../Footer/Footer';
import RecipeGrid from './RecipeGrid';
import { recipes } from '../../Data/products-data';
import { kuchniaCategories } from '../../Data/category-data';

const CategoryPage = () => {
  const { categorySlug } = useParams();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [categorySlug]);
  
  const getCurrentCategory = () => {
    const slug = categorySlug || '';
    const category = kuchniaCategories.mainCategories.find(cat => 
      cat.link.split('/').pop() === slug
    );
    return category || null;
  };

  const currentCategory = getCurrentCategory();
  
  const getCategoryRecipes = () => {
    if (!currentCategory) return [];
    return recipes.filter(recipe => recipe.category === currentCategory.label);
  };

  const categoryRecipes = getCategoryRecipes();

  return (
    <div className="min-h-screen">
      {/* Mini hero section with TopNavBar */}
      <div className="relative">
        <CategoryHeader />
        <div className="absolute top-0 left-0 w-full">
          <TopNavBar />
        </div>
      </div>
      
      <div className="bg-[#F6EFE9] py-12">
        <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-md p-6">
              {kuchniaCategories.mainCategories.map((category, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <Link 
                    to={category.link}
                    className={`block font-['Caveat'] text-2xl mb-2 transition-colors duration-300
                      ${category.link.split('/').pop() === categorySlug
                        ? 'text-[#2D3748] font-bold' 
                        : 'text-gray-600 hover:text-[#2D3748]'}`}
                  >
                    {category.label}
                  </Link>
                </div>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-12">
              <h1 className="font-['Caveat'] text-5xl text-[#2D3748] mb-4">
                {currentCategory ? currentCategory.label : 'Wszystkie Przepisy'}
              </h1>
              <p className="text-gray-600 font-['Lato'] text-lg leading-relaxed">
                {currentCategory?.description || 'Odkryj nasze przepisy'}
              </p>
            </div>

            <RecipeGrid recipes={categoryRecipes} />
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CategoryPage;