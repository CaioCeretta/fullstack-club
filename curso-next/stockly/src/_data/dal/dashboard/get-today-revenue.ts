import { getSales } from '@/helpers/getSales'
import dayjs from 'dayjs'

export async function getDailyRevenue() {
  const today = dayjs().endOf('day').toDate()

  // Fetch today sales
  const todaySales = await getSales(today)

  // Calculating the days revenue
  return todaySales.reduce(
    (acc, sale) => acc + Number(sale.unitPrice) * sale.quantity,
    0,
  )
}
