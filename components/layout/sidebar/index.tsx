import { SidebarLinks } from '@/lib/constants'
import PostButton from './post-button'
import UserButton from './user-button'
import Item from './item'
import Logo from './logo'

const Sidebar = () => {
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

          <PostButton />
        </div>

        <UserButton />
      </div>
    </div>
  )
}

export default Sidebar
