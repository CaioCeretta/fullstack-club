'use client'

import { TransactionType, type Transaction } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import TransactionTypeBadge from '../_components/type-badge'

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row: { original: transaction } }) => {
      if (transaction.type === TransactionType.DEPOSIT) {
        return <TransactionTypeBadge transaction={transaction} />
      } else if (transaction.type === TransactionType.EXPENSE) {
        return <TransactionTypeBadge transaction={transaction} />
      } else {
        return <TransactionTypeBadge transaction={transaction} />
      }
    },
  },
  {
    accessorKey: 'category',
    header: 'Categoria',
  },
  {
    accessorKey: 'paymentMethod',
    header: 'Método de Pagamento',
    cell: ({ row: { original: paymentMethod } }) => {},
  },
  {
    accessorKey: 'date',
    header: 'Data',
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
  },
  {
    accessorKey: 'actions',
    header: '',
  },
]
