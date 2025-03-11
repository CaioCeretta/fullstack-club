'use server'

import { db } from '@/_lib/prisma'
import { createSaleSchema, type CreateSaleType } from './schema'
import { revalidatePath } from 'next/cache'

export const createSale = async (data: CreateSaleType) => {
  await db.$transaction(async (trx) => {
    createSaleSchema.parse(data)

    const sale = await trx.sale.create({
      data: {
        date: new Date(),
      },
    })

    for (const product of data.products) {
      const dbProduct = await db.product.findUnique({
        where: {
          id: product.id,
        },
      })

      if (!dbProduct) {
        throw new Error('Product not found')
      }

      const productIsOutOfStock = product.quantity > dbProduct.stock

      if (productIsOutOfStock) {
        throw new Error('The product does not have the available stock')
      }

      await trx.saleProduct.create({
        data: {
          saleId: sale.id,
          quantity: product.quantity,
          productId: product.id,
          unitPrice: dbProduct.price,
        },
      })

      await trx.product.update({
        where: {
          id: product.id,
        },
        data: {
          stock: {
            decrement: product.quantity,
          },
        },
      })
    }
  })
  revalidatePath('/products')
}
