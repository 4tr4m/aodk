import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import categoryService from '../../services/categoryService';

const TopNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null); // eslint-disable-line no-unused-vars
  const location = useLocation();
  const navRef = useRef(null);

  // Load categories from Supabase
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await categoryService.getCategories();
        setCategories(fetchedCategories);
        setError(null);
      } catch (err) {
        console.error('Error loading categories:', err);
        setError('Nie udało się załadować kategorii');
      }
    };

    loadCategories();
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav ref={navRef} className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isOpen ? 'bg-black/90' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-white font-bold text-xl">
              Autyzm Kuchni
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-gray-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Strona główna
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={category.link}
                  className="text-gray-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  {category.label}
                </Link>
              ))}
              <Link to="/search" className="text-gray-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Szukaj
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className={`inline-flex items-center justify-center p-2 rounded-md text-gray-100 hover:text-white focus:outline-none ${isOpen ? 'bg-black/90' : 'bg-black/70'}`}
              aria-label={isOpen ? 'Close main menu' : 'Open main menu'}
            >
              <span className="sr-only">{isOpen ? 'Close main menu' : 'Open main menu'}</span>
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/90"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className="text-gray-100 hover:bg-gray-800 block px-3 py-2 rounded-md text-base font-medium"
              >
                Strona główna
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={category.link}
                  className="text-gray-100 hover:bg-gray-800 block px-3 py-2 rounded-md text-base font-medium"
                >
                  {category.label}
                </Link>
              ))}
              <Link
                to="/search"
                className="text-gray-100 hover:bg-gray-800 block px-3 py-2 rounded-md text-base font-medium"
              >
                Szukaj
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default TopNavBar;