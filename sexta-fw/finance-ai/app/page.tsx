import { UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { dark } from '@clerk/themes'
import { redirect } from 'next/navigation'

const name = ''

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
