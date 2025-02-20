'use client'

import { Combobox } from '@/app/_components/ui/combobox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/_components/ui/form'
import { Input } from '@/app/_components/ui/input'
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/app/_components/ui/sheet'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const upsertSheetFormSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
})

type UpsertSheetFormType = z.infer<typeof upsertSheetFormSchema>

const UpsertSheetContent = () => {
  const form = useForm<UpsertSheetFormType>({
    resolver: zodResolver(upsertSheetFormSchema),
    defaultValues: {
      productId: '',
      quantity: 1,
    },
  })

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>New Sale</SheetTitle>

        <SheetDescription>
          Insert below the informations about the sale
        </SheetDescription>
      </SheetHeader>

      <Form {...form}>
        <form className="space-y-6 py-6">
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Product</FormLabel>
                <FormControl>
                  <Combobox {...field} placeholder="Select a product" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="quantity"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </SheetContent>
  )
}

export default UpsertSheetContent
