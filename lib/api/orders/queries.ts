import { db } from '@/lib/db';
// eslint-disable-next-line import/no-cycle
import { type OrderId, orderIdSchema } from '@/lib/db/schema/orders';

export const getOrders = async () => {
  const o = await db.order.findMany({});
  return { orders: o };
};

export const getOrderById = async (id: OrderId) => {
  const { id: orderId } = orderIdSchema.parse({ id });
  const o = await db.order.findFirst({
    where: { id: orderId },
  });
  return { order: o };
};
