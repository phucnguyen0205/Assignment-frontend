'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types';
import toast from 'react-hot-toast';

interface WishlistContextType {
  wishlistItems: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (id: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('USER_WISHLIST');
    if (saved) setWishlistItems(JSON.parse(saved));
    
    console.log(" WishlistContext mounted");
  }, []);

  useEffect(() => {
    localStorage.setItem('USER_WISHLIST', JSON.stringify(wishlistItems));
    console.log("wishlist =", wishlistItems);
  }, [wishlistItems]);

  const isInWishlist = (id: number) =>
    wishlistItems.some(item => item.id === id);

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      setWishlistItems(prev => prev.filter(item => item.id !== product.id));
      toast.success('Đã xóa khỏi yêu thích');
    } else {
      setWishlistItems(prev => [...prev, product]);
      toast.success('Đã thêm vào yêu thích');
    }
  };

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, toggleWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
};
