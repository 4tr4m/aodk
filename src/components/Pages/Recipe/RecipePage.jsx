import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaClock, FaUtensils, FaUser, FaHeart, FaShareAlt, FaChevronDown, FaChevronUp, FaInfoCircle, FaTimes } from 'react-icons/fa';
import { useCart } from '../../../context/CartContext';
import recipeService from '../../../services/recipeService';
import ProductBaseIngredients from './ProductBaseIngredients';
import StickyIngredientsSidebar from './StickyIngredientsSidebar';
import SEO from '../../SEO/SEO';
import TopNavBar from '../../Headers/TopNavBar';
import CategoryHeader from '../Category/CategoryHeader';
import Footer from '../../Footer/Footer';
import NewsletterModal from '../../Modal/NewsletterModal';
import FeedbackButton from '../../Feedback/FeedbackButton';

const RecipePage = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useCart();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isFullDescExpanded, setIsFullDescExpanded] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isStickyIngredientsVisible, setIsStickyIngredientsVisible] = useState(false);
  const [isStickyIngredientsOpen, setIsStickyIngredientsOpen] = useState(true);
  const [isBaseSpicesExpanded, setIsBaseSpicesExpanded] = useState(false);
  const ingredientsRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isImageModalOpen) {
        setIsImageModalOpen(false);
      }
    };
    
    if (isImageModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isImageModalOpen]);

  // Scroll detection for sticky ingredients - show earlier for better UX
  useEffect(() => {
    if (!recipe?.ingredients) {
      setIsStickyIngredientsVisible(false);
      return;
    }

    const handleScroll = () => {
      const isOnDesktop = window.innerWidth >= 1024;
      
      if (!isOnDesktop) {
        setIsStickyIngredientsVisible(false);
        return;
      }

      // Check if ingredientsRef is available
      if (!ingredientsRef.current) {
        // Wait a bit for DOM to be ready, then show sidebar
        return;
      }

      const ingredientsElement = ingredientsRef.current;
      const rect = ingredientsElement.getBoundingClientRect();
      
      // Show sticky sidebar when ingredients section bottom is above 400px from top of viewport
      // This means user has scrolled past the ingredients section
      const isPastIngredients = rect.bottom < 400;
      
      if (isPastIngredients) {
        setIsStickyIngredientsVisible(true);
      } else {
        setIsStickyIngredientsVisible(false);
        // Reset open state when scrolling back up to ingredients section
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setIsStickyIngredientsOpen(true);
        }
      }
    };

    // Initial check with delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      handleScroll();
    }, 300);

    // Also check after a longer delay in case DOM takes time
    const timeoutId2 = setTimeout(() => {
      handleScroll();
    }, 1000);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(timeoutId2);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [recipe?.ingredients, loading]);

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

  // Check if user has already subscribed and show modal based on recipe opens
  useEffect(() => {
    if (!loading && recipe) {
      // Check localStorage for newsletter subscription
      const hasSubscribed = localStorage.getItem('newsletter_subscribed') === 'true';
      
      // Don't show if already subscribed
      if (hasSubscribed) return;
      
      // Special case: always show for mieszanka-2 recipe
      const isMieszankaRecipe = recipe.id === 'mieszanka-2' || recipe.id?.includes('mieszanka');
      
      if (isMieszankaRecipe) {
        // Always show modal for mieszanka recipe
        const timer = setTimeout(() => {
          setIsNewsletterModalOpen(true);
        }, 500);
        return () => clearTimeout(timer);
      }
      
      // For other recipes: count opens and show after 5 opens
      const recipeOpensKey = 'recipe_opens_count';
      let opensCount = parseInt(localStorage.getItem(recipeOpensKey) || '0', 10);
      
      // Increment count for this recipe open
      opensCount += 1;
      localStorage.setItem(recipeOpensKey, opensCount.toString());
      
      // Show modal after 5 opens
      if (opensCount >= 5) {
        const timer = setTimeout(() => {
          setIsNewsletterModalOpen(true);
          // Reset counter after showing modal
          localStorage.setItem(recipeOpensKey, '0');
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [loading, recipe]);

  // Removed add to cart on recipe page

  const handleNewsletterSuccess = () => {
    // Save to localStorage that user has subscribed
    localStorage.setItem('newsletter_subscribed', 'true');
    setIsNewsletterModalOpen(false);
  };

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

  // Helper function to replace {LINK} with actual link to mieszanka-2
  const replaceLinkPlaceholder = (text) => {
    if (!text || typeof text !== 'string') return text;
    return text.replace(
      /\{LINK\}/g,
      '<a href="/przepis/mieszanka-2" class="text-green-600 hover:text-green-700 underline font-medium">uniwersalnej mieszanki mąk bezglutenowych</a>'
    );
  };

  // Helper function to capitalize first letter of each word
  const capitalizeFirstLetter = (text) => {
    if (!text || typeof text !== 'string') return text;
    return text
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Helper function to process ingredients for sticky sidebar
  const processIngredients = (ingredientsData) => {
    const ingredientsToProcess = ingredientsData || recipe?.ingredients;
    if (!ingredientsToProcess) return { groups: [], hasGroups: false, normalized: [] };
    
    const raw = ingredientsToProcess;
    let items = [];
    if (Array.isArray(raw)) items = raw;
    else if (typeof raw === 'string') {
      items = raw.includes('\n') ? raw.split(/\r?\n/) : raw.split(',');
    }
    const normalized = items.map(i => i.trim()).filter(Boolean);
    if (normalized.length === 0) return { groups: [], hasGroups: false };

    // Group ingredients by "Na" headers
    const groups = [];
    let currentGroup = { title: null, items: [] };
    let hasGroups = false;

    normalized.forEach((item) => {
      const trimmed = item.replace(/^\*\*|\*\*$/g, '').trim();
      if (trimmed.match(/^Na\s+[^:]+:/i)) {
        hasGroups = true;
        if (currentGroup.title || currentGroup.items.length > 0) {
          groups.push(currentGroup);
        }
        currentGroup = {
          title: trimmed.replace(/:/g, '').trim(),
          items: []
        };
      } else {
        currentGroup.items.push(item);
      }
    });

    if (currentGroup.title || currentGroup.items.length > 0) {
      groups.push(currentGroup);
    }

    return { groups, hasGroups, normalized };
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
            <div className="relative h-48 sm:h-64 lg:h-72 cursor-pointer" onClick={() => setIsImageModalOpen(true)}>
              <img
                src={getRecipeImageSrc()}
                alt={recipe.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
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
                  className="mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {!isFullDescExpanded ? (
                    <motion.button
                      onClick={() => setIsFullDescExpanded(true)}
                      className="w-full text-left bg-gray-50 hover:bg-gray-100 rounded-lg p-2.5 sm:p-3 border border-gray-200 shadow-sm hover:shadow transition-all duration-300 group"
                      whileHover={{ scale: 1.005 }}
                      whileTap={{ scale: 0.995 }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 sm:gap-2.5">
                          <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors duration-200 flex-shrink-0">
                            <FaInfoCircle className="w-4 h-4 text-green-600" />
                          </div>
                          <h2 className="text-sm sm:text-base font-semibold text-gray-800 font-['Playfair_Display']">
                            Dowiedz się więcej o potrawie
                          </h2>
                        </div>
                        <FaChevronDown className="w-3.5 h-3.5 text-gray-500 group-hover:text-green-600 group-hover:translate-y-0.5 transition-all duration-200 flex-shrink-0" />
                      </div>
                    </motion.button>
                  ) : (
                    <motion.div
                      initial={false}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.button
                        onClick={() => setIsFullDescExpanded(false)}
                        className="w-full flex items-center justify-between gap-3 p-2.5 sm:p-3 mb-2.5 sm:mb-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                        whileHover={{ scale: 1.005 }}
                        whileTap={{ scale: 0.995 }}
                      >
                        <h2 className="text-sm sm:text-base font-semibold text-gray-800 mb-0 font-['Playfair_Display'] flex items-center gap-2 group-hover:text-green-600 transition-colors">
                          <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors duration-200 flex-shrink-0">
                            <FaInfoCircle className="w-4 h-4 text-green-600" />
                          </div>
                          <span>Więcej o potrawie</span>
                        </h2>
                        <div className="flex items-center gap-1.5 text-gray-600 group-hover:text-green-600 font-medium text-sm transition-colors duration-200 flex-shrink-0">
                          <span>Zwiń</span>
                          <FaChevronUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform duration-200" />
                        </div>
                      </motion.button>
                      <motion.div 
                        className="bg-gray-50 rounded-lg border border-gray-200 shadow-sm overflow-hidden"
                        initial={{ maxHeight: 0, opacity: 0 }}
                        animate={{ 
                          maxHeight: isFullDescExpanded ? 5000 : 0,
                          opacity: isFullDescExpanded ? 1 : 0
                        }}
                        transition={{ 
                          maxHeight: {
                            duration: 0.4,
                            ease: [0.04, 0.62, 0.23, 0.98]
                          },
                          opacity: {
                            duration: 0.25,
                            delay: isFullDescExpanded ? 0.08 : 0
                          }
                        }}
                      >
                        <div className="p-3 sm:p-4 prose max-w-none">
                          <p className="text-gray-700 leading-relaxed text-sm sm:text-base whitespace-pre-wrap break-words">
                            {recipe.fulldesc}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
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
                const { groups, hasGroups, normalized } = processIngredients();
                if (!normalized || normalized.length === 0) return null;

                return (
                  <div className="mb-8" ref={ingredientsRef}>
                    <h2 className="text-xl font-bold text-gray-800 mb-4 font-['Playfair_Display'] flex items-center gap-2">
                      <FaUtensils className="text-green-600" />
                      Składniki
                    </h2>
                    
                    {hasGroups ? (
                      <div className="space-y-6">
                        {groups.map((group, groupIdx) => (
                          <div key={groupIdx} className="bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl p-4 sm:p-5 border border-gray-200">
                            {group.title && (
                              <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 font-['Playfair_Display'] flex items-center gap-2 pb-2 border-b border-gray-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                                {group.title}
                              </h3>
                            )}
                            <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-gray-800">
                              {group.items.map((ing, i) => (
                                <li key={i} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: replaceLinkPlaceholder(ing) }} />
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <ul className="list-disc pl-6 space-y-1 text-gray-800">
                        {normalized.map((ing, i) => (
                          <li key={i} dangerouslySetInnerHTML={{ __html: replaceLinkPlaceholder(ing) }} />
                        ))}
                      </ul>
                    )}
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
                                <li key={i} dangerouslySetInnerHTML={{ __html: replaceLinkPlaceholder(it) }} />
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

              {/* Bases & Spices (now under Podstawowe składniki) - collapsible */}
              {(() => {
                const baseText = (recipe.base || recipe.bases || recipe.podstawa || '').toString();
                const spicesText = (recipe.spices || recipe.przyprawy || '').toString();
                const hasAny = baseText.trim().length > 0 || spicesText.trim().length > 0;
                
                if (!hasAny) return null;
                
                // Combine all tags into one array
                const baseItems = (baseText || '')
                  .split(',')
                  .map(i => i.trim())
                  .filter(Boolean)
                  .map(i => capitalizeFirstLetter(i));
                
                const spicesItems = (spicesText || '')
                  .split(',')
                  .map(i => i.trim())
                  .filter(Boolean)
                  .map(i => capitalizeFirstLetter(i));
                
                const allItems = [...baseItems, ...spicesItems];
                
                return (
                  <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                    <motion.button
                      onClick={() => setIsBaseSpicesExpanded(!isBaseSpicesExpanded)}
                      className="w-full flex items-center justify-between gap-3 p-2.5 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                      whileHover={{ scale: 1.005 }}
                      whileTap={{ scale: 0.995 }}
                    >
                      <h2 className="text-base sm:text-lg font-semibold text-gray-800 font-['Playfair_Display'] flex items-center gap-2">
                        <FaUtensils className="text-green-600 text-sm sm:text-base" />
                        Podstawa i Przyprawy
                      </h2>
                      <motion.div
                        animate={{ rotate: isBaseSpicesExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FaChevronDown className="w-3.5 h-3.5 text-gray-500 group-hover:text-green-600 transition-colors duration-200 flex-shrink-0" />
                      </motion.div>
                    </motion.button>
                    
                    <AnimatePresence>
                      {isBaseSpicesExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ 
                            height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
                            opacity: { duration: 0.2, delay: 0.05 }
                          }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 sm:pt-4 pb-2">
                            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
                              {allItems.map((item, idx) => (
                                <motion.span
                                  key={idx}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: idx * 0.03, duration: 0.2 }}
                                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm bg-white text-gray-700 border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200 whitespace-nowrap cursor-default"
                                >
                                  {item}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })()}

              {/* Newsletter CTA at the very bottom */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 sm:p-8 relative overflow-hidden text-center">
                  <div className="absolute -right-8 -top-8 w-24 h-24 bg-green-200 rounded-full opacity-50 blur-2xl"></div>
                  <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-green-300 rounded-full opacity-30 blur-3xl"></div>
                  <div className="relative z-10">
                    <h3 className="font-['Playfair_Display'] text-xl sm:text-2xl text-green-800 font-bold mb-3">
                      Dołącz do naszej społeczności!
                    </h3>
                    <p className="text-sm sm:text-base text-green-700 mb-6 leading-relaxed max-w-2xl mx-auto">
                      Odkryj więcej przepisów dostosowanych do potrzeb dzieci z autyzmem. 
                      Otrzymuj powiadomienia o nowych przepisach i ekskluzywne porady prosto na swoją skrzynkę.
                    </p>
                    <motion.button
                      onClick={() => setIsNewsletterModalOpen(true)}
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg transition-all duration-300 font-semibold text-base shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mx-auto"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Zapisz się do newslettera</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <FeedbackButton />
        <Footer />
      </div>

      {/* Sticky Ingredients Sidebar */}
      {recipe?.ingredients && (
        <StickyIngredientsSidebar
          isVisible={isStickyIngredientsVisible}
          isOpen={isStickyIngredientsOpen}
          onOpen={() => {
            console.log('Opening sticky sidebar');
            setIsStickyIngredientsOpen(true);
          }}
          onClose={() => {
            console.log('Closing sticky sidebar');
            setIsStickyIngredientsOpen(false);
          }}
          ingredients={recipe.ingredients}
          processIngredients={processIngredients}
          replaceLinkPlaceholder={replaceLinkPlaceholder}
        />
      )}
      
      {/* Debug info - remove after testing */}
      {process.env.NODE_ENV === 'development' && recipe?.ingredients && (
        <div className="fixed bottom-4 left-4 bg-black/80 text-white p-2 rounded text-xs z-50">
          <div>isVisible: {isStickyIngredientsVisible ? 'true' : 'false'}</div>
          <div>isOpen: {isStickyIngredientsOpen ? 'true' : 'false'}</div>
          <div>hasIngredients: {recipe.ingredients ? 'true' : 'false'}</div>
          <div>isDesktop: {window.innerWidth >= 1024 ? 'true' : 'false'}</div>
        </div>
      )}

      {/* Image Modal */}
      <AnimatePresence>
        {isImageModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsImageModalOpen(false);
              }
            }}
          >
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] flex flex-col"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsImageModalOpen(false)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
                aria-label="Zamknij"
              >
                <FaTimes size={32} className="bg-black/50 rounded-full p-2 hover:bg-black/70" />
              </button>
              
              {/* Image Container */}
              <div className="relative flex-1 overflow-hidden rounded-t-2xl bg-gray-100 min-h-[400px]">
                <img
                  src={getRecipeImageSrc()}
                  alt={recipe.name}
                  className="w-full h-full object-contain p-4 sm:p-8"
                  onError={(e) => { e.currentTarget.src = '/img/ciasta.jpg'; }}
                />
              </div>
              
              {/* Image Footer */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 rounded-b-2xl border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 font-['Playfair_Display'] mb-1">
                  {recipe.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {recipe.shortdesc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Newsletter Modal */}
      <NewsletterModal
        isOpen={isNewsletterModalOpen}
        onClose={() => setIsNewsletterModalOpen(false)}
        onSuccess={handleNewsletterSuccess}
      />
    </>
  );
};

export default RecipePage;
