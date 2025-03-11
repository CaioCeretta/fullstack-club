'use client'

import { Button } from '@/app/_components/ui/button'
import type { ComboboxOption } from '@/app/_components/ui/combobox'
import { Sheet, SheetTrigger } from '@/app/_components/ui/sheet'
import type { Product } from '@prisma/client'
import UpsertSheetContent from './upsert-sheet-content'
import { useState } from 'react'

interface CreateSaleButtonProps {
  productsOptions: ComboboxOption[]
  products: Product[]
}

export const CreateSaleButton = (props: CreateSaleButtonProps) => {
  const [sheetIsOpen, setSheetIsOpen] = useState<boolean>(false)

  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button>New Sale</Button>
      </SheetTrigger>
      {/* We could also pass a destructuring of the props to the properties of the component, (e.g. {...props}) */}
      <UpsertSheetContent
        productsOptions={props.productsOptions}
        products={props.products}
        onSubmitSuccess={() => setSheetIsOpen(false)}
      />
    </Sheet>
  )
}

export default CreateSaleButton
