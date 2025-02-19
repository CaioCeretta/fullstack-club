'use server'

import { db } from '@/_lib/prisma'
import { revalidateTag } from 'next/cache'
import { upsertProductSchema, type UpsertProductType } from './schema'

export const upsertProduct = async (data: UpsertProductType) => {
  upsertProductSchema.parse(data)

  await db.product.upsert({
    where: {
      id: data.id ?? '',
    },
    update: data,
    create: data,
  })

  revalidateTag('get-products')
}
