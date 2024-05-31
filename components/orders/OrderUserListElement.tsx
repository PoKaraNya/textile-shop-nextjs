'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronUpIcon, ChevronDownIcon } from 'lucide-react';

interface Props {
  value: {
    id: string;
    number: number;
    price: number;
    notes?: string | null;
    createdAt: Date;
    orderProducts: {
      product: {
        id: string;
        title: string;
        description?: string | null;
        photo?: string | null;
        price: number;
      };
      count: number;
    }[];
  };
}

export function OrderUserListElement({ value }: Props) {
  const {
    number, price, notes, createdAt, orderProducts,
  } = value;
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-bg-dark border mt-10 p-4 rounded-lg mb-4 relative">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">
          Order #
          {number}
        </h3>
        <button type="button" onClick={toggleOpen} className="ml-4">
          {isOpen ? (
            <ChevronUpIcon className="h-5 w-5 ml-1" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 ml-1" />
          )}
        </button>
      </div>
      <p>
        Total Price:
        {price}
        {' '}
        грн
      </p>
      {notes && (
        <p>
          Notes:
          {notes}
        </p>
      )}
      {isOpen && (
        <div>
          {orderProducts.map((orderProduct) => (
            <div key={orderProduct.product.id} className="flex items-center my-2">
              <img
                src={orderProduct.product.photo || '/placeholder.png'}
                alt={orderProduct.product.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="ml-4">
                <Link href={`/products/${orderProduct.product.id}`}>
                  <h4 className="font-medium">{orderProduct.product.title}</h4>
                </Link>
                <p>
                  Quantity:
                  {orderProduct.count}
                </p>
                <p>
                  Price:
                  {orderProduct.product.price}
                  {' '}
                  грн
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="absolute bottom-2 right-2">
        <time>{new Date(createdAt).toLocaleDateString()}</time>
      </div>
    </div>
  );
}
