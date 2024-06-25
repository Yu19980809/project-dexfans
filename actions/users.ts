'use server'

import { z } from 'zod'

import db from '@/lib/db'
import stripe from '@/lib/stripe'
import { Premium } from '@/lib/types'
import { UpdateUserSchema } from '@/lib/schemas'

export const getUserByEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email }
  })

  return user
}

export const getUserById = async (id: string) => {
  const user = await db.user.findUnique({
    where: { id }
  })

  return user
}

export const fetchAllUsers = async () => {
  const users = await db.user.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return users
}

export const fetchUserInfo = async (userId: string) => {
  if (!userId) throw new Error('Missing user id')

  const existingUser = await db.user.findUnique({
    where: { id: userId }
  })

  if (!existingUser) throw new Error('Invalid user id')

  const followersCount = await db.user.count({
    where: {
      subscribingIds: {
        has: existingUser.id
      }
    }
  })

  return {...existingUser, followersCount}
}

export const updateUserInfo = async (
  userId: string,
  values: z.infer<typeof UpdateUserSchema>
) => {
  const validatedFields = UpdateUserSchema.safeParse(values)
  if (!validatedFields.success) throw new Error('Wrong values')
  if (!userId) throw new Error('Missing user ID')

  const {
    name,
    username,
    bio,
    profileImage,
    coverImage
  } = validatedFields.data

  const existingUser = await getUserById(userId)
  if (!existingUser) throw new Error('Invalid user ID')

  const updatedUser = await db.user.update({
    where: { id: existingUser.id },
    data: {
      name,
      username,
      bio,
      avatar: profileImage,
      coverImage
    }
  })

  return updatedUser
}

export const follow = async (userId: string, currentUserId: string) => {
  if (!userId || !currentUserId) return { error: 'Missing user id' }

  const existingUser = await db.user.findUnique({
    where: { id: userId }
  })

  const currentUser = await db.user.findUnique({
    where: { id: currentUserId }
  })

  if (!existingUser || !currentUser) return { error: 'Invalid user id' }

  let updatedFolowingIds = [...(currentUser?.subscribingIds || []), userId]

  await db.user.update({
    where: { id: currentUserId },
    data: { subscribingIds: updatedFolowingIds }
  })

  return { success: true }
}

export const unfollow = async (userId: string, currentUserId: string) => {
  if (!userId || !currentUserId) return { error: 'Missing user id' }

  const existingUser = await db.user.findUnique({
    where: { id: userId }
  })

  const currentUser = await db.user.findUnique({
    where: { id: currentUserId }
  })

  if (!existingUser || !currentUser) return { error: 'Invalid user id' }


  let updatedFolowingIds = currentUser?.subscribingIds.filter(item => item !== userId)

  await db.user.update({
    where: { id: currentUserId },
    data: { subscribingIds: updatedFolowingIds }
  })

  return { success: true }
}

export const purchase = async (userId: string, premium: Premium) => {
  const existingPurchase = await db.purchase.findUnique({
    where: { userId }
  })

  const defaultUrl = process.env.NEXT_PUBLIC_APP_URL
  const existingUser = await getUserById(userId)

  if (existingPurchase && existingPurchase.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: existingPurchase.stripeCustomerId,
      return_url: defaultUrl
    })

    return { success: true, data: stripeSession.url }
  }

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${defaultUrl}?success=true`,
    cancel_url: `${defaultUrl}/premium`,
    payment_method_types: ['card'],
    mode: 'subscription',
    billing_address_collection: 'auto',
    customer_email: existingUser?.email,
    line_items: [
      {
        price_data: {
          currency: 'USD',
          product_data: {
            name: premium.label,
            description: premium.label
          },
          unit_amount_decimal: (premium.price * 100).toFixed(2),
          recurring: {
            interval: 'month'
          }
        },
        quantity: 1
      }
    ],
    metadata: {
      userId,
      premium: premium.label
    },
  })

  return { success: true, data: stripeSession.url }
}

export const getUserLatestedPurchase = async (userId: string) => {
  const purchases = await db.purchase.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  })

  return purchases[0]
}
