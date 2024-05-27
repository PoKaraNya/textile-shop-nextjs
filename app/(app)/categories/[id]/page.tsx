import { getProductsByCategoryId } from '@/lib/api/categories/queries';
import React, { Suspense } from 'react';
import Loading from '@/app/(app)/loading';
import { notFound } from 'next/navigation';
import { ProductsGrid } from '@/components/products';
import { getProductIdsInCart } from '@/lib/api/carts/queries';
import { getProductIdsInFavorites } from '@/lib/api/favorites/queries';

interface Props {
  params: {
    id: string
  }
}

export default async function CategoryIdPage({ params }: Props) {
  const { category } = await getProductsByCategoryId(params.id);
  if (!category) {
    notFound();
  }

  const productsInCart = await getProductIdsInCart();
  const productsInFavorite = await getProductIdsInFavorites();
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <div className="p-2 flex gap-4">
          <div>
            <img
              src={category.photo ?? ''}
              alt={category.description ?? ''}
              className="w-32 h-32 rounded-xl"
            />
          </div>
          <div className="pt-5">
            <h1 className="text-2xl">
              {category.title}
            </h1>
            <h3 className="text-gray-700 text-md">
              {category.description}
            </h3>
          </div>
        </div>
        <ProductsGrid productsInCart={productsInCart} productsInFavorite={productsInFavorite} products={category.products} />
      </Suspense>
    </div>
  );
}
