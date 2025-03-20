import 'server-only'

import { db } from '@/_lib/prisma'
import dayjs from 'dayjs'

export interface DayTotalRevenue {
  day: string
  totalRevenue: number
}

interface DashboardDTO {
  totalRevenue: number
  todayRevenue: number
  totalSales: number
  totalInStock: number
  totalProducts: number
  last14DaysRevenue: DayTotalRevenue[]
}

/* This aggregate will get all the unitPrice from all the saleProduct rows, and sum them.

The result of this aggregation will be, so we'll have to access it as totalRevenue._sum.unitPrice
  _sum: {
    unitPrice: 1234.56 // Sum of all unitPrice
  }
}
*/

export const getDashboard = async (): Promise<DashboardDTO> => {
  const getSales = async (date: Date) => {
    const startOfDay = dayjs(date).startOf('day').toDate()
    const endOfDay = dayjs(date).endOf('day').toDate()

    const sales = await db.saleProduct.findMany({
      where: {
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      select: {
        unitPrice: true,
        quantity: true,
      },
    })

    return sales
  }

  const today = dayjs().endOf('day').toDate()

  // Fetch today sales
  const todaySales = await getSales(today)

  // Calculating the days revenue
  const todayRevenue = todaySales.reduce(
    (acc, sale) => acc + Number(sale.unitPrice) * sale.quantity,
    0,
  )

  const last14Days = Array.from({ length: 14 }, (_, i) => {
    return dayjs().subtract(i, 'day').toDate() // Generate the dates of the last 14 days
  }).reverse()

  // Creating promises that will map over the 14 days, and on each one of them, call the getSales passing the day as argument
  const salesPromises = last14Days.map((day) => getSales(day))

  // Resolve all promises and obtain the sales of the last 14 days
  const allSales = await Promise.all(salesPromises)

  // Calculate the total revenue of the last 14 days
  const last14DaysRevenue = allSales.map((dailySales, index) => {
    const dailyRevenue = dailySales.reduce(
      (acc, sale) => acc + Number(sale.unitPrice) * sale.quantity,
      0,
    )

    // Format the date for displaying
    const day = dayjs(last14Days[index])
    return {
      day: day.format('DD/MM'), // formatted date
      totalRevenue: dailyRevenue,
    }
  })

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

  // Calculating the full revenue

  const totalRevenue = (
    await db.saleProduct.findMany({
      select: {
        unitPrice: true,
        quantity: true,
      },
    })
  ).reduce((acc, sale) => acc + Number(sale.unitPrice) * sale.quantity, 0)

  return {
    totalRevenue,
    totalSales,
    todayRevenue,
    totalInStock: Number(totalInStock._sum.stock),
    totalProducts,
    last14DaysRevenue,
  }
}
