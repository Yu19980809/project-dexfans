import { PostListType, UserWithInfo } from '@/lib/types'
import { fetchUserInfo } from '@/actions/users'
import { fetchUserPosts } from '@/actions/posts'
import Loader from '@/components/global/loader'
import Header from '@/components/global/header'
import UserHero from '@/components/user/hero'
import UserBio from '@/components/user/bio'
import Post from '@/components/global/post'
import { ScrollArea } from '@/components/ui/scroll-area'
import PostList from '@/components/main/post-list'

type Props = {
  params: {
    userId: string
  }
}

const UserPage = async ({ params }: Props) => {
  const user: UserWithInfo = await fetchUserInfo(params.userId)

  return (
    <div className="min-h-screen border-x">
      {!user && (
        <div className="flex justify-center items-center h-full">
          <Loader className="w-12 h-12" />
        </div>
      )}

      {!!user && (
        <div className="relative">
          <Header label={user.name || 'DF'} />
          <UserHero user={user} />
          <UserBio user={user} />

          <ScrollArea>
            {/* {posts.map(item => <Post key={item.id} data={item} />)} */}
            <PostList type={PostListType.USER_PROFILE} userId={params.userId} />
          </ScrollArea>
        </div>
      )}
    </div>
  )
}

export default UserPage
