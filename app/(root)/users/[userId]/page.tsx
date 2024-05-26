import { UserWithInfo } from '@/lib/types'
import { fetchUserInfo } from '@/actions/users'
import { fetchUserPosts } from '@/actions/posts'
import Loader from '@/components/global/loader'
import Header from '@/components/global/header'
import UserHero from '@/components/user/hero'
import UserBio from '@/components/user/bio'
import Post from '@/components/global/post'

type Props = {
  params: {
    userId: string
  }
}

const UserPage = async ({ params }: Props) => {
  const user: UserWithInfo = await fetchUserInfo(params.userId)
  const posts = await fetchUserPosts(params.userId)

  return (
    <>
      {!user && (
        <div className="flex justify-center items-center h-full">
          <Loader className="w-12 h-12" />
        </div>
      )}

      {!!user && (
        <>
          <Header label={user.name || 'DF'} />
          <UserHero user={user} />
          <UserBio user={user} />

          {posts.map(item => <Post key={item.id} data={item} />)}
        </>
      )}
    </>
  )
}

export default UserPage
