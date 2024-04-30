import { getProducts } from '@/lib/api/products/queries';
import { Suspense } from 'react';
import Loading from '@/app/(app)/loading';
import { ProductsGrid } from '@/components/products/ProductsGrid';

export default async function ProductsPage() {
  const { products } = await getProducts();
  return (
    <Suspense fallback={<Loading />}>
      <ProductsGrid products={products} />
    </Suspense>
  );
}
