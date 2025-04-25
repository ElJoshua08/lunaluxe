import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty('This field is required')
    .email('Must be a valid email'),
  password: z.string().nonempty('This field is required'),
})

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .nonempty('This field is required')
      .min(4, 'First name must be at least 4 characters'),
    lastName: z
      .string()
      .nonempty('This field is required')
      .min(4, 'Last name must be at least 4 characters'),
    email: z
      .string()
      .nonempty('This field is required')
      .email('Must be a valid email'),
    password: z.string().nonempty('This field is required'),
    confirmPassword: z.string().nonempty('This field is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

export const verifySchema = z.object({
  otp: z
    .string()
    .nonempty('Please fill in the OTP')
    .min(6, 'OTP must be 6 digits')
    .max(6, 'OTP must be 6 digits'),
})
