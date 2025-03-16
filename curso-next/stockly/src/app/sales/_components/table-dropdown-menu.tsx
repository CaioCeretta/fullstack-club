'use client'

import {
  AlertDialog,
  AlertDialogTrigger,
} from '@/app/_components/ui/alert-dialog'
import { Dialog, DialogTrigger } from '@/app/_components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/_components/ui/dropdown-menu'
import {
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from 'lucide-react'
import type { UpsertProductType } from '@/app/_actions/product/upsert-product/schema'
import { useState } from 'react'

interface SalesTableDropdownMenuProps {
  product: UpsertProductType
}

export const SalesTableDropdownMenu = ({
  product,
}: SalesTableDropdownMenuProps) => {
  const [editDialogIsOpen, setEditDialogIsOpen] = useState(false)

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
              onClick={() => navigator.clipboard.writeText(product.id!)}
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
      </Dialog>
    </AlertDialog>
  )
}
