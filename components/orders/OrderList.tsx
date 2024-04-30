'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { CompleteOrder, type Order } from '@/lib/db/schema/orders';
import { Modal } from '@/components/shared/Modal';
import { useOptimisticOrders } from '@/app/admin/orders/useOptimisticOrders';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { OrderForm } from '@/components/orders';

type TOpenModal = (order?: Order) => void;

const EmptyState = ({ openModal }: { openModal: TOpenModal }) => (
  <div className="text-center">
    <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
      No orders
    </h3>
    <p className="mt-1 text-sm text-muted-foreground">
      Get started by creating a new order.
    </p>
    <div className="mt-6">
      <Button onClick={() => openModal()}>
        <PlusIcon className="h-4" />
        {' '}
        New Orders
        {' '}
      </Button>
    </div>
  </div>
);

function OrderElement({
  order,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  openModal,
}: {
  order: CompleteOrder;
  openModal: TOpenModal;
}) {
  const optimistic = order.id === 'optimistic';
  const deleting = order.id === 'delete';
  const mutating = optimistic || deleting;
  const pathname = usePathname();
  const basePath = pathname.includes('orders')
    ? pathname
    : `${pathname}/orders/`;

  return (
    <li
      className={cn(
        'flex justify-between my-2',
        mutating ? 'opacity-30 animate-pulse' : '',
        deleting ? 'text-destructive' : '',
      )}
    >
      <div className="w-full">
        <div>{order.number}</div>
      </div>
      <Button variant="link" asChild>
        <Link href={`${basePath}/${order.id}`}>
          Edit
        </Link>
      </Button>
    </li>
  );
}

export function OrderList({
  orders,
}: {
  orders: CompleteOrder[];
}) {
  const { optimisticOrders, addOptimisticOrder } = useOptimisticOrders(
    orders,
  );
  const [open, setOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const openModal = (order?: Order) => {
    setOpen(true);
    setActiveOrder(order || null);
  };
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activeOrder ? 'Edit Order' : 'Create Order'}
      >
        <OrderForm
          order={activeOrder}
          addOptimistic={addOptimisticOrder}
          openModal={openModal}
          closeModal={closeModal}
        />
      </Modal>
      <div className="absolute right-0 top-0 ">
        <Button onClick={() => openModal()} variant="outline">
          +
        </Button>
      </div>
      {optimisticOrders.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <ul>
          {optimisticOrders.map((order) => (
            <OrderElement
              order={order}
              key={order.id}
              openModal={openModal}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
