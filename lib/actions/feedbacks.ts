'use server';

import { revalidatePath } from 'next/cache';
import { createFeedback, deleteFeedback, updateFeedback } from '@/lib/api/feedbacks/mutations';
import {
  FeedbackId,
  feedbackIdSchema,
  insertFeedbackParams,
  NewFeedbackParams,
  UpdateFeedbackParams,
  updateFeedbackParams,
} from '@/lib/db/schema/feedbacks';
import * as Sentry from '@sentry/nextjs';

const handleErrors = (e: unknown) => {
  Sentry.captureException(e);
  const errMsg = 'Error, please try again.';
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === 'object' && 'error' in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateFeedbacks = () => revalidatePath('/feedbacks');

export const createFeedbackAction = async (input: NewFeedbackParams) => {
  try {
    const payload = insertFeedbackParams.parse(input);
    await createFeedback(payload);
    revalidateFeedbacks();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateFeedbackAction = async (input: UpdateFeedbackParams) => {
  try {
    const payload = updateFeedbackParams.parse(input);
    await updateFeedback(payload.id, payload);
    revalidateFeedbacks();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteFeedbackAction = async (input: FeedbackId) => {
  try {
    const payload = feedbackIdSchema.parse({ id: input });
    await deleteFeedback(payload.id);
    revalidateFeedbacks();
  } catch (e) {
    return handleErrors(e);
  }
};
