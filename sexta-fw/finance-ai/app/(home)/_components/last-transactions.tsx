import { Button } from '@/app/_components/ui/button'
import { CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card'
import { ScrollArea } from '@/app/_components/ui/scroll-area'
import { TRANSACTION_PAYMENT_METHOD_ICONS } from '@/app/_utils/constants/transactions'
import { formatCurrency } from '@/app/utils/currency'
import { TransactionType, type Transaction } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

interface LastTransactionsProps {
  lastTransactions: Transaction[]
}

const LastTransactions = ({ lastTransactions }: LastTransactionsProps) => {
  const getAmountColor = (transaction: Transaction) => {
    if (transaction.type === TransactionType.EXPENSE) {
      return 'text-red-500'
    } else if (transaction.type === TransactionType.DEPOSIT) {
      return 'text-primary'
    } else if (transaction.type === TransactionType.INVESTMENT) {
      return 'text-white'
    }
  }

  const getAmountPrefix = (transaction: Transaction) => {
    if (transaction.type === TransactionType.DEPOSIT) {
      return '+'
    } else {
      return '-'
    }
  }

  return (
    <ScrollArea className="rounded-md border">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="font-bold">Ultimas Transações</CardTitle>
        <Button variant="outline" className="rounded-full font-bold" asChild>
          <Link href="/transactions">Ver mais</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {lastTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex justify-between items-center"
          >
            <div className="flex items-center gap-2">
              <div className="p-3 bg-white bg-opacity-[3%] rounded-lg">
                <Image
                  src={
                    TRANSACTION_PAYMENT_METHOD_ICONS[transaction.paymentMethod]
                  }
                  height={20}
                  width={20}
                  alt={transaction.paymentMethod}
                />
              </div>
              <div>
                <p className="text-sm font-bold">{transaction.name}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
            <p className={`text-sm font-bold ${getAmountColor(transaction)}`}>
              {getAmountPrefix(transaction)}{' '}
              {formatCurrency(Number(transaction.amount))}
            </p>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  )
}

export default LastTransactions