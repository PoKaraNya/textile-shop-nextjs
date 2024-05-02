import { cartSchema } from '@/zodAutoGenSchemas';
import { z } from 'zod';
import { getCarts } from '@/lib/api/carts/queries';

// Schema for carts - used to validate API requests
const baseSchema = cartSchema;

export const insertCartSchema = baseSchema.omit({ id: true });
export const insertCartParams = baseSchema.extend({
  productId: z.coerce.string().min(1),
  count: z.coerce.number(),
}).omit({
  id: true,
  userId: true,
});

export const updateCartSchema = baseSchema;
export const updateCartParams = updateCartSchema.extend({
  productId: z.coerce.string().min(1),
  count: z.coerce.number(),
}).omit({
  userId: true,
});
export const cartIdSchema = baseSchema.pick({ id: true });

export const addProductCountParams = baseSchema
  .pick({ id: true })
  .extend({ number: z.number() });

// Types for carts - used to type API request params and within Components
export type Cart = z.infer<typeof cartSchema>;
export type NewCart = z.infer<typeof insertCartSchema>;
export type NewCartParams = z.infer<typeof insertCartParams>;
export type UpdateCartParams = z.infer<typeof updateCartParams>;
export type CartId = z.infer<typeof cartIdSchema>['id'];

// this type infers the return from getCarts() - meaning it will include any joins
export type CompleteCart = Awaited<ReturnType<typeof getCarts>>['carts'][number];
