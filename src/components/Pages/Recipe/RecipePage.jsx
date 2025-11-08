import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../../context/CartContext';
import ProductBaseIngredients from './ProductBaseIngredients';
import StickyIngredientsSidebar from './StickyIngredientsSidebar';
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
import { processIngredients as processIngredientsUtil, replaceLinkPlaceholder } from '../../../utils/recipeUtils';

const RecipePage = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  
  const { recipe, loading, error, isInWishlist, setIsInWishlist } = useRecipeData(recipeId);
  const { isStickyIngredientsVisible, ingredientsRef } = useRecipeScrollDetection(recipe, loading);
  
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isFullDescExpanded, setIsFullDescExpanded] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isStickyIngredientsOpen, setIsStickyIngredientsOpen] = useState(false);
  const [isBaseSpicesExpanded, setIsBaseSpicesExpanded] = useState(false);

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

  return (
    <>
      <SEO 
        title={`${recipe.name} - Autyzm od kuchni`}
        description={recipe.shortdesc}
        image={recipe.image}
        url={window.location.href}
      />
      
      <div className="min-h-screen bg-gray-50">
        <div className="relative mb-8">
          <CategoryHeader />
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

              <RecipeIngredients
                ingredients={recipe.ingredients}
                ingredientsRef={ingredientsRef}
              />

              <RecipePreparation preparation={recipe.preparation} />

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
        
        <FeedbackButton />
        <Footer />
      </div>

      {recipe?.ingredients && (
        <StickyIngredientsSidebar
          isVisible={isStickyIngredientsVisible}
          isOpen={isStickyIngredientsOpen}
          onOpen={() => setIsStickyIngredientsOpen(true)}
          onClose={() => setIsStickyIngredientsOpen(false)}
          ingredients={recipe.ingredients}
          processIngredients={processIngredients}
          replaceLinkPlaceholder={replaceLinkPlaceholder}
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
