'use client'

import { PostListType } from '@/lib/types'
import useTabType from '@/store/use-tab-type'
import Editor from '@/components/global/editor'
import PostList from '@/components/main/post-list'
import HeaderTab from '@/components/main/header-tab'

const Home = () => {
  const { isSubscribing } = useTabType()
  const type = isSubscribing ? PostListType.SUBSCRIBING : PostListType.FOR_YOU

  return (
    <div className="h-full">
      <HeaderTab />

      <div className="pt-14 border-x">
        <Editor />
        <PostList type={type} />
      </div>
    </div>
  )
}

export default Home
