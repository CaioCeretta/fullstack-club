'use server'

import { db } from '@/app/_lib/prisma'
import { auth } from '@clerk/nextjs/server'
import type {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { upsertTransactionSchema } from './schema'

interface UpsertTransactionParams {
  id?: string
  name: string
  amount: number
  type: TransactionType
  category: TransactionCategory
  paymentMethod: TransactionPaymentMethod
  date: Date
}

/* The problem of doing it like this and letting prisma infers with the TransactionCreate, because we get to much "sticked"
to prisma, some times it's useful to handle this ourselves. Because it would argue that we have to pass the userId, which
is a column from the transactions schema, but passing the userId is not for the client side to handle, because let's say
that we are creating the transactions for the logged user, don't make any sense for us to pass the user id on the client
because the backend will already know about who we are talking about.
*/

export const upsertTransaction = async (params: UpsertTransactionParams) => {
  /* On the server, is a good practice to create a separate file to parse its parameters */
  upsertTransactionSchema.parse(params)
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  await db.transaction.upsert({
    update: { ...params, userId },
    create: { ...params, userId },
    where: {
      id: params.id ?? '', // Use a fallback empty string for new transactions
    },
  })
  revalidatePath('/transactions')
}
