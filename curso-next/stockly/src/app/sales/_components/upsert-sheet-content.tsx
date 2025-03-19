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
  SheetFooter,
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
import { CheckIcon, PlusIcon } from 'lucide-react'
import { useMemo, useState, type Dispatch, type SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { upsertSale } from '@/_data/_actions/sale/upsert-sale'
import { toast } from 'sonner'
import { UpsertSalesTableDropdownMenu } from './upsert-table-dropdown-menu'
import { useAction } from 'next-safe-action/hooks'
import { flattenValidationErrors } from 'next-safe-action'

const upsertSheetFormSchema = z.object({
  productId: z.string().uuid({ message: 'Product is required' }),
  quantity: z.coerce.number().int().positive(),
})

type UpsertSheetFormType = z.infer<typeof upsertSheetFormSchema>

interface SelectedProduct {
  id: string
  name: string
  price: number
  quantity: number
}

interface UpsertSheetContentProps {
  saleId?: string
  productsOptions: ComboboxOption[]
  products: Product[]
  upsertSheetIsOpen: Dispatch<SetStateAction<boolean>>
  defaultSelectedProducts?: SelectedProduct[] | undefined
}

const UpsertSheetContent = ({
  saleId,
  productsOptions,
  products,
  upsertSheetIsOpen,
  defaultSelectedProducts,
}: UpsertSheetContentProps) => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    defaultSelectedProducts ?? [],
  )

  const { execute: executeUpsertSale } = useAction(upsertSale, {
    onError: ({ error: { validationErrors, serverError } }) => {
      const flattenedErrors = flattenValidationErrors(validationErrors)
      toast.error(serverError ?? flattenedErrors.formErrors[0])
    },
    onSuccess: () => {
      toast.success('Sale completed!')
      upsertSheetIsOpen(false)
    },
  })

  const onSubmit = (data: UpsertSheetFormType) => {
    const selectedProduct = products.find(
      (product) => product.id === data.productId,
    )

    if (!selectedProduct) return

    setSelectedProducts((currentProducts) => {
      const existingProduct = currentProducts.find(
        (product) => product.id === selectedProduct.id,
      )
      if (data.quantity > selectedProduct.stock) {
        form.setError('quantity', {
          message: 'Quantity unavailable in stock',
        })

        return currentProducts
      }

      form.reset()

      if (existingProduct) {
        // const productIsOutOfStock =
        //   existingProduct.quantity + data.quantity > selectedProduct.stock

        // if (productIsOutOfStock) {
        //   form.setError('quantity', {
        //     message: 'Quantity unavailable in stock',
        //   })

        //   return currentProducts
        // }

        form.reset()

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

      form.reset()

      return [
        ...currentProducts,
        {
          ...selectedProduct,
          price: Number(selectedProduct.price),
          quantity: data.quantity,
        },
      ]
    })
  }

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

  const onSubmitSale = async () => {
    executeUpsertSale({
      id: saleId,
      products: selectedProducts.map((product) => ({
        id: product.id,
        quantity: product.quantity,
      })),
    })
  }

  const form = useForm<UpsertSheetFormType>({
    resolver: zodResolver(upsertSheetFormSchema),
    defaultValues: {
      productId: '',
      quantity: 1,
    },
  })

  return (
    <SheetContent className="!max-w-[500px]">
      <SheetHeader>
        <SheetTitle>New Sale</SheetTitle>
        <SheetDescription>
          Insert below the information about the sale
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
                <UpsertSalesTableDropdownMenu
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

      <SheetFooter className="pt-6">
        <Button
          disabled={selectedProducts.length === 0}
          variant={'default'}
          className="w-full"
          onClick={onSubmitSale}
        >
          <CheckIcon size={20} />
          Finish Purchase
        </Button>
      </SheetFooter>
    </SheetContent>
  )
}

export default UpsertSheetContent
