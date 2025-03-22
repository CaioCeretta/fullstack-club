import { db } from '@/_lib/prisma'
import dayjs from 'dayjs'

export const getSales = async (date: Date) => {
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
