import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube, FaPinterestP } from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';
import { kuchniaCategories, skladnikCategories } from '../../Data/category-data';

const TopNavBar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMouseEnter = (type) => {
    setActiveDropdown(type);
  };

  const kuchniaItems = kuchniaCategories.mainCategories;
  const skladnikItems = skladnikCategories;

  const renderDropdownMenu = (items) => (
    <ul className={`
      ${isMobileMenuOpen 
        ? 'relative bg-gray-800 w-full mt-2 rounded-md'
        : 'absolute left-0 bg-black/85 min-w-[240px] py-3 flex flex-col opacity-0 invisible transition-all duration-500 ease-in-out delay-150 -translate-y-4 transform origin-top scale-95 group-hover:scale-100 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible backdrop-blur-sm rounded-lg'
      }
    `}>
      {items.map((item, index) => (
        <li 
          key={index} 
          className={`
            px-4 py-2 transform transition-all duration-300 hover:bg-white/5
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
            className="text-[18px] font-['Patrick_Hand'] font-normal leading-[1.2] whitespace-nowrap text-gray-50/95 drop-shadow-sm hover:text-yellow-400 transition-all duration-300 mix-blend-normal block"
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
      dropdown: kuchniaItems,
      type: 'kuchnia'
    },
    { 
      label: 'SKŁADNIK', 
      link: '/skladnik',
      dropdown: skladnikItems,
      type: 'skladnik'
    },
    { label: 'HISTORIA', link: '/historia' },
    { label: 'ZNAJDKI', link: '/znajdki' },
    { label: 'WIEDZA', link: '/wiedza' },
    { label: 'BLOG', link: '/blog' },
    { label: 'KONTAKT', link: '/kontakt' },
  ];

  return (
    <div className="relative top-0 left-0 w-full z-50 text-gray-50 py-4">
      <div className="max-w-[1400px] mx-auto px-4 md:px-[60px] flex flex-col md:flex-row justify-between items-center relative z-50">
        {/* Mobile Menu Button */}
        <div className="flex w-full md:hidden justify-between items-center mb-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-2"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
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
                className="text-gray-50 text-sm transition-all duration-300 flex items-center justify-center w-6 h-6 hover:scale-110 hover:text-yellow-400"
              >
                <social.icon />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <nav className={`w-full md:w-auto ${isMobileMenuOpen ? 'block' : 'hidden md:block'}`}>
          <ul className="flex flex-col md:flex-row md:gap-12 w-full">
            {navItems.map((item, index) => (
              <li 
                key={index} 
                className="group relative transition-all duration-300 ease-in-out"
                onMouseEnter={() => !isMobileMenuOpen && item.dropdown && handleMouseEnter(item.type)}
                onMouseLeave={() => !isMobileMenuOpen && item.dropdown && setActiveDropdown(null)}
                onClick={() => item.dropdown && isMobileMenuOpen && setActiveDropdown(activeDropdown === item.type ? null : item.type)}
              >
                <Link 
                  to={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-50/90 no-underline text-[20px] font-['Patrick_Hand'] font-semibold uppercase tracking-wide transition-all duration-300 flex items-center gap-2 py-3 md:py-1.5 px-4 md:px-0 mix-blend-overlay hover:text-yellow-400 hover:scale-110 group-hover:text-yellow-400"
                >
                  {item.label}
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