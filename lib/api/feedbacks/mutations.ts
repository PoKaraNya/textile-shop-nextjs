import { db } from '@/lib/db/index';
import {
  FeedbackId,
  feedbackIdSchema,
  insertFeedbackSchema,
  NewFeedbackParams,
  UpdateFeedbackParams,
  updateFeedbackSchema,
} from '@/lib/db/schema/feedbacks';
import { getUserAuth } from '@/lib/auth/utils';

export const createFeedback = async (feedback: NewFeedbackParams) => {
  const { session } = await getUserAuth();
  const newFeedback = insertFeedbackSchema.parse({ ...feedback, userId: session?.user.id! });
  try {
    const f = await db.feedback.create({ data: newFeedback });
    return { feedback: f };
  } catch (err) {
    const message = (err as Error).message ?? 'Error, please try again';
    console.error(message);
    throw new Error(message);
  }
};

export const updateFeedback = async (id: FeedbackId, feedback: UpdateFeedbackParams) => {
  const { session } = await getUserAuth();
  const { id: feedbackId } = feedbackIdSchema.parse({ id });
  const newFeedback = updateFeedbackSchema.parse({ ...feedback, userId: session?.user.id! });
  try {
    const f = await db.feedback.update({ where: { id: feedbackId, userId: session?.user.id! }, data: newFeedback });
    return { feedback: f };
  } catch (err) {
    const message = (err as Error).message ?? 'Error, please try again';
    console.error(message);
    throw new Error(message);
  }
};

export const deleteFeedback = async (id: FeedbackId) => {
  const { session } = await getUserAuth();
  const { id: feedbackId } = feedbackIdSchema.parse({ id });
  try {
    const f = await db.feedback.delete({ where: { id: feedbackId, userId: session?.user.id! } });
    return { feedback: f };
  } catch (err) {
    const message = (err as Error).message ?? 'Error, please try again';
    console.error(message);
    throw new Error(message);
  }
};
