/* eslint-disable no-case-declarations */
/* Webhook 

  Stripe is an external system, and we want to integrate this external system with our application, in a way that when
  an event occurs, such as the payment being confirmed, we want to internally update our database and app. And to do this
  we have to create a route that will be called by stripe whenever the payment is confirmed, this file must be in this
  location

  inside the app, create an api folder, then place the stripe folder and file to be called

  This function name POST will make all the requets made to this file, as a post request, to target this function

  Summarize what we just did

  We created a checkout action inside the subscription/action folder, redirected the user to this checkout, and created a
  webhook the user will call when he concludes the payment, check if the type of event is invoice.paid, check if we are
  paying for this subscription plan, and updating the user in clerk.
*/

import { clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export const POST = async (request: Request) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.error()
  }

  /* 
    So, first of all, we need to get this signature to guarantee that stripe is the agent who is calling this webhook,
    because, let's say that a malicious agent discovers this webhook url and call a false invoice paid event, this is how
    we will know that this event truthful
   */
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.error()
  }

  const text = await request.text()
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
    apiVersion: '2024-10-28.acacia',
  })

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error('Missing stripe webhook secret')
  }

  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET,
  )

  switch (event.type) {
    case 'invoice.paid': {
      // Update the user with his new subscription plan
      const { customer, subscription, subscription_details } = event.data.object

      /* On the stripe constant creation, inside of the action we created on the actions created on the create subscription
      file, we used something like
      
      subscription_data: {
      metadata: {
        clerk_user_id: userId,
      },
    },
      So we are going to get our clerk user, using this id and update it inside the clerk auth configuration

      the subscriptionId is going to be used for us to cancel this subscription in the future
        */
      const clerkUserId = subscription_details?.metadata?.clerk_user_id

      if (!clerkUserId) {
        throw new Error('The clerk user id is undefined')
      }

      await clerkClient().users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeCustomerId: customer,
          stripeSubscriptionId: subscription,
        },
        publicMetadata: {
          subscriptionPlan: 'premium',
        },
      })

      break
    }

    case 'customer.subscription.deleted': {
      // Remover plano premium do usuário
      const subscription = await stripe.subscriptions.retrieve(
        event.data.object.id,
      )

      console.log(event.data.object.id)

      const clerkUserId = subscription.metadata.clerk_user_id

      if (!clerkUserId) {
        return NextResponse.error()
      }

      await clerkClient().users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeCustomerId: null,
          stripeSubscriptionId: null,
        },
        publicMetadata: {
          subscriptionPlan: null,
        },
      })
    }
  }

  return NextResponse.json({ received: true })
}
