'use server'

import { db } from '@/_lib/prisma'
import { revalidateTag } from 'next/cache'
import { createProductSchema, type CreateProductType } from './schema'

export const createProduct = async (data: CreateProductType) => {
  createProductSchema.parse(data)

  await db.product.create({
    data,
  })

  revalidateTag('get-products')
}
