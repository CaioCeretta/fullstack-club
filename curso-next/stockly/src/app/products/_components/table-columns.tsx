'use client'

import { Badge } from '@/app/_components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/_components/ui/dropdown-menu'
import type { Product as PrismaProduct } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import {
  CircleIcon,
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from 'lucide-react'

export interface Product extends PrismaProduct {
  status: string
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
    cell: ({ row }) => {
      const product = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MoreHorizontalIcon size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="gap-1.5"
              onClick={() => navigator.clipboard.writeText(product.id)}
            >
              <ClipboardCopyIcon size={16} />
              Copy Id
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-1.5">
              <EditIcon size={16} />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-1.5">
              <TrashIcon size={16} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
