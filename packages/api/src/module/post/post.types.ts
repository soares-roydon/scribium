import z from 'zod';

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
