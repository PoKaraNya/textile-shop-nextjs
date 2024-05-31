'use client';

import React from 'react';
import { OrderUserListElement } from './OrderUserListElement';

interface Props {
  orders: {
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
  }[];
}

export function OrderUserList({ orders }: Props) {
  if (orders.length === 0) {
    return <div>No orders found</div>;
  }

  return (
    <div>
      {orders.map((order) => (
        <OrderUserListElement key={order.id} value={order} />
      ))}
    </div>
  );
}
