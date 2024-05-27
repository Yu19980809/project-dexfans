'use client'

import { useRouter } from 'next/navigation'
import { User } from '@prisma/client'

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar'

type Props = {
  user: User
}

const AvatarItem = ({ user }: Props) => {
  const router = useRouter()

  const onClick = (e: any) => {
    e.stopPropagation()
    router.push(`/users/${user.id}`)
  }

  return (
    <Avatar onClick={onClick} className="cursor-pointer">
      <AvatarImage src={user?.avatar!} alt="Avatar"/>
      <AvatarFallback>{user?.username?.charAt(0).toUpperCase() || 'DF'}</AvatarFallback>
    </Avatar>
  )
}

export default AvatarItem
