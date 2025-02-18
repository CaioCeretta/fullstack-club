import { z } from 'zod'

export const deleteProductSchema = z.object({
  id: z.string().uuid(),
})

export type DeleteProductType = z.infer<typeof deleteProductSchema>
