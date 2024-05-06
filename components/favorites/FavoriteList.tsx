'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { CompleteFavorite, type Favorite } from '@/lib/db/schema/favorites';
import { Modal } from '@/components/shared/Modal';
import { type Product, type ProductId } from '@/lib/db/schema/products';
import { useOptimisticFavorites } from '@/app/admin/favorites/useOptimisticFavorites';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { FavoriteForm } from './FavoriteForm';

type TOpenModal = (favorite?: Favorite) => void;

export const FavoriteElement = ({
  favorite,
}: {
  favorite: CompleteFavorite;
}) => {
  const optimistic = favorite.id === 'optimistic';
  const deleting = favorite.id === 'delete';
  const mutating = optimistic || deleting;
  const pathname = usePathname();
  const basePath = pathname.includes('favorites')
    ? pathname
    : `${pathname}/favorites/`;

  return (
    <li
      className={cn(
        'flex justify-between my-2',
        mutating ? 'opacity-30 animate-pulse' : '',
        deleting ? 'text-destructive' : '',
      )}
    >
      <div className="w-full">
        <div>{favorite.productId}</div>
      </div>
      <Button variant="link" asChild>
        <Link href={`${basePath}/${favorite.id}`}>
          Edit
        </Link>
      </Button>
    </li>
  );
};

const EmptyState = ({ openModal }: { openModal: TOpenModal }) => (
  <div className="text-center">
    <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
      No favorites
    </h3>
    <p className="mt-1 text-sm text-muted-foreground">
      Get started by creating a new favorite.
    </p>
    <div className="mt-6">
      <Button onClick={() => openModal()}>
        <PlusIcon className="h-4" />
        {' '}
        New Favorites
        {' '}
      </Button>
    </div>
  </div>
);

export default function FavoriteList({
  favorites,
  products,
  productId,
}: {
  favorites: CompleteFavorite[];
  products: Product[];
  productId?: ProductId
}) {
  const { optimisticFavorites, addOptimisticFavorite } = useOptimisticFavorites(
    favorites,
    products,
  );
  const [open, setOpen] = useState(false);
  const [activeFavorite, setActiveFavorite] = useState<Favorite | null>(null);
  const openModal = (favorite?: Favorite) => {
    setOpen(true);
    favorite ? setActiveFavorite(favorite) : setActiveFavorite(null);
  };
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activeFavorite ? 'Edit Favorite' : 'Create Favorite'}
      >
        <FavoriteForm
          favorite={activeFavorite}
          addOptimistic={addOptimisticFavorite}
          openModal={openModal}
          closeModal={closeModal}
          products={products}
          productId={productId}
        />
      </Modal>
      <div className="absolute right-0 top-0 ">
        <Button onClick={() => openModal()} variant="outline">
          +
        </Button>
      </div>
      {optimisticFavorites.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <ul>
          {optimisticFavorites.map((favorite) => (
            <FavoriteElement
              favorite={favorite}
              key={favorite.id}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
