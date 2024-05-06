import { favoriteSchema } from '@/zodAutoGenSchemas';
import { z } from 'zod';
import { timestamps } from '@/lib/utils';
import { getFavorites } from '@/lib/api/favorites/queries';

// Schema for favorites - used to validate API requests
const baseSchema = favoriteSchema.omit(timestamps);

export const insertFavoriteSchema = baseSchema.omit({ id: true });
export const insertFavoriteParams = baseSchema.extend({
  productId: z.coerce.string().min(1),
}).omit({
  id: true,
  userId: true,
});

export const updateFavoriteSchema = baseSchema;
export const updateFavoriteParams = updateFavoriteSchema.extend({
  productId: z.coerce.string().min(1),
}).omit({
  userId: true,
});
export const favoriteIdSchema = baseSchema.pick({ id: true });

// Types for favorites - used to type API request params and within Components
export type Favorite = z.infer<typeof favoriteSchema>;
export type NewFavorite = z.infer<typeof insertFavoriteSchema>;
export type NewFavoriteParams = z.infer<typeof insertFavoriteParams>;
export type UpdateFavoriteParams = z.infer<typeof updateFavoriteParams>;
export type FavoriteId = z.infer<typeof favoriteIdSchema>['id'];

// this type infers the return from getFavorites() - meaning it will include any joins
export type CompleteFavorite = Awaited<ReturnType<typeof getFavorites>>['favorites'][number];
