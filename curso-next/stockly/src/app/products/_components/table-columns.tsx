'use client'

import {
  AlertDialog,
  AlertDialogTrigger,
} from '@/app/_components/ui/alert-dialog'
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
import DeleteProductDialogContent from './delete-product-dialog'
import { Dialog, DialogTrigger } from '@/app/_components/ui/dialog'
import UpsertProductDialogContent from './upsert-dialog-content'
import { useState } from 'react'

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
    cell: (row) => {
      const [editDialogIsOpen, setEditDialogIsOpen] = useState(false)
      const product = row.row.original

      return (
        <AlertDialog>
          <Dialog open={editDialogIsOpen} onOpenChange={setEditDialogIsOpen}>
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
                <DialogTrigger>
                  <DropdownMenuItem className="gap-1.5">
                    <EditIcon size={16} />
                    Edit
                  </DropdownMenuItem>
                </DialogTrigger>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()} // Impede que o menu feche antes do AlertDialog abrir
                  >
                    <TrashIcon size={16} />
                    Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <UpsertProductDialogContent
              productValues={{
                id: product.id,
                name: product.name,
                price: Number(product.price),
                stock: product.stock,
              }}
              onDialogClose={() => setEditDialogIsOpen(false)}
            />
            <DeleteProductDialogContent productId={product.id} />
          </Dialog>
        </AlertDialog>
      )
    },
  },
]
