import { db } from '@/_lib/prisma'

export async function getTotalProducts(): Promise<number> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const totalProducts = await db.product.count()

  return totalProducts
}
