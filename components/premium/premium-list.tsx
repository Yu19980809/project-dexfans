'use client'

import { Check } from 'lucide-react'

import { premiumType } from '@/lib/constants'
import PaymentModal from './payment-modal'

const PremiumList = () => {
  return (
    <div className="flex items-center gap-x-6">
      {premiumType.map(item => (
        <div
          key={item.label}
          className="flex flex-col gap-y-4 w-[300px] h-[400px] p-8 rounded-xl border bg-secondary"
        >
          <h1 className="text-xl">{item.label}</h1>

          <p>
            <span className="font-bold text-4xl">ICP {item.price}</span>
            <span>/month</span>
          </p>

          <p className="flex items-center gap-x-4">Billed monthly</p>

          <PaymentModal item={item} />

          <div className="flex flex-col gap-y-2">
            {item.items.map(label => (
              <div key={label} className="flex items-center gap-x-2">
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
