import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import {
  createFavorite,
  deleteFavorite,
  updateFavorite,
} from '@/lib/api/favorites/mutations';
import {
  favoriteIdSchema,
  insertFavoriteParams,
  updateFavoriteParams,
} from '@/lib/db/schema/favorites';

export async function POST(req: Request) {
  try {
    const validatedData = insertFavoriteParams.parse(await req.json());
    const { favorite } = await createFavorite(validatedData);

    revalidatePath('/favorites'); // optional - assumes you will have named route same as entity

    return NextResponse.json(favorite, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    const validatedData = updateFavoriteParams.parse(await req.json());
    const validatedParams = favoriteIdSchema.parse({ id });

    const { favorite } = await updateFavorite(validatedParams.id, validatedData);

    return NextResponse.json(favorite, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    const validatedParams = favoriteIdSchema.parse({ id });
    const { favorite } = await deleteFavorite(validatedParams.id);

    return NextResponse.json(favorite, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
