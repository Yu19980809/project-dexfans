'use client'

import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

type Props = {
  userId: string
  className?: string
}

const Mask = ({ userId, className }: Props) => {
  const router = useRouter()

  const onClick = (e: any) => {
    e.stopPropagation()
    router.push(`/users/${userId}`)
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        'absolute inset-0 flex justify-center items-center w-full h-full rounded-md bg-secondary z-10',
        className
      )}
    >
      <span>Follow creator to view</span>
    </div>
  )
}

export default Mask
