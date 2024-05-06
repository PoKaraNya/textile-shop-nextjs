'use client';

import { XIcon } from 'lucide-react';
import { useTransition } from 'react';
import { deleteFavoriteAction } from '@/lib/actions/favorites';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Props {
  value: {
    id: string;
    productId: string;
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

export function FavoriteListElement({ value }: Props) {
  const { id, product } = value;
  const [, startTransition] = useTransition();

  const removeCartHandler = () => {
    startTransition(async () => {
      await deleteFavoriteAction(id);
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
