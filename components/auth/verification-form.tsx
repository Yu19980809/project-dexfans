'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'

import { verify } from '@/actions/auth'
import { generateVerificationToken } from '@/actions/tokens'
import CardWrapper from '@/components/auth/card-wrapper'
import Loader from '@/components/global/loader'
import { Button } from '@/components/ui/button'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'

const VerificationForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const callbackUrl = searchParams.get('callbackUrl') || '/login'

  const [code, setCode] = useState<string>()
  const [isResend, setIsResend] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!email) return

    const fetchData = async () => {
      const token = await generateVerificationToken(email)
      if (!token) return toast.error('Failed to generate code')
      toast.success('Code alreadt sent to email')
    }

    fetchData()
  }, [email])

  const onResend = async () => {
    setIsResend(true)

    if (!email) return toast.error('Missing email')

    const token = await generateVerificationToken(email)
    if (!token) return toast.error('Failed to generate code')

    toast.success('Code alreadt resent to email')
    setIsResend(false)
  }

  const onContinue = () => {
    if (code?.length !== 6) return toast.error('Invalid code')
    if (!email) return toast.error('Missing email')

    setIsLoading(true)

    verify(code, email)
      .then(res => {
        if (res.error) return toast.error(res.error)
        if (res.success) {
          router.push(callbackUrl)
          toast.success('Verification success')
        }
      })
      .catch(() => toast.error('Something went wrong'))
      .finally(() => setIsLoading(false))
  }

  return (
    <CardWrapper>
      <div className="flex flex-col justify-center items-center gap-y-6">
        <div className="flex flex-col justify-center items-center text-sm text-muted-foreground">
          <span>Enter the verification code sent to your email</span>
          <span>{email}</span>
        </div>

        <div className="flex flex-col gap-y-1">
          <InputOTP
            maxLength={6}
            value={code}
            disabled={isLoading}
            onChange={(value: string)  => setCode(value)}
          >
            <InputOTPGroup>
              {[...Array(6)].map((_, index) => <InputOTPSlot key={index} index={index} />)}
            </InputOTPGroup>
          </InputOTP>

          <Button
            onClick={onResend}
            variant="link"
            disabled={isLoading || isResend}
            className="text-xs"
          >
            Didn&apos;t receive a code? Resend
          </Button>
        </div>

        <Button
          onClick={onContinue}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? <Loader /> : 'Continue'}
        </Button>
      </div>
    </CardWrapper>
  )
}

export default VerificationForm
