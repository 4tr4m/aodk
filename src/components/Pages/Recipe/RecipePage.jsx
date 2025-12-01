import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../../context/CartContext';
import ProductBaseIngredients from './ProductBaseIngredients';
import StickyIngredientsSidebar from './StickyIngredientsSidebar';
import StickyIngredientsSidebarMobile from './StickyIngredientsSidebarMobile';
import RecipeHeader from './RecipeHeader';
import RecipeHero from './RecipeHero';
import RecipeDescription from './RecipeDescription';
import RecipeFullDescription from './RecipeFullDescription';
import RecipeIngredients from './RecipeIngredients';
import RecipePreparation from './RecipePreparation';
import RecipeBasesSpices from './RecipeBasesSpices';
import RecipeNewsletterCTA from './RecipeNewsletterCTA';
import RecipeImageModal from './RecipeImageModal';
import SEO from '../../SEO/SEO';
import TopNavBar from '../../Headers/TopNavBar';
import CategoryHeader from '../Category/CategoryHeader';
import Footer from '../../Footer/Footer';
import NewsletterModal from '../../Modal/NewsletterModal';
import FeedbackButton from '../../Feedback/FeedbackButton';
import { useRecipeData } from './hooks/useRecipeData';
import { useRecipeScrollDetection } from './hooks/useRecipeScrollDetection';
import { processIngredients as processIngredientsUtil, replaceLinkPlaceholder, getRecipeUrl } from '../../../utils/recipeUtils';

const RecipePage = () => {
  const { recipeId } = useParams(); // Support both /przepis/:recipeId and /kuchnia/:categorySlug/:recipeId
  const navigate = useNavigate();
  const { dispatch } = useCart();
  
  const { recipe, loading, error, isInWishlist, setIsInWishlist } = useRecipeData(recipeId);
  const { isStickyIngredientsVisible, ingredientsRef } = useRecipeScrollDetection(recipe, loading);

  // Helper function to convert category to slug
  const getCategorySlug = (category) => {
    if (!category) return '';
    const categoryMap = {
      'OBIADY': 'obiady',
      'ZUPY': 'zupy',
      'CHLEBY': 'chleby',
      'SMAROWIDŁA': 'smarowidla',
      'DESERY': 'desery',
      'BABECZKI i MUFFINY': 'babeczki-i-muffiny',
      'CIASTA': 'ciasta',
      'CIASTKA': 'ciastka',
      'SMOOTHIE': 'smoothie',
      'INNE': 'inne',
      'ŚWIĘTA': 'swieta',
      'SNAKI': 'snaki',
      'SAŁATKI/SUROWKI': 'salatki-surowki',
      'LUNCH': 'lunch'
    };
    return categoryMap[category] || category.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-');
  };

  // Generate keywords for recipe with new important keywords
  const generateRecipeKeywords = (recipe) => {
    if (!recipe) return '';
    
    const baseKeywords = [
      'dieta bezglutenowa autyzm', // Najważniejsze - na początku
      'dieta autyzm',
      'autyzm leczenie',
      recipe.name,
      'przepis bez glutenu',
      'przepis bez nabiału',
      'przepis bez cukru',
      recipe.category ? recipe.category.toLowerCase() : '',
      'dieta eliminacyjna',
      'autyzm',
      'przepisy dla autyzmu',
      'bezglutenowe przepisy',
      'bezmleczne dania',
      'zdrowe przepisy',
      'przepisy wspierające autyzm'
    ].filter(Boolean);
    
    return baseKeywords.join(', ');
  };

  // Generate Schema.org Recipe structured data
  const generateRecipeSchema = (recipe) => {
    if (!recipe) return null;

    const baseUrl = "https://www.autyzmodkuchni.pl";
    
    // Process ingredients - clean HTML and extract text
    const { normalized } = processIngredientsUtil(recipe.ingredients);
    const recipeIngredients = (normalized || []).map(ing => {
      // Remove HTML tags and {LINK} placeholders for Schema.org
      return ing
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/\{LINK\}/g, 'uniwersalnej mieszanki mąk bezglutenowych')
        .trim();
    }).filter(Boolean);
    
    // Process preparation steps
    let recipeInstructions = [];
    if (recipe.preparation) {
      const cleanPreparation = recipe.preparation
        .replace(/zdrowego.*$/gis, '')
        .replace(/smacznego.*$/gis, '')
        .trim();
      const lines = cleanPreparation
        .split(/\r?\n/)
        .map(l => l.trim())
        .filter(Boolean);
      
      let stepCounter = 1;
      let currentStepText = '';
      
      lines.forEach(line => {
        // Skip "Na" headers
        if (line.match(/^Na\s+[^:]+:/i)) {
          return;
        }
        
        // Check if line starts with a number (new step)
        if (/^\d+\./.test(line)) {
          // Save previous step if exists
          if (currentStepText.trim()) {
            recipeInstructions.push({
              "@type": "HowToStep",
              "position": stepCounter++,
              "text": currentStepText.trim()
            });
          }
          // Start new step
          currentStepText = line.replace(/^\d+\.\s*/, '').trim();
        } else if (line.length > 0) {
          // Continue current step
          if (currentStepText) {
            currentStepText += ' ' + line;
          } else {
            currentStepText = line;
          }
        }
      });
      
      // Add last step
      if (currentStepText.trim()) {
        recipeInstructions.push({
          "@type": "HowToStep",
          "position": stepCounter,
          "text": currentStepText.trim()
        });
      }
      
      // Clean HTML from instructions
      recipeInstructions = recipeInstructions.map(step => ({
        ...step,
        text: step.text
          .replace(/<[^>]*>/g, '') // Remove HTML tags
          .replace(/\{LINK\}/g, 'uniwersalnej mieszanki mąk bezglutenowych')
          .trim()
      }));
    }

    // Get absolute image URL
    const getAbsoluteImageUrl = (imagePath) => {
      if (!imagePath) return `${baseUrl}/img/logo_bckgd.png`;
      if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
      }
      if (imagePath.startsWith('/')) {
        return `${baseUrl}${imagePath}`;
      }
      return `${baseUrl}/img/${imagePath}`;
    };

    const recipeSchema = {
      "@context": "https://schema.org",
      "@type": "Recipe",
      "name": recipe.name,
      "description": recipe.shortdesc || recipe.description || "",
      "image": getAbsoluteImageUrl(recipe.image),
      "recipeCategory": recipe.category || "",
      "recipeCuisine": "Polish",
      "recipeIngredient": recipeIngredients,
      "author": {
        "@type": "Organization",
        "name": "Autyzm od Kuchni"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Autyzm od Kuchni",
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/img/logo_bckgd.png`
        }
      },
      "url": typeof window !== 'undefined' ? window.location.href : `${baseUrl}${getRecipeUrl(recipe.id, recipe.category)}`
    };

    // Only add recipeInstructions if we have steps
    if (recipeInstructions.length > 0) {
      recipeSchema.recipeInstructions = recipeInstructions;
    }

    return recipeSchema;
  };

  // Generate BreadcrumbList structured data
  const generateBreadcrumbSchema = (recipe) => {
    if (!recipe) return null;

    const baseUrl = "https://www.autyzmodkuchni.pl";
    const categorySlug = getCategorySlug(recipe.category);
    const categoryName = recipe.category || 'Przepisy';

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Strona główna",
          "item": `${baseUrl}/`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Kuchnia",
          "item": `${baseUrl}/kuchnia`
        },
        ...(categorySlug ? [{
          "@type": "ListItem",
          "position": 3,
          "name": categoryName,
          "item": `${baseUrl}/kuchnia/${categorySlug}`
        }] : []),
        {
          "@type": "ListItem",
          "position": categorySlug ? 4 : 3,
          "name": recipe.name,
          "item": typeof window !== 'undefined' ? window.location.href : `${baseUrl}/przepis/${recipe.id}`
        }
      ]
    };
  };
  
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isFullDescExpanded, setIsFullDescExpanded] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isStickyIngredientsOpen, setIsStickyIngredientsOpen] = useState(false);
  const [isStickyIngredientsOpenMobile, setIsStickyIngredientsOpenMobile] = useState(false);
  const [isBaseSpicesExpanded, setIsBaseSpicesExpanded] = useState(false);
  
  // Initialize isDesktop correctly - check on mount
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return false;
  });

  // Check if we're on desktop and update on resize
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    // Check immediately
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Handle escape key for image modal
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

  // Newsletter modal logic
  useEffect(() => {
    if (!loading && recipe) {
      const hasSubscribed = localStorage.getItem('newsletter_subscribed') === 'true';
      if (hasSubscribed) return;
      
      const isMieszankaRecipe = recipe.id === 'mieszanka-2' || recipe.id?.includes('mieszanka');
      
      if (isMieszankaRecipe) {
        const timer = setTimeout(() => {
          setIsNewsletterModalOpen(true);
        }, 500);
        return () => clearTimeout(timer);
      }
      
      const recipeOpensKey = 'recipe_opens_count';
      let opensCount = parseInt(localStorage.getItem(recipeOpensKey) || '0', 10);
      opensCount += 1;
      localStorage.setItem(recipeOpensKey, opensCount.toString());
      
      if (opensCount >= 5) {
        const timer = setTimeout(() => {
          setIsNewsletterModalOpen(true);
          localStorage.setItem(recipeOpensKey, '0');
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [loading, recipe]);

  const handleNewsletterSuccess = () => {
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
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const processIngredients = (ingredientsData) => {
    return processIngredientsUtil(ingredientsData || recipe?.ingredients);
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

  // Generate SEO data
  const recipeKeywords = generateRecipeKeywords(recipe);
  const recipeSchema = generateRecipeSchema(recipe);
  const breadcrumbSchema = generateBreadcrumbSchema(recipe);
  
  // Combine structured data
  const structuredData = [recipeSchema, breadcrumbSchema].filter(Boolean);

  return (
    <>
      <SEO 
        title={`${recipe.name} - Przepis bez glutenu, nabiału i cukru | Autyzm od Kuchni`}
        description={recipe.shortdesc || `${recipe.name} - przepis bez glutenu, nabiału i cukru idealny dla osób z autyzmem.`}
        keywords={recipeKeywords}
        ogType="recipe"
        ogImage={recipe.image}
        canonical={typeof window !== 'undefined' ? window.location.href : undefined}
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-gray-50">
        <div className="relative mb-8">
          <CategoryHeader showLogo={false} />
          <div className="absolute top-0 left-0 w-full">
            <TopNavBar />
          </div>
        </div>

        <RecipeHeader
          onBack={() => navigate(-1)}
          onShare={handleShare}
          onToggleWishlist={handleToggleWishlist}
          isInWishlist={isInWishlist}
        />

        <div className="max-w-6xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <RecipeHero 
              recipe={recipe} 
              onImageClick={() => setIsImageModalOpen(true)} 
            />

            <div className="p-6 sm:p-8">
              <RecipeDescription
                description={recipe.description}
                isExpanded={isDescriptionExpanded}
                onToggle={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              />

              <RecipeFullDescription
                fulldesc={recipe.fulldesc}
                isExpanded={isFullDescExpanded}
                onToggle={() => setIsFullDescExpanded(!isFullDescExpanded)}
              />

              {/* Hide main ingredients list when sticky sidebar is open on desktop */}
              {/* On desktop: hide when sidebar is open. On mobile: always show */}
              {(!isDesktop || !isStickyIngredientsOpen) && (
                <RecipeIngredients
                  ingredients={recipe.ingredients}
                  ingredientsRef={ingredientsRef}
                />
              )}

              <RecipePreparation preparation={recipe.preparation} />

              <ProductBaseIngredients recipe={recipe} />

              <RecipeBasesSpices
                recipe={recipe}
                isExpanded={isBaseSpicesExpanded}
                onToggle={() => setIsBaseSpicesExpanded(!isBaseSpicesExpanded)}
              />

              <RecipeNewsletterCTA
                onOpenModal={() => setIsNewsletterModalOpen(true)}
              />
            </div>
          </motion.div>
        </div>
        
        <FeedbackButton isImageModalOpen={isImageModalOpen} />
        <Footer />
      </div>

      {/* Only render sticky sidebar on desktop */}
      {recipe?.ingredients && isDesktop && (
        <StickyIngredientsSidebar
          isVisible={isStickyIngredientsVisible}
          isOpen={isStickyIngredientsOpen}
          onOpen={() => setIsStickyIngredientsOpen(true)}
          onClose={() => setIsStickyIngredientsOpen(false)}
          ingredients={recipe.ingredients}
          processIngredients={processIngredients}
          replaceLinkPlaceholder={replaceLinkPlaceholder}
          isNewsletterModalOpen={isNewsletterModalOpen}
          isImageModalOpen={isImageModalOpen}
        />
      )}

      {/* Only render sticky sidebar on mobile */}
      {recipe?.ingredients && !isDesktop && (
        <StickyIngredientsSidebarMobile
          isVisible={isStickyIngredientsVisible}
          isOpen={isStickyIngredientsOpenMobile}
          onOpen={() => setIsStickyIngredientsOpenMobile(true)}
          onClose={() => setIsStickyIngredientsOpenMobile(false)}
          ingredients={recipe.ingredients}
          processIngredients={processIngredients}
          replaceLinkPlaceholder={replaceLinkPlaceholder}
          isNewsletterModalOpen={isNewsletterModalOpen}
          isImageModalOpen={isImageModalOpen}
        />
      )}

      <RecipeImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        recipe={recipe}
      />

      <NewsletterModal
        isOpen={isNewsletterModalOpen}
        onClose={() => setIsNewsletterModalOpen(false)}
        onSuccess={handleNewsletterSuccess}
      />
    </>
  );
};

export default RecipePage;
