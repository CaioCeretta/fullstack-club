'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/_components/ui/dropdown-menu'
import type { Product } from '@prisma/client'
import { MoreHorizontalIcon, TrashIcon } from 'lucide-react'

interface UpsertSalesTableDropdownMenuProps {
  product: Pick<Product, 'id'> // Pick will only get the 'id' prop of Product
  onRemoval: (productId: string) => void
}

export const UpsertSalesTableDropdownMenu = ({
  product,
  onRemoval,
}: UpsertSalesTableDropdownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MoreHorizontalIcon size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()} // prevents the menu from closing before the alert dialog opens
          onClick={() => onRemoval(product.id)}
        >
          <TrashIcon size={16} />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
