'use client';

import { useOptimistic, useState } from 'react';
import { TAddOptimistic } from '@/app/admin/favorites/useOptimisticFavorites';
import { type Favorite } from '@/lib/db/schema/favorites';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Modal } from '@/components/shared/Modal';
import { FavoriteForm } from '@/components/favorites/FavoriteForm';
import { type Product, type ProductId } from '@/lib/db/schema/products';

export default function OptimisticFavorite({
  favorite,
  products,
  productId,
}: {
  favorite: Favorite;

  products: Product[];
  productId?: ProductId
}) {
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => setOpen(false);
  const [optimisticFavorite, setOptimisticFavorite] = useOptimistic(favorite);
  const updateFavorite: TAddOptimistic = (input) => setOptimisticFavorite({ ...input.data });

  return (
    <div className="m-4">
      <Modal open={open} setOpen={setOpen}>
        <FavoriteForm
          favorite={optimisticFavorite}
          products={products}
          productId={productId}
          closeModal={closeModal}
          openModal={openModal}
          addOptimistic={updateFavorite}
        />
      </Modal>
      <div className="flex justify-between items-end mb-4">
        <h1 className="font-semibold text-2xl">{optimisticFavorite.productId}</h1>
        <Button className="" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </div>
      <pre
        className={cn(
          'bg-secondary p-4 rounded-lg break-all text-wrap',
          optimisticFavorite.id === 'optimistic' ? 'animate-pulse' : '',
        )}
      >
        {JSON.stringify(optimisticFavorite, null, 2)}
      </pre>
    </div>
  );
}
