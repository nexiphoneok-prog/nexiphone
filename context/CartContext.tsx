
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Product, PriceOption } from '../types';

interface CartItem {
  product: Product;
  selectedPriceOption: PriceOption;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, selectedPriceOption: PriceOption) => void;
  removeFromCart: (productId: string) => void;
  getCartTotal: () => { usdTotal: number; arsTotal: number };
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, selectedPriceOption: PriceOption) => {
    setCartItems(prevItems => {
      // Use a composite key to identify an item, as the same product can be added with different price options
      const itemIdentifier = `${product.id}-${selectedPriceOption}`;
      const existingItem = prevItems.find(item => `${item.product.id}-${item.selectedPriceOption}` === itemIdentifier);

      if (existingItem) {
        // This logic is for incrementing quantity, which is not supported by the UI yet.
        // For now, it just re-adds, but this structure allows future expansion.
        // Let's just avoid duplicates for now.
        return prevItems; 
      }
      
      // Prevent adding the same physical product twice, even with different currencies.
      const productExists = prevItems.find(item => item.product.id === product.id);
      if (productExists) {
          // If it exists, maybe alert the user or replace it.
          // For now, we will prevent adding.
          // Or even better, let's replace the existing one with the new price option.
          return prevItems.map(item => item.product.id === product.id ? { product, selectedPriceOption, quantity: 1 } : item);
      }

      return [...prevItems, { product, selectedPriceOption, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };
  
  const getCartTotal = () => {
      let usdTotal = 0;
      let arsTotal = 0;
      cartItems.forEach(item => {
          if (item.selectedPriceOption === PriceOption.USD) {
              usdTotal += item.product.usdPrice * item.quantity;
          } else { // CASH
              arsTotal += item.product.discountPriceArs * item.quantity;
          }
      });
      return { usdTotal, arsTotal };
  };

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getCartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
