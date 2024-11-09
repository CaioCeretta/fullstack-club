import { db } from '@/app/_lib/prisma'
import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from 'lucide-react'
import SummaryCard from './summary-card'

interface SummaryCardsProps {
  month: string
}

const SummaryCards = async ({ month = 'janeiro' }: SummaryCardsProps) => {
  const where = {
    date: {
      gte: new Date(`2024-${month}-01`),
      lt: new Date(`2024-${month}-31`),
    },
  }

  // What aggregate does is it will take all the deposit which have the type DEPOSIT and sum all the amounts

  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: 'DEPOSIT' },
        _sum: { amount: true },
      })
    )._sum?.amount,
  )

  /* Here we might think that the return of that query is already the sum, but what is happening here, is the parentheses
    rensures that the aggregation result is fully resolved until the await completes, and then we'll immediately access the
    .amount field, if we remove the parentheses, it would still work the same way, but it makes it clearer and help avoid
    possible confusion */

  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: 'INVESTMENT' },
        _sum: { amount: true },
      })
    )._sum?.amount,
  )
  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: 'EXPENSE' },
        _sum: { amount: true },
      })
    )._sum?.amount,
  )

  const balance = depositsTotal - investmentsTotal - expensesTotal

  return (
    <div className="space-y-6">
      {/* First card */}
      <SummaryCard
        size="large"
        icon={<WalletIcon size={16} />}
        title="Saldo"
        amount={balance}
      />

      {/* Other cards */}
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<PiggyBankIcon size={16} />}
          title="Investido"
          amount={investmentsTotal}
        />
        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="Receita"
          amount={depositsTotal}
        />
        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-destructive" />}
          title="Despesas"
          amount={expensesTotal}
        />
      </div>
    </div>
  )
}

export default SummaryCards
