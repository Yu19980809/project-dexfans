import { PostType, PremiumType } from '@prisma/client'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatName = (name: string | null) => {
  if (!name) return '@dex_fans'

  const nameArr = name.split(' ')
  const temp = nameArr.map(item => item.toLowerCase())

  return `@${temp.join('_')}`
}

export const canView = async (postType: PostType, creatorId: string, user?: any) => {
  if (user?.id === creatorId || postType === PostType.FREE) return true
  // if (postType === PostType.FREE && user?.subscribingIds?.includes(creatorId)) return true
  
  switch (postType) {
    case PostType.SILVER:
      return user?.premium !== PremiumType.FREE
    case PostType.GOLD:
      return user?.premium !== PremiumType.FREE && user?.premium !== PremiumType.SILVER
    case PostType.PLATINUM:
      return user?.premium === PremiumType.PLATINUM
  }
}
