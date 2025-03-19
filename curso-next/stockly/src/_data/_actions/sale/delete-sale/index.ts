'use server'

import { db } from '@/_lib/prisma'
import { actionClient } from '@/_lib/safe-action'
import { revalidatePath } from 'next/cache'
import { deleteSaleSchema } from './schema'

export const deleteSale = actionClient
  .schema(deleteSaleSchema)
  .action(async ({ parsedInput: { id } }) => {
    //fetch the sale products
    const saleProducts = await db.saleProduct.findMany({
      where: { saleId: id },
      select: { productId: true, quantity: true },
    })

    /*  Update the products stock

      If we didn't use promise.all, it would be sequential operations which happen one at a time, this could take long.

      With Promise.all, all the updates start at the same time, and the execution only continues when all the execution
      completes.
    
    */

    await Promise.all(
      saleProducts.map(({ productId, quantity }) =>
        db.product.update({
          where: { id: productId },
          data: { stock: { increment: quantity } },
        }),
      ),
    )

    // Remove the salesProducts from the sale
    await db.saleProduct.deleteMany({
      where: { saleId: id },
    })

    // Remove the sale
    await db.sale.delete({
      where: {
        id,
      },
    })

    revalidatePath('/', 'layout')
  })
