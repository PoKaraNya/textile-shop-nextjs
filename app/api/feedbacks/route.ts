import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { createFeedback, deleteFeedback, updateFeedback } from '@/lib/api/feedbacks/mutations';
import { feedbackIdSchema, insertFeedbackParams, updateFeedbackParams } from '@/lib/db/schema/feedbacks';
import * as Sentry from '@sentry/nextjs';

export async function POST(req: Request) {
  try {
    const validatedData = insertFeedbackParams.parse(await req.json());
    const { feedback } = await createFeedback(validatedData);

    revalidatePath('/feedbacks'); // optional - assumes you will have named route same as entity

    return NextResponse.json(feedback, { status: 201 });
  } catch (err) {
    Sentry.captureException(err);
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

    const validatedData = updateFeedbackParams.parse(await req.json());
    const validatedParams = feedbackIdSchema.parse({ id });

    const { feedback } = await updateFeedback(validatedParams.id, validatedData);

    return NextResponse.json(feedback, { status: 200 });
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

    const validatedParams = feedbackIdSchema.parse({ id });
    const { feedback } = await deleteFeedback(validatedParams.id);

    return NextResponse.json(feedback, { status: 200 });
  } catch (err) {
    Sentry.captureException(err);
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
