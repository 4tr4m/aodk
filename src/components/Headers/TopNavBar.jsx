// TopNavBar Component - Main navigation header for the website
// This component provides both desktop and mobile navigation with dropdown menus
// and social media links. It fetches dynamic categories from Supabase for the KUCHNIA section.
//
// PURPOSE:
// Main site-wide navigation bar that appears at the top of all pages.
// Contains the website logo, main navigation links (START, KUCHNIA, HISTORIA, ZNAJDKI, BLOG, KONTAKT),
// dropdown menus with subcategories, and social media icons.
// Provides essential navigation functionality for the entire website.
//
// USAGE LOCATIONS:
// - src/pages/HomePage.jsx (main landing page)
// - src/components/Pages/CategoryPage.jsx (recipe category pages)
// - src/components/Pages/Blog.jsx (blog listing page)
// - src/components/Pages/ArticlePage.jsx (individual blog articles)
// - src/components/Pages/RecipePage.jsx (individual recipe pages)
// - src/components/Pages/HistoriaOMnie.jsx ("About Me" history page)
// - src/components/Pages/HistoriaOAutyzmie.jsx ("About Autism" page)
// - src/components/Pages/ZnajdkiPage.jsx ("Finds" product listing page)
// - src/components/Pages/ZnajdkiProductPage.jsx (individual product pages)
// - src/components/Pages/ContactPage.jsx (contact page)
// - src/components/Pages/SearchPage.jsx (search results page)
// - src/components/Pages/Wiedza.jsx (knowledge page - currently disabled)
//
// The component appears on every major page of the website and is essential for navigation.
//
// HOW IT WORKS:
// 1. Fetches recipe categories from Supabase on mount and displays them in KUCHNIA dropdown
// 2. Shows logo that links to home page (/)
// 3. Renders main navigation links: START, KUCHNIA, HISTORIA, ZNAJDKI, BLOG, KONTAKT
// 4. Some links have dropdown menus that appear on hover (desktop) or click (mobile)
// 5. KUCHNIA dropdown shows dynamic recipe categories fetched from Supabase
// 6. HISTORIA and BLOG dropdowns use static category data from category-data.js
// 7. Displays social media icons (Facebook, Instagram, TikTok, YouTube, Pinterest)
// 8. On mobile, shows hamburger menu that opens full-screen overlay with navigation
// 9. Mobile menu includes all navigation items with expandable dropdowns
//
// FEATURES:
//   - Responsive design: different layouts for desktop and mobile
//   - Dropdown menus on hover (desktop) and click (mobile)
//   - Mobile hamburger menu with full-screen overlay
//   - Dynamic category fetching from Supabase for KUCHNIA section
//   - Social media links in header (desktop) and mobile menu footer
//   - Smooth animations for dropdown appearance
//   - Transparent background that works on all page backgrounds
//
// NAVIGATION ITEMS:
//   - START: Links to home page (/)
//   - KUCHNIA: Links to /kuchnia, dropdown shows recipe categories from Supabase
//   - HISTORIA: Links to /historia/o-mnie, dropdown shows history subpages
//   - ZNAJDKI: Links to /znajdki, no dropdown
//   - BLOG: Links to /blog, dropdown shows blog categories
//   - KONTAKT: Links to /kontakt, no dropdown

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Social media icons from react-icons
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube, FaPinterestP } from 'react-icons/fa';
// Menu toggle icons for mobile
import { FiMenu, FiX } from 'react-icons/fi';
// Static category data for fallback and other sections
import { 
  kuchniaCategories,
  historiaCategories,
  // wiedzaCategories, // Commented out - not currently used
  blogCategories,
} from '../../Data/category-data';
// Service for fetching dynamic categories from Supabase
import categoryService from '../../services/categoryService';

const TopNavBar = () => {
  // State for managing dropdown visibility on desktop
  const [activeDropdown, setActiveDropdown] = useState(null);
  // State for mobile menu open/close
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // State for dynamic KUCHNIA categories fetched from Supabase
  const [kuchniaItems, setKuchniaItems] = useState([]);

  // Effect hook to fetch categories from Supabase on component mount
  // This replaces static categories with dynamic ones from the database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Fetch all categories from Supabase
        const categories = await categoryService.getCategories();
        console.log('Navbar - Raw categories from Supabase:', categories);
        
        if (categories && categories.length > 0) {
          // Transform Supabase categories to match the expected format for dropdown menus
          const transformedCategories = categories.map(category => {
            // Create URL-friendly slug from label if slug is not available
            // Converts spaces to hyphens and removes special characters
            const slug = category.slug || category.label?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            console.log(`Navbar - Category: ${category.label}, slug: ${slug}, original slug: ${category.slug}`);
            return {
              label: category.label,           // Display name for the category
              link: `/kuchnia/${slug}`,        // URL path for the category page
              shortDesc: category.short_desc || '' // Optional short description
            };
          });
          console.log('Navbar - Transformed categories:', transformedCategories);
          setKuchniaItems(transformedCategories);
        } else {
          // Fallback to hardcoded categories if Supabase fetch fails or returns empty
          setKuchniaItems(kuchniaCategories.mainCategories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Fallback to hardcoded categories on error
        setKuchniaItems(kuchniaCategories.mainCategories);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array - runs only on mount

  // Handler for mouse enter events on desktop dropdown menus
  const handleMouseEnter = (type) => {
    setActiveDropdown(type);
  };

  // Renders dropdown menu items for both desktop and mobile
  // Takes an array of items and creates styled list elements
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
            // Staggered animation delay for smooth dropdown appearance
            transitionDelay: `${150 + (index * 50)}ms`,
            animation: activeDropdown && !isMobileMenuOpen ? `fadeInItem 0.4s ease-out forwards ${150 + (index * 50)}ms` : 'none'
          }}
        >
          <Link 
            to={item.link}
            onClick={() => setIsMobileMenuOpen(false)} // Close mobile menu when link is clicked
            className={`text-[18px] font-['Patrick_Hand'] font-normal leading-[1.2] whitespace-nowrap transition-all duration-300 mix-blend-normal block
              ${isMobileMenuOpen ? 'text-white hover:text-yellow-400' : 'text-gray-50/95 hover:text-yellow-400'}`}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );

  // Main navigation items configuration
  // Each item can have a dropdown menu with sub-items
  const navItems = [
    { label: 'START', link: '/' }, // Home page
    { 
      label: 'KUCHNIA', // Kitchen/Cooking section
      link: '/kuchnia',
      dropdown: kuchniaItems, // Dynamic categories from Supabase
      type: 'kuchnia'
    },
    // { 
    //   label: 'SKŁADNIK', // Ingredients section - currently disabled
    //   link: '/skladnik',
    //   dropdown: skladnikItems,
    //   type: 'skladnik'
    // },
    { 
      label: 'HISTORIA', // History section
      link: '/historia/o-mnie',
      dropdown: historiaCategories, // Static categories from data file
      type: 'historia'
    },
    { 
      label: 'ZNAJDKI', // Finds/Discoveries section
      link: '/znajdki',
      type: 'znajdki' // No dropdown menu
    },
    // { 
    //   label: 'WIEDZA', // Knowledge section - currently disabled
    //   link: '/wiedza',
    //   dropdown: wiedzaCategories,
    //   type: 'wiedza'
    // },
    { 
      label: 'BLOG', // Blog section
      link: '/blog',
      dropdown: blogCategories, // Static categories from data file
      type: 'blog'
    },
    { label: 'KONTAKT', link: '/kontakt' }, // Contact page
  ];

  return (
    <>
      {/* Main navbar container with transparent background and high z-index */}
      <div className="relative top-0 left-0 w-full z-50 text-gray-50 py-6 bg-transparent">
        {/* Inner container with max width and responsive padding */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-[60px] flex flex-row items-center justify-between relative z-50 min-h-[80px]">
          {/* Logo section - clickable link to home page */}
          <Link 
            to="/"
            className="transform transition-all duration-300 hover:scale-105 hover:-rotate-2 relative group mr-6"
            style={{ display: 'flex', alignItems: 'center', height: '72px' }}
          >
            {/* Hover effect background glow - hidden by default, only visible on hover */}
            <div className="absolute inset-0 bg-black/20 rounded-full blur-xl scale-90 pointer-events-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300"></div>
            {/* Main logo image */}
            <img 
              src="/img/logo.png" 
              alt="Autyzm od kuchni" 
              className="h-28 w-auto object-contain relative z-10"
            />
          </Link>

          {/* Mobile Menu Section - Only visible on mobile devices */}
          <div className="flex md:hidden items-center gap-4">
            {/* Social media icons for mobile - Hidden for now */}
            <div className="hidden">
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
            {/* Mobile menu toggle button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-3 bg-green-600/90 backdrop-blur-sm rounded-lg flex items-center gap-2 shadow-md hover:bg-green-500/90 transition-all duration-300 hover:scale-105"
            >
              {/* Toggle between hamburger and X icon */}
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              <span className="font-['Patrick_Hand'] text-base">MENU</span>
            </button>
          </div>

          {/* Desktop Navigation - Hidden on mobile, visible on medium screens and up */}
          <nav className="hidden md:block w-auto">
            <ul className="flex flex-row gap-10 lg:gap-12">
              {navItems.map((item, index) => (
                <li 
                  key={index} 
                  className="group relative transition-all duration-300 ease-in-out"
                  onMouseEnter={() => item.dropdown && handleMouseEnter(item.type)} // Show dropdown on hover
                  onMouseLeave={() => item.dropdown && setActiveDropdown(null)} // Hide dropdown on mouse leave
                >
                  {/* Main navigation link */}
                  <Link 
                    to={item.link}
                    className="no-underline text-base font-['Patrick_Hand'] font-medium uppercase tracking-wider transition-all duration-300 py-3 md:py-1.5 px-4 md:px-0 text-gray-50/90 mix-blend-overlay group-hover:text-yellow-400"
                  >
                    {item.label}
                  </Link>
                  {/* Render dropdown menu if item has dropdown and it's currently active */}
                  {item.dropdown && activeDropdown === item.type && renderDropdownMenu(item.dropdown)}
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Icons - Desktop - Hidden on mobile, visible on medium screens and up - Hidden for now */}
          <div className="hidden">
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

      {/* Mobile Menu Overlay - Full screen overlay that appears when mobile menu is open */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop - Clickable area to close menu */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu Container - Centered modal with navigation items */}
          <div className="relative h-full flex items-center justify-center p-4 sm:p-6">
            <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/50 w-full max-w-sm max-h-[85vh] overflow-y-auto">
              {/* Header - Menu title and close button */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
                <h2 className="text-2xl font-['Patrick_Hand'] text-white font-bold">Menu</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors p-2"
                >
                  <FiX size={24} />
                </button>
              </div>

              {/* Navigation Items - List of all main navigation items */}
              <nav className="p-6">
                <ul className="space-y-4">
                  {navItems.map((item, index) => (
                    <li key={index} className="group">
                      <Link 
                        to={item.link}
                        onClick={(e) => {
                          if (item.dropdown) {
                            // Prevent navigation and toggle dropdown instead
                            e.preventDefault();
                            setActiveDropdown(activeDropdown === item.type ? null : item.type);
                          } else {
                            // Close mobile menu and navigate
                            setIsMobileMenuOpen(false);
                          }
                        }}
                        className="flex items-center justify-between w-full text-xl font-['Patrick_Hand'] text-white hover:text-yellow-400 transition-all duration-300 py-3 px-4 rounded-lg hover:bg-gray-800/50"
                      >
                        <span>{item.label}</span>
                        {/* Show expand/collapse icon for items with dropdowns */}
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
                      
                      {/* Dropdown Items - Sub-navigation items that appear when parent is expanded */}
                      {item.dropdown && activeDropdown === item.type && (
                        <div className="mt-2 ml-2 mr-2 bg-gray-800/50 rounded-lg p-3 space-y-2 animate-in slide-in-from-top-2 duration-300">
                          {item.dropdown.map((subitem, subindex) => (
                            <Link
                              key={subindex}
                              to={subitem.link}
                              onClick={() => setIsMobileMenuOpen(false)} // Close menu when sub-item is clicked
                              className="block w-full text-gray-300 hover:text-yellow-400 py-2 px-3 rounded hover:bg-gray-700/50 text-base sm:text-lg font-['Patrick_Hand'] transition-all duration-300 break-words"
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

              {/* Footer with Social Icons - Social media links at bottom of mobile menu - Hidden for now */}
              <div className="hidden p-6 border-t border-gray-700/50">
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