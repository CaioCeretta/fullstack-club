import { useContext } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { CartContext } from "../contexts/cart";

export const CartSheet = () => {
  const { products, isOpen, toggleCart } = useContext(CartContext);

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="bg-white">
        <SheetHeader>
          <SheetTitle>Products Cart</SheetTitle>
          <SheetDescription>Test</SheetDescription>
        </SheetHeader>
        {products.map((product) => (
          <h1 key={product.id}>
            {product.name} - {product.qty}
          </h1>
        ))}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
