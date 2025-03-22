import { ShoppingBasketIcon } from 'lucide-react'
import SummaryCard, {
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from './summary-card'
import { getTotalProducts } from '@/_data/dal/dashboard/get-total-products'

const TotalProductsCard = async () => {
  const totalProducts = await getTotalProducts()

  return (
    <SummaryCard>
      <SummaryCardTitle>Products</SummaryCardTitle>
      <SummaryCardValue>{totalProducts}</SummaryCardValue>
      <SummaryCardIcon>
        <ShoppingBasketIcon />
      </SummaryCardIcon>
    </SummaryCard>
  )
}

export default TotalProductsCard
