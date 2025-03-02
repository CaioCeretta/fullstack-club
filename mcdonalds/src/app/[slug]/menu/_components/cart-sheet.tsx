import { useContext } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { CartContext } from "../contexts/cart";
import CartItem from "./cart-product-item";

export const CartSheet = () => {
  const { products, isOpen, toggleCart } = useContext(CartContext);

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="bg-white">
        <SheetHeader>
          <SheetTitle className="text-left">Cart</SheetTitle>
        </SheetHeader>
        <div className="p y-5">
          {products.map((product) => (
            <CartItem product={product} key={product.id} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
