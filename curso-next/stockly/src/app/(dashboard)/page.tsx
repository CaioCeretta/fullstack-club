import { Suspense } from 'react'
import Header, {
  HeaderLeft,
  HeaderRight,
  HeaderSubtitle,
  HeaderTitle,
} from '../_components/header'
import { Button } from '../_components/ui/button'
import Last14DaysRevenueCard from './components/last-14-days-revenue-card'
import MostSoldProductsCard from './components/most-sold-products-card'
import { SkeletonTotalRevenueCard } from './components/skeletons/skeleton-total-revenue-card'
import TodaysRevenueCard from './components/todays-revenue-card'
import TotalInStockCard from './components/total-in-stock-card'
import TotalProductsCard from './components/total-products-card'
import TotalRevenueCard from './components/total-revenue-card'
import TotalSalesCard from './components/total-sales-card'

export default function Home() {
  return (
    <div className="ml-8 mt-8 flex w-full flex-col space-y-8 py-8">
      <Header>
        <HeaderLeft>
          <HeaderTitle>Dashboard</HeaderTitle>
          <HeaderSubtitle>Overview</HeaderSubtitle>
        </HeaderLeft>
        <HeaderRight>
          <Button>Add</Button>
        </HeaderRight>
      </Header>

      <div className="grid grid-cols-2 gap-6">
        <Suspense fallback={<SkeletonTotalRevenueCard />}>
          <TotalRevenueCard />
        </Suspense>
        <TodaysRevenueCard />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <TotalSalesCard />
        <TotalInStockCard />
        <TotalProductsCard />
      </div>

      <div className="grid min-h-0 grid-cols-[minmax(0,2.5fr),minmax(0,1fr)] gap-6">
        <Last14DaysRevenueCard />
        <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white">
          <MostSoldProductsCard />
        </div>
      </div>
    </div>
  )
}
