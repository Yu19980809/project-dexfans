'use client'

import { useEffect, useState } from 'react'

import { useCurrentUser } from '@/hooks/use-current-user'
import { fetchUserInfo } from '@/actions/users'
import useTabType from '@/store/use-tab-type'
import { PostWithInfo } from '@/lib/types'
import Post from '@/components/global/post'
import Loader from '@/components/global/loader'

type Props = {
  posts: PostWithInfo[]
}

const PostList = ({ posts }: Props) => {
  const { isSubscribing } = useTabType()
  const currentUser = useCurrentUser()

  const [data, setData] = useState<PostWithInfo[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!currentUser?.id) return
    if (!isSubscribing) {
      setIsLoading(false)
      setData(posts)
      return
    }

    const handleFn = async () => {
      const userInfo = await fetchUserInfo(currentUser?.id!)
      const temp = posts.filter(item => userInfo.subscribingIds.includes(item.creatorId))
      setIsLoading(false)
      setData(temp)
    }

    handleFn()
  }, [posts, isSubscribing, currentUser?.id])

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center h-[calc(100vh-56px)]">
          <Loader className="w-8 h-8" />
        </div>
      )}

      {(!data || data.length === 0) && !isLoading && (
        <div className="flex justify-center items-center h-[calc(100vh-56px)]">
          <span className="text-muted-foreground">No posts</span>
        </div>
      )}

      {!!data && data.length !== 0 && !isLoading && data.map(item => <Post key={item.id} data={item} />)}
    </>
  )
}

export default PostList
