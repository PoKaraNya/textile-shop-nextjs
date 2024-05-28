import Loading from '@/app/(app)/loading';
import { Suspense } from 'react';
import { LayoutContainer, ListContainer } from '@/components/layout';
import { getOrders } from '@/lib/api/orders/queries';
import { Separator } from '@/components/ui/separator';
import { OrderList } from '@/components/orders';

export default async function OrdersPage() {
  const { orders } = await getOrders();
  const total = orders.reduce((acc, order) => acc + order.orderProducts.reduce((productAcc, orderProduct) => productAcc + orderProduct.count * orderProduct.product.price, 0), 0);

  return (
    <Suspense fallback={<Loading />}>
      <LayoutContainer>
        <ListContainer>
          <Separator />
          <OrderList orders={orders} />
          <Separator />
          Total:
          {' '}
          {total}
          {' '}
          грн
        </ListContainer>
      </LayoutContainer>
    </Suspense>
  );
}
