'use server'

import bcrypt from 'bcryptjs'
import { z } from 'zod'

import db from '@/lib/db'
import { LoginSchema, RegisterSchema } from '@/lib/schemas'
import { getVerificationToken } from '@/actions/tokens'
import { getUserByEmail } from '@/actions/users'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)
  if (!validatedFields.success) return { error: 'Wrong values' }

  const { username, email, password, confirmPassword } = validatedFields.data
  if (password !== confirmPassword) return { error: 'Two passwords are not same' }

  const existingUser = await getUserByEmail(email)
  if (!!existingUser) return { error: 'Email is in use' }

  const hashedPassword = await bcrypt.hash(password, 12)
  const newUser = await db.user.create({
    data: {
      username,
      email,
      hashedPassword
    }
  })

  return { success: true, data: newUser }
}

export const verify = async (token: string, email: string) => {
  const verificationToken = await getVerificationToken(email)
  if (token !== verificationToken?.token) return { error: 'Wrong verification code' }

  const hasExpired = new Date(verificationToken.expires) < new Date()
  if (hasExpired) return { error: 'Verification code expired' }

  await db.verificationToken.delete({
    where: { id: verificationToken.id }
  })

  await db.user.update({
    where: { email },
    data: { emailVerified: new Date() }
  })

  return { success: true }
}

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values)
  if (!validatedFields.success) return { error: 'Invalid fields' }

  const { email } = validatedFields.data
  const existingUser = await getUserByEmail(email)
  if (!existingUser || !existingUser.hashedPassword) return { error: 'Email not registered' }

  if (!existingUser.emailVerified) return { error: 'Email not verified' }

  return { success: true }
}
