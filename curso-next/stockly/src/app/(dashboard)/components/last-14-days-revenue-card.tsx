import { getLast14DaysRevenue } from '@/_data/dal/dashboard/get-last-14-days-revenue'
import RevenueChart from './revenue-chart'

const Last14DaysRevenueCard = async () => {
  const last14DaysRevenue = await getLast14DaysRevenue()

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white p-6">
      <p className="text-sm font-medium text-slate-500">Revenue</p>

      <RevenueChart data={last14DaysRevenue} />
    </div>
  )
}

export default Last14DaysRevenueCard
