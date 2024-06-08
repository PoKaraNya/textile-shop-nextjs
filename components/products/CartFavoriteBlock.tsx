'use client';

import { Button } from '@/components/ui/button';
import { HeartIcon, ShoppingCartIcon } from 'lucide-react';
import { useTransition } from 'react';
import { createCartAction } from '@/lib/actions/carts';
import { ProductId } from '@/lib/db/schema/products';
import { createFavoriteAction, removeFromFavoriteAction } from '@/lib/actions/favorites';
import { deleteProductFromCartAction } from '@/lib/actions/orders';
import classNames from 'classnames';
import {
  IoCart, IoCartOutline, IoHeartOutline, IoHeartSharp,
} from 'react-icons/io5';

interface Props {
  inCart: boolean;
  inFavorite: boolean;
  productId: ProductId;
}

export function CartFavoriteBlock({ productId, inCart, inFavorite }: Props) {
  const [, startTransition] = useTransition();
  const addToCartHandler = async () => {
    startTransition(async () => {
      await createCartAction({ productId, count: 1 });
    });
  };
  const removeFromCartHandler = async () => {
    startTransition(async () => {
      await deleteProductFromCartAction(productId);
    });
  };
  const addToFavoriteHandler = async () => {
    startTransition(async () => {
      await createFavoriteAction({ productId });
    });
  };
  const removeFromFavoriteHandler = async () => {
    startTransition(async () => {
      await removeFromFavoriteAction(productId);
    });
  };
  return (
    <div className="grid grid-cols-2 gap-2">
      <Button
        className={classNames(
          'bg-app',
          inCart ? 'bg-app-secondary' : 'bg-app',
        )}
        variant="outline"
        size="lg"
        onClick={inCart ? removeFromCartHandler : addToCartHandler}
      >
        {inCart ? <IoCart size="23px" color="white" /> : <IoCartOutline size="23px" color="white" />}
      </Button>
      <Button
        className={classNames(
          'bg-app',
          inFavorite ? 'bg-app-secondary' : 'bg-app',
        )}
        variant="outline"
        size="lg"
        onClick={inFavorite ? removeFromFavoriteHandler : addToFavoriteHandler}
      >
        {inFavorite ? <IoHeartSharp size="23px" color="white" /> : <IoHeartOutline size="23px" color="white" />}
      </Button>
    </div>
  );
}
