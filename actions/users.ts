'use server'

import { z } from 'zod'

import db from '@/lib/db'
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
      followingIds: {
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

  let updatedFolowingIds = [...(currentUser?.followingIds || []), userId]

  await db.user.update({
    where: { id: currentUserId },
    data: { followingIds: updatedFolowingIds }
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


  let updatedFolowingIds = currentUser?.followingIds.filter(item => item !== userId)

  await db.user.update({
    where: { id: currentUserId },
    data: { followingIds: updatedFolowingIds }
  })

  return { success: true }
}
