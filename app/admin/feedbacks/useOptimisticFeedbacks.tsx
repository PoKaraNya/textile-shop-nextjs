import { type Product } from '@/lib/db/schema/products';
import { type CompleteFeedback, type Feedback } from '@/lib/db/schema/feedbacks';
import { OptimisticAction } from '@/lib/utils';
import { useOptimistic } from 'react';

export type TAddOptimistic = (action: OptimisticAction<Feedback>) => void;

export function useOptimisticFeedbacks(
  feedbacks: CompleteFeedback[],
  products: Product[],
) {
  const [optimisticFeedbacks, addOptimisticFeedback] = useOptimistic(
    feedbacks,
    (
      currentState: CompleteFeedback[],
      action: OptimisticAction<Feedback>,
    ): CompleteFeedback[] => {
      const { data } = action;

      const optimisticProduct = products.find(
        (product) => product.id === data.productId,
      )!;

      const optimisticFeedback = {
        ...data,
        product: optimisticProduct,
        id: 'optimistic',
      };

      switch (action.action) {
        case 'create':
          // @ts-ignore
          return currentState.length === 0
            ? [optimisticFeedback]
            : [...currentState, optimisticFeedback];
        case 'update':
          // @ts-ignore
          return currentState.map((item) => (item.id === data.id ? { ...item, ...optimisticFeedback } : item));
        case 'delete':
          return currentState.map((item) => (item.id === data.id ? { ...item, id: 'delete' } : item));
        default:
          return currentState;
      }
    },
  );

  return { addOptimisticFeedback, optimisticFeedbacks };
}
