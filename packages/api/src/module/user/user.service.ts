import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { userRepository } from './user.repository';
import { SALT_COUNT } from './user.data';
import { AppError } from '../../errors/app-errors';

export const userService = {
   async createUser(name: string, email: string, password: string) {
      const user = await userRepository.findUser(email);

      if (user) {
         throw new AppError(409, 'User Already exists');
      }

      const hashed_password = await bcrypt.hash(password, SALT_COUNT);
      await userRepository.createUser(name, email, hashed_password);

      return {
         message: 'Account created successfully',
      };
   },

   async verifyCredentials(email: string, password: string) {
      const user = await userRepository.findUser(email);

      if (!user) {
         throw new AppError(403, 'Invalid credentials');
      }
      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
         throw new AppError(403, 'Invalid credentials');
      }

      const token = sign({ userId: user.id }, process.env.JWT_PASSWORD!, {
         expiresIn: '15m',
      });

      return {
         message: 'Signed in successfully',
         token,
      };
   },
};
