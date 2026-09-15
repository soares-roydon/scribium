import z from 'zod';

export const commentSchema = z.object({
   comment: z.string().trim().min(1, 'Comment cannot be empty'),
});
