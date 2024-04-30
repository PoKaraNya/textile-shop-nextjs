import { NextResponse } from 'next/server';
import { z } from 'zod';

import { deleteCategory, updateCategory } from '@/lib/api/categories/mutations';
import { categoryIdSchema, updateCategoryParams } from '@/lib/db/schema/categories';
import { getCategories } from '@/lib/api/categories/queries';
import * as Sentry from '@sentry/nextjs';

export async function GET() {
  return NextResponse.json({ data: getCategories() }, { status: 200 });
}

// export async function POST(req: Request) {
//   try {
//     const validatedData = insertCategoryParams.parse(await req.json());
//     const { category } = await createCategory(validatedData);
//
//     revalidatePath('/categories'); // optional - assumes you will have named route same as entity
//
//     return NextResponse.json(category, { status: 201 });
//   } catch (err) {
//     if (err instanceof z.ZodError) {
//       return NextResponse.json({ error: err.issues }, { status: 400 });
//     }
//     return NextResponse.json({ error: err }, { status: 500 });
//   }
// }

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    const validatedData = updateCategoryParams.parse(await req.json());
    const validatedParams = categoryIdSchema.parse({ id });

    const { category } = await updateCategory(validatedParams.id, validatedData);

    return NextResponse.json(category, { status: 200 });
  } catch (err) {
    Sentry.captureException(err);
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

    const validatedParams = categoryIdSchema.parse({ id });
    const { category } = await deleteCategory(validatedParams.id);

    return NextResponse.json(category, { status: 200 });
  } catch (err) {
    Sentry.captureException(err);
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
