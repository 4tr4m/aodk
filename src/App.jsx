import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import HomePage from './pages/HomePage';
import ContactPage from './components/Pages/Contact/ContactPage';
import CategoryPage from './components/Pages/Category/CategoryPage';
import BlogPage from './components/Pages/Blog/Blog';
import ArticlePage from './components/Pages/Blog/ArticlePage';
import SearchPage from './components/Pages/Search/SearchPage';
import HistoriaOMnie from './components/Pages/Historia/HistoriaOMnie';
import HistoriaOAutyzmie from './components/Pages/Historia/HistoriaOAutyzmie';
import ZnajdkiPage from './components/Pages/Znajdki/ZnajdkiPage';
import ZnajdkiProductPage from './components/Pages/Znajdki/ZnajdkiProductPage';
import RecipePage from './components/Pages/Recipe/RecipePage';

// Scroll to top on route change (but respect scrollToTitle state)
const ScrollToTop = () => {
  const { pathname, state } = useLocation();

  useEffect(() => {
    console.log('ScrollToTop: pathname changed to', pathname, 'state:', state);
    // Handle scrollToTop state from Footer or other components
    if (state?.scrollToTop) {
      console.log('ScrollToTop: Scrolling to top due to scrollToTop state');
      
      // Immediate scroll for mobile compatibility
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Use requestAnimationFrame for better mobile support
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });
      
      // Additional scroll attempts for mobile browsers
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 0);
      
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 100);
      
      return;
    }
    // Only scroll to top if there's no scrollToTitle state
    // This allows CategoryPage to handle its own scrolling logic
    if (!state?.scrollToTitle) {
      console.log('ScrollToTop: Scrolling to top (no scrollToTitle state)');
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    } else {
      console.log('ScrollToTop: Skipping scroll (scrollToTitle state detected)');
    }
  }, [pathname, state]);

  return null;
};

const App = () => {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/kuchnia" element={<CategoryPage />} />
          <Route path="/kuchnia/:categorySlug" element={<CategoryPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<ArticlePage />} />
          <Route path="/kontakt" element={<ContactPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/historia/o-mnie" element={<HistoriaOMnie />} />
          <Route path="/historia/o-autyzmie" element={<HistoriaOAutyzmie />} />
          <Route path="/znajdki" element={<ZnajdkiPage />} />
          <Route path="/znajdki/:id" element={<ZnajdkiProductPage />} />
          <Route path="/przepis/:recipeId" element={<RecipePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;