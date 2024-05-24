import { fetchAllPosts } from '@/actions/posts'
import Editor from '@/components/main/editor'
import Header from '@/components/main/header'
import Post from '@/components/main/post'

const Home = async () => {
  const posts = await fetchAllPosts()

  return (
    <div className="h-full">
      <Header />
      <Editor />

      {posts.map(item => <Post key={item.id} data={item} />)}
    </div>
  )
}

export default Home
