import { LayoutContainer, ListContainer } from '@/components/layout';
import { Suspense } from 'react';
import Loading from '@/app/(app)/loading';
import { getFavorites } from '@/lib/api/favorites/queries';
import { Separator } from '@/components/ui/separator';
import { FavoriteListElement } from '@/components/favorites';

export default async function FavoritesPage() {
  const { favorites } = await getFavorites();

  return (
    <Suspense fallback={<Loading />}>
      <LayoutContainer>
        <ListContainer>
          {favorites.map((favorite) => (
            <>
              <Separator />
              <FavoriteListElement value={favorite} />
            </>
          ))}
        </ListContainer>
      </LayoutContainer>
    </Suspense>
  );
}
