import { CircleDollarSign } from 'lucide-react'
import SummaryCard, {
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from './summary-card'
import { getTotalSales } from '@/_data/dal/dashboard/total-sales'

export interface TotalSalesCard {}

export const TotalSalesCard = async () => {
  const totalSales = await getTotalSales()

  return (
    <SummaryCard>
      <SummaryCardTitle>Total Sales</SummaryCardTitle>
      <SummaryCardValue>{totalSales}</SummaryCardValue>
      <SummaryCardIcon>
        <CircleDollarSign />
      </SummaryCardIcon>
    </SummaryCard>
  )
}

export default TotalSalesCard
