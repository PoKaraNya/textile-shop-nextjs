import * as z from "zod"
import { CompleteProduct, relatedProductSchema, CompleteUser, relatedUserSchema } from "./index"

export const cartSchema = z.object({
  id: z.string(),
  productId: z.string(),
  count: z.number().int(),
  userId: z.string(),
})

export interface CompleteCart extends z.infer<typeof cartSchema> {
  product: CompleteProduct
  user: CompleteUser
}

/**
 * relatedCartSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedCartSchema: z.ZodSchema<CompleteCart> = z.lazy(() => cartSchema.extend({
  product: relatedProductSchema,
  user: relatedUserSchema,
}))
