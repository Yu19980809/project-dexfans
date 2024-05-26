'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { formatDistance } from 'date-fns'
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai'

import { cn, formatName } from '@/lib/utils'
import { PostWithAllInfo, PostWithInfo } from '@/lib/types'
import AvatarItem from '@/components/global/avatar'
import { fetchPostInfo, likePost, unlikePost } from '@/actions/posts'
import { useCurrentUser } from '@/hooks/use-current-user'
import toast from 'react-hot-toast'

type Props = {
  data: PostWithInfo | PostWithAllInfo
}

const Post = ({ data }: Props) => {
  const router = useRouter()
  const currentUser = useCurrentUser()

  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const isLiked = data.likedIds.includes(currentUser?.id!)
    setIsLiked(isLiked)
  }, [currentUser?.id!, data.id])

  const onLike = (e: any) => {
    e.stopPropagation()
    if (isLoading) return
    setIsLoading(true)

    if (isLiked) {
      unlikePost(data.id, currentUser?.id!)
        .then(res => {
          if (res.error) return toast.error(res.error)
          setIsLiked(false)
          router.refresh()
        })
        .catch(() => toast.error('Something went wrong'))
        .finally(() => setIsLoading(false))
    } else {
      likePost(data.id, currentUser?.id!)
      .then(res => {
        if (res.error) return toast.error(res.error)
        setIsLiked(true)
        router.refresh()
      })
      .catch(() => toast.error('Something went wrong'))
      .finally(() => setIsLoading(false))
    }
  }

  return (
    <div
      onClick={() => router.push(`/posts/${data.id}`)}
      className="p-4 border-b cursor-pointer transition hover:bg-secondary"
    >
      <div className="flex gap-x-3">
        <AvatarItem user={data.creator} />

        <div className="flex-1 flex flex-col gap-y-5">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-x-2">
              <p
                onClick={() => router.push(`/users/${data.creatorId}`)}
                className="font-semibold text-white cursor-pointer hover:underline"
              >
                {data.creator.username}
              </p>

              <span
                onClick={() => router.push(`/users/${data.creatorId}`)}
                className="hidden md:block text-neutral-500 cursor-pointer hover:underline"
              >
                {formatName(data.creator.name)}
              </span>
            </div>

            <span className="text-sm text-neutral-500">
              {formatDistance(data.createdAt, new Date(), { addSuffix: true })}
            </span>
          </div>

          <div>
            {data.content}
          </div>

          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2 text-neutral-500 cursor-pointer transition hover:text-sky-500">
              <AiOutlineMessage size={20} />

              <p>
                {data.comments?.length || 0}
              </p>
            </div>

            <div
              onClick={onLike}
              className={cn(
                'flex items-center gap-2 text-neutral-500 cursor-pointer transition',
                isLiked ? 'hover:text-rose-500' : 'hover:text-sky-500'
              )}
            >
              {isLiked ? <AiFillHeart size={20} className="text-rose-500" /> : <AiOutlineHeart size={20} />}

              <p>
                {data.likedIds?.length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
