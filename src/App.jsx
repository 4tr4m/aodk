import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import HomePage from './pages/HomePage';
import ContactPage from './components/Pages/Contact/ContactPage';
import CategoryPage from './components/Pages/Category/CategoryPage';
import BlogPage from './components/Pages/Blog/Blog';
import ArticlePage from './components/Pages/Blog/ArticlePage';
import BlogAdminPage from './components/Pages/Blog/BlogAdminPage';
import SearchPage from './components/Pages/Search/SearchPage';
import HistoriaOMnie from './components/Pages/Historia/HistoriaOMnie';
import HistoriaOAutyzmie from './components/Pages/Historia/HistoriaOAutyzmie';
import ZnajdkiPage from './components/Pages/Znajdki/ZnajdkiPage';
import ZnajdkiProductPage from './components/Pages/Znajdki/ZnajdkiProductPage';
import RecipePage from './components/Pages/Recipe/RecipePage';
import UslugiPage from './components/Pages/Uslugi/UslugiPage';

// Scroll to top on route change (respect scrollToTitle state from CategoryPage)
const scrollToTop = () => {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
};

const ScrollToTop = () => {
  const { pathname, state } = useLocation();

  useEffect(() => {
    if (state?.scrollToTitle) return;

    scrollToTop();
    requestAnimationFrame(scrollToTop);
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
          <Route path="/admin/blog" element={<BlogAdminPage />} />
          <Route path="/kontakt" element={<ContactPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/historia/o-mnie" element={<HistoriaOMnie />} />
          <Route path="/historia/o-autyzmie" element={<HistoriaOAutyzmie />} />
          <Route path="/znajdki" element={<ZnajdkiPage />} />
          <Route path="/znajdki/:id" element={<ZnajdkiProductPage />} />
          <Route path="/uslugi" element={<UslugiPage />} />
          {/* Legacy category-based recipe route - will redirect to canonical /przepis/:recipeSlug */}
          <Route path="/kuchnia/:categorySlug/:recipeSlug" element={<RecipePage />} />
          <Route path="/przepis/:recipeSlug" element={<RecipePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;