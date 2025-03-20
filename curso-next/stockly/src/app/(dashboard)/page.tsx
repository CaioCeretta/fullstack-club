import { formatCurrency } from '@/helpers/currency'
import {
  CircleDollarSign,
  DollarSign,
  PackageIcon,
  ShoppingBasketIcon,
} from 'lucide-react'
import Header, {
  HeaderLeft,
  HeaderRight,
  HeaderSubtitle,
  HeaderTitle,
} from '../_components/header'
import { Button } from '../_components/ui/button'
import SummaryCard, {
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from './components/SummaryCard'
import { getDashboard } from '@/_data/dal/dashboard/get-dashboard'
import RevenueChart from './components/revenue-chart'

export default async function Home() {
  const dashboard = await getDashboard()

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
        <SummaryCard>
          <SummaryCardTitle>Total Revenue</SummaryCardTitle>
          <SummaryCardValue>
            {formatCurrency(dashboard.totalRevenue)}
          </SummaryCardValue>
          <SummaryCardIcon>
            <DollarSign />
          </SummaryCardIcon>
        </SummaryCard>

        <SummaryCard>
          <SummaryCardTitle>Today's Revenue</SummaryCardTitle>
          <SummaryCardValue>
            {formatCurrency(dashboard.todayRevenue)}
          </SummaryCardValue>
          <SummaryCardIcon>
            <DollarSign />
          </SummaryCardIcon>
        </SummaryCard>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <SummaryCard>
          <SummaryCardTitle>Total Sales</SummaryCardTitle>
          <SummaryCardValue>{dashboard.totalSales}</SummaryCardValue>
          <SummaryCardIcon>
            <CircleDollarSign />
          </SummaryCardIcon>
        </SummaryCard>

        <SummaryCard>
          <SummaryCardTitle>Total In Stock</SummaryCardTitle>
          <SummaryCardValue>{dashboard.totalInStock}</SummaryCardValue>
          <SummaryCardIcon>
            <PackageIcon />
          </SummaryCardIcon>
        </SummaryCard>

        <SummaryCard>
          <SummaryCardTitle>Products</SummaryCardTitle>
          <SummaryCardValue>{dashboard.totalProducts}</SummaryCardValue>
          <SummaryCardIcon>
            <ShoppingBasketIcon />
          </SummaryCardIcon>
        </SummaryCard>
      </div>

      <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white p-6">
        <p className="text-sm font-medium text-slate-500">Revenue</p>

        <RevenueChart data={dashboard.last14DaysRevenue} />
      </div>
    </div>
  )
}
