/* This data folder, which will have access to server side components and pass them to components, is a good approach, because
if we passed the data, we fetch from the server side to the client side as props, it wouldn't be a good option, because
then we could make sensible data to be available to the client */

import { db } from '@/app/_lib/prisma'
import { TransactionType } from '@prisma/client'
import type {
  TotalExpensePerCategory,
  TransactionsPercentagePerType,
} from './types'

export const getDashboard = async (month: string) => {
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

  const transactionsTotal = Number(
    (
      await db.transaction.aggregate({
        where,
        _sum: { amount: true },
      })
    )._sum.amount,
  )

  const typesPercentage: TransactionsPercentagePerType = {
    [TransactionType.DEPOSIT]: Math.round(
      (Number(depositsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.EXPENSE]: Math.round(
      (Number(expensesTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.INVESTMENT]: Math.round(
      (Number(investmentsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
  }

  const totalExpensePerCategory: TotalExpensePerCategory[] =
    /** Grouping all the expenses per category, summing all and the _sum is an aggregate operation that tells prisma to sum
     * the values of the amount field for each group, (i. e., each category)
     * - _sum is not a property that we're manually defining in our database schema, it's a special prisma syntax that we
     * use to perform aggregations
     * - the _sum object tells prisma to perform a summing operation on the amount field for each group (each category) and
     * return that sum as part of the result
     *
     * After executing this query, each grouped item (category) will contain a _sum object, which holds the sum of the amount
     * for that particular category
     * 
     * so in the end we will get something like
     * 
     * [
     *   {
     *     category: 'Food',
     *     _sum: {
     *       amount: 500,
     *     },
     *   },
     *   {
     *     category: 'Entertainment',
     *     _sum: {
     *       amount: 300,
     *     },
     *   },
    // More categories...
     * ]
     */
    (
      await db.transaction.groupBy({
        by: ['category'],
        where: {
          ...where,
          type: TransactionType.EXPENSE,
        },
        _sum: {
          amount: true,
        },
      })
    ).map((category) => ({
      category: category.category,
      totalAmount: Number(category._sum.amount),
      percentageOfTotal: Math.round(
        (Number(category._sum.amount) / Number(expensesTotal)) * 100,
      ),
    }))

  return {
    balance,
    depositsTotal,
    investmentsTotal,
    expensesTotal,
    typesPercentage,
    totalExpensePerCategory,
  }
}
