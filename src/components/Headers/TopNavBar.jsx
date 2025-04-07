import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube, FaPinterestP } from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';
import { supabase } from '../../lib/supabase';

const TopNavBar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState({
    kuchnia: [],
    skladnik: [],
    historia: [],
    znajdki: [],
    wiedza: [],
    blog: []
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('order', { ascending: true });

        if (error) throw error;

        // Group categories by type
        const groupedCategories = data.reduce((acc, category) => {
          if (!acc[category.type]) {
            acc[category.type] = [];
          }
          if (category.image) { // Only include categories with images
            acc[category.type].push(category);
          }
          return acc;
        }, {});

        setCategories(groupedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleMouseEnter = (type) => {
    setActiveDropdown(type);
  };

  const renderDropdownMenu = (items) => (
    <ul className={`
      ${isMobileMenuOpen 
        ? 'relative bg-black w-full mt-2 rounded-md shadow-lg border border-gray-700'
        : 'absolute left-0 bg-black min-w-[240px] py-3 flex flex-col opacity-0 invisible transition-all duration-500 ease-in-out delay-150 -translate-y-4 transform origin-top scale-95 group-hover:scale-100 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible rounded-lg'
      }
    `}>
      {items.map((item, index) => (
        <li 
          key={index} 
          className={`
            px-4 py-2 transform transition-all duration-300 
            ${isMobileMenuOpen ? 'hover:bg-gray-800' : 'hover:bg-white/10'}
            ${!isMobileMenuOpen && 'opacity-0 -translate-y-2'}
          `}
          style={{ 
            transitionDelay: `${150 + (index * 50)}ms`,
            animation: activeDropdown && !isMobileMenuOpen ? `fadeInItem 0.4s ease-out forwards ${150 + (index * 50)}ms` : 'none'
          }}
        >
          <Link 
            to={item.link}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`text-[18px] font-['Patrick_Hand'] font-normal leading-[1.2] whitespace-nowrap transition-all duration-300 block
              text-gray-100 hover:text-yellow-400`}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );

  const navItems = [
    { label: 'START', link: '/' },
    { 
      label: 'KUCHNIA', 
      link: '/kuchnia',
      dropdown: categories.kuchnia,
      type: 'kuchnia'
    },
    { 
      label: 'HISTORIA', 
      link: '/historia',
      dropdown: categories.historia,
      type: 'historia'
    },
    { 
      label: 'ZNAJDKI', 
      link: '/znajdki',
      dropdown: categories.znajdki,
      type: 'znajdki'
    },
    { 
      label: 'WIEDZA', 
      link: '/wiedza',
      dropdown: categories.wiedza,
      type: 'wiedza'
    },
    { 
      label: 'BLOG', 
      link: '/blog',
      dropdown: categories.blog,
      type: 'blog'
    },
    { label: 'KONTAKT', link: '/kontakt' },
  ];

  return (
    <div className="relative top-0 left-0 w-full z-50 text-gray-50 py-4">
      <div className="max-w-[1400px] mx-auto px-4 md:px-[60px] flex flex-col md:flex-row justify-between items-center relative z-50">
        {/* Mobile Menu Button */}
        <div className="flex w-full md:hidden justify-between items-center mb-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-2 bg-black rounded-lg flex items-center gap-2"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            <span className="font-['Patrick_Hand'] text-base">MENU</span>
          </button>
          <div className="flex gap-4">
            {[
              { icon: FaFacebookF, link: "https://facebook.com" },
              { icon: FaInstagram, link: "https://instagram.com" },
              { icon: FaTiktok, link: "https://tiktok.com" },
            ].map((social, index) => (
              <a 
                key={index}
                href={social.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-50 text-sm transition-all duration-300 flex items-center justify-center w-8 h-8 bg-black rounded-full hover:scale-110 hover:text-yellow-400"
              >
                <social.icon />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <nav className={`w-full md:w-auto ${isMobileMenuOpen ? 'block' : 'hidden md:block'}`}>
          <ul className={`flex flex-col md:flex-row md:gap-12 w-full ${isMobileMenuOpen ? 'bg-black rounded-lg p-4 shadow-xl' : ''}`}>
            {navItems.map((item, index) => (
              <li 
                key={index} 
                className="group relative transition-all duration-300 ease-in-out"
                onMouseEnter={() => !isMobileMenuOpen && item.dropdown && handleMouseEnter(item.type)}
                onMouseLeave={() => !isMobileMenuOpen && item.dropdown && setActiveDropdown(null)}
                onClick={() => item.dropdown && isMobileMenuOpen ? setActiveDropdown(activeDropdown === item.type ? null : item.type) : null}
              >
                <Link 
                  to={item.link}
                  onClick={(e) => {
                    if (item.dropdown && isMobileMenuOpen) {
                      e.preventDefault();
                    } else {
                      setIsMobileMenuOpen(false);
                    }
                  }}
                  className={`text-gray-50 no-underline text-[20px] font-['Patrick_Hand'] font-semibold uppercase tracking-wide transition-all duration-300 flex items-center gap-2 py-3 md:py-1.5 px-4 md:px-0 hover:text-yellow-400 hover:scale-110 group-hover:text-yellow-400 
                    ${isMobileMenuOpen ? 'bg-black rounded-lg mb-2' : ''}`}
                >
                  {item.label}
                  {item.dropdown && isMobileMenuOpen && (
                    <span className="ml-auto">
                      {activeDropdown === item.type ? (
                        <FiX size={20} className="text-gray-300" />
                      ) : (
                        <span className="text-xl text-gray-300">+</span>
                      )}
                    </span>
                  )}
                </Link>
                {item.dropdown && (isMobileMenuOpen ? activeDropdown === item.type && renderDropdownMenu(item.dropdown) : renderDropdownMenu(item.dropdown))}
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Icons - Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex gap-6">
            {[
              { icon: FaFacebookF, link: "https://facebook.com" },
              { icon: FaInstagram, link: "https://instagram.com" },
              { icon: FaTiktok, link: "https://tiktok.com" },
              { icon: FaYoutube, link: "https://youtube.com" },
              { icon: FaPinterestP, link: "https://pinterest.com" }
            ].map((social, index) => (
              <a 
                key={index}
                href={social.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-50 text-sm transition-all duration-300 flex items-center justify-center w-6 h-6 hover:scale-110 hover:text-yellow-400"
              >
                <social.icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;