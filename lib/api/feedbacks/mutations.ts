import { db } from '@/lib/db';
import {
  FeedbackId,
  feedbackIdSchema,
  insertFeedbackSchema,
  NewFeedbackParams,
  UpdateFeedbackParams,
  updateFeedbackSchema,
} from '@/lib/db/schema/feedbacks';
import * as Sentry from '@sentry/nextjs';

export const createFeedback = async (feedback: NewFeedbackParams) => {
  const newFeedback = insertFeedbackSchema.parse(feedback);
  try {
    const f = await db.feedback.create({ data: newFeedback });
    return { feedback: f };
  } catch (err) {
    Sentry.captureException(err);
    const message = (err as Error).message ?? 'Error, please try again';
    console.error(message);
    throw new Error(message);
  }
};

export const updateFeedback = async (id: FeedbackId, feedback: UpdateFeedbackParams) => {
  const { id: feedbackId } = feedbackIdSchema.parse({ id });
  const newFeedback = updateFeedbackSchema.parse(feedback);
  try {
    const f = await db.feedback.update({ where: { id: feedbackId }, data: newFeedback });
    return { feedback: f };
  } catch (err) {
    Sentry.captureException(err);
    const message = (err as Error).message ?? 'Error, please try again';
    console.error(message);
    throw new Error(message);
  }
};

export const deleteFeedback = async (id: FeedbackId) => {
  const { id: feedbackId } = feedbackIdSchema.parse({ id });
  try {
    const f = await db.feedback.delete({ where: { id: feedbackId } });
    return { feedback: f };
  } catch (err) {
    Sentry.captureException(err);
    const message = (err as Error).message ?? 'Error, please try again';
    console.error(message);
    throw new Error(message);
  }
};
