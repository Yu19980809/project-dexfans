'use client'

import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

type Props = {
  label: string
  userId: string
  className?: string
}

const Mask = ({ label, userId, className }: Props) => {
  const router = useRouter()

  // const onClick = (e: any) => {
  //   e.stopPropagation()
  //   router.push(`/users/${userId}`)
  // }

  const onNavigatePurchase = (e: any) => {
    e.stopPropagation()
    router.push('/premium')
  }

  return (
    <div
      // onClick={onClick}
      className={cn(
        'absolute inset-0 flex justify-center items-center w-full h-full rounded-md bg-white/20 backdrop-blur-2xl z-10',
        className
      )}
    >
      <span onClick={onNavigatePurchase} className="hover:underline">{label}</span>
    </div>
  )
}

export default Mask
