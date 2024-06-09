'use client';

import { Product } from '@/lib/db/schema/products';
import {
  IoCart, IoCartOutline, IoHeartOutline, IoHeartSharp,
} from 'react-icons/io5';
import Link from 'next/link';
import { useTransition } from 'react';
import { createCartAction } from '@/lib/actions/carts';
import { createFavoriteAction, removeFromFavoriteAction } from '@/lib/actions/favorites';
import { deleteProductFromCartAction } from '@/lib/actions/orders';
import classNames from 'classnames';
import { toast } from 'sonner';

interface Props {
  product: Product
  inCart: boolean;
  inFavorite: boolean;
}
export async function ProductCard({ product, inCart, inFavorite }: Props) {
  const [, startTransition] = useTransition();

  const addToCartHandle = () => {
    startTransition(async () => {
      await createCartAction({ productId: product.id, count: 1 });
    });
  };
  const removeFromCartHandler = async () => {
    startTransition(async () => {
      await deleteProductFromCartAction(product.id);
    });
  };
  const addToFavoriteHandle = () => {
    startTransition(async () => {
      await createFavoriteAction({ productId: product.id });
    });
  };
  const removeFromFavoriteHandler = async () => {
    startTransition(async () => {
      await removeFromFavoriteAction(product.id);
    });
  };

  const handleCartClick = () => {
    startTransition(async () => {
      if (inCart) {
        await removeFromCartHandler();
      } else {
        addToCartHandle();
      }
      toast('Success');
    });
  };

  const handleFavoriteClick = () => {
    startTransition(async () => {
      if (inFavorite) {
        await removeFromFavoriteHandler();
      } else {
        addToFavoriteHandle();
      }
      toast('Success');
    });
  };

  return (
    <div className="p-4 w-72 rounded-xl border border-app">
      <Link href={`/products/${product.id}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="w-72 h-40 object-cover rounded-lg" src={product.photo ?? ''} alt="" />
        <h3 className="font-bold mt-1">{product.title}</h3>
        <p className="line-clamp-2 text-sm text-zinc-600">{product.description}</p>
      </Link>
      <div className="flex gap-2 mt-1 text-white">

        <div className="bg-app w-48 h-8 flex justify-center items-center rounded-md">
          {product.price}
          ₴
        </div>
        <button
          type="button"
          className={classNames(
            'bg-app size-8 rounded-md flex justify-center items-center',
            inCart ? 'bg-app-secondary' : 'bg-app',
          )}
          onClick={handleCartClick}
        >
          {inCart ? <IoCart /> : <IoCartOutline />}
        </button>
        <button
          type="button"
          className={classNames(
            'bg-app size-8 rounded-md flex justify-center items-center duration-500',
            inFavorite ? 'bg-app-secondary' : 'bg-app',
          )}
          onClick={handleFavoriteClick}
        >
          {inFavorite ? <IoHeartSharp /> : <IoHeartOutline />}
        </button>
      </div>
    </div>
  );
}
