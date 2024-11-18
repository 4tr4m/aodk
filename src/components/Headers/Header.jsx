import React, { useState } from 'react';
import { AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import './Header.css';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import categories from '../../Data/category-data';

const Header = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { state } = useCart();
  let timeoutId = null;

  const cartItemsCount = state?.cart?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;
  const wishlistCount = state?.wishlist?.length || 0;

  const handleMouseEnter = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setDropdownVisible(true);
  };

  const handleMouseLeave = (event) => {
    timeoutId = setTimeout(() => {
      const dropdownElement = document.querySelector('.dropdown');
      const dropdownMenu = document.querySelector('.dropdown-menu');
      
      if (dropdownElement && dropdownMenu) {
        const rect = dropdownElement.getBoundingClientRect();
        const menuRect = dropdownMenu.getBoundingClientRect();
        
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        
        const isInExpandedZone = 
          mouseX >= rect.left && 
          mouseX <= rect.right && 
          mouseY >= rect.top && 
          mouseY <= menuRect.bottom + 50;

        if (!isInExpandedZone) {
          setDropdownVisible(false);
        }
      }
    }, 300);
  };

  const handleShopClick = (e) => {
    e.preventDefault();
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="main-header">
      <div className="header-container">
        <div className="logo">
          <img src="/img/logo.jpg" alt="Viking Nordic Health" />
        </div>
        <nav className="navigation">
          <ul>
            <li><Link to="/">Strona główna</Link></li>
            <li
              className={`dropdown ${isDropdownVisible ? 'active' : ''}`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <a href="#" onClick={handleShopClick}>
                Sklep
              </a>
              <ul 
                className={`dropdown-menu ${isDropdownVisible ? 'active' : ''}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {categories.map((category, index) => (
                  <li key={index}>
                    <Link to={`/category/${category.slug}`}>
                      {category.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li><Link to="/orders">Zamówienie</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/account">Moje konto</Link></li>
          </ul>
        </nav>
        <div className="header-icons">
          <Link to="/koszyk" className="icon-wrapper">
            <AiOutlineShoppingCart className="cart-icon" />
            <span className="cart-count">{cartItemsCount}</span>
          </Link>
          <Link to="/wishlist" className="icon-wrapper">
            <AiOutlineHeart className="wishlist-icon" />
            <span className="wishlist-count">{wishlistCount}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;