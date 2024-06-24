'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import { headerItems } from '@/lib/constants'
import useTabType from '@/store/use-tab-type'
import { ModeToggle } from '@/components/dark-mode/mode-toggle'

const HeaderTab = () => {
  const { setIsSubscribing } = useTabType()

  const [activeIndex, setActiveIndex] = useState<number>(0)

  const onClick = (index: number) => {
    setActiveIndex(index)
    setIsSubscribing(index === 1)
  }

  return (
    <div className="fixed top-0 left-1/3 flex w-1/3 h-14 border bg-background z-20">
      {headerItems.map((item, index) => (
        <div
          key={item.label}
          onClick={() => onClick(index)}
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

export default HeaderTab
