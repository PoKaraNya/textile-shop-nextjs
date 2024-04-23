import { userSchema } from '@/prisma/zod';
import { z } from 'zod';
import { getUsers } from '@/lib/api/users/queries';

export const insertUserSchema = userSchema.omit({ id: true });
export const insertUserParams = userSchema.extend({}).omit({
  id: true,
});

export const updateUserSchema = userSchema;
export const updateUserParams = updateUserSchema.extend({});
export const userIdSchema = userSchema.pick({ id: true });

export type User = z.infer<typeof userSchema>;
export type NewUser = z.infer<typeof insertUserSchema>;
export type NewUserParams = z.infer<typeof insertUserParams>;
export type UpdateUserParams = z.infer<typeof updateUserParams>;
export type UserId = z.infer<typeof userIdSchema>['id'];

export type CompleteUser = Awaited<ReturnType<typeof getUsers>>['users'][number];
