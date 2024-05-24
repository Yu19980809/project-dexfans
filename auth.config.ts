import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import type { NextAuthConfig } from 'next-auth'
import bcrypt from 'bcryptjs'

import { LoginSchema } from '@/lib/schemas'
import { getUserByEmail } from '@/actions/users'


export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validatedFields = LoginSchema.safeParse(credentials)
        
        if (!validatedFields.success) return null

        const { email, password } = validatedFields.data
        const user = await getUserByEmail(email)

        if (!user || !user.hashedPassword) return null

        const passwordMatch = await bcrypt.compare(
          password,
          user.hashedPassword
        )

        if (!passwordMatch) return null

        return user
      }
    })
  ]
} satisfies NextAuthConfig