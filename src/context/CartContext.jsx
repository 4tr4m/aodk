import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Obiady } from '../Data/recipes/obiady-data';
import { Zupy } from '../Data/recipes/zupy-data';
import { Chleby } from '../Data/recipes/chleby-data';
import { Smarowidla } from '../Data/recipes/smarowidla-data';
import { Desery } from '../Data/recipes/desery-data';
import { Babeczki } from '../Data/recipes/babeczki-data';
import { Ciasta } from '../Data/recipes/ciasta-data';
import { Ciastka } from '../Data/recipes/ciastka-data';
import { Smoothie } from '../Data/recipes/smoothie-data';
import { Inne } from '../Data/recipes/inne-data';
import { Swieta } from '../Data/recipes/swieta-data';

const CartContext = createContext();

const loadInitialState = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    
    return {
      cart: savedCart ? JSON.parse(savedCart) : [],
      wishlist: savedWishlist ? JSON.parse(savedWishlist) : [],
      allRecipes: {
        OBIADY: Obiady,
        ZUPY: Zupy,
        CHLEBY: Chleby,
        SMAROWIDŁA: Smarowidla,
        DESERY: Desery,
        'BABECZKI i MUFFINY': Babeczki,
        CIASTA: Ciasta,
        CIASTKA: Ciastka,
        SMOOTHIE: Smoothie,
        INNE: Inne,
        ŚWIĘTA: Swieta
      }
    };
  } catch (error) {
    console.error('Error loading cart state:', error);
    return {
      cart: [],
      wishlist: [],
      allRecipes: {}
    };
  }
};

const cartReducer = (state, action) => {
  if (!state || !state.cart || !state.wishlist) {
    state = {
      cart: [],
      wishlist: []
    };
  }

  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      
      let updatedItems;
      if (existingItem) {
        updatedItems = state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: (item.quantity || 0) + 1 }
            : item
        );
      } else {
        updatedItems = [...state.cart, { ...action.payload, quantity: 1 }];
      }

      return {
        ...state,
        cart: updatedItems
      };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };

    case 'ADD_TO_WISHLIST':
      if (!state.wishlist.find(item => item.id === action.payload.id)) {
        return {
          ...state,
          wishlist: [...state.wishlist, action.payload]
        };
      }
      return state;

    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.id !== action.payload)
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, loadInitialState());

  useEffect(() => {
    try {
      if (state.cart) {
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
      if (state.wishlist) {
        localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
      }
    } catch (error) {
      console.error('Error saving cart state:', error);
    }
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};