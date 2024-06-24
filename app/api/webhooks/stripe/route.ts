import Stripe from 'stripe'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import db, { PremiumType } from '@/lib/db'
import stripe from '@/lib/stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = headers().get('Stripe-Signature') as string
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  if (!session?.metadata?.userId) {
    return new NextResponse('User id is required', { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    console.log('completed session data', session?.metadata)
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    await db.purchase.create({
      data: {
        userId: session?.metadata?.userId,
        premium: session?.metadata?.premium as PremiumType,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        )
      }
    })
  }

  if (event.type === 'invoice.payment_succeeded') {
    console.log('payment_succeeded')
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    await db.purchase.update({
      where: {
        stripeSubscriptionId: subscription.id
      },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        )
      }
    })
  }

  return new NextResponse(null, { status: 200 })
}