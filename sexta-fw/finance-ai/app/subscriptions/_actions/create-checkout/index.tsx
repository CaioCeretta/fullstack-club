'use server'

import { auth } from '@clerk/nextjs/server'
import Stripe from 'stripe'

/*
  The purpose of this action is to create a stripe checkout for our product, in our case, we are not going to pass the
  price_id as a parameter, but here we'll pass the id we set on the .env
*/
export const createStripeCheckout = async () => {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Stripe secret key not found')
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-10-28.acacia',
  })

  /** Create the checkout session */
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    success_url: 'http://localhost:3000',
    cancel_url: 'http://localhost:3000',
    subscription_data: {
      metadata: {
        clerk_user_id: userId,
      },
    },
    line_items: [
      {
        price: process.env.STRIPE_PREMIUM_PLAN_PRICE_ID,
        quantity: 1,
      },
    ],
  })

  return { sessionId: session.id }
}

/* Now on the component we want to call this function, about this checkout session, we are going to implement it */
