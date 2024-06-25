import { PostType, PremiumType, User } from '@prisma/client'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { getUserLatestedPurchase } from '@/actions/users'
import { DAY_IN_MS } from '@/lib/constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatName = (name: string | null) => {
  if (!name) return '@dex_fans'

  const nameArr = name.split(' ')
  const temp = nameArr.map(item => item.toLowerCase())

  return `@${temp.join('_')}`
}

export const canView = async (postType: PostType, creatorId: string, user?: User) => {
  if (user?.id === creatorId || postType === PostType.FREE) return true
  // if (postType === PostType.FREE && user?.subscribingIds?.includes(creatorId)) return true
  
  const { premium, stripePriceId, stripeCurrentPeriodEnd } = await getUserLatestedPurchase(user?.id!)
  const isValid = stripePriceId && stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()
  if (!isValid) return false

  switch (postType) {
    case PostType.SILVER:
      return premium !== PremiumType.FREE
    case PostType.GOLD:
      return premium !== PremiumType.FREE && premium !== PremiumType.SILVER
    case PostType.PLATINUM:
      return premium === PremiumType.PLATINUM
  }
}
