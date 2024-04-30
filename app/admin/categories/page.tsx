import { Suspense } from 'react';
import Loading from '@/app/(app)/loading';
import { CategoryList } from '@/components/categories';
import { getCategories } from '@/lib/api/categories/queries';

export const revalidate = 0;

const Categories = async () => {
  const { categories } = await getCategories();

  return (
    <Suspense fallback={<Loading />}>
      <CategoryList categories={categories} />
    </Suspense>
  );
};

export default async function CategoriesPage() {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">Categories</h1>
        </div>
        <Categories />
      </div>
    </main>
  );
}
