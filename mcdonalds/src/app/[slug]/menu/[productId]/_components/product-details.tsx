"use client";

import type { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/format";

export interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
        };
      };
    };
  }>;
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);

  function handleIncreaseQuantity() {
    setQuantity((prev) => {
      if (prev === 99) {
        return prev;
      }
      return prev + 1;
    });
  }

  function handleDecreaseQuantity() {
    setQuantity((prev) => {
      if (prev === 0) {
        return prev;
      }
      return prev - 1;
    });
  }

  return (
    <div className="relative z-50 mt-[-1.5rem] flex h-screen flex-col rounded-t-3xl p-5">
      <div className="flex-1">
        {/* Restaurant */}
        <div className="flex items-center gap-1">
          <Image
            src={product.restaurant.avatarImageUrl}
            alt={product.restaurant.name}
            width={16}
            height={16}
          />

          <p className="text-xs text-muted-foreground">
            {product.restaurant.name}
          </p>
        </div>

        <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>

        {/* Price and quantity */}
        <div className="flex items-center justify-between">
          <h2 className="">{formatCurrency(product.price)}</h2>

          <div className="flex items-center gap-3 text-center">
            <Button
              variant={"outline"}
              className="h-8 w-8 rounded-xl"
              onClick={handleDecreaseQuantity}
            >
              <ChevronLeftIcon />
            </Button>

            <p className="w-4">{quantity}</p>

            <Button
              variant={"destructive"}
              className="h-8 w-8 rounded-xl"
              onClick={handleIncreaseQuantity}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>

        {/* About */}
        <div className="mt-6 space-y-3">
          <h4 className="font-semibold"> About </h4>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>

        {/* Ingredients */}
        <div className="mt-6 space-y-3">
          <div className="5 flex items-center gap-1">
            <ChefHatIcon />
          </div>
        </div>
      </div>
      <div>
        <Button className="mt-6 w-full rounded-full">Add To Cart</Button>
      </div>
    </div>
  );
};

export default ProductDetails;
