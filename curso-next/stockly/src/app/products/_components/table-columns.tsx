'use client'

import type { ProductDTO } from '@/_data/dal/product/get-products'
import ProductStatusBadge from '@/app/_components/product-status-badge'
import type { Product as PrismaProduct } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { ProductTableDropdownMenu } from './table-dropdown-menu'

export interface Product extends Omit<PrismaProduct, 'price'> {
  status: string
  price: number
}

export const productTableColumns: ColumnDef<ProductDTO>[] = [
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

      return <ProductStatusBadge status={product.status} />
    },
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: (row) => {
      const product = row.row.original

      const parsedProduct = {
        ...product,
        price: Number(product.price),
      }

      return <ProductTableDropdownMenu product={parsedProduct} />
    },
  },
]
