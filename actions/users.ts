'use server'

import db from '@/lib/db'

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
