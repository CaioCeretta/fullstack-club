'use client'

import { Button } from '@/app/_components/ui/button'
import { TransactionType, type Transaction } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { PencilIcon, TrashIcon } from 'lucide-react'
import TransactionTypeBadge from '../_components/type-badge'
import {
  TRANSACTION_CATEGORY_LABELS,
  TRANSACTION_PAYMENT_METHOD_LABELS,
} from '@/app/_utils/constants/transactions'

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
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_CATEGORY_LABELS[transaction.category],
  },
  {
    accessorKey: 'paymentMethod',
    header: 'Método',
    cell: ({ row: { original: transaction } }) => {
      return TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod]
    },
  },
  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ row: { original: transaction } }) => {
      return new Date(transaction.date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    },
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
    cell: ({ row: { original: transaction } }) => {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(Number(transaction.amount))
    },
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: () => {
      return (
        <div className="space-x-1">
          <Button variant="ghost">
            <PencilIcon size={'icon'} />
          </Button>
          <Button variant="ghost">
            <TrashIcon size={'icon'} />
          </Button>
        </div>
      )
    },
  },
]
