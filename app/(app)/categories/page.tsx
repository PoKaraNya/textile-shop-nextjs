import { Suspense } from 'react';
import Loading from '@/app/(app)/loading';
import { getCategories } from '@/lib/api/categories/queries';
import { CategoryGrid } from '@/components/categories';

export default async function CategoriesPage() {
  const { categories } = await getCategories();
  return (
    <Suspense fallback={<Loading />}>
      <CategoryGrid categories={categories} />
    </Suspense>
  );
}
