'use server'

import { db } from '@/_lib/prisma'
import { deleteProductSchema, type DeleteProductType } from './schema'
import { revalidateTag } from 'next/cache'

export const deleteProduct = async ({ id }: DeleteProductType) => {
  deleteProductSchema.parse({ id })

  await db.product.delete({
    where: {
      id,
    },
  })

  revalidateTag('get-products')
}
