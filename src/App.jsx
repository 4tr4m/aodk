import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import HomePage from './pages/HomePage';
import CategoryPage from './components/Pages/CategoryPage';
import BlogPage from './components/Pages/Blog';
import ArticlePage from './components/Pages/ArticlePage';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/kuchnia" element={<CategoryPage />} />
          <Route path="/kuchnia/:categorySlug" element={<CategoryPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<ArticlePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;