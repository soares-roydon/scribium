import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userRepository } from './user.repository.js';
import { SALT_COUNT } from './user.data.js';
import { AppError } from '../../errors/app-errors.js';

export const userService = {
   async createUser(name: string, email: string, password: string) {
      const user = await userRepository.findUser(email);

      if (user) {
         throw new AppError(409, 'User Already exists');
      }

      const hashed_password = await bcrypt.hash(password, SALT_COUNT);
      const newUser = await userRepository.createUser(
         name,
         email,
         hashed_password,
      );

      return {
         message: 'Account created successfully',
         userId: newUser.id,
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

      const token = jwt.sign({ userId: user.id }, process.env.JWT_PASSWORD!, {
         expiresIn: '1d',
      });

      return {
         message: 'Signed in successfully',
         token,
      };
   },

   getUser(userId: string) {
      return userRepository.getUser(userId);
   },
};
