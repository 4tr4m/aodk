import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaClock, FaUtensils, FaUser, FaHeart, FaShareAlt, FaChevronDown, FaChevronUp, FaInfoCircle } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import recipeService from '../../services/recipeService';
import ProductBaseIngredients from '../ProductModal/ProductBaseIngredients';
import SEO from '../SEO/SEO';
import TopNavBar from '../Headers/TopNavBar';
import CategoryHeader from './CategoryHeader';
import Footer from '../Footer/Footer';
import ProductNewsletter from '../ProductModal/ProductNewsletter';
import emailjs from '@emailjs/browser';

const RecipePage = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useCart();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [newsletterName, setNewsletterName] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isFullDescExpanded, setIsFullDescExpanded] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // The database uses slug-based IDs (e.g., "babeczka-14"), not numeric IDs
        const searchId = recipeId; // Use the slug directly
        
        // Try to find recipe in context first
        const allRecipes = Object.values(state.allRecipes).flat();
        const foundRecipe = allRecipes.find(r => r.id === searchId);
        
        if (foundRecipe) {
          setRecipe(foundRecipe);
          setIsInWishlist(state.wishlist.some(item => item.id === foundRecipe.id));
        } else {
          // If not found in context, fetch from Supabase
          const recipes = await recipeService.getAllRecipes();
          const supabaseRecipe = recipes.find(r => r.id === searchId);
          
          if (supabaseRecipe) {
            setRecipe(supabaseRecipe);
            setIsInWishlist(state.wishlist.some(item => item.id === supabaseRecipe.id));
          } else {
            setError('Przepis nie został znaleziony');
          }
        }
      } catch (err) {
        console.error('Error fetching recipe:', err);
        setError('Wystąpił błąd podczas ładowania przepisu');
      } finally {
        setLoading(false);
      }
    };

    if (recipeId) {
      fetchRecipe();
    }
  }, [recipeId, state.allRecipes, state.wishlist]);

  // Removed add to cart on recipe page

  const handleToggleWishlist = () => {
    if (recipe) {
      if (isInWishlist) {
        dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: recipe.id });
        setIsInWishlist(false);
      } else {
        dispatch({ type: 'ADD_TO_WISHLIST', payload: recipe });
        setIsInWishlist(true);
      }
    }
  };

  const handleShare = async () => {
    if (navigator.share && recipe) {
      try {
        await navigator.share({
          title: recipe.name,
          text: recipe.shortdesc,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // EmailJS (same config as ProductModal)
  const EMAILJS_PUBLIC_KEY = "0f8Jce-Gsw4GbjCQ_";
  const EMAILJS_SERVICE_ID = "service_m4uai4d";
  const EMAILJS_TEMPLATE_ID = "template_r7rcz39";

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setNewsletterSubmitting(true);
    try {
      emailjs.init(EMAILJS_PUBLIC_KEY);
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
      <div className="min-h-screen bg-gray-50">
        <TopNavBar />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopNavBar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Przepis nie został znaleziony</h1>
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Wróć do poprzedniej strony
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const getRecipeImageSrc = () => {
    if (!recipe?.image) return '/img/ciasta.jpg';
    // If image already looks like an absolute or starts with /img, use as is; else prefix with /img/
    if (typeof recipe.image === 'string' && (recipe.image.startsWith('http') || recipe.image.startsWith('/img/'))) {
      return recipe.image;
    }
    return `/img/${recipe.image}`;
  };

  return (
    <>
      <SEO 
        title={`${recipe.name} - Autyzm od kuchni`}
        description={recipe.shortdesc}
        image={recipe.image}
        url={window.location.href}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Top hero/header layer consistent with other pages */}
        <div className="relative mb-8">
          <CategoryHeader />
          <div className="absolute top-0 left-0 w-full">
            <TopNavBar />
          </div>
        </div>

        {/* Back/share/wishlist row under header */}
        <div className="max-w-6xl mx-auto px-4 -mt-6 mb-2">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 rounded-lg transition-all duration-200 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="font-medium">Wróć do kategorii</span>
            </motion.button>

            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
                title="Udostępnij"
              >
                <FaShareAlt />
              </button>
              <button
                onClick={handleToggleWishlist}
                className={`p-2 rounded-full transition-colors ${
                  isInWishlist 
                    ? 'text-red-500 hover:text-red-600 hover:bg-red-50' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
                title={isInWishlist ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
              >
                <FaHeart className={isInWishlist ? 'fill-current' : ''} />
              </button>
            </div>
          </div>
        </div>

        {/* Recipe Content */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Recipe Image */}
            <div className="relative h-64 sm:h-80 lg:h-96">
              <img
                src={getRecipeImageSrc()}
                alt={recipe.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = '/img/ciasta.jpg'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              {/* Recipe Info Overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 font-['Playfair_Display']">
                  {recipe.name}
                </h1>
                <p className="text-sm sm:text-base opacity-90 mb-4">
                  {recipe.shortdesc}
                </p>
                
                {/* Recipe Stats */}
                <div className="flex flex-wrap gap-4 text-sm">
                  {recipe.time && (
                    <div className="flex items-center gap-1">
                      <FaClock className="text-yellow-400" />
                      <span>{recipe.time}</span>
                    </div>
                  )}
                  {recipe.difficulty && (
                    <div className="flex items-center gap-1">
                      <FaUtensils className="text-green-400" />
                      <span>{recipe.difficulty}</span>
                    </div>
                  )}
                  {recipe.servings && (
                    <div className="flex items-center gap-1">
                      <FaUser className="text-blue-400" />
                      <span>{recipe.servings} porcji</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Recipe Details */}
            <div className="p-6 sm:p-8">
              {/* Recipe Description - moved to top, right after image */}
              {recipe.description && (
                <motion.div 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-4 font-['Playfair_Display'] flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Opis przepisu
                  </h2>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200/50 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="prose max-w-none">
                      <p className={`text-gray-700 leading-relaxed text-base sm:text-lg whitespace-pre-wrap transition-all duration-300 ${
                        !isDescriptionExpanded && recipe.description.length > 300 
                          ? 'overflow-hidden' 
                          : ''
                      }`} style={{
                        display: !isDescriptionExpanded && recipe.description.length > 300 ? '-webkit-box' : 'block',
                        WebkitLineClamp: !isDescriptionExpanded && recipe.description.length > 300 ? 4 : 'unset',
                        WebkitBoxOrient: 'vertical'
                      }}>
                        {recipe.description}
                      </p>
                      {recipe.description.length > 300 && (
                        <motion.button
                          onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                          className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 group"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {isDescriptionExpanded ? (
                            <>
                              <span>Pokaż mniej</span>
                              <FaChevronUp className="w-3 h-3 group-hover:translate-y-0.5 transition-transform duration-200" />
                            </>
                          ) : (
                            <>
                              <span>Czytaj więcej</span>
                              <FaChevronDown className="w-3 h-3 group-hover:translate-y-0.5 transition-transform duration-200" />
                            </>
                          )}
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Full Description (fulldesc) - collapsible section */}
              {recipe.fulldesc && recipe.fulldesc.trim() && (
                <motion.div 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {!isFullDescExpanded ? (
                    <motion.button
                      onClick={() => setIsFullDescExpanded(true)}
                      className="w-full text-left bg-gray-50 hover:bg-gray-100 rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors duration-200">
                            <FaInfoCircle className="w-5 h-5 text-green-600" />
                          </div>
                          <h2 className="text-xl font-bold text-gray-800 font-['Playfair_Display']">
                            Dowiedz się więcej o potrawie
                          </h2>
                        </div>
                        <FaChevronDown className="w-4 h-4 text-gray-600 group-hover:text-green-600 group-hover:translate-y-1 transition-all duration-200" />
                      </div>
                    </motion.button>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-800 mb-0 font-['Playfair_Display'] flex items-center gap-2">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                            <FaInfoCircle className="w-5 h-5 text-green-600" />
                          </div>
                          <span>Więcej o potrawie</span>
                        </h2>
                        <motion.button
                          onClick={() => setIsFullDescExpanded(false)}
                          className="flex items-center gap-2 text-gray-600 hover:text-green-600 font-medium transition-colors duration-200 group"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span>Zwiń</span>
                          <FaChevronUp className="w-3 h-3 group-hover:translate-y-0.5 transition-transform duration-200" />
                        </motion.button>
                      </div>
                      <motion.div 
                        className="bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm transition-all duration-300"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <div className="prose max-w-none">
                          <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg whitespace-pre-wrap break-words">
                            {recipe.fulldesc}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  )}
                  {/* Hidden content for SEO - always in DOM but visually hidden when collapsed */}
                  {!isFullDescExpanded && (
                    <div className="sr-only">
                      <p>{recipe.fulldesc}</p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Składniki (from Supabase) - main section under the description */}
              {(() => {
                const raw = recipe.ingredients;
                let items = [];
                if (Array.isArray(raw)) items = raw;
                else if (typeof raw === 'string') {
                  items = raw.includes('\n') ? raw.split(/\r?\n/) : raw.split(',');
                }
                const normalized = items.map(i => i.trim()).filter(Boolean);
                if (normalized.length === 0) return null;
                return (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 font-['Playfair_Display'] flex items-center gap-2">
                      <FaUtensils className="text-green-600" />
                      Składniki
                    </h2>
                    <ul className="list-disc pl-6 space-y-1 text-gray-800">
                      {normalized.map((ing, i) => (
                        <li key={i}>{ing}</li>
                      ))}
                    </ul>
                  </div>
                );
              })()}

              {/* Bases & Spices moved below interactive base ingredients */}

              {/* Preparation Steps */}
              {recipe.preparation && (
                <div className="mt-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 font-['Playfair_Display']">
                    Sposób przygotowania
                  </h2>
                  <div className="space-y-6">
                    {(() => {
                      const lines = recipe.preparation
                        .split(/\r?\n/)
                        .map(l => l.trim())
                        .filter(Boolean);
                      const steps = [];
                      let current = { title: null, items: [] };
                      lines.forEach(l => {
                        if (/^\d+\./.test(l) || l.endsWith(':')) {
                          if (current.title || current.items.length) steps.push(current);
                          current = { title: l.replace(/^\d+\.\s*/, '').replace(/:$/, ''), items: [] };
                        } else {
                          current.items.push(l);
                        }
                      });
                      if (current.title || current.items.length) steps.push(current);
                      return steps.map((s, idx) => (
                        <div key={idx}>
                          {s.title && (
                            <h3 className="text-base font-semibold text-gray-700 mb-2">{s.title}</h3>
                          )}
                          {s.items.length > 0 && (
                            <ul className="list-disc pl-6 space-y-1 text-gray-700">
                              {s.items.map((it, i) => (
                                <li key={i}>{it}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              )}

              {/* Category */}
              {recipe.category && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Kategoria:</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {recipe.category}
                    </span>
                  </div>
                </div>
              )}

              {/* Podstawowe składniki (interactive tags) moved to the bottom */}
              <ProductBaseIngredients recipe={recipe} />

              {/* Bases & Spices (now under Podstawowe składniki) */}
              {(() => {
                const baseText = (recipe.base || recipe.bases || recipe.podstawa || '').toString();
                const spicesText = (recipe.spices || recipe.przyprawy || '').toString();
                const hasAny = baseText.trim().length > 0 || spicesText.trim().length > 0;
                return hasAny;
              })() && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 font-['Playfair_Display']">Podstawa i Przyprawy</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">Podstawa</h3>
                      <div className="flex flex-wrap gap-2">
                        {(recipe.base || recipe.bases || recipe.podstawa || '')
                          .toString()
                          .split(',')
                          .map(i => i.trim())
                          .filter(Boolean)
                          .map((i, idx) => (
                          <span key={idx} className="px-3 py-1 rounded-full text-sm bg-white text-gray-700 border border-gray-200">{i}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">Przyprawy</h3>
                      <div className="flex flex-wrap gap-2">
                        {(recipe.spices || recipe.przyprawy || '')
                          .toString()
                          .split(',')
                          .map(i => i.trim())
                          .filter(Boolean)
                          .map((i, idx) => (
                          <span key={idx} className="px-3 py-1 rounded-full text-sm bg-white text-gray-700 border border-gray-200">{i}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Newsletter at the very bottom */}
              <ProductNewsletter
                newsletterName={newsletterName}
                setNewsletterName={setNewsletterName}
                newsletterEmail={newsletterEmail}
                setNewsletterEmail={setNewsletterEmail}
                newsletterSubmitting={newsletterSubmitting}
                newsletterSubmitted={newsletterSubmitted}
                handleNewsletterSubmit={handleNewsletterSubmit}
              />
            </div>
          </motion.div>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default RecipePage;
