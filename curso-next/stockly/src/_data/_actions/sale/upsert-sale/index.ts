'use server'

import { db } from '@/_lib/prisma'
import { actionClient } from '@/_lib/safe-action'
import { revalidatePath } from 'next/cache'
import { upsertSaleSchema } from './schema'

export const upsertSale = actionClient
  .schema(upsertSaleSchema)
  .action(async ({ parsedInput: { products, id } }) => {
    await db.$transaction(async (trx) => {
      const isUpdate = !!id

      if (isUpdate) {
        const existingSale = await trx.sale.findUnique({
          where: {
            id,
          },
          include: {
            saleProducts: true,
          },
        })

        await trx.sale.delete({
          where: { id },
        })

        if (existingSale && existingSale.saleProducts) {
          for (const product of existingSale.saleProducts) {
            await trx.product.update({
              where: {
                id: product.productId,
              },
              data: {
                stock: {
                  increment: product.quantity,
                },
              },
            })
          }
        }
      }

      const sale = await trx.sale.create({
        data: {
          date: new Date(),
        },
      })

      for (const product of products) {
        const dbProduct = await trx.product.findUnique({
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
            unitPrice: Number(dbProduct.price),
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
    revalidatePath('/', 'layout')
  })
