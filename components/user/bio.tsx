'use client'

import { useEffect, useState } from 'react'
import { BiCalendar } from 'react-icons/bi'
import toast from 'react-hot-toast'
import { format } from 'date-fns'

import { UserWithInfo } from '@/lib/types'
import { useCurrentUser } from '@/hooks/use-current-user'
import { fetchUserInfo, follow, unfollow } from '@/actions/users'
import EditModal from '@/components/modals/edit-modal'
import Loader from '@/components/global/loader'
import { Button } from '@/components/ui/button'

type Props = {
  user: UserWithInfo
}

const UserBio = ({ user }: Props) => {
  const currentUser = useCurrentUser()

  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isFollowed, setIsFollowed] = useState<boolean>(false)

  const isSelf = currentUser?.id === user.id

  useEffect(() => {
    const fetchData = async () => {
      const userInfo = await fetchUserInfo(currentUser?.id!)
      const isFollowed = userInfo.followingIds.includes(user.id)
      setIsFollowed(isFollowed)
    }

    fetchData()
  }, [currentUser?.id, user.id])

  const onFollow = async () => {
    setIsLoading(true)

    if (isFollowed) {
      unfollow(user.id, currentUser?.id!)
        .then(res => {
          if (res.error) return toast.error(res.error)
          setIsFollowed(false)
          toast.success('Unfollow success')
        })
        .catch(() => toast.error('Something went wrong'))
        .finally(() => setIsLoading(false))
    } else {
      follow(user.id, currentUser?.id!)
      .then(res => {
        if (res.error) return toast.error(res.error)
        setIsFollowed(true)
        toast.success('Follow success')
      })
      .catch(() => toast.error('Something went wrong'))
      .finally(() => setIsLoading(false))
    }
  }

  return (
    <>
      <EditModal user={user} open={modalOpen} setOpen={setModalOpen} />

      <div className="pb-4 border-b">
        <div className="flex justify-end p-4 font-semibold">
          {isSelf && (
            <Button
              onClick={() => setModalOpen(true)}
              className="rounded-full"
            >
              Edit
            </Button>
          )}
          
          {!isSelf && (
            <Button
              onClick={onFollow}
              disabled={isLoading}
              className="rounded-full"
            >
              {isLoading ? <Loader /> : (isFollowed ? 'Unfollow' : 'Follow')}
            </Button>
          )}
        </div>

        <div className="flex flex-col gap-y-4 mt-4 px-4">
          <div className="flex flex-col">
            <p className="font-semibold text-2xl">
              {user.name}
            </p>

            <p className="text-md text-muted-foreground">
              @{user.username}
            </p>
          </div>

          <div className="flex flex-col gap-y-2">
            <p>{user.bio}</p>

            <div className="flex items-center gap-x-2  text-muted-foreground">
              <BiCalendar size={24} />
              <p>Joined {format(new Date(user.createdAt), 'MMMM yyyy')}</p>
            </div>
          </div>

          <div className="flex items-center gap-x-6">
            <div className="flex items-center gap-x-1">
              <p className="font-semibold">{user.followingIds.length}</p>
              <p className="text-muted-foreground">Following</p>
            </div>

            <div className="flex items-center gap-x-1">
              <p className="font-semibold">{user.followersCount || 0}</p>
              <p className="text-muted-foreground">Followers</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserBio
