import 'server-only'

import { db } from '@/_lib/prisma'
import type { Product } from '@prisma/client'
// import { cache } from 'react'
import { unstable_cache } from 'next/cache'
// import { unstable_cache } from "next/cache";

export type ProductStatusDTO = 'IN_STOCK' | 'OUT_OF_STOCK'

export interface ProductDTO extends Product {
  status: 'IN_STOCK' | 'OUT_OF_STOCK'
}

export const getProducts = async (): Promise<ProductDTO[]> => {
  const products = await db.product.findMany({})

  return products.map((product) => ({
    ...product,
    status: product.stock > 0 ? 'IN_STOCK' : 'OUT_OF_STOCK',
  }))
}

// export const cachedGetProducts = unstable_cache(getProducts, ["get-products"], {
//   revalidate: 5,
// });

// export const cachedGetProducts = cache(getProducts)

export const cachedGetProducts = unstable_cache(getProducts, ['getProducts'], {
  tags: ['get-products'],
  revalidate: 60,
})
