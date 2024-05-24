import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'

import db from '@/lib/db'

import authConfig from '@/auth.config'
import { getUserById } from '@/actions/users'
import { getAccountByUserId } from '@/actions/tokens'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  pages: {
    signIn: '/login',
    error: '/error'
  },
  events: {
    linkAccount: async ({ user }) => {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      // Allow oAuth without email verification
      if (account?.provider !== 'credentials') return true

      const existingUser = await getUserById(user.id!)
      if (!existingUser || !existingUser.emailVerified) return false

      return true
    },
    session: ({ session, token }) => {
      if (!!token.sub && !!session.user) session.user.id = token.sub

      if (!!session.user) {
        const temp = {
          ...session.user,
          name: token.name,
          username: token.username,
          email: token.email,
          avatar: token.avatar,
          isOAuth: token.isOAuth
        }

        // @ts-ignore
        session.user = temp
      }

      return session
    },
    jwt: async ({ token }) => {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)
      if (!existingUser) return token

      const existingAccount = await getAccountByUserId(existingUser.id)
      const { name, username, email, avatar } = existingUser

      token.name = name
      token.email = email
      token.avatar = avatar
      token.username = username
      token.isOAuth = !!existingAccount

      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  debug: process.env.NODE_ENV === 'development',
  ...authConfig
})