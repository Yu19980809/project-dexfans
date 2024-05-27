'use client'

import { premiumType } from '@/lib/constants'
import { Check } from 'lucide-react'
import { Button } from '../ui/button'

type Props = {
  isAnnual: boolean
}

const PremiumList = ({ isAnnual }: Props) => {
  const onSubscribe = (item: any) => {
    console.log('onSubscribe', item)
  }

  return (
    <div className="flex items-center gap-x-6">
      {premiumType.map(item => (
        <div
          key={item.label}
          className="flex flex-col gap-y-4 w-[300px] h-[400px] p-8 rounded-xl border bg-secondary"
        >
          <h1 className="text-xl">{item.label}</h1>

          <p>
            <span className="font-bold text-4xl">${isAnnual ? item.annualAmount : item.monthlyAmount}</span>
            <span>/month</span>
          </p>

          <p className="flex items-center gap-x-4">
            {isAnnual && (
              <>
                <span>Billed annually</span>
                <span className="text-xs text-emerald-500">
                  {/* @ts-ignore */}
                  SAVE {Math.ceil((item.monthlyAmount - item.annualAmount) / item.monthlyAmount)}%
                </span>
              </>
            )}

            {!isAnnual && 'Billed monthly'}
          </p>

          <Button
            onClick={() => onSubscribe(item)}
            className="rounded-full"
          >
            Subscribe
          </Button>

          <div className="flex flex-col gap-y-2">
            {item.items.map(label => (
              <div className="flex items-center gap-x-2">
                <Check className="w-4 h-4" />

                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default PremiumList
