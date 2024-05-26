import { fetchPostInfo } from '@/actions/posts'
import Editor from '@/components/global/editor'
import Header from '@/components/global/header'
import Post from '@/components/global/post'
import CommentList from '@/components/post/comment-list'

type Props = {
  params: {
    postId: string
  }
}

const page = async ({ params }: Props) => {
  const post = await fetchPostInfo(params.postId)

  return (
    <>
      <Header label='Post' />
      <Post data={post!} />

      <Editor
        isComment
        postId={params.postId}
        placeholder="Post your comment."
      />

      <CommentList comments={post?.comments!} />
    </>
  )
}

export default page
