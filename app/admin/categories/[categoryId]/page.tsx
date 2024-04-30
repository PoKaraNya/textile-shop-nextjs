import { Suspense } from 'react';
import { notFound } from 'next/navigation';

import { getCategoryById } from '@/lib/api/categories/queries';

import { BackButton } from '@/components/shared/BackButton';
import Loading from '@/app/(app)/loading';
import OptimisticCategory from './OptimisticCategory';

export const revalidate = 0;

const Category = async ({ id }: { id: string }) => {
  const { category } = await getCategoryById(id);

  if (!category) notFound();
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative">
        <BackButton currentResource="categories" />
        <OptimisticCategory category={category} />
      </div>
    </Suspense>
  );
};

export default async function CategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  return (
    <main className="overflow-auto">
      <Category id={params.categoryId} />
    </main>
  );
}
