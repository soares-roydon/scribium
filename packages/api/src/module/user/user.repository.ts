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

   getUser(userId: string) {
      return db.orm.public.User.where({ id: userId })
         .select('id', 'name', 'email', 'bio')
         .include('followers', (followers) => followers.count())
         .include('following', (following) => following.count())
         .first();
   },
};
