'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeOff, Eye } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'

import { register } from '@/actions/auth'
import { generateVerificationToken } from '@/actions/tokens'
import { RegisterSchema } from '@/lib/schemas'
import FormError from './form-error'
import CardWrapper from './card-wrapper'
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

const RegisterForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || undefined

  const [error, setError] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [showConfirmPwd, setShowConfirmPwd] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    if (values.password !== values.confirmPassword) return setError('Two password are not same')

    setIsLoading(true)

    register(values)
      .then(res => {
        if (res.error) return setError(res.error)
        if (res.success) {
          !callbackUrl
            ? router.push(`/verification?email=${values.email}`)
            : router.push(`/verification?email=${values.email}&callbackUrl=${callbackUrl}`)
        }
      })
      .catch(() => toast.error('Something went wrong'))
      .finally(() => setIsLoading(false))
  }

  return (
    <CardWrapper
      backButtonLabel="Already have an account? Sign in"
      backButtonHref="/login"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Name</FormLabel>

                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="John Snow"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>

                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="hello@example"
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
                  <FormLabel>Password</FormLabel>

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

            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>

                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPwd ? 'text' : 'password'}
                        disabled={isLoading}
                        placeholder="******"
                        {...field}
                      />

                      {showConfirmPwd ? (
                        <Eye
                          onClick={() => setShowConfirmPwd(false)}
                          className="absolute top-3 right-2 w-4 h-4 text-muted-foreground cursor-pointer hover:text-primary"
                        />
                      ) : (
                        <EyeOff
                          onClick={() => setShowConfirmPwd(true)}
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
            
            {isLoading ? <Loader /> : 'Register'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default RegisterForm