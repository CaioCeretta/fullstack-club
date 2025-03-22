import { formatCurrency } from '@/helpers/currency'
import SummaryCard, {
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from './summary-card'
import { DollarSign } from 'lucide-react'
import { getDailyRevenue } from '@/_data/dal/dashboard/get-today-revenue'

export const TodaysRevenueCard = async () => {
  const dailyRevenue = await getDailyRevenue()

  return (
    <SummaryCard>
      <SummaryCardTitle>Today's Revenue</SummaryCardTitle>
      <SummaryCardValue>{formatCurrency(dailyRevenue)}</SummaryCardValue>
      <SummaryCardIcon>
        <DollarSign />
      </SummaryCardIcon>
    </SummaryCard>
  )
}

export default TodaysRevenueCard
