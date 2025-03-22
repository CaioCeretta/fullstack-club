import { db } from '@/_lib/prisma'

export async function getTotalInStock(): Promise<number> {
  await new Promise((resolve) => setTimeout(resolve, 1500))

  /* This aggregate will get all the unitPrice from all the saleProduct rows, and sum them.

The result of this aggregation will be, so we'll have to access it as totalRevenue._sum.unitPrice
  _sum: {
    unitPrice: 1234.56 // Sum of all unitPrice
  }
}
*/
  const totalStock = await db.product.aggregate({
    _sum: {
      stock: true,
    },
  })

  return Number(totalStock._sum.stock)
}
