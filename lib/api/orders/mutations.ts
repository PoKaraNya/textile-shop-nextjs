import { db } from '@/lib/db';
import {
  insertOrderSchema,
  NewOrderParams,
  OrderId,
  orderIdSchema,
  UpdateOrderParams,
  updateOrderSchema,
} from '@/lib/db/schema/orders';
import { getUserAuth } from '@/lib/auth/utils';
import * as Sentry from '@sentry/nextjs';

export const createOrder = async (order: NewOrderParams) => {
  const { session } = await getUserAuth();
  const newOrder = insertOrderSchema.parse({ ...order, userId: session?.user.id! });
  try {
    const o = await db.order.create({ data: newOrder });
    return { order: o };
  } catch (err) {
    Sentry.captureException(err);
    const message = (err as Error).message ?? 'Error, please try again';
    console.error(message);
    throw Error(message);
  }
};

export const updateOrder = async (id: OrderId, order: UpdateOrderParams) => {
  const { session } = await getUserAuth();
  const { id: orderId } = orderIdSchema.parse({ id });
  const newOrder = updateOrderSchema.parse({ ...order, userId: session?.user.id! });
  try {
    const o = await db.order.update({
      where: { id: orderId, userId: session?.user.id! },
      data: newOrder,
    });
    return { order: o };
  } catch (err) {
    Sentry.captureException(err);
    const message = (err as Error).message ?? 'Error, please try again';
    console.error(message);
    throw Error(message);
  }
};

export const deleteOrder = async (id: OrderId) => {
  const { session } = await getUserAuth();
  const { id: orderId } = orderIdSchema.parse({ id });
  try {
    const o = await db.order.delete({ where: { id: orderId, userId: session?.user.id! } });
    return { order: o };
  } catch (err) {
    Sentry.captureException(err);
    const message = (err as Error).message ?? 'Error, please try again';
    console.error(message);
    throw Error(message);
  }
};
