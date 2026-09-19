import * as z from 'zod';

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

export const queryParamSchema = z.object({
   slug: z.string().trim(),
});

export const blogSchema = z.object({
   title: z.string().trim().min(1, 'Title cannot be empty').max(100),
   content: z.string().trim().min(1, 'Content cannot be empty'),
});

export const statusSchema = z.object({
   status: z.boolean(),
});

export const followSchema = z.object({
   followingId: z.string().trim().uuid(),
   status: z.boolean(),
});

export const commentSchema = z.object({
   comment: z.string().trim().min(1, 'Comment cannot be empty'),
});

export type SignupInput = z.infer<typeof SignupSchema>;
export type SigninInput = z.infer<typeof SigninSchema>;
export type QueryParamInput = z.infer<typeof queryParamSchema>;
export type BlogInput = z.infer<typeof blogSchema>;
export type StatusInput = z.infer<typeof statusSchema>;
export type FollowInput = z.infer<typeof followSchema>;
export type CommentInput = z.infer<typeof commentSchema>;
