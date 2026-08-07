"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartLine = { productId: string; name: string; image: string; price: number; quantity: number; variant?: string };
type CartContextValue = {
  lines: CartLine[];
  count: number;
  add: (line: Omit<CartLine, "quantity">, quantity?: number) => void;
  update: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export default function StorefrontCartProvider({ storeSlug, children }: { storeSlug: string; children: React.ReactNode }) {
  const storageKey = `ccommerce-cart:${storeSlug}`;
  const wishlistKey = `ccommerce-wishlist:${storeSlug}`;
  const [lines, setLines] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) setLines(JSON.parse(stored));
        const savedWishlist = localStorage.getItem(wishlistKey);
        if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      } catch { localStorage.removeItem(storageKey); }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [storageKey, wishlistKey]);

  useEffect(() => {
    if (hydrated) localStorage.setItem(storageKey, JSON.stringify(lines));
  }, [hydrated, lines, storageKey]);

  const value = useMemo<CartContextValue>(() => ({
    lines,
    count: lines.reduce((sum, line) => sum + line.quantity, 0),
    add: (line, quantity = 1) => setLines((current) => {
      const found = current.find((item) => item.productId === line.productId && item.variant === line.variant);
      const next = found
        ? current.map((item) => item === found ? { ...item, quantity: Math.min(item.quantity + quantity, 10) } : item)
        : [...current, { ...line, quantity }];
      localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    }),
    update: (productId, quantity) => setLines((current) => {
      const next = current.map((line) => line.productId === productId ? { ...line, quantity: Math.max(1, Math.min(quantity, 10)) } : line);
      localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    }),
    remove: (productId) => setLines((current) => {
      const next = current.filter((line) => line.productId !== productId);
      localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    }),
    clear: () => {
      localStorage.setItem(storageKey, "[]");
      setLines([]);
    },
    wishlist,
    toggleWishlist: (productId) => setWishlist((current) => {
      const next = current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId];
      localStorage.setItem(wishlistKey, JSON.stringify(next));
      return next;
    }),
  }), [lines, storageKey, wishlist, wishlistKey]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useStorefrontCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useStorefrontCart must be used inside StorefrontCartProvider");
  return context;
}
