'use server';

import { getCarts } from '@/lib/api/carts/queries';
import { Suspense } from 'react';
import Loading from '@/app/(app)/loading';
import { LayoutContainer, ListContainer } from '@/components/layout';
import { CartListElement } from '@/components/cart/CartListElement';
import { Separator } from '@/components/ui/separator';
import { ConfirmOrderButton } from '@/components/carts/ConfirmOrderButton';

export default async function CartPage() {
  const { carts } = await getCarts();
  const total = carts.reduce((acc, cur) => acc + cur.count * cur.product.price, 0);

  return (
    <Suspense fallback={<Loading />}>
      <LayoutContainer>
        <ListContainer>
          {carts.map((cart) => (
            <>
              <Separator />
              <CartListElement value={cart} />
            </>
          ))}
          <Separator />
          {(total > 0) ? `Total: ${total} грн` : 'There are no products in the cart'}
          <ConfirmOrderButton />
        </ListContainer>
      </LayoutContainer>
    </Suspense>
  );
}
