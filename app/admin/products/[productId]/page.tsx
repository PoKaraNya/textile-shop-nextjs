import { Suspense } from 'react';
import { notFound } from 'next/navigation';

import { getProductById } from '@/lib/api/products/queries';

import { BackButton } from '@/components/shared/BackButton';
import Loading from '@/app/(app)/loading';
import OptimisticProduct from './OptimisticProduct';

export const revalidate = 0;

async function Product({ id }: { id: string }) {
  const { product } = await getProductById(id);

  if (!product) notFound();
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative">
        <BackButton currentResource="products" />
        <OptimisticProduct product={product} />
      </div>
    </Suspense>
  );
}

export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  return (
    <main className="overflow-auto">
      <Product id={params.productId} />
    </main>
  );
}
