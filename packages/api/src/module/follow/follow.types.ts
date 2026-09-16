import z from 'zod';

export const followSchema = z.object({
   followingId: z.string().trim().uuid(),
   status: z.boolean(),
});
