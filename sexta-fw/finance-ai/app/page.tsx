import { UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { dark } from '@clerk/themes'
import { redirect } from 'next/navigation'

/* Reminder, we can create this component as async because by default, in next, all the components are server components
and they can be async, so, when we use the app router, it will give us this behavior */
export default async function Home() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/login')
  }

  return (
    <div className="h-full flex items-center justify-center">
      <UserButton
        showName
        appearance={{
          baseTheme: dark,
        }}
      />
    </div>
  )
}
