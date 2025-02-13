import 'server-only'

import { db } from '@/_lib/prisma'
import type { Product } from '@prisma/client'
import { cache } from 'react'
// import { unstable_cache } from "next/cache";

export const getProducts = async (): Promise<Product[]> => {
  console.log('Fetching products')
  return await db.product.findMany({})
}

// export const cachedGetProducts = unstable_cache(getProducts, ["get-products"], {
//   revalidate: 5,
// });

export const cachedGetProducts = cache(getProducts)
