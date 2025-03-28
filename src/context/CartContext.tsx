'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/types';

interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size?: string, color?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, size?: string, color?: string) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(
        item => item.id === product.id && 
        item.selectedSize === size && 
        item.selectedColor === color
      );

      if (existingItem) {
        return currentItems.map(item =>
          item === existingItem
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { 
        ...product, 
        quantity: 1, 
        selectedSize: size, 
        selectedColor: color 
      }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(currentItems => 
      currentItems.filter(item => item.id !== productId)
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 