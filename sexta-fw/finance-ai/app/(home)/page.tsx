import { auth } from '@clerk/nextjs/server'
import { isMatch } from 'date-fns'
import { redirect } from 'next/navigation'
import AiReportButton from '../_components/ai-report-button'
import Navbar from '../_components/navbar'
import { canUserAddATransaction } from '../_data/can-user-add-transaction'
import { getDashboard } from '../_data/get-dashboard'
import ExpensesPerCategory from './_components/expenses-per-category'
import LastTransactions from './_components/last-transactions'
import SummaryCards from './_components/summary-cards'
import TimeSelect from './_components/time-select'
import TransactionsPieChart from './_components/transactions-pie-charts'

interface HomeProps {
  searchParams: {
    month: string
  }
}

/* Reminder, we can create this component as async because by default, in next, all the components are server components
and they can be async, so, when we use the app router, it will give us this behavior */
const Home = async ({ searchParams: { month } }: HomeProps) => {
  const { userId } = await auth()

  if (!userId) {
    redirect('/login')
  }

  const monthIsInvalid = !month || !isMatch(month, 'MM')

  if (monthIsInvalid) {
    redirect(`/?month=${new Date().getMonth() + 1}`)
  }

  const dashboard = await getDashboard(month)
  const userCanAddTransaction = await canUserAddATransaction()

  return (
    <>
      <Navbar />
      <div className="p-6 space-y-6 flex flex-col overflow-hidden">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-3">
            <AiReportButton />
            <TimeSelect />
          </div>
        </div>
        <div className="grid grid-cols-[2fr,1fr] gap-6 overflow-hidden">
          <div className="flex flex-col gap-6 overflow-hidden">
            <SummaryCards
              userCanAddTransaction={userCanAddTransaction}
              {...dashboard}
              month={month}
            />
            <div className="grid grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
              <TransactionsPieChart {...dashboard} />
              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
          <LastTransactions lastTransactions={dashboard.lastTransactions} />
        </div>
      </div>
    </>
  )
}

export default Home
