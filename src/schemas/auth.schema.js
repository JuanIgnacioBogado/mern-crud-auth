import { z } from 'zod';

const emailAndPasswordSchema = {
  email: z
    .string({
      required_error: 'Email is required'
    })
    .email({
      message: 'Invalid email'
    }),
  password: z
    .string({
      required_error: 'Password is required'
    })
    .min(6, {
      message: 'Password must be at least 6 characters long'
    })
};

export const registerSchema = z.object({
  username: z.string({
    required_error: 'Username is required'
  }),
  ...emailAndPasswordSchema
});

export const loginSchema = z.object({ ...emailAndPasswordSchema });
