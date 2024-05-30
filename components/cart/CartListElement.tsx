'use client';

import { MinusIcon, PlusIcon, XIcon } from 'lucide-react';
import { addCartCountAction, deleteCartAction } from '@/lib/actions/carts';
import { useTransition } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';

interface Props {
  value: {
    id: string;
    productId: string;
    count: number;
    userId: string;
    product: {
      id: string;
      title: string;
      description: string | null;
      photo: string | null;
      price: number;
      createdAt: Date;
      updatedAt: Date;
      categoryId: string
    }
  },
}

export function CartListElement({ value }: Props) {
  const { id, count, product } = value;
  const [, startTransition] = useTransition();

  const minusCountHandler = () => {
    startTransition(async () => {
      if (count <= 1) {
        return;
      }
      await addCartCountAction(id, -1);
    });
  };

  const addCountHandler = () => {
    startTransition(async () => {
      await addCartCountAction(id, 1);
    });
  };

  const removeCartHandler = () => {
    startTransition(async () => {
      await deleteCartAction(id);
    });
  };

  return (
    <div className="grid md:grid-cols-[auto_1fr_auto] items-center gap-4">
      <img
        alt="Product Image"
        className="rounded-lg object-cover"
        height={100}
        src={product?.photo!}
        style={{
          aspectRatio: '100/100',
          objectFit: 'cover',
        }}
        width={100}
      />
      <Link href={`/products/${product.id}`} className="grid gap-1">
        <h3 className="font-semibold">{product?.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{product?.description}</p>
      </Link>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 ">
          <Button
            className="bg-bg-dark"
            size="icon"
            variant="outline"
            onClick={minusCountHandler}
          >
            <MinusIcon className="h-4 w-4" />
          </Button>
          <span className="text-base font-medium">
            {count}
          </span>
          <Button
            className="bg-bg-dark"
            size="icon"
            variant="outline"
            onClick={addCountHandler}
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="font-semibold">
          {product.price}
          грн
        </div>
        <Button
          className="text-zinc-800 hover:bg-red-100 dark:hover:bg-red-900/20"
          size="icon"
          variant="ghost"
          onClick={removeCartHandler}
        >
          <XIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
