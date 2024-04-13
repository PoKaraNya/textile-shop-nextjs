import { orderSchema } from '@/zodAutoGenSchemas';
import { z } from 'zod';
import { timestamps } from '@/lib/utils';
import { getOrders } from '@/lib/api/orders/queries';

// Schema for orders - used to validate API requests
const baseSchema = orderSchema.omit(timestamps);

export const insertOrderSchema = baseSchema.omit({ id: true });
export const insertOrderParams = baseSchema.extend({
  number: z.coerce.number(),
  price: z.coerce.number(),
  productId: z.coerce.string().min(1),
}).omit({
  id: true,
  userId: true,
});

export const updateOrderSchema = baseSchema;
export const updateOrderParams = updateOrderSchema.extend({
  number: z.coerce.number(),
  price: z.coerce.number(),
  productId: z.coerce.string().min(1),
}).omit({
  userId: true,
});
export const orderIdSchema = baseSchema.pick({ id: true });

// Types for orders - used to type API request params and within Components
export type Order = z.infer<typeof orderSchema>;
export type NewOrder = z.infer<typeof insertOrderSchema>;
export type NewOrderParams = z.infer<typeof insertOrderParams>;
export type UpdateOrderParams = z.infer<typeof updateOrderParams>;
export type OrderId = z.infer<typeof orderIdSchema>['id'];

// this type infers the return from getOrders() - meaning it will include any joins
export type CompleteOrder = Awaited<ReturnType<typeof getOrders>>['orders'][number];
