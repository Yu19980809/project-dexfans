'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { formatDistance } from 'date-fns'
import { CldImage  } from 'next-cloudinary'
import { CirclePlay } from 'lucide-react'
import toast from 'react-hot-toast'
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage
} from 'react-icons/ai'

import { canView, cn, formatName } from '@/lib/utils'
import { PostWithAllInfo, PostWithInfo } from '@/lib/types'
import { useCurrentUser } from '@/hooks/use-current-user'
import { likePost, unlikePost } from '@/actions/posts'
import AvatarItem from '@/components/global/avatar'
import Mask from '@/components/global/mask'

type Props = {
  data: PostWithInfo | PostWithAllInfo
}

const Post = ({ data }: Props) => {
  const router = useRouter()
  const currentUser = useCurrentUser()
  const likeStatus = data.likedIds.includes(currentUser?.id!)

  const [isCanView, setIsCanView] = useState<boolean>(false)
  const [isLiked, setIsLiked] = useState<boolean>(likeStatus)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false)
  const [showControls, setShowControls] = useState<boolean>(false)

  useEffect(() => {
    if (!data) return

    // @ts-ignore
    canView(data.type, data.creatorId, currentUser)
      .then(res => {
        console.log('res', res)
      })
  }, [data])

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

  const onMouseEnter = () => {
    setShowControls(true)
    setIsAutoPlay(true)
  }

  const onMouseLeave = () => {
    setShowControls(false)
    setIsAutoPlay(false)
  }

  const onClickUser = (e: any) => {
    e.stopPropagation()
    router.push(`/users/${data.creatorId}`)
  }

  return (
    <div
      onClick={() => router.push(`/posts/${data.id}`)}
      className="p-4 border-b cursor-pointer transition hover:bg-secondary/50"
    >
      <div className="flex gap-x-3">
        <AvatarItem user={data.creator} />

        <div className="flex-1 flex flex-col gap-y-5">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-x-2">
              <p
                onClick={onClickUser}
                className="font-semibold cursor-pointer hover:underline"
              >
                {data.creator.username}
              </p>

              <span
                onClick={onClickUser}
                className="hidden md:block text-muted-foreground cursor-pointer hover:underline"
              >
                {formatName(data.creator.name)}
              </span>
            </div>

            <span className="text-sm text-muted-foreground">
              {formatDistance(data.createdAt, new Date(), { addSuffix: true })}
            </span>
          </div>

          <div className="flex flex-col gap-y-2">
            <p>{data.content}</p>
            
            <div>
              {!!data.image && (
                <div className="relative">
                  <CldImage
                    src={data.image}
                    alt="Image"
                    width={200}
                    height={300}
                    className="w-full rounded-md object-cover"
                  />

                  {!canView && <Mask userId={data.creatorId} />}
                </div>
              )}

              {!!data.video && (
                <div className="group relative flex justify-center items-center">
                  <video
                    onClick={e => e.stopPropagation()}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    src={data.video}
                    controls={showControls}
                    autoPlay={isAutoPlay}
                    className="rounded-md"
                  />

                  <div className="absolute block group-hover:hidden">
                    <CirclePlay className="w-10 h-10 text-white opacity-70" />
                  </div>

                  {!canView && <Mask userId={data.creatorId} />}
                </div>
              )}
            </div>
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
