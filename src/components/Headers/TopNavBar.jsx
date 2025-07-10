import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube, FaPinterestP } from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';
import { 
  kuchniaCategories,
  historiaCategories,
  // wiedzaCategories,
  blogCategories,
} from '../../Data/category-data';

const TopNavBar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMouseEnter = (type) => {
    setActiveDropdown(type);
  };

  const kuchniaItems = kuchniaCategories.mainCategories;

  const renderDropdownMenu = (items) => (
    <ul className={`
      ${isMobileMenuOpen 
        ? 'relative bg-gray-800/95 w-full mt-2 rounded-md shadow-lg border border-gray-700'
        : 'absolute left-0 bg-black/85 min-w-[240px] py-3 flex flex-col opacity-0 invisible transition-all duration-500 ease-in-out delay-150 -translate-y-4 transform origin-top scale-95 group-hover:scale-100 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible backdrop-blur-sm rounded-lg'
      }
    `}>
      {items.map((item, index) => (
        <li 
          key={index} 
          className={`
            px-4 py-2 transform transition-all duration-300 
            ${isMobileMenuOpen ? 'hover:bg-gray-700' : 'hover:bg-white/10'}
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
            className={`text-[18px] font-['Patrick_Hand'] font-normal leading-[1.2] whitespace-nowrap transition-all duration-300 mix-blend-normal block
              ${isMobileMenuOpen ? 'text-white hover:text-yellow-400' : 'text-gray-50/95 hover:text-yellow-400'}`}
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
    // { 
    //   label: 'SKŁADNIK', 
    //   link: '/skladnik',
    //   dropdown: skladnikItems,
    //   type: 'skladnik'
    // },
    { 
      label: 'HISTORIA', 
      link: '/historia/o-mnie',
      dropdown: historiaCategories,
      type: 'historia'
    },
    { 
      label: 'ZNAJDKI', 
      link: '/znajdki',
      type: 'znajdki'
    },
    // { 
    //   label: 'WIEDZA', 
    //   link: '/wiedza',
    //   dropdown: wiedzaCategories,
    //   type: 'wiedza'
    // },
    { 
      label: 'BLOG', 
      link: '/blog',
      dropdown: blogCategories,
      type: 'blog'
    },
    { label: 'KONTAKT', link: '/kontakt' },
  ];

  return (
    <div className="relative top-0 left-0 w-full z-50 text-gray-50 py-2 bg-transparent">
      <div className="max-w-[1400px] mx-auto px-4 md:px-[60px] flex flex-row items-center justify-between relative z-50 min-h-[80px]">
        {/* Logo on the far left */}
        <Link 
          to="/"
          className="transform transition-all duration-300 hover:scale-105 hover:-rotate-2 relative group mr-6"
          style={{ display: 'flex', alignItems: 'center', height: '72px' }}
        >
          <div className="absolute inset-0 bg-black/20 rounded-full blur-xl scale-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <img 
            src="/img/logo.png" 
            alt="Autyzm od kuchni" 
            className="h-28 w-auto object-contain relative z-10"
          />
        </Link>
        {/* Mobile Menu Button */}
        <div className="flex w-full md:hidden justify-between items-center mb-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-2 bg-green-600/90 backdrop-blur-sm rounded-lg flex items-center gap-2 shadow-md hover:bg-green-500/90 transition-colors"
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
                className="text-gray-50 text-sm transition-all duration-300 flex items-center justify-center w-8 h-8 bg-green-600/90 backdrop-blur-sm rounded-full hover:scale-110 hover:text-yellow-400 shadow-sm"
              >
                <social.icon />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <nav className={`w-full md:w-auto ${isMobileMenuOpen ? 'block' : 'hidden md:block'}`}>
          <ul className={`flex flex-col md:flex-row md:gap-10 lg:gap-12 w-full ${isMobileMenuOpen ? 'bg-gray-800/95 backdrop-blur-md rounded-lg p-4 shadow-xl' : ''}`}>
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
                  className={`no-underline text-[20px] font-['Patrick_Hand'] font-semibold uppercase tracking-wide transition-all duration-300 flex items-center gap-2 py-3 md:py-1.5 px-4 md:px-0 hover:text-yellow-400 hover:scale-110 
                    ${isMobileMenuOpen 
                      ? 'bg-black/80 backdrop-blur-sm rounded-lg mb-2 text-white mix-blend-normal hover:text-yellow-400' 
                      : 'text-gray-50/90 mix-blend-overlay group-hover:text-yellow-400'}`}
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