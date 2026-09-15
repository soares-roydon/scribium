import type { NextFunction, Request, Response } from 'express';
import { decode, verify, type JwtPayload } from 'jsonwebtoken';

declare global {
   namespace Express {
      interface Request {
         userId?: string;
      }
   }
}

type MyPayload = JwtPayload & { userId: string };

export function authMiddleware(
   req: Request,
   res: Response,
   next: NextFunction,
) {
   const token = req.cookies.token;

   if (!token) {
      return res.status(401).json({ error: 'No token provided' });
   }
   try {
      const decoded = verify(token, process.env.JWT_PASSWORD!) as MyPayload;
      req.userId = decoded.userId;
      next();
   } catch (e) {
      return res.status(403).json({ error: 'Invalid token, try signing in' });
   }
}
