import { addProductCountParams } from '@/lib/db/schema/carts';
import { addProductCount } from '@/lib/api/carts/mutations';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(req: Request) {
  try {
    const validatedData = addProductCountParams.parse(await req.json());
    await addProductCount(validatedData.id, validatedData.number);

    revalidatePath('/carts');

    return NextResponse.json(null, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
