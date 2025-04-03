import React, { createContext, useContext, useReducer, useEffect } from 'react';
import recipeService from '../services/recipeService';

// Import local recipe data as fallback (in case Supabase connection fails)
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
      // Initialize with empty categories, will be filled after fetching from Supabase
      allRecipes: {
        OBIADY: [],
        ZUPY: [],
        CHLEBY: [],
        SMAROWIDŁA: [],
        DESERY: [],
        BABECZKI: [],
        CIASTA: [],
        CIASTKA: [],
        SMOOTHIE: [],
        INNE: [],
        ŚWIĘTA: []
      },
      isLoading: true,
      error: null
    };
  } catch (error) {
    console.error('Error loading cart state:', error);
    return {
      cart: [],
      wishlist: [],
      allRecipes: {},
      isLoading: true,
      error: null
    };
  }
};

const cartReducer = (state, action) => {
  if (!state || !state.cart || !state.wishlist) {
    state = {
      cart: [],
      wishlist: [],
      allRecipes: {},
      isLoading: true,
      error: null
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
    
    case 'SET_RECIPES':
      return {
        ...state,
        allRecipes: action.payload,
        isLoading: false,
        error: null
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, loadInitialState());

  // Load recipes from Supabase when the component mounts
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        
        // Fetch all recipes from Supabase
        const recipes = await recipeService.getAllRecipes();
        
        if (!recipes || recipes.length === 0) {
          console.warn('No recipes found in Supabase or error occurred. Using local data as fallback.');
          // Use local data as fallback
          const localRecipes = {
            OBIADY: Obiady,
            ZUPY: Zupy,
            CHLEBY: Chleby,
            SMAROWIDŁA: Smarowidla,
            DESERY: Desery,
            BABECZKI: Babeczki,
            CIASTA: Ciasta,
            CIASTKA: Ciastka,
            SMOOTHIE: Smoothie,
            INNE: Inne,
            ŚWIĘTA: Swieta
          };
          
          dispatch({ type: 'SET_RECIPES', payload: localRecipes });
          return;
        }
        
        console.log(`Successfully loaded ${recipes.length} recipes from Supabase`);
        
        // Organize recipes by category
        const recipesByCategory = {
          OBIADY: recipes.filter(recipe => recipe.category === 'OBIADY'),
          ZUPY: recipes.filter(recipe => recipe.category === 'ZUPY'),
          CHLEBY: recipes.filter(recipe => recipe.category === 'CHLEBY'),
          SMAROWIDŁA: recipes.filter(recipe => recipe.category === 'SMAROWIDŁA'),
          DESERY: recipes.filter(recipe => recipe.category === 'DESERY'),
          BABECZKI: recipes.filter(recipe => recipe.category === 'BABECZKI'),
          CIASTA: recipes.filter(recipe => recipe.category === 'CIASTA'),
          CIASTKA: recipes.filter(recipe => recipe.category === 'CIASTKA'),
          SMOOTHIE: recipes.filter(recipe => recipe.category === 'SMOOTHIE'),
          INNE: recipes.filter(recipe => recipe.category === 'INNE'),
          ŚWIĘTA: recipes.filter(recipe => recipe.category === 'ŚWIĘTA')
        };
        
        dispatch({ type: 'SET_RECIPES', payload: recipesByCategory });
      } catch (err) {
        console.error('Exception fetching recipes:', err);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load recipes. Using local data as fallback.' });
        
        // Use local data as fallback
        const localRecipes = {
          OBIADY: Obiady,
          ZUPY: Zupy,
          CHLEBY: Chleby,
          SMAROWIDŁA: Smarowidla,
          DESERY: Desery,
          BABECZKI: Babeczki,
          CIASTA: Ciasta,
          CIASTKA: Ciastka,
          SMOOTHIE: Smoothie,
          INNE: Inne,
          ŚWIĘTA: Swieta
        };
        
        dispatch({ type: 'SET_RECIPES', payload: localRecipes });
      }
    };

    fetchRecipes();
  }, []);

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
  }, [state.cart, state.wishlist]);

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