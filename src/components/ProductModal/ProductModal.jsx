import React, { useRef, useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import supabase from '../../lib/supabase-browser';
import emailjs from '@emailjs/browser';
import ProductImage from './ProductImage';
import ProductHeader from './ProductHeader';
import ProductDescription from './ProductDescription';
import ProductIngredients from './ProductIngredients';
import ProductPreparation from './ProductPreparation';
import ProductNewsletter from './ProductNewsletter';
import ProductBaseIngredients from './ProductBaseIngredients';

// EmailJS credentials (same as ContactPage)
const EMAILJS_PUBLIC_KEY = "0f8Jce-Gsw4GbjCQ_";
const EMAILJS_SERVICE_ID = "service_m4uai4d";
const EMAILJS_TEMPLATE_ID = "template_r7rcz39";

emailjs.init(EMAILJS_PUBLIC_KEY);

const ProductModal = ({ product, onClose }) => {
  const modalRef = useRef();
  const scrollContainerRef = useRef();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageHeight, setImageHeight] = useState(160);
  const [imageOpacity, setImageOpacity] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [newsletterName, setNewsletterName] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      if (!mobile) {
        setImageHeight(160);
        setImageOpacity(1);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const handleScroll = () => {
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) return;
      const scrollY = scrollContainer.scrollTop;
      const maxScroll = 50;
      const progress = Math.min(1, scrollY / maxScroll);
      const newHeight = Math.max(0, 160 * (1 - progress));
      const newOpacity = Math.max(0, 1 - progress);
      if (scrollY >= maxScroll) {
        setImageHeight(0);
        setImageOpacity(0);
      } else {
        setImageHeight(newHeight);
        setImageOpacity(newOpacity);
      }
    };
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: false });
      handleScroll();
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, [isMobile]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const { data, error } = await supabase
          .from('recipes')
          .select('*')
          .eq('id', product.id)
          .single();
        if (error) throw error;
        setRecipe(data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      } finally {
        setLoading(false);
      }
    };
    if (product?.id) {
      fetchRecipe();
    }
  }, [product?.id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const formatPreparation = (preparation) => {
    if (!preparation) return [];
    const steps = preparation.split(/\d+\.\s+/).filter(Boolean);
    return steps.length > 1 ? steps : [preparation];
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setNewsletterSubmitting(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          title: "Newsletter Subscription",
          name: newsletterName,
          email: newsletterEmail,
          message: `Nowy użytkownik zapisał się do newslettera. Email: ${newsletterEmail}`,
          time: new Date().toLocaleString(),
        }
      );
      setNewsletterSubmitted(true);
      setNewsletterName("");
      setNewsletterEmail("");
      setTimeout(() => setNewsletterSubmitted(false), 3000);
    } catch (error) {
      alert("Wystąpił błąd podczas zapisu do newslettera. Spróbuj ponownie później.");
      console.error("Newsletter subscription error:", error);
    } finally {
      setNewsletterSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return null;
  }

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-0 sm:p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative bg-white w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-4xl rounded-none sm:rounded-2xl shadow-2xl sm:my-4 sm:mx-4 overflow-hidden"
          ref={modalRef}
        >
          {/* Category badge */}
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-green-600 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium uppercase tracking-wide">
              {recipe.category}
            </span>
          </div>
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm rounded-full p-2 
              hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            aria-label="Close modal"
          >
            <FiX size={20} className="text-gray-600" />
          </button>
          <div className="flex flex-col h-full sm:max-h-[90vh]">
            <ProductImage recipe={recipe} isMobile={isMobile} imageHeight={imageHeight} imageOpacity={imageOpacity} />
            <div 
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto px-3 xs:px-4 sm:px-6 md:px-8 py-4 sm:py-6 overscroll-contain scroll-smooth"
            >
              <ProductHeader recipe={recipe} />
              <ProductDescription recipe={recipe} />
              <ProductIngredients recipe={recipe} />
              <ProductPreparation recipe={recipe} formatPreparation={formatPreparation} />
              <ProductNewsletter
                newsletterName={newsletterName}
                setNewsletterName={setNewsletterName}
                newsletterEmail={newsletterEmail}
                setNewsletterEmail={setNewsletterEmail}
                newsletterSubmitting={newsletterSubmitting}
                newsletterSubmitted={newsletterSubmitted}
                handleNewsletterSubmit={handleNewsletterSubmit}
              />
              <ProductBaseIngredients recipe={recipe} />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductModal; 