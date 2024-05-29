'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { PlugMobileProvider } from '@funded-labs/plug-mobile-sdk'

import { Premium } from '@/lib/types'
import { purchase } from '@/actions/users'
import { useCurrentUser } from '@/hooks/use-current-user'
import Loader from '@/components/global/loader'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'

type Props = {
  item: Premium
}

const PaymentModal = ({ item }: Props) => {
  const router = useRouter()
  const currentUser = useCurrentUser()

  const [isPurchasingByPlug, setIsPurchasingByPlug] = useState<boolean>(false)
  const [isPurchasingByStripe, setIsPurchasingByStripe] = useState<boolean>(false)

  const onPayByPlug = async () => {
    setIsPurchasingByPlug(true)
    const isMobile = PlugMobileProvider.isMobileBrowser()

    if (isMobile) {
      const providr = new PlugMobileProvider({
        debug: true,
        walletConnectProjectId: '',
        window: window
      })

      providr.initialize().catch(console.log)
      if (!providr.isPaired()) providr.pair().catch(console.log)

      const agent = await providr.createAgent({
        host: '',
        targets: []
      })
    } else {
      // @ts-ignore
      const publicKey = await window.ic.plug.requestConnect()
      console.log(`The connected user's public key is:`, publicKey)
    }

    setIsPurchasingByPlug(false)
    router.push('/')
    toast.success('Purchase success')
  }

  const onPayByStripe = () => {
    setIsPurchasingByStripe(true)

    purchase(currentUser?.id!, item)
      .then(res => window.location.href = res?.data!)
      .catch(() => toast.error('Something went wrong'))
      .finally(() => setIsPurchasingByStripe(false))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full">Purchase</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col justify-center items-center gap-y-4">
          <h1 className="text-xl">{item.label}</h1>

          <p>
            <span className="font-bold text-4xl">${item.price}</span>
            <span>/month</span>
          </p>

          <p className="flex items-center gap-x-4">Billed monthly</p>
        </div>

        <div className="flex items-center gap-x-2 mt-6">
          <Button
            onClick={onPayByPlug}
            disabled={isPurchasingByPlug || isPurchasingByStripe}
            className="flex-1"
          >
            {isPurchasingByPlug ? <Loader /> : 'Pay by plug'}
          </Button>

          <Button
            onClick={onPayByStripe}
            disabled={isPurchasingByStripe || isPurchasingByPlug}
            className="flex-1"
          >
            {isPurchasingByStripe ? <Loader /> : 'Pay by stripe'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PaymentModal
