
import { createContext, useContext, useEffect, useReducer } from "react";
import { CartAction, CartContextType, CartItem, Product } from "../types";

const initialCartState: CartItem[] = [];

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.findIndex(item => item.product.id === action.payload.id);
      
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedState = [...state];
        updatedState[existingItemIndex] = {
          ...updatedState[existingItemIndex],
          quantity: updatedState[existingItemIndex].quantity + 1
        };
        return updatedState;
      } else {
        // Item doesn't exist, add new item
        return [...state, { product: action.payload, quantity: 1 }];
      }
    }
    case "REMOVE_ITEM":
      return state.filter(item => item.product.id !== action.payload);
      
    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        return state.filter(item => item.product.id !== action.payload.id);
      }
      
      return state.map(item => 
        item.product.id === action.payload.id 
          ? { ...item, quantity: action.payload.quantity } 
          : item
      );
    }
    case "CLEAR_CART":
      return [];
      
    default:
      return state;
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  // Load cart from localStorage
  const loadInitialState = (): CartItem[] => {
    if (typeof window === 'undefined') return initialCartState;
    
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : initialCartState;
  };

  const [cart, dispatch] = useReducer(cartReducer, initialCartState, loadInitialState);
  
  // Calculate cart totals
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Cart operations
  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
