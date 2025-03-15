import 'server-only'

import { db } from '@/_lib/prisma'
import type { Product } from '@prisma/client'
// import { cache } from 'react'
import { unstable_cache } from 'next/cache'
// import { unstable_cache } from "next/cache";

export const getProducts = async (): Promise<Product[]> => {
  return await db.product.findMany({})
}

// export const cachedGetProducts = unstable_cache(getProducts, ["get-products"], {
//   revalidate: 5,
// });

// export const cachedGetProducts = cache(getProducts)

export const cachedGetProducts = unstable_cache(getProducts, ['getProducts'], {
  tags: ['get-products'],
  revalidate: 60,
})

export const cachedGetRandomNumber = unstable_cache(
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return Math.random()
  },
  ['getRandomNumber'],
  {
    tags: ['get-random-number '],
    revalidate: 60,
  },
)
