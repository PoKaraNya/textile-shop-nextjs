import * as z from "zod"
import { CompleteUser, relatedUserSchema, CompleteOrderProducts, relatedOrderProductsSchema } from "./index"

export const orderSchema = z.object({
  id: z.string(),
  number: z.number().int(),
  price: z.number(),
  notes: z.string().nullish(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteOrder extends z.infer<typeof orderSchema> {
  user: CompleteUser
  orderProducts: CompleteOrderProducts[]
}

/**
 * relatedOrderSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedOrderSchema: z.ZodSchema<CompleteOrder> = z.lazy(() => orderSchema.extend({
  user: relatedUserSchema,
  orderProducts: relatedOrderProductsSchema.array(),
}))
