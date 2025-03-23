'server-only'

import { db } from '@/_lib/prisma'

export const getTotalRevenue = async () => {
  // Calculating the full revenue
  const totalRevenue = (
    await db.saleProduct.findMany({
      select: {
        unitPrice: true,
        quantity: true,
      },
    })
  ).reduce((acc, sale) => acc + Number(sale.unitPrice) * sale.quantity, 0)

  return totalRevenue
}
