import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'

import db, { PremiumType } from '@/lib/db'
import { DAY_IN_MS } from '@/lib/constants'
import { getAccountByUserId } from '@/actions/tokens'
import { getUserById, getUserLatestedPurchase } from '@/actions/users'

import authConfig from '@/auth.config'

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
    session: async ({ session, token }) => {
      if (!!token.sub && !!session.user) session.user.id = token.sub

      if (!!session.user) {
        const temp = {
          ...session.user,
          name: token.name,
          username: token.username,
          email: token.email,
          avatar: token.avatar,
          subscribingIds: token.subscribingIds,
          isOAuth: token.isOAuth,
          premium: token.premium
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
      const lastedPurchase = await getUserLatestedPurchase(existingUser.id)
      const { name, username, email, avatar, subscribingIds } = existingUser

      if (!lastedPurchase) {
        token.premium = PremiumType.FREE
      } else {
        const { premium, stripePriceId, stripeCurrentPeriodEnd } = lastedPurchase
        const isValid = stripePriceId && stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()
        token.premium = !isValid ? PremiumType.FREE : premium
      }

      token.name = name
      token.email = email
      token.avatar = avatar
      token.username = username
      token.subscribingIds = subscribingIds
      token.isOAuth = !!existingAccount

      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  debug: process.env.NODE_ENV === 'development',
  ...authConfig
})