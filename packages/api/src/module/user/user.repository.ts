import { db } from '../../prisma/db';

export const userRepository = {
   findUser(email: string) {
      return db.orm.public.User.select('id', 'email', 'password')
         .where({ email })
         .first();
   },

   createUser(name: string, email: string, password: string) {
      return db.orm.public.User.create({
         name,
         email,
         password,
      });
   },
};
