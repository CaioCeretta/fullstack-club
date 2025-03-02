"use client";

import type { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/utils/format";

import CartSheet from "../_components/cart-sheet";
import { CartContext } from "../contexts/cart";

export interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
          slug: true;
        };
      };
    };
  }>;
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);

  const { addProduct, toggleCart } = useContext(CartContext);

  const params = useParams();

  const slug = params.slug;

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

  if (!product) {
    return notFound();
  }

  if (product.restaurant.slug !== slug) {
    return notFound();
  }

  const handleAddToCart = () => {
    addProduct({ ...product, qty: quantity });
    toggleCart();
  };

  return (
    <>
      <div className="relative z-50 mt-[-1.5rem] flex h-screen flex-col overflow-hidden rounded-t-3xl p-5">
        <div className="flex-1 overflow-hidden">
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
          <div className="mt-3 flex items-center justify-between">
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

          <ScrollArea className="h-full">
            {/* About */}
            <div className="mt-6 space-y-3">
              <h4 className="font-semibold"> About </h4>
              <p className="text-sm text-muted-foreground">
                {product.description}
              </p>
            </div>

            {/* Ingredients */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-1">
                <ChefHatIcon size={18} />
                <h4 className="font-semibold">Ingredients</h4>
              </div>
              <ul className="list-disc px-5 text-sm text-muted-foreground">
                {product.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </ScrollArea>
        </div>
        <div>
          <Button
            onClick={handleAddToCart}
            className="mt-6 w-full rounded-full"
          >
            Add To Cart
          </Button>
        </div>
      </div>

      <CartSheet />
    </>
  );
};

export default ProductDetails;
