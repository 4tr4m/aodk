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
    <>
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
          <div className="flex md:hidden items-center gap-4">
            <div className="flex gap-3">
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
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-3 bg-green-600/90 backdrop-blur-sm rounded-lg flex items-center gap-2 shadow-md hover:bg-green-500/90 transition-all duration-300 hover:scale-105"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              <span className="font-['Patrick_Hand'] text-base">MENU</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block w-auto">
            <ul className="flex flex-row gap-10 lg:gap-12">
              {navItems.map((item, index) => (
                <li 
                  key={index} 
                  className="group relative transition-all duration-300 ease-in-out"
                  onMouseEnter={() => item.dropdown && handleMouseEnter(item.type)}
                  onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
                >
                  <Link 
                    to={item.link}
                    className="no-underline text-[20px] font-['Patrick_Hand'] font-semibold uppercase tracking-wide transition-all duration-300 py-3 md:py-1.5 px-4 md:px-0 text-gray-50/90 mix-blend-overlay group-hover:text-yellow-400"
                  >
                    {item.label}
                  </Link>
                  {item.dropdown && activeDropdown === item.type && renderDropdownMenu(item.dropdown)}
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu Container */}
          <div className="relative h-full flex items-center justify-center p-6">
            <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/50 w-full max-w-sm max-h-[80vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
                <h2 className="text-2xl font-['Patrick_Hand'] text-white font-bold">Menu</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors p-2"
                >
                  <FiX size={24} />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="p-6">
                <ul className="space-y-4">
                  {navItems.map((item, index) => (
                    <li key={index} className="group">
                      <Link 
                        to={item.link}
                        onClick={(e) => {
                          if (item.dropdown) {
                            e.preventDefault();
                            setActiveDropdown(activeDropdown === item.type ? null : item.type);
                          } else {
                            setIsMobileMenuOpen(false);
                          }
                        }}
                        className="flex items-center justify-between w-full text-xl font-['Patrick_Hand'] text-white hover:text-yellow-400 transition-all duration-300 py-3 px-4 rounded-lg hover:bg-gray-800/50"
                      >
                        <span>{item.label}</span>
                        {item.dropdown && (
                          <span className="text-gray-400 group-hover:text-yellow-400 transition-colors">
                            {activeDropdown === item.type ? (
                              <FiX size={20} />
                            ) : (
                              <span className="text-xl">+</span>
                            )}
                          </span>
                        )}
                      </Link>
                      
                      {/* Dropdown Items */}
                      {item.dropdown && activeDropdown === item.type && (
                        <div className="mt-2 ml-4 bg-gray-800/50 rounded-lg p-3 space-y-2 animate-in slide-in-from-top-2 duration-300">
                          {item.dropdown.map((subitem, subindex) => (
                            <Link
                              key={subindex}
                              to={subitem.link}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block w-full text-gray-300 hover:text-yellow-400 py-2 px-3 rounded hover:bg-gray-700/50 text-lg font-['Patrick_Hand'] transition-all duration-300"
                            >
                              {subitem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Footer with Social Icons */}
              <div className="p-6 border-t border-gray-700/50">
                <div className="flex justify-center gap-4">
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
                      className="text-gray-400 hover:text-yellow-400 transition-all duration-300 flex items-center justify-center w-10 h-10 bg-gray-800/50 rounded-full hover:bg-gray-700/50 hover:scale-110"
                    >
                      <social.icon />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopNavBar;