'use client'

import Image from 'next/image'

import cover from '@/public/cover.png'
import { UserWithInfo } from '@/lib/types'
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar'

type Props = {
  user: UserWithInfo
}

const UserHero = ({ user }: Props) => {
  return (
    <div className="relative h-[180px]">
      <Image
        src={user.coverImage || cover}
        alt="Cover Image"
        className="w-full h-full object-cover"
      />

      <Avatar className="absolute left-4 -bottom-16 w-32 h-32 rounded-full border-4 border-background">
        <AvatarImage src={user.avatar!} />

        <AvatarFallback className="text-2xl">
          {user?.name?.charAt(0).toUpperCase() || 'DF'}
        </AvatarFallback>
      </Avatar>
    </div>
  )
}

export default UserHero
