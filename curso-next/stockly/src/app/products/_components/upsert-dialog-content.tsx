'use client'

import { upsertProduct } from '@/app/_actions/product/upsert-product'
import {
  upsertProductSchema,
  UpsertProductType,
} from '@/app/_actions/product/upsert-product/schema'
import { Button } from '@/app/_components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/app/_components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/_components/ui/form'
import { Input } from '@/app/_components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'

interface UpsertDialogContentProps {
  productValues?: UpsertProductType
  onDialogClose?: () => void
}

const UpsertDialogContent = ({
  productValues,
  onDialogClose,
}: UpsertDialogContentProps) => {
  const form = useForm<UpsertProductType>({
    shouldUnregister: true,
    resolver: zodResolver(upsertProductSchema),
    defaultValues: productValues ?? {
      name: '',
      price: 1,
      stock: 0,
    },
  })

  const isEditing = !!productValues

  async function onSubmit(data: UpsertProductType) {
    try {
      await upsertProduct(
        productValues?.id ? { ...data, id: productValues.id } : data,
      )
      onDialogClose?.()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {isEditing ? 'Edit Product' : 'Upsert Product'}
        </DialogTitle>
        <DialogDescription>
          Please enter the information below
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <NumericFormat
                  thousandSeparator=","
                  decimalSeparator="."
                  fixedDecimalScale
                  decimalScale={2}
                  prefix="$ "
                  allowNegative={false}
                  customInput={Input}
                  onValueChange={(value) => field.onChange(value.floatValue)}
                  {...field}
                  onChange={() => {}}
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Available Stock</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter product stock"
                    type="number"
                    {...field}
                    onChange={(event) => {
                      const value = event.target.value
                      const parsedValue = value ? Number(value) : 0

                      field.onChange(parsedValue)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button disabled={form.formState.isSubmitting} type="submit">
              {form.formState.isSubmitting && (
                <Loader2Icon size={16} className="animate-spin" />
              )}
              {isEditing ? 'Confirm Changes' : 'Save'}
            </Button>
            <DialogClose asChild>
              <Button variant="secondary" type="reset">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}

export default UpsertDialogContent
