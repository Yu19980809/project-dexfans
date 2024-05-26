import { fetchAllPosts } from '@/actions/posts'
import Editor from '@/components/global/editor'
import HeaderTab from '@/components/main/header-tab'
import Post from '@/components/global/post'

const Home = async () => {
  const posts = await fetchAllPosts()

  return (
    <div className="h-full">
      <HeaderTab />
      <Editor />

      {posts.map(item => <Post key={item.id} data={item} />)}
    </div>
  )
}

export default Home
