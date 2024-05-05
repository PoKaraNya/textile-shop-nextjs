import { db } from '@/lib/db';
import {
  FavoriteId,
  favoriteIdSchema,
  insertFavoriteSchema,
  NewFavoriteParams,
  UpdateFavoriteParams,
  updateFavoriteSchema,
} from '@/lib/db/schema/favorites';
import { getUserAuth } from '@/lib/auth/utils';

export const createFavorite = async (favorite: NewFavoriteParams) => {
  const { session } = await getUserAuth();
  const newFavorite = insertFavoriteSchema.parse({ ...favorite, userId: session?.user.id! });
  try {
    const f = await db.favorite.create({ data: newFavorite });
    return { favorite: f };
  } catch (err) {
    const message = (err as Error).message ?? 'Error, please try again';
    console.error(message);
    throw new Error(message);
  }
};

export const updateFavorite = async (id: FavoriteId, favorite: UpdateFavoriteParams) => {
  const { session } = await getUserAuth();
  const { id: favoriteId } = favoriteIdSchema.parse({ id });
  const newFavorite = updateFavoriteSchema.parse({ ...favorite, userId: session?.user.id! });
  try {
    const f = await db.favorite.update({ where: { id: favoriteId, userId: session?.user.id! }, data: newFavorite });
    return { favorite: f };
  } catch (err) {
    const message = (err as Error).message ?? 'Error, please try again';
    console.error(message);
    throw new Error(message);
  }
};

export const deleteFavorite = async (id: FavoriteId) => {
  const { session } = await getUserAuth();
  const { id: favoriteId } = favoriteIdSchema.parse({ id });
  try {
    const f = await db.favorite.delete({ where: { id: favoriteId, userId: session?.user.id! } });
    return { favorite: f };
  } catch (err) {
    const message = (err as Error).message ?? 'Error, please try again';
    console.error(message);
    throw new Error(message);
  }
};
