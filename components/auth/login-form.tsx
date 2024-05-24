'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeOff, Eye } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import { z } from 'zod'

import { generateVerificationToken } from '@/actions/tokens'
import { login } from '@/actions/auth'
import { LoginSchema } from '@/lib/schemas'
import CardWrapper from './card-wrapper'
import FormError from './form-error'
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

const LoginForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const [error, setError] = useState<string>('')
  const [showPwd, setShowPwd] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onForgot = () => {
    callbackUrl === '/'
      ? router.push('/reset')
      : router.push(`/reset?callbaclUrl=${callbackUrl}`)

    toast.success('Code sent to email')
  }

  const onVerify = async (email: string) => {
    const verifiactionToken = await generateVerificationToken(email)
    if (!verifiactionToken) return toast.error('Failed to generate code')
    
    callbackUrl === '/'
      ? router.push(`/verification?email=${email}`)
      : router.push(`/verification?email=${email}&callbackUrl=${callbackUrl}`)
  }

  const onSignIn = async (email: string, password: string) => {
    const res = await signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl
    })

    if (res?.error) setError('Failed to sign in')
  }

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('')
    setIsLoading(true)

    login(values)
      .then(async (res) => {
        if (res.error) {
          if (res.error === 'Email not registered') return onVerify(values.email)
          setError(res.error)
        }

        if (res.success) await onSignIn(values.email, values.password)
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false))
  }

  return (
    <CardWrapper
      backButtonLabel="Don't have an account? Sign up"
      backButtonHref="/register"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>

                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="hello@example.com"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel>Password</FormLabel>

                    <Button
                      onClick={onForgot}
                      variant="link"
                      className="h-6 p-0 text-xs text-muted-foreground"
                    >
                      Forgot password?
                    </Button>
                  </div>

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

          <FormError message={error} />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? <Loader /> : 'Login'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default LoginForm