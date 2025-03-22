import { getSales } from '@/helpers/getSales'
import dayjs from 'dayjs'

export interface DayTotalRevenue {
  day: string
  totalRevenue: number
}

export async function getLast14DaysRevenue(): Promise<DayTotalRevenue[]> {
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

  return last14DaysRevenue
}
