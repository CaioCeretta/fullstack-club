import 'server-only'

import { db } from '@/_lib/prisma'
import dayjs from 'dayjs'
import type { ProductStatus } from '../product/get-products'

export interface MostSoldProductDTO {
  productId: string
  name: string
  totalSold: number
  price: number
  status: ProductStatus
}

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
  mostSoldProducts: MostSoldProductDTO[]
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
  const last14DaysRevenue = allSales.map(
    (dailySales, index): DayTotalRevenue => {
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
    },
  )

  console.log(last14DaysRevenue)

  const totalInStockPromise = db.product.aggregate({
    _sum: {
      stock: true,
    },
  })

  const totalSalesPromise = db.sale.count()

  const totalProductsPromise = db.product.count()

  // Calculating the full revenue

  const totalRevenue = (
    await db.saleProduct.findMany({
      select: {
        unitPrice: true,
        quantity: true,
      },
    })
  ).reduce((acc, sale) => acc + Number(sale.unitPrice) * sale.quantity, 0)

  /* **SQL Group By Reminder**

    When SUM("SaleProduct", "quantity") is used, we are adding every sold quantity of each product. but for the database
    to understand how to do this sum correctly, we need to say how the records are being grouped.

    What happens in the group by is
    1. the database will group all the records that have the same product.name and the same
    product.price

    2. For each group, it will sum the saleProduct.quantity, i. e., the quantity of the product that has been sold.

    3. He then returns a single result for each group, with product name, the sum of the sold quantity and the price

    The reason we had to include the product.price in the group by is because in some db, every sale that is not used
    inside the aggregate function, such as SUM, COUNT, etc, needs to be in the group by

    This avoids ambiguity, because if we had two products with the same name, but different prices, db would know how to
    aggregate them correctly
  
  */

  /* The generic {name: string; totalSold: number}[]> says that the expected return from that mostSoldProductsQuery, has
  this typing */

  const mostSoldProductsPromise = db.$queryRaw<
    {
      productId: string
      name: string
      totalSold: number
      price: number
      stock: number
    }[]
  >`
    SELECT 
      "Product"."id" as productId,
      "Product"."name",
      SUM("SaleProduct"."quantity") AS "totalSold",
      "Product"."price", "Product"."stock"
      FROM "SaleProduct"
      JOIN "Product" ON "SaleProduct"."productId" = "Product"."id"
      GROUP BY "Product"."id", "Product"."name", "Product"."price", "Product"."stock"
      ORDER BY "totalSold" DESC
      LIMIT 10; 
  `

  console.log(await mostSoldProductsPromise)

  const [totalSales, totalInStock, totalProducts, mostSoldProducts] =
    await Promise.all([
      totalSalesPromise,
      totalInStockPromise,
      totalProductsPromise,
      mostSoldProductsPromise,
    ])

  return {
    totalRevenue,
    totalSales,
    todayRevenue,
    totalInStock: Number(totalInStock._sum.stock),
    totalProducts,
    last14DaysRevenue,
    mostSoldProducts: mostSoldProducts.map((product) => ({
      productId: product.productId,
      name: product.name,
      totalSold: Number(product.totalSold),
      price: product.price,
      status: product.stock > 0 ? 'IN_STOCK' : 'OUT_OF_STOCK',
    })),
  }
}
