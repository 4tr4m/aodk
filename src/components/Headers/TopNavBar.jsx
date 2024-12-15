import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube, FaPinterestP } from 'react-icons/fa';
import { kuchniaCategories, skladnikCategories } from '../../Data/category-data';

const TopNavBar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleMouseEnter = (type) => {
    setActiveDropdown(type);
  };

  const kuchniaItems = kuchniaCategories.mainCategories;
  const skladnikItems = skladnikCategories;

  const renderDropdownMenu = (items) => (
    <ul className="absolute left-0 bg-black/85 min-w-[240px] py-3 flex flex-col opacity-0 invisible transition-all duration-500 ease-in-out delay-150 -translate-y-4 transform origin-top scale-95 group-hover:scale-100 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible backdrop-blur-sm rounded-lg">
      {items.map((item, index) => (
        <li 
          key={index} 
          className="px-4 py-2 transform opacity-0 -translate-y-2 transition-all duration-300 hover:bg-white/5" 
          style={{ 
            transitionDelay: `${150 + (index * 50)}ms`,
            animation: activeDropdown ? `fadeInItem 0.4s ease-out forwards ${150 + (index * 50)}ms` : 'none'
          }}
        >
          <Link 
            to={item.link}
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
      <div className="max-w-[1400px] mx-auto px-[60px] flex justify-between items-center relative z-50">
        <nav>
          <ul className="flex gap-12">
            {navItems.map((item, index) => (
              <li 
                key={index} 
                className="group relative transition-all duration-300 ease-in-out"
                onMouseEnter={() => item.dropdown && handleMouseEnter(item.type)}
                onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
              >
                <Link 
                  to={item.link}
                  className="text-gray-50/90 no-underline text-[20px] font-['Patrick_Hand'] font-semibold uppercase tracking-wide transition-all duration-300 flex items-center gap-2 py-1.5 mix-blend-overlay hover:text-yellow-400 hover:scale-110 group-hover:text-yellow-400"
                >
                  {item.label}
                </Link>
                {item.dropdown && renderDropdownMenu(item.dropdown)}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-6">
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