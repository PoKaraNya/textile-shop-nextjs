import * as z from "zod"
import { CompleteProduct, relatedProductSchema, CompleteUser, relatedUserSchema } from "./index"

export const feedbackSchema = z.object({
  id: z.string(),
  text: z.string(),
  rating: z.number().int().nullish(),
  productId: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteFeedback extends z.infer<typeof feedbackSchema> {
  product: CompleteProduct
  user: CompleteUser
}

/**
 * relatedFeedbackSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedFeedbackSchema: z.ZodSchema<CompleteFeedback> = z.lazy(() => feedbackSchema.extend({
  product: relatedProductSchema,
  user: relatedUserSchema,
}))
