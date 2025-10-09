import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { kuchniaCategories } from '../../Data/category-data';
import InfoModal from '../Pages/InfoModal';
import categoryService from '../../services/categoryService';

/*
  Footer component
  - Renders the site footer with two columns of recipe categories and a contact column
  - Categories are fetched from Supabase with a safe fallback to static data
  - Clicking the logo opens an informational modal
  - All links navigate with state { scrollToTop: true }

  Used by pages/components:
  - src/pages/HomePage.jsx
  - src/components/Pages/Blog.jsx
  - src/components/Pages/CategoryPage.jsx
  - src/components/Pages/ContactPage.jsx
  - src/components/Pages/HistoriaOAutyzmie.jsx
  - src/components/Pages/HistoriaOMnie.jsx
  - src/components/Pages/SearchPage.jsx
  - src/components/Pages/Wiedza.jsx
  - src/components/Pages/ZnajdkiPage.jsx
  - src/components/Pages/ZnajdkiProductPage.jsx
  - src/components/Pages/RecipePage.jsx
  - src/components/Pages/Wishlist.jsx (present but commented out)
*/

// Small helpers kept local to this file for clarity
const slugify = (value) =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

const sentenceCase = (value) => {
  if (!value) return '';
  const lower = value.toString().toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
};

const transformCategory = (category) => {
  const base = category.slug || category.label || String(category.id || '');
  const slug = slugify(base);
  return {
    label: sentenceCase(category.label || slug),
    link: `/kuchnia/${slug}`,
    shortDesc: category.short_desc || ''
  };
};

const Footer = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [firstColumnCategories, setFirstColumnCategories] = useState([]);
  const [secondColumnCategories, setSecondColumnCategories] = useState([]);
  const navigate = useNavigate();

  // Fetch categories from Supabase; fallback to static categories if unavailable
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await categoryService.getCategories();
        if (categories && categories.length > 0) {
          // Normalize Supabase categories to the footer's expected shape
          const transformedCategories = categories.map(transformCategory);
          // Split into two columns (max 4 each, total 8)
          setFirstColumnCategories(transformedCategories.slice(0, 4));
          setSecondColumnCategories(transformedCategories.slice(4, 8));
        } else {
          // Fallback to hardcoded categories
          const fallback = kuchniaCategories.mainCategories.map(transformCategory);
          setFirstColumnCategories(fallback.slice(0, 4));
          setSecondColumnCategories(fallback.slice(4, 8));
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Fallback to hardcoded categories on error
        const fallback = kuchniaCategories.mainCategories.map(transformCategory);
        setFirstColumnCategories(fallback.slice(0, 4));
        setSecondColumnCategories(fallback.slice(4, 8));
      }
    };

    fetchCategories();
  }, []);

  // Programmatic navigation helper; ensures top-of-page scroll on arrival
  const handleLinkClick = (link) => {
    navigate(link, { state: { scrollToTop: true } });
  };

  // Toggle the info modal (opened via clicking the logo)
  const toggleInfoModal = () => {
    setShowInfoModal(!showInfoModal);
  };

  return (
    <div className="relative w-full">
      <div className="relative pb-20">
        {/* Background hero image with dark overlay behind the footer content */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/img/main-hero.webp)',
            backgroundPosition: 'center 25%',
            backgroundSize: 'cover'
          }}
        >
          <div className="absolute inset-0 bg-black/80"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-12 pt-8 lg:pt-12">
            <div 
              onClick={toggleInfoModal}
              className="cursor-pointer group relative transform hover:scale-105 transition-all duration-300"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                // Support keyboard activation (Enter + Space)
                if (e.key === 'Enter' || e.key === ' ') toggleInfoModal();
              }}
              aria-label="Open Info Modal"
            >
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 rounded-full blur-md"></div>
                <img 
                  src="/img/logo.png" 
                  alt="Autyzm od kuchni" 
                  className="h-32 sm:h-40 w-auto object-contain relative z-10 drop-shadow-2xl filter brightness-110 contrast-110"
                />
              </div>
            </div>

            <nav className="flex-1 lg:ml-16 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8 lg:gap-12">
                {/* Przepisy - single centered header spanning two category columns */}
                <div className="sm:col-span-2 lg:col-span-2">
                  <h4 className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg text-center tracking-wide">
                    Przepisy
                  </h4>
                  <div className="mt-6 flex flex-col sm:flex-row items-start justify-center gap-6 sm:gap-8">
                    <ul className="space-y-3 flex flex-col items-center sm:items-start">
                      {firstColumnCategories.map((category, index) => (
                        <li key={`first-${category.label}-${index}`} className="text-center sm:text-left">
                          <button 
                            onClick={() => handleLinkClick(category.link)}
                            className="text-gray-200 hover:text-white transition-colors duration-200 inline-flex items-center justify-center sm:justify-start group text-sm sm:text-base font-medium tracking-wide"
                          >
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mr-2 text-green-400">→</span>
                            {category.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                    <ul className="space-y-3 flex flex-col items-center sm:items-start mt-6 sm:mt-0">
                      {secondColumnCategories.map((category, index) => (
                        <li key={`second-${category.label}-${index}`} className="text-center sm:text-left">
                          <button 
                            onClick={() => handleLinkClick(category.link)}
                            className="text-gray-200 hover:text-white transition-colors duration-200 inline-flex items-center justify-center sm:justify-start group text-sm sm:text-base font-medium tracking-wide"
                          >
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mr-2 text-green-400">→</span>
                            {category.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Kontakt */}
                <div className="space-y-6">
                  <h4 className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg text-center lg:text-left tracking-wide">
                    Kontakt
                  </h4>
                  <ul className="space-y-3 flex flex-col items-center lg:items-start">
                    {[
                      { label: 'Pomoc', link: '/pomoc' },
                      { label: 'O nas', link: '/o-nas' },
                      { label: 'Kontakt', link: '/kontakt' }
                    ].map((item) => (
                      <li key={item.label} className="w-full text-center lg:text-left">
                        <button 
                          onClick={() => handleLinkClick(item.link)}
                          className="text-gray-200 hover:text-white transition-colors duration-200 inline-flex items-center justify-center lg:justify-start w-full group text-sm sm:text-base font-medium tracking-wide"
                        >
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mr-2 text-green-400">→</span>
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom mask to blend the footer into the rest of the page */}
      <div 
        className="absolute bottom-0 left-0 w-full h-48"
        style={{
          backgroundImage: 'url(/img/main-hero.webp)',
          backgroundPosition: 'center bottom',
          backgroundSize: 'cover',
          maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))'
        }}
      />

      {/* Info modal controlled by logo click */}
      <InfoModal isOpen={showInfoModal} togglePopup={toggleInfoModal} />
    </div>
  );
};

export default Footer;