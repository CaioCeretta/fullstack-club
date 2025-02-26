'use client'

import type { Product } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { Button } from "@/components/ui/button";

interface ProductHeaderProps {
  product: Pick<Product, 'name' | 'imageUrl'>
}

const ProductHeader = ({product}: ProductHeaderProps) => {
  const router = useRouter()

  const handleBackClick =  useCallback(() => {
    router.back()
  }, [])

  return (
    <div>
      <div className="h-96 relative aspect-square">
        <Image src={product.imageUrl} alt={product.name} fill className="object-contain"/>
      </div>
      <Button
        variant="secondary"
        size={"icon"}
        className="absolute left-4 top-4 z-50 rounded-full"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        variant="secondary"
        size={"icon"}
        className="absolute right-4 top-4 z-50 rounded-full"
      >
        <ScrollTextIcon />
      </Button>
      {product.name}
    </div>
  );
}
 
export default ProductHeader;