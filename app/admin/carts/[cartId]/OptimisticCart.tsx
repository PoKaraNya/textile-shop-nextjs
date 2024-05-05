'use client';

import { useOptimistic, useState } from 'react';
import { TAddOptimistic } from '@/app/admin/carts/useOptimisticCarts';
import { type Cart } from '@/lib/db/schema/carts';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Modal } from '@/components/shared/Modal';
import CartForm from '@/components/carts/CartForm';
import { type Product, type ProductId } from '@/lib/db/schema/products';

export default function OptimisticCart({
  cart,
  products,
  productId,
}: {
  cart: Cart;

  products: Product[];
  productId?: ProductId
}) {
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => setOpen(false);
  const [optimisticCart, setOptimisticCart] = useOptimistic(cart);
  const updateCart: TAddOptimistic = (input) => setOptimisticCart({ ...input.data });

  return (
    <div className="m-4">
      <Modal open={open} setOpen={setOpen}>
        <CartForm
          cart={optimisticCart}
          products={products}
          productId={productId}
          closeModal={closeModal}
          openModal={openModal}
          addOptimistic={updateCart}
        />
      </Modal>
      <div className="flex justify-between items-end mb-4">
        <h1 className="font-semibold text-2xl">{optimisticCart.productId}</h1>
        <Button className="" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </div>
      <pre
        className={cn(
          'bg-secondary p-4 rounded-lg break-all text-wrap',
          optimisticCart.id === 'optimistic' ? 'animate-pulse' : '',
        )}
      >
        {JSON.stringify(optimisticCart, null, 2)}
      </pre>
    </div>
  );
}
