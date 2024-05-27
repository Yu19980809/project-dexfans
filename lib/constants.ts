import {
  Award,
  Bell,
  Home,
  Settings,
  User
} from 'lucide-react'

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
  {
    label: 'Profile',
    href: '/user/profile',
    icon: User
  },
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
    label: 'Following'
  }
]

export const premiumTab = [
  { label: 'Annual' },
  { label: 'Monthly' }
]

export const premiumType = [
  {
    label: 'Silver',
    annualAmount: '14.99',
    monthlyAmount: '19.99',
    items: [
      'Advertising blocker',
      'Interaction unlimited',
      'Monetisation'
    ]
  },
  {
    label: 'Gold',
    annualAmount: '22.99',
    monthlyAmount: '29.99',
    items: [
      'Advertising blocker',
      'Interaction unlimited',
      'Monetisation',
      'Super powers'
    ]
  },
  {
    label: 'Platinum',
    annualAmount: '40.99',
    monthlyAmount: '49.99',
    items: [
      'Advertising blocker',
      'Interaction unlimited',
      'Monetisation',
      'Super powers',
      'Blind box'
    ]
  }
]
