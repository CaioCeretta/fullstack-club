import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from 'lucide-react'
import SummaryCard from './summary-card'

interface SummaryCardsProps {
  month: string
  balance: number
  depositsTotal: number
  investmentsTotal: number
  expensesTotal: number
}

const SummaryCards = async ({
  balance,
  depositsTotal,
  investmentsTotal,
  expensesTotal,
}: SummaryCardsProps) => {
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