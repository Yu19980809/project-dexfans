'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { toast } from 'react-hot-toast'

import { PostListType, PostWithInfo } from '@/lib/types'
import { AMOUNT_PER_PAGE } from '@/lib/constants'
import { fetchPosts, fetchSubscribingUserPosts, fetchUserPosts } from '@/actions/posts'
import { useCurrentUser } from '@/hooks/use-current-user'
import Loader from '@/components/global/loader'
import Post from '@/components/global/post'

type Props = {
  type: PostListType
  userId?: string
}

const PostList = ({ type, userId }: Props) => {
  const currentUser = useCurrentUser()
  const { ref, inView } = useInView()

  const [offset, setOffset] = useState<number>(AMOUNT_PER_PAGE)
  const [posts, setPosts] = useState<PostWithInfo[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isOver, setIsOver] = useState<boolean>(false)

  const fetchData = async (isLoadMore: boolean) => {
    if (!isLoadMore) setIsLoading(true)
    let data: any
    const offsetCount = isLoadMore ? offset : 0

    switch (type) {
      case PostListType.FOR_YOU:
        data = await fetchPosts(offsetCount, AMOUNT_PER_PAGE)
        break
      case PostListType.SUBSCRIBING:
        data = await fetchSubscribingUserPosts(currentUser?.id!, offsetCount, AMOUNT_PER_PAGE)
        break
      case PostListType.USER_PROFILE:
        data = await fetchUserPosts(userId!, offsetCount, AMOUNT_PER_PAGE)
        break
    }

    if (!data) {
      toast.error('Something went wrong')
      if (!isLoadMore) setIsLoading(false)
    } else {
      if (data.length < AMOUNT_PER_PAGE) setIsOver(true)

      if (isLoadMore) {
        setPosts(prev => [...prev, ...data])
        setOffset(prev => prev + AMOUNT_PER_PAGE)
      } else {
        setPosts(data)
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    fetchData(false)
  }, [type])

  useEffect(() => {
    if (!inView || isOver) return

    fetchData(true)
  }, [inView])

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center h-[calc(100vh-56px)]">
          <Loader className="w-8 h-8" />
        </div>
      )}

      {(!posts || posts.length === 0) && !isLoading && (
        <div className="flex justify-center items-center h-[calc(100vh-56px)]">
          <span className="text-muted-foreground">No posts</span>
        </div>
      )}

      {!!posts && posts.length !== 0 && !isLoading && (
        <div className="flex flex-col gap-y-2">
          {posts.map(item => <Post key={item.id} data={item} />)}

          <div ref={ref} className="flex justify-center items-center text-muted-foreground py-2">
            {isOver ? 'No more posts' : <Loader className="w-4 h-4" />}
          </div>
        </div>
      )}
    </>
  )
}

export default PostList
