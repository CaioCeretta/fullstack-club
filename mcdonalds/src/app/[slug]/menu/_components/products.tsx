"use client";

import type { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

import { formatCurrency } from "@/utils/format";

interface CategoriesProductsProps {
  products: Product[];
}

const CategoriesProducts = ({ products }: CategoriesProductsProps) => {
  const { slug } = useParams<{ slug: string }>();

  const searchParams = useSearchParams();
  const consumptionMethod = searchParams.get("consumptionMethod");

  return (
    <div className="space-y-3 px-5 py-3">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/${slug}/menu/${product.id}?consumptionMethod=${consumptionMethod}`}
          className="flex items-center justify-between gap-10 border-b py-3"
        >
          {/* Left */}
          <div>
            <h3 className="text-sm font-medium">{product.name}</h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {product.description}
            </p>
            {/* Line clamp 2 means that the maximum number of lines will be 2, if it exceeds 2 lines, it will add an
            ellipsis */}
            <p className="pt-3 text-sm font-semibold">
              {formatCurrency(product.price)}
            </p>
          </div>
          {/* Right */}
          <div className="relative aspect-square min-h-28">
            <Image
              className="rounded-lg object-cover"
              src={product.imageUrl}
              fill
              alt={product.name}
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoriesProducts;
