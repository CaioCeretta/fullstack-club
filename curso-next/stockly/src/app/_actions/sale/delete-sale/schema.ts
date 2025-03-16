import { z } from 'zod'

export const deleteSaleSchema = z.object({
  id: z.string().uuid(),
})

export type DeleteSaleType = z.infer<typeof deleteSaleSchema>
