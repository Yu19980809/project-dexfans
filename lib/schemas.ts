import { string, object } from 'zod'

export const LoginSchema = object({
  email: string()
    .min(1, 'Email is required')
    .email('Invalid email'),
  password: string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more thab 8 characters')
    .max(16, 'Password must be less than 16 chacracters')
})

export const RegisterSchema = object({
  username: string()
    .min(1, 'Username is required'),
  email: string()
    .min(1, 'Email is required')
    .email('Invalid email'),
  password: string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(16, 'Password must be less than 16 chacracters'),
  confirmPassword: string()
    .min(1, 'Confirm password is required')
    .min(8, 'Confirm password must be more than 8 characters')
    .max(16, 'Confirm password must be less than 16 chacracters')
})

export const ResetSchema = object({
  code: string()
    .min(1, 'Verification code is required')
    .length(6, 'Verification code must be 6 chacracters'),
  newPassword: string()
    .min(1, 'New password is required')
    .min(8, 'New password must be more thab 8 characters')
    .max(16, 'New password must be less than 16 chacracters')
})

