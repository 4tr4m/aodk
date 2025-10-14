import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import HomePage from './pages/HomePage';
import ContactPage from './components/Pages/ContactPage';
import CategoryPage from './components/Pages/CategoryPage';
import BlogPage from './components/Pages/Blog';
import ArticlePage from './components/Pages/ArticlePage';
import SearchPage from './components/Pages/SearchPage';
import HistoriaOMnie from './components/Pages/HistoriaOMnie';
import HistoriaOAutyzmie from './components/Pages/HistoriaOAutyzmie';
import ZnajdkiPage from './components/Pages/ZnajdkiPage';
import ZnajdkiProductPage from './components/Pages/ZnajdkiProductPage';
import RecipePage from './components/Pages/RecipePage';

// Scroll to top on route change (but respect scrollToTitle state)
const ScrollToTop = () => {
  const { pathname, state } = useLocation();

  useEffect(() => {
    // Only scroll to top if there's no scrollToTitle state
    // This allows CategoryPage to handle its own scrolling logic
    if (!state?.scrollToTitle) {
      window.scrollTo(0, 0);
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