import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { createCart, deleteCart, updateCart } from '@/lib/api/carts/mutations';
import { cartIdSchema, insertCartParams, updateCartParams } from '@/lib/db/schema/carts';

export async function POST(req: Request) {
  try {
    const validatedData = insertCartParams.parse(await req.json());
    const { cart } = await createCart(validatedData);

    revalidatePath('/carts'); // optional - assumes you will have named route same as entity

    return NextResponse.json(cart, { status: 201 });
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

    const validatedData = updateCartParams.parse(await req.json());
    const validatedParams = cartIdSchema.parse({ id });

    const { cart } = await updateCart(validatedParams.id, validatedData);

    return NextResponse.json(cart, { status: 200 });
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

    const validatedParams = cartIdSchema.parse({ id });
    const { cart } = await deleteCart(validatedParams.id);

    return NextResponse.json(cart, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
