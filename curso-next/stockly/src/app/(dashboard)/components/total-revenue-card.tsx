import { getTotalRevenue } from '@/_data/dal/dashboard/get-total-revenue'
import SummaryCard, {
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from './summary-card'
import { DollarSign } from 'lucide-react'
import { formatCurrency } from '@/helpers/currency'

export const TotalRevenueCard = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000))

  const totalRevenue = await getTotalRevenue()

  return (
    <SummaryCard>
      <SummaryCardTitle>Total Revenue</SummaryCardTitle>
      <SummaryCardValue>{formatCurrency(totalRevenue)}</SummaryCardValue>
      <SummaryCardIcon>
        <DollarSign />
      </SummaryCardIcon>
    </SummaryCard>
  )
}

export default TotalRevenueCard
