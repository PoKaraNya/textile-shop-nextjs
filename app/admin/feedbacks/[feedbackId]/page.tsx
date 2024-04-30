import { Suspense } from 'react';
import { notFound } from 'next/navigation';

import { getFeedbackById } from '@/lib/api/feedbacks/queries';
import { getProducts } from '@/lib/api/products/queries';
import { checkAuth } from '@/lib/auth/utils';

import { BackButton } from '@/components/shared/BackButton';
import Loading from '@/app/(app)/loading';
import OptimisticFeedback from './OptimisticFeedback';

export const revalidate = 0;

async function Feedback({ id }: { id: string }) {
  await checkAuth();

  const { feedback } = await getFeedbackById(id);
  const { products } = await getProducts();

  if (!feedback) notFound();
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative">
        <BackButton currentResource="feedbacks" />
        <OptimisticFeedback feedback={feedback} products={products} />
      </div>
    </Suspense>
  );
}

export default async function FeedbackPage({
  params,
}: {
  params: { feedbackId: string };
}) {
  return (
    <main className="overflow-auto">
      <Feedback id={params.feedbackId} />
    </main>
  );
}
