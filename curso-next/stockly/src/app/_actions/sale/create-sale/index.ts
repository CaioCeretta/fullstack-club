'use server'

import { db } from '@/_lib/prisma'
import { createSaleSchema, type CreateSaleType } from './schema'
import { revalidatePath } from 'next/cache'

export const createSale = async (data: CreateSaleType) => {
  createSaleSchema.parse(data)

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

    const sale = await db.sale.create({
      data: {
        date: new Date(),
      },
    })

    await db.saleProduct.create({
      data: {
        saleId: sale.id,
        quantity: product.quantity,
        productId: product.id,
        unitPrice: dbProduct.price,
      },
    })

    await db.product.update({
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
  revalidatePath('/products')
}
