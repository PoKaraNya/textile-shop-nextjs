import { db } from '@/lib/db';
import { UserId, userIdSchema } from '@/lib/db/schema/users';

export const getUsers = async () => {
  const c = await db.user.findMany({});
  return { users: c };
};

export const getUserById = async (id: UserId) => {
  const { id: userId } = userIdSchema.parse({ id });
  const c = await db.user.findFirst({ where: { id: userId } });
  return { user: c };
};
