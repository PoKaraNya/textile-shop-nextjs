import { getProducts } from '@/lib/api/products/queries';
import { Suspense } from 'react';
import Loading from '@/app/loading';
import ProductsGrid from '@/components/products/ProductsGrid';

async function ProductsPage() {
  const { products } = await getProducts();
  return (
    <Suspense fallback={<Loading />}>
      <ProductsGrid products={products} />
    </Suspense>
  );
}

export default ProductsPage;
