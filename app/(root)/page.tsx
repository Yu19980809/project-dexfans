import { fetchAllPosts } from '@/actions/posts'
import Editor from '@/components/global/editor'
import PostList from '@/components/main/post-list'
import HeaderTab from '@/components/main/header-tab'

const Home = async () => {
  const posts = await fetchAllPosts()

  return (
    <div className="h-full">
      <HeaderTab />
      <Editor />
      <PostList posts={posts} />
    </div>
  )
}

export default Home
