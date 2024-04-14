import * as z from "zod"
import { CompleteProduct, relatedProductSchema, CompleteOrder, relatedOrderSchema } from "./index"

export const orderProductsSchema = z.object({
  id: z.string(),
  productId: z.string(),
  orderId: z.string(),
  count: z.number().int(),
})

export interface CompleteOrderProducts extends z.infer<typeof orderProductsSchema> {
  product: CompleteProduct
  order: CompleteOrder
}

/**
 * relatedOrderProductsSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedOrderProductsSchema: z.ZodSchema<CompleteOrderProducts> = z.lazy(() => orderProductsSchema.extend({
  product: relatedProductSchema,
  order: relatedOrderSchema,
}))
