import { fetchAllUsers } from '@/actions/users'
import SearchBar from './search'
import Follow from './follow'

const Actions = async () => {
  const users = await fetchAllUsers()

  return (
    <div className="col-span-1 w-[350px] h-full pl-4 md:pl-6">
      <div className="flex flex-col items-center gap-y-4 h-screen py-2">
        <SearchBar />
        <Follow users={users} />
      </div>
    </div>
  )
}

export default Actions
