'use client'

import { Badge } from '@/app/_components/ui/badge'
import type { Product as PrismaProduct } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { CircleIcon } from 'lucide-react'
import { TableDropdownMenu } from './table-dropdown-menu'

export interface Product extends Omit<PrismaProduct, 'price'> {
  status: string
  price: number
}

const getStatusLabel = (status: string) => {
  if (status === 'IN_STOCK') {
    return 'In Stock'
  } else {
    return 'Out of Stock'
  }
}

export const productTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: 'Product',
  },
  {
    accessorKey: 'price',
    header: 'Unit Value',
    cell: (row) => {
      const product = row.row.original
      return Intl.NumberFormat('en-us', {
        style: 'currency',
        currency: 'USD',
      }).format(Number(product.price))
    },
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (row) => {
      const product = row.row.original
      const label = getStatusLabel(product.status)

      return (
        <Badge
          variant={label === 'In Stock' ? 'primary' : 'destructive'}
          className="gap-1.5"
        >
          <CircleIcon
            size={14}
            className={`${label === 'In Stock' ? 'fill-lime-950-foreground' : 'fill-destructive-foreground'} }`}
          />
          {label}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: (row) => {
      const product = row.row.original
      console.log(typeof product.price)
      return <TableDropdownMenu product={product} />
    },
  },
]
