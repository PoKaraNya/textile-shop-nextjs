import * as z from "zod"
import { CompleteProduct, relatedProductSchema, CompleteUser, relatedUserSchema } from "./index"

export const favoriteSchema = z.object({
  id: z.string(),
  productId: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteFavorite extends z.infer<typeof favoriteSchema> {
  product: CompleteProduct
  user: CompleteUser
}

/**
 * relatedFavoriteSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedFavoriteSchema: z.ZodSchema<CompleteFavorite> = z.lazy(() => favoriteSchema.extend({
  product: relatedProductSchema,
  user: relatedUserSchema,
}))
