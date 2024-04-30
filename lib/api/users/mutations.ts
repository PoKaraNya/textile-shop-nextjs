import { db } from '@/lib/db';
import {
  insertUserSchema,
  NewUserParams,
  UpdateUserParams,
  updateUserSchema,
  UserId,
  userIdSchema,
} from '@/lib/db/schema/users';
import * as Sentry from '@sentry/nextjs';

export const createUser = async (user: NewUserParams) => {
  const newUser = insertUserSchema.parse(user);
  try {
    const c = await db.user.create({ data: newUser });
    return { user: c };
  } catch (err) {
    Sentry.captureException(err);
    const message = (err as Error).message ?? 'Error, please try again';
    console.error(message);
    throw new Error(message);
  }
};

export const updateUser = async (id: UserId, user: UpdateUserParams) => {
  const { id: userId } = userIdSchema.parse({ id });
  const newUser = updateUserSchema.parse(user);
  try {
    const c = await db.user.update({ where: { id: userId }, data: newUser });
    return { category: c };
  } catch (err) {
    Sentry.captureException(err);
    const message = (err as Error).message ?? 'Error, please try again';
    console.error(message);
    throw new Error(message);
  }
};

export const deleteUser = async (id: UserId) => {
  const { id: userId } = userIdSchema.parse({ id });
  try {
    const c = await db.user.delete({ where: { id: userId } });
    return { user: c };
  } catch (err) {
    Sentry.captureException(err);
    const message = (err as Error).message ?? 'Error, please try again';
    console.error(message);
    throw new Error(message);
  }
};
