import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import HomePage from './pages/HomePage';
import CategoryPage from './components/Pages/CategoryPage';
import Cart from './components/Pages/Cart'; // 
import Wishlist from './components/Pages/Wishlist'; // Add this import

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/kuchnia/:categorySlug" element={<CategoryPage />} />
          <Route path="/koszyk" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} /> {/* Add this route */}
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;