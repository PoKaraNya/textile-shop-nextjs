import { Suspense } from 'react';
import { checkAuth } from '@/lib/auth/utils';
import { getOrders } from '@/lib/api/orders/queries';
import Loading from '@/app/(app)/loading';
import { OrderList } from '@/components/orders';

export const revalidate = 0;

async function Orders() {
  await checkAuth();

  const { orders } = await getOrders();
  return (
    <Suspense fallback={<Loading />}>
      <OrderList orders={orders} />
    </Suspense>
  );
}

export default async function OrdersPage() {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">Orders</h1>
        </div>
        <Orders />
      </div>
    </main>
  );
}
