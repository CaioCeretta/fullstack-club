'use client'

import { Button } from '@/app/_components/ui/button'
import { createStripeCheckout } from '@/app/login/_actions/create-checkout'
import { loadStripe } from '@stripe/stripe-js'

const AcquirePlanButton = () => {
  const handleAcquirePlanClick = async () => {
    const { sessionId } = await createStripeCheckout()

    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error('Stripe publishable key not found')
    }

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    )
    /* On a client component, we can only access env variables that have next_public as a prefix, because they are not
    sensitive data, it will be exposed to the user, different from the other variables, that are only for server components */

    if (!stripe) {
      throw new Error('Stripe not found')
    }

    /* So we basically created the checkout on the action file, and returned the session id of this checkout, here we are
    retrieving it, and when we redirect the user to the checkout, we pass that same sessionId */
    await stripe.redirectToCheckout({ sessionId })
  }

  return (
    <Button
      className="w-full rounded-full font-bold"
      onClick={handleAcquirePlanClick}
    >
      Adquirir plano
    </Button>
  )
}

export default AcquirePlanButton
