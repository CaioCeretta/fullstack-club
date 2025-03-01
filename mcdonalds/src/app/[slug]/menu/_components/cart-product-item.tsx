import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/format";

import type { CartProduct } from "../contexts/cart";

export interface CartProductItemProps {
  product: CartProduct;
}

export const CartProductItem = ({ product }: CartProductItemProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-20 w-20 rounded-xl bg-gray-100">
        <Image src={product.imageUrl} fill alt={product.name} />
      </div>

      <div className="space-y-1">
        <p className="line-clamp-1 max-w-[90%] text-xs">{product.name}</p>
        <p className="text-sm font-semibold">{formatCurrency(product.price)}</p>

        {/* quantity */}
        <div className="flex items-center gap-1 text-center">
          <Button
            variant={"outline"}
            className="h-7 w-7 rounded-lg"
            onClick={() => {}}
          >
            <ChevronLeftIcon />
          </Button>

          <p className="w-7 text-center text-xs">{product.qty}</p>

          <Button
            variant={"destructive"}
            className="h-7 w-7 rounded-lg"
            onClick={() => {}}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
      {/* botão será aqui */}
      <Button className="h-7 w-7 rounded-lg" variant={"destructive"}>
        <TrashIcon />
      </Button>
    </div>
  );
};

export default CartProductItem;
