'use server';

import Loading from '@/app/(app)/loading';
import { Suspense } from 'react';
import { LayoutContainer, ListContainer } from '@/components/layout';
import { getOrders } from '@/lib/api/orders/queries';
import { OrderUserList } from '@/components/orders/OrderUserList';

export default async function OrdersPage() {
  const { orders } = await getOrders();

  return (
    <Suspense fallback={<Loading />}>
      <LayoutContainer>
        <ListContainer>
          <OrderUserList orders={orders} />
        </ListContainer>
      </LayoutContainer>
    </Suspense>
  );
}
