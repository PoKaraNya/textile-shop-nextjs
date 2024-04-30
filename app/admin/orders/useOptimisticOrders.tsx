import { type CompleteOrder, type Order } from '@/lib/db/schema/orders';
import { OptimisticAction } from '@/lib/utils';
import { useOptimistic } from 'react';

export type TAddOptimistic = (action: OptimisticAction<Order>) => void;

export function useOptimisticOrders(
  orders: CompleteOrder[],
) {
  const [optimisticOrders, addOptimisticOrder] = useOptimistic(
    orders,
    (
      currentState: CompleteOrder[],
      action: OptimisticAction<Order>,
    ): CompleteOrder[] => {
      const { data } = action;

      const optimisticOrder = {
        ...data,
        id: 'optimistic',
      };

      switch (action.action) {
        case 'create':
          return currentState.length === 0
            ? [optimisticOrder as CompleteOrder]
            : [...currentState, optimisticOrder as CompleteOrder];
        case 'update':
          return currentState.map((item) => (item.id === data.id
            ? { ...item, ...optimisticOrder }
            : item));
        case 'delete':
          return currentState.map((item) => (item.id === data.id
            ? { ...item, id: 'delete' }
            : item));
        default:
          return currentState;
      }
    },
  );

  return { addOptimisticOrder, optimisticOrders };
}
