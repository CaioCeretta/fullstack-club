// 'use client'

/* When we mark a component as use client, with the default behavior of a component to be server side, this component will
not be able to access server side informations anymore, such as the db, or being async */

import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import AddTransactionButton from '../_components/add-transaction-button'
import { DataTable } from '../_components/ui/data-table'
import { db } from '../_lib/prisma'
import { transactionColumns } from './_columns'

async function TransactionsPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/login')
  }

  /* Access the transactions of our database */
  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
  })

  return (
    <>
      <div className="p-6 space-y-6">
        <div className="w-full flex justify-between items-center p-6">
          {/* Título e botão */}
          <h1 className="font-bold text-2xl">Transações</h1>
          <AddTransactionButton />
        </div>
        {/* DataTable is a client component and this components is a server one, so we need to keep in mind that we can import
      a client component inside a server component, but a client component can't import a server component
      
      But one thing to keep in mind is, functions from the server side can be used on a client, server components that can't

      So, summarizing:

      Server-side logic (functions): Can be imported and called on client components, from both server and client they just
      execute logic, return values, etc.
      Server components can't be imported or used directly in Client Components because the cc is intended for the browser
      environment, and it can't handle or execute server-side logic or rendering.
      */}
        <DataTable columns={transactionColumns} data={transactions} />
      </div>
    </>
  )
}

export default TransactionsPage
