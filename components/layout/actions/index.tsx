import { fetchFirst5Users } from '@/actions/users'
import SearchBar from './search'
import Subscribe from './subscribe'

const Actions = async () => {
  const users = await fetchFirst5Users()

  return (
    <div className="flex flex-col items-center gap-y-4 w-[300px] h-screen py-4">
      <SearchBar />
      <Subscribe users={users} />
    </div>
  )
}

export default Actions
