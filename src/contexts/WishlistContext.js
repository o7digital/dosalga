import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const WishlistContext = createContext({
  items: [],
  toggle: () => {},
  remove: () => {},
  isInWishlist: () => false,
});

const STORAGE_KEY = 'dosalga_wishlist';

export const WishlistProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  // Load wishlist from localStorage on client
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (err) {
      console.warn('Unable to read wishlist from storage', err);
    }
  }, []);

  // Persist wishlist whenever it changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.warn('Unable to save wishlist to storage', err);
    }
  }, [items]);

  const isInWishlist = (id) => items.some((item) => item.id === id);

  const toggle = (product) => {
    setItems((prev) => {
      if (!product?.id) return prev;
      const exists = prev.some((p) => p.id === product.id);
      return exists ? prev.filter((p) => p.id !== product.id) : [...prev, product];
    });
  };

  const remove = (id) => setItems((prev) => prev.filter((p) => p.id !== id));

  const value = useMemo(
    () => ({
      items,
      toggle,
      remove,
      isInWishlist,
    }),
    [items]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => useContext(WishlistContext);
