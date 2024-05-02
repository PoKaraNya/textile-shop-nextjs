'use client';

import { Product } from '@/lib/db/schema/products';
import { IoCartOutline, IoHeartSharp } from 'react-icons/io5';
import Link from 'next/link';
import { useTransition } from 'react';
import { createCartAction } from '@/lib/actions/carts';

interface Props {
  product: Product
}
export function ProductCard({ product }: Props) {
  const [, startTransition] = useTransition();
  const addToCartHandle = () => {
    startTransition(async () => {
      await createCartAction({ productId: product.id, count: 1 });
    });
  };
  return (
    <div className="p-2 w-72 border rounded-xl">
      <Link href={`/products/${product.id}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="w-72 h-40 object-cover rounded-lg" src={product.photo ?? ''} alt="" />
        <h3 className="font-bold mt-1">{product.title}</h3>
        <p className="line-clamp-2 text-sm text-zinc-600">{product.description}</p>
      </Link>
      <div className="flex gap-2 mt-1 text-white">

        <div className="bg-orange-500 w-48 h-8 flex justify-center items-center rounded-md">
          {product.price}
          ₴
        </div>
        <button
          type="button"
          className="bg-orange-500 size-8 rounded-md flex justify-center items-center"
          onClick={addToCartHandle}
        >
          <IoCartOutline />
        </button>
        <button type="button" className="bg-orange-500 size-8 rounded-md flex justify-center items-center">
          <IoHeartSharp />
        </button>
      </div>
    </div>
  );
}
