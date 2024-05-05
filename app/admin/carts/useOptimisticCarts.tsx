import { type Product } from '@/lib/db/schema/products';
import { type Cart, type CompleteCart } from '@/lib/db/schema/carts';
import { OptimisticAction } from '@/lib/utils';
import { useOptimistic } from 'react';

export type TAddOptimistic = (action: OptimisticAction<Cart>) => void;

export const useOptimisticCarts = (
  carts: CompleteCart[],
  products: Product[],
) => {
  const [optimisticCarts, addOptimisticCart] = useOptimistic(
    carts,
    (
      currentState: CompleteCart[],
      action: OptimisticAction<Cart>,
    ): CompleteCart[] => {
      const { data } = action;

      const optimisticProduct = products.find(
        (product) => product.id === data.productId,
      )!;

      const optimisticCart = {
        ...data,
        product: optimisticProduct,
        id: 'optimistic',
      };

      switch (action.action) {
        case 'create':
          // @ts-ignore
          return currentState.length === 0
            ? [optimisticCart]
            : [...currentState, optimisticCart];
        case 'update':
          // @ts-ignore
          return currentState.map((item) => (item.id === data.id ? { ...item, ...optimisticCart } : item));
        case 'delete':
          return currentState.map((item) => (item.id === data.id ? { ...item, id: 'delete' } : item));
        default:
          return currentState;
      }
    },
  );

  return { addOptimisticCart, optimisticCarts };
};
