import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  addToCart: (product: { id: number; productName: string; price: string; image: string }) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'zaminat_cart';

// Load cart from localStorage
const loadCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return [];
  }
};

// Save cart to localStorage
const saveCart = (cart: CartItem[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    // Dispatch custom event for cross-tab synchronization
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(loadCart);

  // Calculate cart count
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Load cart on mount and listen for storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setCart(loadCart());
    };

    // Listen for localStorage changes (from other tabs)
    window.addEventListener('storage', handleStorageChange);
    // Listen for custom cart update events (from same tab)
    window.addEventListener('cartUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleStorageChange);
    };
  }, []);

  // Add item to cart
  const addToCart = (product: { id: number; productName: string; price: string; image: string }) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      let newCart: CartItem[];
      if (existingItem) {
        newCart = prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [
          ...prevCart,
          {
            id: product.id,
            name: product.productName,
            price: product.price,
            image: product.image,
            quantity: 1,
          },
        ];
      }
      
      saveCart(newCart);
      return newCart;
    });
  };

  // Remove item from cart
  const removeFromCart = (productId: number) => {
    setCart(prevCart => {
      const newCart = prevCart.filter(item => item.id !== productId);
      saveCart(newCart);
      return newCart;
    });
  };

  // Update item quantity
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart => {
      const newCart = prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      );
      saveCart(newCart);
      return newCart;
    });
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
    saveCart([]);
  };

  // Calculate cart total (simplified - assumes price is in UZS format like "219 000 UZS")
  const getCartTotal = (): number => {
    return cart.reduce((total, item) => {
      // Extract numeric value from price string (e.g., "219 000 UZS" -> 219000)
      const priceValue = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
      return total + (priceValue * item.quantity);
    }, 0);
  };

  const value: CartContextType = {
    cart,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

