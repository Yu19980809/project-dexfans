import { Bell, Home, Settings, User } from 'lucide-react'

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
