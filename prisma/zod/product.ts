import * as z from "zod"

export const productSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullish(),
  photo: z.string().nullish(),
  price: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
