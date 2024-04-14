import { db } from '@/lib/db/index';
import { getUserAuth } from '@/lib/auth/utils';
import { type FeedbackId, feedbackIdSchema } from '@/lib/db/schema/feedbacks';

export const getFeedbacks = async () => {
  const f = await db.feedback.findMany({ include: { product: true } });
  return { feedbacks: f };
};

export const getFeedbackById = async (id: FeedbackId) => {
  const { session } = await getUserAuth();
  const { id: feedbackId } = feedbackIdSchema.parse({ id });
  const f = await db.feedback.findFirst({
    where: { id: feedbackId },
    include: { product: true },
  });
  return { feedback: f };
};
