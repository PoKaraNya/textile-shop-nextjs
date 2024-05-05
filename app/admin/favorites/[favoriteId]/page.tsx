import { Suspense } from 'react';
import { notFound } from 'next/navigation';

import { getFavoriteById } from '@/lib/api/favorites/queries';
import { getProducts } from '@/lib/api/products/queries';
import { checkAuth } from '@/lib/auth/utils';

import { BackButton } from '@/components/shared/BackButton';
import Loading from '@/app/(app)/loading';
import OptimisticFavorite from './OptimisticFavorite';

export const revalidate = 0;

const Favorite = async ({ id }: { id: string }) => {
  await checkAuth();

  const { favorite } = await getFavoriteById(id);
  const { products } = await getProducts();

  if (!favorite) notFound();
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative">
        <BackButton currentResource="favorites" />
        <OptimisticFavorite favorite={favorite} products={products} />
      </div>
    </Suspense>
  );
};

export default async function FavoritePage({
  params,
}: {
  params: { favoriteId: string };
}) {
  return (
    <main className="overflow-auto">
      <Favorite id={params.favoriteId} />
    </main>
  );
}
