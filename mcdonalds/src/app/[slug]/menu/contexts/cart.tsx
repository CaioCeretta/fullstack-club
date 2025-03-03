"use client";

import type { Product } from "@prisma/client";
import { createContext, type ReactNode, useCallback, useState } from "react";

export interface CartProduct
  extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number;
}

export interface ICartContext {
  products: CartProduct[];
  isOpen: boolean;
  total: number;
  handleIncreaseQuantity: (productId: string) => void;
  handleDecreaseQuantity: (productId: string) => void;
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;
  removeProduct: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  isOpen: false,
  total: 0,
  toggleCart: () => {
    throw new Error("toggleCart was called out of the CartProvider");
  },
  handleDecreaseQuantity: () => {},
  handleIncreaseQuantity: () => {},
  addProduct: () => {},
  removeProduct: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const total = products.reduce(
    (acc, val) => acc + val.price * val.quantity,
    0,
  );

  const toggleCart = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const addProduct = (product: CartProduct) => {
    setProducts((prevProducts) => {
      const existingProduct = prevProducts.find(
        (prevProduct) => prevProduct.id === product.id,
      );

      if (existingProduct) {
        return prevProducts.map((prevProduct) =>
          prevProduct.id === product.id
            ? {
                ...prevProduct,
                quantity: prevProduct.quantity + product.quantity,
              }
            : prevProduct,
        );
      }

      return [...prevProducts, product];
    });
  };

  function handleIncreaseQuantity(productId: string) {
    setProducts((prevProducts) =>
      prevProducts.map((prevProduct) =>
        prevProduct.id === productId
          ? {
              ...prevProduct,
              quantity: Math.min(prevProduct.quantity + 1, 99),
            }
          : prevProduct,
      ),
    );
  }

  function handleDecreaseQuantity(productId: string) {
    setProducts((prevProducts) =>
      prevProducts.map((prevProduct) =>
        prevProduct.id === productId
          ? {
              ...prevProduct,
              quantity: Math.max(prevProduct.quantity - 1, 0),
            }
          : prevProduct,
      ),
    );
  }

  function removeProduct(productId: string) {
    setProducts((prevProducts) =>
      prevProducts.filter((prevProduct) => prevProduct.id !== productId),
    );
  }

  return (
    <CartContext.Provider
      value={{
        isOpen: isOpen,
        products,
        total,
        toggleCart,
        handleDecreaseQuantity,
        handleIncreaseQuantity,
        addProduct,
        removeProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
