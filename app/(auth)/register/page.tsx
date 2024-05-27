import { Suspense } from 'react'

import RegisterForm from '@/components/auth/register-form'

const Register = () => {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  )
}

export default Register
