import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FaCheckCircle, FaShoppingCart } from 'react-icons/fa';
import TopNavBar from '../Headers/TopNavBar';
import Header from '../Headers/Header';
import PreFooter from '../Footer/PreFooter';
import Footer from '../Footer/Footer';
import ProductGrid from '../Section/ProductGrid';
import './Cart.css';

const Cart = () => {
  const { state, dispatch } = useCart();
  const [removingItems, setRemovingItems] = useState(new Set());
  const [notification, setNotification] = useState(null);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const updateQuantity = (id, quantity) => {
    if (quantity === 0) {
      setRemovingItems(prev => new Set(prev).add(id));
      showNotification('Produkt został usunięty z koszyka');
      setTimeout(() => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });
        setRemovingItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }, 300);
    } else if (quantity > 0) {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const removeItem = (id) => {
    setRemovingItems(prev => new Set(prev).add(id));
    showNotification('Produkt został usunięty z koszyka');
    setTimeout(() => {
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
      setRemovingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }, 300);
  };

  const totalAmount = state.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (state.cart.length === 0) {
    return (
      <>
        <TopNavBar />
        <Header />
        <div className="cart-container">
          <div className="empty-cart">
            <FaShoppingCart className="empty-cart-icon" />
            <h2>Twój koszyk jest pusty</h2>
            <p>
              Wygląda na to, że nie masz jeszcze żadnych produktów w koszyku. 
              Zapraszamy do zapoznania się z naszą ofertą.
            </p>
            <button className="return-btn">
              <Link to="/category">Przejdź Do Sklepu</Link>
            </button>
          </div>
          <ProductGrid />
        </div>
        <PreFooter />
        <Footer />
      </>
    );
  }

  return (
    <>
      <TopNavBar />
      <Header />
      <div className="cart-container">
        <h1>Koszyk</h1>
        <div className="cart-content">
          <div className="cart-main">
            <div className="cart-items">
              <div className="cart-header">
                <span>Produkt</span>
                <span>Ilość</span>
                <span>Suma</span>
              </div>
              
              {state.cart.map((item) => (
                <div 
                  key={item.id} 
                  className={`cart-item ${removingItems.has(item.id) ? 'removing' : ''}`}
                >
                  <div className="product-info">
                    <button 
                      className="remove-item" 
                      onClick={() => removeItem(item.id)}
                    >
                      ×
                    </button>
                    <img src={item.image} alt={item.name} />
                    <span>{item.name}</span>
                  </div>
                  
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                  
                  <div className="item-total">
                    {(item.price * item.quantity).toFixed(2)} zł
                  </div>
                </div>
              ))}
            </div>
            <Link to="/category/produkty" className="continue-shopping">
              Powrót Do Sklepu
            </Link>
            
            <div className="coupon-section">
              <h3>Kod zniżki</h3>
              <div className="coupon-input">
                <input type="text" placeholder="Wpisz kod" />
                <button>Zastosuj Kupon</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {notification && (
        <div className="notification">
          <FaCheckCircle />
          <span>{notification}</span>
        </div>
      )}
      
      <PreFooter />
      <Footer />
    </>
  );
};

export default Cart;