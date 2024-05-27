'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import { premiumTab } from '@/lib/constants'
import AnnualList from '@/components/premium/premium-list'
import PremiumList from '@/components/premium/premium-list'

const Premium = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  return (
    <div className="flex flex-col gap-y-8 justify-center items-center h-full">
      <h1 className="font-bold text-6xl">
        Upgrade to Premium
      </h1>

      <p className="text-lg text-muted-foreground">
        Enjoy an enhanced experience, exclusive creator tools, top-tier verification and security.
      </p>

      <div className="flex justify-between items-center p-[2px] rounded-full bg-secondary">
        {premiumTab.map((item, index) => (
          <div
            key={item.label}
            onClick={() => setActiveIndex(index)}
            className={cn(
              'px-4 py-1 rounded-full cursor-pointer',
              index === activeIndex && 'bg-background'
            )}
          >
            {item.label}
          </div>
        ))}
      </div>

      <PremiumList isAnnual={activeIndex === 0} />
    </div>
  )
}

export default Premium
