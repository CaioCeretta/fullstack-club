import React from 'react'
import SummaryCard, {
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from './summary-card'
import { PackageIcon } from 'lucide-react'
import { getTotalInStock } from '@/_data/dal/dashboard/get-total-in-stock'

const TotalInStockCard = async () => {
  const totalInStock = await getTotalInStock()

  return (
    <SummaryCard>
      <SummaryCardTitle>Total In Stock</SummaryCardTitle>
      <SummaryCardValue>{totalInStock}</SummaryCardValue>
      <SummaryCardIcon>
        <PackageIcon />
      </SummaryCardIcon>
    </SummaryCard>
  )
}

export default TotalInStockCard
