'use client'

import type { SaleDTO } from '@/_data/dal/sales/get-sales'
import { Button } from '@/app/_components/ui/button'
import { formatCurrency } from '@/helpers/currency'
import type { ColumnDef } from '@tanstack/react-table'
import SalesTableDropdownMenu from './table-dropdown-menu'
import type { ProductDTO } from '@/_data/dal/product/get-products'
import type { ComboboxOption } from '@/app/_components/ui/combobox'

interface SaleTableColumn extends SaleDTO {
  products: ProductDTO[]
  productOptions: ComboboxOption[]
}

export const salesTableColumns: ColumnDef<SaleTableColumn>[] = [
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
    cell: ({ row: { original: sale } }) => (
      <Button asChild>
        <SalesTableDropdownMenu
          productOptions={sale.productOptions}
          products={sale.products}
          sale={sale}
        />
      </Button>
    ),
  },
]
