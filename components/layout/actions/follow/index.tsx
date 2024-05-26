'use client'

import Link from 'next/link'
import { User } from '@prisma/client'

import { formatName } from '@/lib/utils'
import { useCurrentUser } from '@/hooks/use-current-user'
import AvatarItem from '@/components/global/avatar'
import { Button } from '@/components/ui/button'

type Props = {
  users: User[]
}

const Follow = ({ users }: Props) => {
  const currentUser = useCurrentUser()

  users = users.filter(item => item.id !== currentUser?.id)

  const onFollow = (id: string) => {}

  return (
    <div className="flex flex-col gap-y-6 w-full p-4 border rounded-xl">
      <span className="font-semibold">Who to follow</span>

      {users.map(item => (
        <div key={item.id} className="flex justify-between items-center">
          <Link href={`/users/${item.id}`} className="flex items-center gap-x-2 cursor-pointer">
            <AvatarItem user={item}/>

            <div className="flex flex-col">
              <span className="font-semibold">{item.username}</span>
              <span className="text-xs text-muted-foreground">{formatName(item.name)}</span>
            </div>
          </Link>

          <Button
            onClick={() => onFollow(item.id)}
            size="sm"
            className="rounded-full"
          >
            Follow
          </Button>
        </div>
      ))}

      <Link href="/follow" className="text-sky-500">
        Show more
      </Link>
    </div>
  )
}

export default Follow
