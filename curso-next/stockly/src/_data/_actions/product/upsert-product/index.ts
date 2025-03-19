'use server'

import { db } from '@/_lib/prisma'
import { actionClient } from '@/_lib/safe-action'
import {} from 'next-safe-action'
import { revalidatePath } from 'next/cache'
import { upsertProductSchema } from './schema'

export const upsertProduct = actionClient
  .schema(upsertProductSchema)
  .action(async ({ parsedInput }) => {
    console.log('parsedInput:', parsedInput)
    const { id, ...data } = parsedInput
    await db.product.upsert({
      where: {
        id: id ? id : '',
      },
      update: data,
      create: data,
    })

    // revalidateTag('get-products')
    revalidatePath('/products', 'page')
    revalidatePath('/')
  })
