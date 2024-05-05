import { Suspense } from 'react';
import { notFound } from 'next/navigation';

import { getCartById } from '@/lib/api/carts/queries';
import { getProducts } from '@/lib/api/products/queries';
import { checkAuth } from '@/lib/auth/utils';

import { BackButton } from '@/components/shared/BackButton';
import Loading from '@/app/(app)/loading';
import OptimisticCart from './OptimisticCart';

export const revalidate = 0;

const Cart = async ({ id }: { id: string }) => {
  await checkAuth();

  const { cart } = await getCartById(id);
  const { products } = await getProducts();

  if (!cart) notFound();
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative">
        <BackButton currentResource="carts" />
        <OptimisticCart cart={cart} products={products} />
      </div>
    </Suspense>
  );
};

export default async function CartPage({
  params,
}: {
  params: { cartId: string };
}) {
  return (
    <main className="overflow-auto">
      <Cart id={params.cartId} />
    </main>
  );
}
