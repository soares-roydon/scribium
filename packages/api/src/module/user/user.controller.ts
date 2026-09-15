import type { Request, Response } from 'express';
import { SigninSchema, SignupSchema } from './user.types';
import { userService } from './user.service';

export const userController = {
   async signup(req: Request, res: Response) {
      const parsedUser = SignupSchema.safeParse(req.body);

      if (!parsedUser.success) {
         return res
            .status(400)
            .json({ error: parsedUser.error.issues[0]?.message });
      }

      const { name, email, password } = parsedUser.data;
      const result = await userService.createUser(name, email, password);

      return res.status(201).json({ message: result.message });
   },

   async signin(req: Request, res: Response) {
      const parsedUser = SigninSchema.safeParse(req.body);

      if (!parsedUser.success) {
         return res
            .status(400)
            .json({ error: parsedUser.error.issues[0]?.message });
      }

      const { email, password } = parsedUser.data;
      const result = await userService.verifyCredentials(email, password);

      // Todo: Make secure and expiry - Done
      res.cookie('token', result.token, {
         maxAge: 900000, // 15 minutes in milliseconds
         httpOnly: true, // Prevents client-side JS access
         secure: true, // Only sends over HTTPS
      });

      return res.status(200).json({
         message: result.message,
      });
   },
};
