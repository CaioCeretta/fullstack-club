'use client'

import type { SaleDTO } from '@/_data/dal/sales/get-sales'
import { Button } from '@/app/_components/ui/button'
import { formatCurrency } from '@/helpers/currency'
import type { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontalIcon } from 'lucide-react'

export const salesTableColumns: ColumnDef<SaleDTO>[] = [
  {
    accessorKey: 'productNames',
    header: 'Products',
  },
  {
    accessorKey: 'productsQuantity',
    header: 'Products Quantity',
  },
  {
    accessorKey: 'totalAmount',
    cell: ({
      row: {
        original: { totalAmount },
      },
    }) => formatCurrency(totalAmount),
  },
  {
    header: 'Date',
    accessorKey: 'date',
    cell: ({
      row: {
        original: { date },
      },
    }) => new Date(date).toLocaleDateString(),
  },
  {
    header: 'Actions',
    cell: () => (
      <Button>
        <MoreHorizontalIcon size={16} />
      </Button>
    ),
  },
]
