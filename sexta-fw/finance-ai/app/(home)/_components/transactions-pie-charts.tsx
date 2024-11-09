'use client'

import { Pie, PieChart } from 'recharts'

import { Card, CardContent } from '@/app/_components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/app/_components/ui/chart'
import type { TransactionsPercentagePerType } from '@/app/_data/get-dashboard/types'
import { TransactionType } from '@prisma/client'
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react'
import PercentageItem from './percentage-item'

interface TransactionsPieChartProps {
  typesPercentage: TransactionsPercentagePerType
  depositsTotal: number
  investmentsTotal: number
  expensesTotal: number
}

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: 'Investido',
    color: '#FFFFFF',
  },
  [TransactionType.DEPOSIT]: {
    label: 'Receita',
    color: '#55B02E',
  },
  [TransactionType.EXPENSE]: {
    label: 'Despesas',
    color: '#E93030',
  },
} satisfies ChartConfig

const TransactionsPieChart = ({
  depositsTotal,
  investmentsTotal,
  expensesTotal,
  typesPercentage,
}: TransactionsPieChartProps) => {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: depositsTotal,
      fill: '#55B02E',
    },
    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: '#E93030',
    },
    {
      type: TransactionType.INVESTMENT,
      amount: investmentsTotal,
      fill: '#FFFFFF',
    },
  ]

  return (
    <Card className="flex flex-col py-2">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
        <div className="space-y-3">
          <PercentageItem
            icon={<TrendingUpIcon size={16} className="text-primary" />}
            title="Receita"
            value={typesPercentage[TransactionType.DEPOSIT]}
          />
          <PercentageItem
            icon={<PiggyBankIcon size={16} className="text-white" />}
            title="Investido"
            value={typesPercentage[TransactionType.INVESTMENT]}
          />

          <PercentageItem
            icon={<TrendingDownIcon size={16} className="text-destructive" />}
            title="Despesa"
            value={typesPercentage[TransactionType.EXPENSE]}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default TransactionsPieChart
