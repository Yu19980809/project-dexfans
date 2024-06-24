import { fetchAllPosts } from '@/actions/posts'
import Editor from '@/components/global/editor'
import PostList from '@/components/main/post-list'
import HeaderTab from '@/components/main/header-tab'
// import { ScrollArea } from '@/components/ui/scroll-area'

const Home = async () => {
  const posts = await fetchAllPosts()

  return (
    <div className="h-full">
      <HeaderTab />

      {/* <ScrollArea className="w-full h-[calc(100vh-56px)]"> */}
      <div className="pt-14 border-x">
        <Editor />
        <PostList posts={posts} />
      </div>
      {/* </ScrollArea> */}
    </div>
  )
}

export default Home
