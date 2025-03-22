import 'server-only'

import { db } from '@/_lib/prisma'

export const getTotalSales = async (): Promise<number> => {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  return db.sale.count()
}
