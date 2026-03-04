import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

const WishlistContext = createContext({
  items: [],
  toggle: () => {},
  remove: () => {},
  isInWishlist: () => false,
});

const STORAGE_KEY = 'dosalga_wishlist';

export const WishlistProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);

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
    setHydrated(true);
  }, []);

  // Persist wishlist whenever it changes
  useEffect(() => {
    if (typeof window === 'undefined' || !hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.warn('Unable to save wishlist to storage', err);
    }
  }, [items, hydrated]);

  const isInWishlist = (id) => items.some((item) => item.id === id);

  const toggle = (product) => {
    setItems((prev) => {
      if (!product?.id) return prev;
      const exists = prev.some((p) => p.id === product.id);
      const next = exists ? prev.filter((p) => p.id !== product.id) : [...prev, product];
      if (typeof window !== 'undefined') {
        try {
          toast[exists ? 'info' : 'success'](
            exists ? 'Removed from wishlist' : 'Product added to wishlist'
          );
        } catch (err) {
          console.warn('Toast error', err);
          alert(exists ? 'Removed from wishlist' : 'Product added to wishlist');
        }
      }
      return next;
    });
  };

  const remove = (id) => setItems((prev) => prev.filter((p) => p.id !== id));

  const value = useMemo(
    () => ({
      items,
      toggle,
      remove,
      isInWishlist,
      hydrated,
    }),
    [items, hydrated]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => useContext(WishlistContext);
