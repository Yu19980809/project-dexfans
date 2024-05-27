'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User } from '@prisma/client'
import { toast } from 'react-hot-toast'

import { formatName } from '@/lib/utils'
import { fetchUserInfo, follow, unfollow } from '@/actions/users'
import { useCurrentUser } from '@/hooks/use-current-user'
import AvatarItem from '@/components/global/avatar'
import { Button } from '@/components/ui/button'
import Loader from '@/components/global/loader'

type Props = {
  users: User[]
}

const Follow = ({ users }: Props) => {
  const router = useRouter()
  const currentUser = useCurrentUser()

  const [data, setData] = useState<User[]>(users) 
  const [isFollowed, setIsFollowed] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  users = users.filter(item => item.id !== currentUser?.id)

  useEffect(() => {
    // @ts-ignore
    if (!currentUser?.id || !currentUser?.followingIds) return
    if (!users || users.length === 0) return
    
    // @ts-ignore
    const temp = users.filter(item => !currentUser.followingIds.includes(item.id))
    // setData(temp)
  }, [users, currentUser])

  const onFollow = async (userId: string) => {
    setIsLoading(true)

    if (isFollowed) {
      unfollow(userId, currentUser?.id!)
        .then(res => {
          if (res.error) return toast.error(res.error)
          setIsFollowed(false)
          router.refresh()
          toast.success('Unfollow success')
        })
        .catch(() => toast.error('Something went wrong'))
        .finally(() => setIsLoading(false))
    } else {
      follow(userId, currentUser?.id!)
      .then(res => {
        if (res.error) return toast.error(res.error)
        setIsFollowed(true)
        router.refresh()
        toast.success('Follow success')
      })
      .catch(() => toast.error('Something went wrong'))
      .finally(() => setIsLoading(false))
    }
  }

  return (
    <div className="flex flex-col gap-y-6 w-full p-4 border rounded-xl">
      <span className="font-semibold">Who to follow</span>

      {(!data || data.length === 0) && <p className="text-center text-muted-foreground">No results</p>}

      {!!data && data.length !== 0 && users.map(item => (
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
            disabled={isLoading}
            className="rounded-full"
          >
            {isLoading ? <Loader /> : 'Follow'}
          </Button>
        </div>
      ))}

      <Link
        href="/follow"
        className="text-sm text-sky-500"
      >
        Show more
      </Link>
    </div>
  )
}

export default Follow
