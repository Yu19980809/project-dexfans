'use client'

import { useRouter } from 'next/navigation'
import { formatDistance } from 'date-fns'
import { AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai'

import { PostWithInfo } from '@/lib/types'
import AvatarItem from '@/components/global/avatar'

type Props = {
  data: PostWithInfo
}

const Post = ({ data }: Props) => {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push(`/posts/${data.id}`)}
      className="p-4 border-b cursor-pointer transition hover:bg-secondary"
    >
      <div className="flex items-start gap-3">
        <AvatarItem user={data.creator} />

        <div className="flex-1 flex flex-col gap-y-5">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-x-2">
              <p
                onClick={() => router.push(`/users/${data.creatorId}`)}
                className="font-semibold text-white cursor-pointer hover:underline"
              >
                {data.creator.name}
              </p>

              <span
                onClick={() => router.push(`/users/${data.creatorId}`)}
                className="hidden md:block text-neutral-500 cursor-pointer hover:underline"
              >
                @{data.creator.username}
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

            <div className="flex items-center gap-2 text-neutral-500 cursor-pointer transition hover:text-sky-500">
              <AiOutlineHeart size={20} />

              <p>
                {data.comments?.length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
