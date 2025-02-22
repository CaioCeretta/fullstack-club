'use client'

import { Button } from '@/app/_components/ui/button'
import { Combobox, type ComboboxOption } from '@/app/_components/ui/combobox'
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/_components/ui/table'
import { formatCurrency } from '@/helpers/currency'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Product } from '@prisma/client'
import { PlusIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { SalesTableDropdownMenu } from './table-dropdown-menu'

const upsertSheetFormSchema = z.object({
  productId: z.string().uuid({ message: 'Product is required' }),
  quantity: z.coerce.number().int().positive(),
})

type UpsertSheetFormType = z.infer<typeof upsertSheetFormSchema>

interface UpsertSheetContentProps {
  productsOptions: ComboboxOption[]
  products: Product[]
}

interface SelectedProduct {
  id: string
  name: string
  price: number
  quantity: number
}

const UpsertSheetContent = ({
  productsOptions,
  products,
}: UpsertSheetContentProps) => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    [],
  )

  const onSubmit = (data: UpsertSheetFormType) => {
    const selectedProduct = products.find(
      (product) => product.id === data.productId,
    )

    if (!selectedProduct) return

    setSelectedProducts((currentProducts) => {
      const existingProduct = currentProducts.find(
        (product) => product.id === selectedProduct.id,
      )

      if (existingProduct) {
        return currentProducts.map((product) => {
          if (product.id === selectedProduct.id) {
            return {
              ...product,
              quantity: product.quantity + data.quantity,
            }
          }
          return product
        })
      }

      return [
        ...currentProducts,
        {
          ...selectedProduct,
          price: Number(selectedProduct.price),
          quantity: data.quantity,
        },
      ]
    })

    form.reset()
  }

  const form = useForm<UpsertSheetFormType>({
    resolver: zodResolver(upsertSheetFormSchema),
    defaultValues: {
      productId: '',
      quantity: 1,
    },
  })

  const productsTotal = useMemo(() => {
    return selectedProducts.reduce((acc, val) => {
      return acc + val.price * val.quantity
    }, 0)
  }, [selectedProducts])

  const onRemoval = (productId: string) => {
    setSelectedProducts((currentProducts) => {
      const newProducts = currentProducts.filter(
        (product) => product.id !== productId,
      )

      return newProducts
    })
  }

  return (
    <SheetContent className="!max-w-[500px]">
      <SheetHeader>
        <SheetTitle>New Sale</SheetTitle>
        <SheetDescription>
          Insert below the informations about the sale
        </SheetDescription>
      </SheetHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Product</FormLabel>
                <FormControl>
                  <Combobox
                    {...field}
                    options={productsOptions}
                    placeholder="Select a product"
                  />
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

          <Button type="submit" className="w-full gap-2" variant={'secondary'}>
            <PlusIcon size={20} />
            Add product for sale
          </Button>
        </form>
      </Form>

      <Table>
        <TableCaption>Order Products List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Unit Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedProducts.map((selectedProduct) => (
            <TableRow key={selectedProduct.id}>
              <TableCell>{selectedProduct.name}</TableCell>
              <TableCell>{formatCurrency(selectedProduct.price)}</TableCell>
              <TableCell>{selectedProduct.quantity}</TableCell>
              <TableCell>
                {formatCurrency(
                  selectedProduct.quantity * selectedProduct.price,
                )}
              </TableCell>
              <TableCell>
                <SalesTableDropdownMenu
                  onRemoval={onRemoval}
                  product={selectedProduct}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell>{formatCurrency(productsTotal)}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </SheetContent>
  )
}

export default UpsertSheetContent
