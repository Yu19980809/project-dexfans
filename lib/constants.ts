import { PostType } from '@prisma/client'
import {
  Award,
  Bell,
  Home,
  Settings,
  User
} from 'lucide-react'

export const DAY_IN_MS = 86_400_000

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
    label: 'Post as free',
    value: PostType.FREE
  },
  {
    label: 'Post as silver',
    value: PostType.SILVER
  },
  {
    label: 'Post as gold',
    value: PostType.GOLD
  },
  {
    label: 'Post as platinum',
    value: PostType.PLATINUM
  }
]
