import { User } from 'lucide-react'

import { SidebarLinks } from '@/lib/constants'
import PostButton from './post-button'
import UserButton from './user-button'
import Item from './item'
import Logo from './logo'

type Props = {
  userId: string
}

const Sidebar = async ({ userId }: Props) => {
  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col justify-between items-center h-screen py-2">
        <div className="space-y-2 lg:w-[230px]">
          <Logo />

          {SidebarLinks.map(item => (
            <Item
              key={item.href}
              label={item.label}
              href={item.href}
              icon={item.icon}
            />
          ))}

          <Item
            label="Profile"
            href={`/users/${userId}`}
            icon={User}
          />

          <div className="mt-6">
            <PostButton />
          </div>
        </div>

        {/* <UserButton /> */}
      </div>
    </div>
  )
}

export default Sidebar
