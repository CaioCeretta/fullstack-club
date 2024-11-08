'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from '@prisma/client'
import { ArrowDownUp } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  TRANSACTION_CATEGORY_OPTIONS,
  TRANSACTION_PAYMENT_METHOD_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from '../_utils/constants/transactions'
import { MoneyInput } from './money-input'
import { Button } from './ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { DatePicker } from './ui/date-picker'
import { addTransaction } from '../_actions/add-transaction'
import { useState } from 'react'

const addTransactionFormSchema = z.object({
  name: z.string().trim().min(1, {
    message: 'O nome é obrigatório',
  }),
  amount: z
    .number({
      required_error: 'O valor é obrigatório',
    })
    .positive({
      message: 'O valor deve ser positivo',
    }),
  type: z.nativeEnum(TransactionType, {
    required_error: 'O tipo é obrigatório',
  }),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod, {
    required_error: 'A forma de pagamento é obrigatória',
  }),
  category: z.nativeEnum(TransactionCategory, {
    required_error: 'A categoria é obrigatória',
  }),
  date: z.date({
    required_error: 'A data é obrigatória',
  }),
})

type AddTransactionFormData = z.infer<typeof addTransactionFormSchema>

const AddTransactionButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const form = useForm<AddTransactionFormData>({
    resolver: zodResolver(addTransactionFormSchema),
    defaultValues: {
      amount: 50,
      category: TransactionCategory.OTHER,
      date: new Date(),
      name: '',
      paymentMethod: TransactionPaymentMethod.CASH,
      type: TransactionType.EXPENSE,
    },
  })

  const onSubmit = async (data: AddTransactionFormData) => {
    // Handle the form submission, e.g., send data to your API
    try {
      await addTransaction(data)
      setIsOpen(false)
      form.reset()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setIsOpen(true)
          form.reset()
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="rounded-full font-bold">
          Adicionar transação
          <ArrowDownUp />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Transação</DialogTitle>
          <DialogDescription>Insira as informações abaixo</DialogDescription>
        </DialogHeader>

        {/* Wrap the form with FormProvider to pass down form context */}
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da transação" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <MoneyInput
                      placeholder="Digite o valor"
                      /* Because the value we are receiving from the input, is a string, and zod required it to be a number
                      we use this function whenever the value changes, to transform it into a number */
                      onValueChange={({ floatValue }) => {
                        return field.onChange(floatValue)
                      }}
                      onBlur={field.onBlur}
                      disabled={field.disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Escolha o tipo da transação" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Escolha a categoria da transação" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_CATEGORY_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Forma de Pagamento</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Escolha a forma de pagamento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_PAYMENT_METHOD_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <DatePicker value={field.value} onChange={field.onChange} />

                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" variant="default">
                Adicionar
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}

export default AddTransactionButton
