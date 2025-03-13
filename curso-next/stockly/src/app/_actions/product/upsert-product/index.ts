'use server'

import { db } from '@/_lib/prisma'
import { actionClient } from '@/_lib/safe-action'
import {} from 'next-safe-action'
import { revalidateTag } from 'next/cache'
import { upsertProductSchema } from './schema'

export const upsertProduct = actionClient
  .schema(upsertProductSchema)
  .action(async ({ parsedInput: { id, ...data } }) => {
    await db.product.upsert({
      where: {
        id: id ?? '',
      },
      update: data,
      create: data,
    })

    revalidateTag('get-products')
  })
