import { auth } from '@clerk/nextjs/server'
import { isMatch } from 'date-fns'
import { redirect } from 'next/navigation'
import Navbar from '../_components/navbar'
import SummaryCards from './_components/summary-cards'
import TimeSelect from './_components/time-select'

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

  return (
    <>
      <Navbar />
      <div className="p-6 space-y-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>
        <SummaryCards month={month} />
      </div>
    </>
  )
}

export default Home
