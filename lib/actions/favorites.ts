'use server';

import { revalidatePath } from 'next/cache';
import {
  createFavorite,
  deleteFavorite,
  updateFavorite,
} from '@/lib/api/favorites/mutations';
import {
  FavoriteId,
  NewFavoriteParams,
  UpdateFavoriteParams,
  favoriteIdSchema,
  insertFavoriteParams,
  updateFavoriteParams,
} from '@/lib/db/schema/favorites';

const handleErrors = (e: unknown) => {
  const errMsg = 'Error, please try again.';
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === 'object' && 'error' in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateFavorites = () => revalidatePath('/favorites');

export const createFavoriteAction = async (input: NewFavoriteParams) => {
  try {
    const payload = insertFavoriteParams.parse(input);
    await createFavorite(payload);
    revalidateFavorites();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateFavoriteAction = async (input: UpdateFavoriteParams) => {
  try {
    const payload = updateFavoriteParams.parse(input);
    await updateFavorite(payload.id, payload);
    revalidateFavorites();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteFavoriteAction = async (input: FavoriteId) => {
  try {
    const payload = favoriteIdSchema.parse({ id: input });
    await deleteFavorite(payload.id);
    revalidateFavorites();
  } catch (e) {
    return handleErrors(e);
  }
};
