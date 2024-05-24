'use client'

import Link from 'next/link'
import { User } from '@prisma/client'
import { signOut } from 'next-auth/react'
import { GripHorizontal, LogOut } from 'lucide-react'

import { useCurrentUser } from '@/hooks/use-current-user'
import { userOptions } from '@/lib/constants'
import AvatarItem from '@/components/global/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

const UserButton = () => {
  const currentUser = useCurrentUser() as User

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <div className="flex lg:hidden justify-center items-center w-14 h-14 p-4 rounded-full cursor-pointer hover:bg-secondary">
            <AvatarItem user={currentUser} />
          </div>

          <div className="hidden lg:flex justify-between items-center w-14 lg:w-[230px] h-14 p-4 rounded-full cursor-pointer hover:bg-secondary">
            <div className="flex items-center gap-x-2">
              <AvatarItem user={currentUser} />

              <div className="flex flex-col gap-y-1">
                <span className="font-semibold">{currentUser?.name || currentUser?.username}</span>
                <span className="text-xs text-muted-foreground">@{currentUser?.username}</span>
              </div>
            </div>

            <GripHorizontal className="w-4 h-4" />
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-50">
        <div className="flex flex-col gap-y-2">
          {userOptions.map(item => (
            <Link key={item.href} href={item.href}>
              <DropdownMenuItem>
                <item.icon className="w-4 h-4 mr-2" />
                <span>{item.label}</span>
              </DropdownMenuItem>
            </Link>
          ))}
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="w-4 h-4 mr-2" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton
