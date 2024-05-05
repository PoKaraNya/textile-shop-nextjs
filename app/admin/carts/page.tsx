import { Suspense } from 'react';

import CartList from '@/components/carts/CartList';
import { getCarts } from '@/lib/api/carts/queries';
import { getProducts } from '@/lib/api/products/queries';
import { checkAuth } from '@/lib/auth/utils';
import Loading from '@/app/(app)/loading';

export const revalidate = 0;

const Carts = async () => {
  await checkAuth();

  const { carts } = await getCarts();
  const { products } = await getProducts();
  return (
    <Suspense fallback={<Loading />}>
      <CartList carts={carts} products={products} />
    </Suspense>
  );
};

export default async function CartsPage() {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">Carts</h1>
        </div>
        <Carts />
      </div>
    </main>
  );
}
