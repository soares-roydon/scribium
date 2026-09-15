import z from 'zod';

export const SignupSchema = z.object({
   name: z.string().trim().min(1, 'Name cannot be empty').max(20),
   email: z.string().trim().email(),
   password: z
      .string()
      .trim()
      .min(6, 'Password must be at least 6 characters long'),
});

export const SigninSchema = z.object({
   email: z.string().trim().email(),
   password: z.string().trim(),
});
