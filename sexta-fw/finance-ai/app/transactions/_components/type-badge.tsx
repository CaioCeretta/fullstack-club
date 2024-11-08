import { Badge } from '@/app/_components/ui/badge'
import { TransactionType, type Transaction } from '@prisma/client'
import { CircleIcon } from 'lucide-react'

interface TransactionTypeBadgeProps {
  transaction: Transaction
}

const TransactionTypeBadge = ({ transaction }: TransactionTypeBadgeProps) => {
  if (transaction.type === TransactionType.DEPOSIT) {
    return (
      <Badge className="hover:bg-muted bg-muted text-primary font-bold ">
        <CircleIcon className="fill-primary mr-2" size={10} />
        Depósito
      </Badge>
    )
  } else if (transaction.type === TransactionType.EXPENSE) {
    return (
      <Badge className="hover:bg-danger/10 bg-danger/10 text-danger font-bold">
        <CircleIcon className="fill-danger mr-2" size={10} />
        Despesa
      </Badge>
    )
  } else {
    return (
      <Badge className="hover:bg-white/10 bg-white/10 text-white font-bold">
        <CircleIcon className="fill-white mr-2" size={10} />
        Investimento
      </Badge>
    )
  }
}

export default TransactionTypeBadge
