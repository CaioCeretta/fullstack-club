"use client";

import type { Product } from "@prisma/client";
import { createContext, type ReactNode, useCallback, useState } from "react";

export interface CartProduct extends Product {
  qty: number;
}

export interface ICartContext {
  products: CartProduct[];
  isOpen: boolean;
  toggleCart: () => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  isOpen: false,
  toggleCart: () => {
    throw new Error("toggleCart was called out of the CartProvider");
  },
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleCart = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <CartContext.Provider
      value={{
        isOpen: isOpen,
        products,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
