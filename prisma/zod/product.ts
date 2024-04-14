import * as z from "zod"
import { CompleteCategory, relatedCategorySchema, CompleteFeedback, relatedFeedbackSchema, CompleteOrderProducts, relatedOrderProductsSchema } from "./index"

export const productSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullish(),
  photo: z.string().nullish(),
  price: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  categoryId: z.string(),
})

export interface CompleteProduct extends z.infer<typeof productSchema> {
  category: CompleteCategory
  feedback: CompleteFeedback[]
  orderProducts: CompleteOrderProducts[]
}

/**
 * relatedProductSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedProductSchema: z.ZodSchema<CompleteProduct> = z.lazy(() => productSchema.extend({
  category: relatedCategorySchema,
  feedback: relatedFeedbackSchema.array(),
  orderProducts: relatedOrderProductsSchema.array(),
}))
