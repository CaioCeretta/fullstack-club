import { auth } from '@clerk/nextjs/server'
import { isMatch } from 'date-fns'
import { redirect } from 'next/navigation'
import Navbar from '../_components/navbar'
import { getDashboard } from '../_data/get-dashboard'
import ExpensesPerCategory from './_components/expenses-per-category'
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
    redirect('/?month=01')
  }

  const dashboard = await getDashboard(month)

  return (
    <>
      <Navbar />
      <div className="p-6 space-y-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>
        <div className="grid grid-cols-[2fr,1fr]">
          <div className="flex flex-col gap-6">
            <SummaryCards {...dashboard} month={month} />
            <div className="grid grid-cols-3 grid-rows-1 gap-6">
              <TransactionsPieChart {...dashboard} />
              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
