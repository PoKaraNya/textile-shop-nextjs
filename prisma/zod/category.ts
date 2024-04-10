import * as z from "zod"
import { CompleteProductCategory, relatedProductCategorySchema } from "./index"

export const categorySchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullish(),
  photo: z.string().nullish(),
})

export interface CompleteCategory extends z.infer<typeof categorySchema> {
  products: CompleteProductCategory[]
}

/**
 * relatedCategorySchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedCategorySchema: z.ZodSchema<CompleteCategory> = z.lazy(() => categorySchema.extend({
  products: relatedProductCategorySchema.array(),
}))
