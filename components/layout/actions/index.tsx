import { fetchAllUsers } from '@/actions/users'
import SearchBar from './search'
import Subscribe from './subscribe'

const Actions = async () => {
  const users = await fetchAllUsers()

  return (
    // <div className="col-span-1 w-[350px] h-full pl-4 md:pl-6">
      <div className="flex flex-col items-center gap-y-4 w-[300px] h-screen py-2">
        <SearchBar />
        <Subscribe users={users} />
      </div>
    // </div>
  )
}

export default Actions
