'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'

type Props = {
  label: string
}

const Header = ({ label }: Props) => {
  const router = useRouter()

  return (
    <div className="flex items-center gap-x-4 h-12 px-2 border-b">
      <Button
        onClick={() => router.back()}
        variant="ghost"
        size="icon"
        className="rounded-full"
      >
        <ArrowLeft className="w-6 h-6" />
      </Button>

      <span className="font-semibold">{label}</span>
    </div>
  )
}

export default Header
