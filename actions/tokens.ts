'use server'

import crypto from 'crypto'

import db from '@/lib/db'

export const getVerificationToken = async (identifier: string) => {
  const token = await db.verificationToken.findFirst({
    where: { identifier }
  })

  return token
}

export const generateVerificationToken = async (identifier: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString()
  const expires = new Date(new Date().getTime() + 5 * 60  * 1000)
  const existingToken = await getVerificationToken(identifier)

  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id }
    })
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      identifier,
      token,
      expires
    }
  })

  return verificationToken
}

export const getAccountByUserId = async (userId: string) => {
  const account = await db.account.findFirst({
    where: { userId }
  })

  return account
}
