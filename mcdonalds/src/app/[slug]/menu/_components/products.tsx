import type { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoriesProductsProps {
  products: Product[]
}

const CategoriesProducts = ({products}: CategoriesProductsProps) => {
  return (
    <div className="space-y-3 px-5 py-3">
      {products.map(product => (
        <Link key={product.id} href="/" className="flex items-center justify-between gap-10 py-3 border-b  ">
          {/* Left */}
          <div>
            <h3 className="text-sm font-medium">{product.name}</h3> 
            <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p> 
            {/* Line clamp 2 means that the maximum number of lines will be 2, if it exceeds 2 lines, it will add an
            ellipsis */}
            <p className="pt-3 text-sm font-semibold"> 
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(product.price)}
            </p>
          </div>
          {/* Right */}
          <div className="relative min-h-28 aspect-square">
            <Image className="object-cover rounded-lg" src={product.imageUrl} fill alt={product.name}/>
          </div>

        </Link>
      ))}
    </div>
  );
}
 
export default CategoriesProducts;