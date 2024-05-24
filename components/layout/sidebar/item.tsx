import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

type Props = {
  label: string
  href: string
  icon: LucideIcon
}

const Item = ({ label, href, icon: Icon }: Props) => {
  return (
    <div className="flex items-center">
      <Link
        href={href}
        className="flex lg:hidden justify-center items-center w-14 h-14 p-4 rounded-full cursor-pointer hover:bg-secondary"
      >
        <Icon size={28} />
      </Link>

      <Link
        href={href}
        className="hidden lg:flex items-center gap-x-4 w-full p-4 rounded-full cursor-pointer hover:bg-secondary"
      >
        <Icon size={28} />

        <p className="text-xl">
          {label}
        </p>
      </Link>
    </div>
  )
}

export default Item
