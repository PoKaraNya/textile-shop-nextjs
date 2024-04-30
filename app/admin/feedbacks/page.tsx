import { Suspense } from 'react';

import Loading from '@/app/(app)/loading';
import { FeedbackList } from '@/components/feedbacks';
import { getFeedbacks } from '@/lib/api/feedbacks/queries';
import { getProducts } from '@/lib/api/products/queries';
import { checkAuth } from '@/lib/auth/utils';

export const revalidate = 0;

const Feedbacks = async () => {
  await checkAuth();

  const { feedbacks } = await getFeedbacks();
  const { products } = await getProducts();

  return (
    <Suspense fallback={<Loading />}>
      <FeedbackList feedbacks={feedbacks} products={products} />
    </Suspense>
  );
};

export default async function FeedbacksPage() {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">Feedbacks</h1>
        </div>
        <Feedbacks />
      </div>
    </main>
  );
}
