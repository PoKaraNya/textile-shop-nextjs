import { feedbackSchema } from '@/prisma/zod';
import { z } from 'zod';
import { timestamps } from '@/lib/utils';
import { getFeedbacks } from '@/lib/api/feedbacks/queries';

// Schema for feedbacks - used to validate API requests
const baseSchema = feedbackSchema.omit(timestamps);

export const insertFeedbackSchema = baseSchema.omit({ id: true });
export const insertFeedbackParams = baseSchema.extend({
  rating: z.coerce.number(),
  productId: z.coerce.string().min(1),
}).omit({
  id: true,
  userId: true,
});

export const updateFeedbackSchema = baseSchema;
export const updateFeedbackParams = updateFeedbackSchema.extend({
  rating: z.coerce.number(),
  productId: z.coerce.string().min(1),
}).omit({
  userId: true,
});
export const feedbackIdSchema = baseSchema.pick({ id: true });

// Types for feedbacks - used to type API request params and within Components
export type Feedback = z.infer<typeof feedbackSchema>;
export type NewFeedback = z.infer<typeof insertFeedbackSchema>;
export type NewFeedbackParams = z.infer<typeof insertFeedbackParams>;
export type UpdateFeedbackParams = z.infer<typeof updateFeedbackParams>;
export type FeedbackId = z.infer<typeof feedbackIdSchema>['id'];

// this type infers the return from getFeedbacks() - meaning it will include any joins
export type CompleteFeedback = Awaited<ReturnType<typeof getFeedbacks>>['feedbacks'][number];
