'use server'

import { db } from '@/_lib/prisma'
import { actionClient } from '@/_lib/safe-action'
import { revalidateTag } from 'next/cache'
import { deleteSaleSchema } from './schema'

export const deleteSale = actionClient
  .schema(deleteSaleSchema)
  .action(async ({ parsedInput: { id } }) => {
    await db.sale.delete({
      where: {
        id,
      },
    })

    revalidateTag('get-sales')
  })
