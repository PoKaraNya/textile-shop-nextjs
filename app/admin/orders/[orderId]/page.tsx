import { Suspense } from 'react';
import { notFound } from 'next/navigation';

import { getOrderById } from '@/lib/api/orders/queries';
import { checkAuth } from '@/lib/auth/utils';

import { BackButton } from '@/components/shared/BackButton';
import Loading from '@/app/(app)/loading';
import OptimisticOrder from './OptimisticOrder';

export const revalidate = 0;

async function Order({ id }: { id: string }) {
  await checkAuth();

  const { order } = await getOrderById(id);

  if (!order) notFound();
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative">
        <BackButton currentResource="orders" />
        <OptimisticOrder order={order} />
      </div>
    </Suspense>
  );
}

export default async function OrderPage({
  params,
}: {
  params: { orderId: string };
}) {
  return (
    <main className="overflow-auto">
      <Order id={params.orderId} />
    </main>
  );
}
