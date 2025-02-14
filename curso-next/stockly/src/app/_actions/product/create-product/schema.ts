import { z } from 'zod'

export const createProductSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'The name of product is required',
    })
    .trim(),
  price: z.coerce.number().min(0.01, {
    message: 'Product price is required',
  }),
  stock: z.number().min(0, { message: 'Stock is required' }),
})

export type CreateProductType = z.infer<typeof createProductSchema>
