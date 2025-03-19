import { z } from 'zod'

export const upsertProductSchema = z.object({
  id: z.string().uuid().optional(),
  name: z
    .string()
    .min(1, {
      message: 'The name of product is required',
    })
    .trim(),
  price: z.coerce.number().min(0, {
    message: 'Product price is required',
  }),
  stock: z.number().min(0, { message: 'Stock is required' }),
})

export type UpsertProductType = z.infer<typeof upsertProductSchema>
