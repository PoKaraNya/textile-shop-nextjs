import { Suspense } from 'react';

import FavoriteList from '@/components/favorites/FavoriteList';
import { getFavorites } from '@/lib/api/favorites/queries';
import { getProducts } from '@/lib/api/products/queries';
import { checkAuth } from '@/lib/auth/utils';
import Loading from '@/app/(app)/loading';

export const revalidate = 0;

const Favorites = async () => {
  await checkAuth();

  const { favorites } = await getFavorites();
  const { products } = await getProducts();
  return (
    <Suspense fallback={<Loading />}>
      <FavoriteList favorites={favorites} products={products} />
    </Suspense>
  );
};

export default async function FavoritesPage() {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">Favorites</h1>
        </div>
        <Favorites />
      </div>
    </main>
  );
}
