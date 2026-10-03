import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { SigninSchema, SignupSchema } from '@scribium/shared';
import { userService } from './user.service.js';

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

      const token = jwt.sign(
         { userId: result.userId },
         process.env.JWT_PASSWORD!,
         {
            expiresIn: '15m',
         },
      );

      res.cookie('token', token, {
         maxAge: 900000,
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
         sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      });

      return res.status(201).json({ message: result.message, token });
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
         maxAge: 1000 * 60 * 60 * 24,
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
         sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      });

      return res.status(200).json({
         message: result.message,
      });
   },

   async getUser(req: Request, res: Response) {
      const userId = req.userId!;

      const user = await userService.getUser(userId);

      return res.status(200).json({ user });
   },
};
