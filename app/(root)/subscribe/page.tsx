import { fetchAllUsers } from '@/actions/users'
import Header from '@/components/global/header'
import Subscribe from '@/components/layout/actions/subscribe'

const SubscribePage = async () => {
  const users = await fetchAllUsers()

  return (
    <div className="h-full border-x">
      <Header label="Subscribe" />
      <Subscribe showAll users={users} />
    </div>
  )
}

export default SubscribePage
