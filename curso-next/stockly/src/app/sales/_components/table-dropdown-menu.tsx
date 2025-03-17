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
import type { Sale } from '@prisma/client'
import {
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import DeleteSaleDialogContent from './delete-sale-dialog'
import { Sheet, SheetTrigger } from '@/app/_components/ui/sheet'
import UpsertSheetContent from './upsert-sheet-content'

interface SalesTableDropdownMenuProps {
  sale: Pick<Sale, 'id'>
}

const SalesTableDropdownMenu = ({ sale }: SalesTableDropdownMenuProps) => {
  const [upsertSheetIsOpen, setUpsertSheetIsOpen] = useState<boolean>(false)

  const handleClipboardClick = (id: string) => {
    navigator.clipboard.writeText(id)
    toast.success('ID copied to clipboard!')
  }

  return (
    <Sheet open={upsertSheetIsOpen} onOpenChange={setUpsertSheetIsOpen}>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MoreHorizontalIcon size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="gap-1.5"
              onClick={() => handleClipboardClick(sale.id)}
            >
              <ClipboardCopyIcon size={16} />
              Copy Id
            </DropdownMenuItem>
            <SheetTrigger asChild>
              <DropdownMenuItem className="gap-1.5">
                <EditIcon size={16} />
                Edit
              </DropdownMenuItem>
            </SheetTrigger>
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
        <DeleteSaleDialogContent saleId={sale.id} />
      </AlertDialog>

      <UpsertSheetContent
        productsOptions={[]}
        products={[]}
        defaultSelectedProducts={[]}
        upsertSheetIsOpen={setUpsertSheetIsOpen}
      />
    </Sheet>
  )
}

export default SalesTableDropdownMenu
