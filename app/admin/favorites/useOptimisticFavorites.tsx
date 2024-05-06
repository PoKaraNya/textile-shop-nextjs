import { type Product } from '@/lib/db/schema/products';
import { type CompleteFavorite, type Favorite } from '@/lib/db/schema/favorites';
import { OptimisticAction } from '@/lib/utils';
import { useOptimistic } from 'react';

export type TAddOptimistic = (action: OptimisticAction<Favorite>) => void;

export const useOptimisticFavorites = (
  favorites: CompleteFavorite[],
  products: Product[],
) => {
  const [optimisticFavorites, addOptimisticFavorite] = useOptimistic(
    favorites,
    (
      currentState: CompleteFavorite[],
      action: OptimisticAction<Favorite>,
    ): CompleteFavorite[] => {
      const { data } = action;

      const optimisticProduct = products.find(
        (product) => product.id === data.productId,
      )!;

      const optimisticFavorite = {
        ...data,
        product: optimisticProduct,
        id: 'optimistic',
      };

      switch (action.action) {
        case 'create':
          // @ts-ignore
          return currentState.length === 0
            ? [optimisticFavorite]
            : [...currentState, optimisticFavorite];
        case 'update':
          // @ts-ignore
          return currentState.map((item) => (item.id === data.id ? { ...item, ...optimisticFavorite } : item));
        case 'delete':
          return currentState.map((item) => (item.id === data.id ? { ...item, id: 'delete' } : item));
        default:
          return currentState;
      }
    },
  );

  return { addOptimisticFavorite, optimisticFavorites };
};
