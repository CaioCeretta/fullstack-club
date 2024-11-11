import { auth, clerkClient } from '@clerk/nextjs/server'
import { CheckIcon, XIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import Navbar from '../_components/navbar'
import { Badge } from '../_components/ui/badge'
import { Card, CardContent, CardHeader } from '../_components/ui/card'
import AcquirePlanButton from './_components/acquire_plan_button'

const SubscriptionPage = async () => {
  const { userId } = auth()

  if (!userId) {
    redirect('/login')
  }

  const user = await clerkClient().users.getUser(userId)

  const hasPremiumPlan = user.publicMetadata.subscriptionPlan === 'premium'

  return (
    <>
      <Navbar />
      <div className="p-6 space-y-6">
        <h1 className="font-bold text-2xl">Assinatura</h1>

        <div className="flex gap-6">
          <Card className="w-[450px]">
            <CardHeader className="border-b border-solid py-8 relative">
              <h2 className="font-semibold text-center text-2xl">
                Plano Básico
              </h2>
              <div className="flex items-center gap -3 justify-center">
                <span className="text-4xl">R$</span>
                <span className="font-semibold text-6xl">0</span>
                <span className="text-muted-foreground text-2xl">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-3">
                <CheckIcon className="text-primary" />
                <p> Apenas 10 transações por mês (7/10)</p>
              </div>
              <div className="flex items-center gap-3">
                <XIcon className="text-white/10" />
                <p>Relatórios de IA</p>
              </div>
            </CardContent>
          </Card>

          <Card className="w-[450px]">
            <CardHeader className="border-b border-solid py-8 relative">
              {hasPremiumPlan && (
                <Badge className="absolute top-4 left-4 bg-primary/10 text-primary">
                  Ativo
                </Badge>
              )}
              <h2 className="font-semibold text-center text-2xl">
                Plano Premium
              </h2>
              <div className="flex items-center gap -3 justify-center">
                <span className="text-4xl">R$</span>
                <span className="font-semibold text-6xl">19</span>
                <span className="text-muted-foreground text-2xl">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-3">
                <CheckIcon className="text-primary" />
                <p> Transações ilimitadas</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon className="text-primary" />
                <p>Relatórios de IA</p>
              </div>
              <AcquirePlanButton />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export default SubscriptionPage
