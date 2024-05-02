'use server';

import { getCarts } from '@/lib/api/carts/queries';
import { Suspense } from 'react';
import Loading from '@/app/(app)/loading';
import { ListContainer } from '@/components/layout';
import { CartListElement } from '@/components/cart/CartListElement';
import { Separator } from '@/components/ui/separator';

export default async function CartPage() {
  const { carts } = await getCarts();
  const total = carts.reduce((acc, cur) => acc + cur.count * cur.product.price, 0);

  return (
    <Suspense fallback={<Loading />}>
      <ListContainer>
        {carts.map((cart) => (
          <>
            <Separator />
            <CartListElement value={cart} />
          </>
        ))}
        <Separator />
        Total:
        {' '}
        {total}
        грн
      </ListContainer>
    </Suspense>
  );
}
