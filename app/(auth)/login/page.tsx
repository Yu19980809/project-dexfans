import { Suspense } from 'react'

import LoginForm from '@/components/auth/login-form'

const Login = () => {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}

export default Login
