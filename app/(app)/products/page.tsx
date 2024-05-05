import { getProducts } from '@/lib/api/products/queries';
import { Suspense } from 'react';
import Loading from '@/app/(app)/loading';
import { ProductsGrid } from '@/components/products';
import { getProductIdsInCart } from '@/lib/api/carts/queries';
import { getProductIdsInFavorites } from '@/lib/api/favorites/queries';

export default async function ProductsPage() {
  const { products } = await getProducts();
  const productsInCart = await getProductIdsInCart();
  const productsInFavorite = await getProductIdsInFavorites();
  return (
    <Suspense fallback={<Loading />}>
      <ProductsGrid productsInCart={productsInCart} productsInFavorite={productsInFavorite} products={products} />
    </Suspense>
  );
}
