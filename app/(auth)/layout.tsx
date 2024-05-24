import React from 'react'

type Props = {
  children: React.ReactNode
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="flex justify-center items-center h-full">
      {children}
    </div>
  )
}

export default AuthLayout
