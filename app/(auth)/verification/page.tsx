import { Suspense } from 'react'

import VerificationForm from '@/components/auth/verification-form'

const Verification = () => {
  return (
    <Suspense>
      <VerificationForm />
    </Suspense>
  )
}

export default Verification
