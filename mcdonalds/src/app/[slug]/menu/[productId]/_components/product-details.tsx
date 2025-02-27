import type { Prisma } from "@prisma/client"
import Image from "next/image"

import { formatCurrency } from "@/utils/format"

export interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true
        }
      } 
    } 
  }>,
}

export const ProductDetails = ({product}: ProductDetailsProps) => {
  

  return (
    <div className="z-50 relative rounded-t-3xl"> 
      {/* Restaurant */}
      <div className="flex items-center gap-1 px-5">
        <Image src={product.restaurant.avatarImageUrl} alt={product.restaurant.name} width={16} height={16}/>
      </div>
      
        <h2>{product.name}</h2>

      <div className="flex items-center justify-between">
        {formatCurrency(product.price)}
      </div>
  

    </div> 
  )
}

export default ProductDetails