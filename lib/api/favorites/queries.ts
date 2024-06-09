import { db } from '@/lib/db';
import { getUserAuth } from '@/lib/auth/utils';
import { type FavoriteId, favoriteIdSchema } from '@/lib/db/schema/favorites';
import { ProductId, productIdSchema } from '@/lib/db/schema/products';
import { map } from 'lodash';
import { redirect } from 'next/navigation';

export const getFavorites = async () => {
  const { session } = await getUserAuth();
  if (!session) redirect('/api/auth/signin');
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

export const isProductInFavorite = async (id: ProductId) => {
  const { session } = await getUserAuth();
  const { id: productId } = productIdSchema.parse({ id });
  const c = await db.favorite.findFirst({
    where: {
      userId: session?.user.id!,
      productId,
    },
  });
  return !!c;
};

export const getProductIdsInFavorites = async (): Promise<ProductId[]> => {
  const { session } = await getUserAuth();
  if (!session) {
    return [];
  }
  const c = await db.favorite.findMany({
    where: {
      userId: session?.user.id!,
    },
  });
  return map(c, 'productId');
};
