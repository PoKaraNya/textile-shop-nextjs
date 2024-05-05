import { db } from '@/lib/db/index';
import { getUserAuth } from '@/lib/auth/utils';
import { type FavoriteId, favoriteIdSchema } from '@/lib/db/schema/favorites';

export const getFavorites = async () => {
  const { session } = await getUserAuth();
  const f = await db.favorite.findMany({ where: { userId: session?.user.id! }, include: { product: true } });
  return { favorites: f };
};

export const getFavoriteById = async (id: FavoriteId) => {
  const { session } = await getUserAuth();
  const { id: favoriteId } = favoriteIdSchema.parse({ id });
  const f = await db.favorite.findFirst({
    where: { id: favoriteId, userId: session?.user.id! },
    include: { product: true },
  });
  return { favorite: f };
};
