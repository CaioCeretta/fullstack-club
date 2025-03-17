import { z } from 'zod'
export const upsertSaleSchema = z.object({
  products: z.array(
    z.object({
      id: z.string().uuid(),
      quantity: z.number().int().positive(),
    }),
  ),
})

export type UpsertSaleType = z.infer<typeof upsertSaleSchema>
