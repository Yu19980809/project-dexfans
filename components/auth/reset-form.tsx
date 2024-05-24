'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'

import { ResetSchema } from '@/lib/schemas'
import CardWrapper from '@/components/auth/card-wrapper'
import Loader from '@/components/global/loader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

const ResetForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/login'

  const [showPwd, setShowPwd] = useState<boolean>(false)
  const [isResend, setIsResend] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      code: '',
      newPassword: ''
    }
  })

  const onResend = () => {
    setIsResend(true)
    toast.success('Resend code success')

    setTimeout(() => setIsResend(false), 5000)
  }

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setIsLoading(true)
    console.log('values', values)

    setTimeout(() => {
      setIsLoading(false)
      router.push(callbackUrl)
      toast.success('Reset password success')
    }, 3000)
  }

  return (
    <CardWrapper>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel>Verification Code</FormLabel>

                    <Button
                      onClick={onResend}
                      variant="link"
                      disabled={isLoading || isResend}
                      className="h-6 p-0 text-xs text-muted-foreground"
                    >
                      Resend code
                    </Button>
                  </div>

                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="123456"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="newPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>

                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPwd ? 'text' : 'password'}
                        disabled={isLoading}
                        placeholder="******"
                        {...field}
                      />

                      {showPwd ? (
                        <Eye
                          onClick={() => setShowPwd(false)}
                          className="absolute top-3 right-2 w-4 h-4 text-muted-foreground cursor-pointer hover:text-primary"
                        />
                      ) : (
                        <EyeOff
                          onClick={() => setShowPwd(true)}
                          className="absolute top-3 right-2 w-4 h-4 text-muted-foreground cursor-pointer hover:text-primary"
                        />
                      )}
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? <Loader /> : 'Reset'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default ResetForm
