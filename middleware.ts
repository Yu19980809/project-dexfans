import NextAuth from 'next-auth'

import authConfig from '@/auth.config'
import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
  webhookPrefix
} from '@/lib/routes'

const { auth: middleware } = NextAuth(authConfig)

// @ts-ignore
export default middleware(req => {
  const { auth, nextUrl } = req
  const isLoggedin = !!auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isWebhookRoute = nextUrl.pathname.startsWith(webhookPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute || isWebhookRoute) return null

  if (isAuthRoute) {
    if (!isLoggedin) return null

    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
  }

  if (!isLoggedin && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname
    if (nextUrl.search) callbackUrl += nextUrl.search

    const encodeCallbackUrl = encodeURIComponent(callbackUrl)

    return Response.redirect(new URL(`/login?callbackUrl=${encodeCallbackUrl}`, nextUrl))
  }
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
