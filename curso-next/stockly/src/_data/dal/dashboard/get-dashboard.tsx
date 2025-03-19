import { db } from '@/_lib/prisma'

interface DashboardDTO {
  totalRevenue: number
  todayRevenue: number
  totalSales: number
  totalInStock: number
  totalProducts: number
}

/* This aggregate will get all the unitPrice from all the saleProduct rows, and sum them.

The result of this aggregation will be, so we'll have to access it as totalRevenue._sum.unitPrice
  _sum: {
    unitPrice: 1234.56 // Sum of all unitPrice
  }
}
*/

export const getDashboard = async (): Promise<DashboardDTO> => {
  const sales = await db.saleProduct.findMany({
    select: {
      unitPrice: true,
      quantity: true,
    },
  })

  const totalRevenue = sales.reduce(
    (acc, sale) => acc + Number(sale.unitPrice) * sale.quantity,
    0,
  )

  const todaySales = await db.saleProduct.findMany({
    where: {
      createdAt: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
        lte: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    },
    select: {
      unitPrice: true,
      quantity: true,
    },
  })

  const todayRevenue = todaySales.reduce(
    (acc, sale) => acc + Number(sale.unitPrice) * sale.quantity,
    0,
  )

  const totalInStockPromise = db.product.aggregate({
    _sum: {
      stock: true,
    },
  })

  const totalSalesPromise = db.sale.count()

  const totalProductsPromise = db.product.count()

  const [totalSales, totalInStock, totalProducts] = await Promise.all([
    totalSalesPromise,
    totalInStockPromise,
    totalProductsPromise,
  ])

  return {
    totalRevenue,
    totalSales,
    todayRevenue,
    totalInStock: Number(totalInStock._sum.stock),
    totalProducts,
  }
}
