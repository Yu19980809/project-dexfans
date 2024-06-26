import { PostType, PremiumType } from '@prisma/client'
import {
  Award,
  Bell,
  Home,
  Settings,
} from 'lucide-react'

export const DAY_IN_MS = 86_400_000
export const AMOUNT_PER_PAGE = 10

export const SidebarLinks = [
  {
    label: 'Home',
    href: '/',
    icon: Home
  },
  {
    label: 'Notifications',
    href: '/notifications',
    icon: Bell
  },
  {
    label: 'Premium',
    href: '/premium',
    icon: Award
  }
]

export const userOptions = [
  // {
  //   label: 'Profile',
  //   href: '/user/profile',
  //   icon: User
  // },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings
  }
]

export const headerItems = [
  {
    label: 'For you'
  },
  {
    label: 'Subscribing'
  }
]

export const premiumTab = [
  { label: 'Annual' },
  { label: 'Monthly' }
]

export const premiumType = [
  {
    label: 'SILVER',
    value: PremiumType.SILVER,
    // annualAmount: '14.99',
    price: 19.99,
    items: [
      'Advertising blocker',
      'Interaction unlimited',
      'Monetisation'
    ]
  },
  {
    label: 'GOLD',
    value: PremiumType.GOLD,
    // annualAmount: '22.99',
    price: 29.99,
    items: [
      'Advertising blocker',
      'Interaction unlimited',
      'Monetisation',
      'Super powers'
    ]
  },
  {
    label: 'PLATINUM',
    value: PremiumType.PLATINUM,
    // annualAmount: '40.99',
    price: 49.99,
    items: [
      'Advertising blocker',
      'Interaction unlimited',
      'Monetisation',
      'Super powers',
      'Blind box'
    ]
  }
]

export const postOptions = [
  {
    label: 'Post as free content',
    value: PostType.FREE
  },
  {
    label: 'Post as silver content',
    value: PostType.SILVER
  },
  {
    label: 'Post as gold content',
    value: PostType.GOLD
  },
  {
    label: 'Post as platinum content',
    value: PostType.PLATINUM
  },
  // {
  //   label: 'Post as paid content',
  //   value: PostType.PAID
  // }
]
