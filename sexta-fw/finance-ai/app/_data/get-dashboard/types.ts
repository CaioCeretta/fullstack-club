import { TransactionType, type TransactionCategory } from '@prisma/client'

export type TransactionsPercentagePerType = {
  [key in TransactionType]: number
}

export interface TotalExpensePerCategory {
  category: TransactionCategory
  totalAmount: number
  percentageOfTotal: number
}