'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import { headerItems } from '@/lib/constants'
import { ModeToggle } from '@/components/dark-mode/mode-toggle'

const Header = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  return (
    <div className="flex h-14 border-b">
      {headerItems.map((item, index) => (
        <div
          key={item.label}
          onClick={() => setActiveIndex(index)}
          className="flex-1 flex flex-col justify-center items-center gap-y-2 h-full cursor-pointer hover:bg-secondary"
        >
          <div className="relative flex flex-col justify-center px-2 h-full">
            <span>{item.label}</span>
            <span className={cn(
              'absolute bottom-0 left-0 hidden w-full h-1 bg-sky-500 rounded-full',
              index === activeIndex && 'block'
            )} />
          </div>
        </div>
      ))}

      <div className="flex justify-center items-center w-14">
        <ModeToggle />
      </div>
    </div>
  )
}

export default Header
