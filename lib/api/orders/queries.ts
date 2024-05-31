import { db } from '@/lib/db';
// eslint-disable-next-line import/no-cycle
import { type OrderId, orderIdSchema } from '@/lib/db/schema/orders';
import { getUserAuth } from '@/lib/auth/utils';

// export const getOrders = async () => {
//   const o = await db.order.findMany({});
//   return { orders: o };
// };

export const getOrders = async () => {
  const { session } = await getUserAuth();
  const o = await db.order.findMany({
    where: {
      userId: session?.user.id!,
    },
    orderBy: {
      id: 'desc',
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });
  return { orders: o };
};

export const getOrderById = async (id: OrderId) => {
  const { id: orderId } = orderIdSchema.parse({ id });
  const o = await db.order.findFirst({
    where: { id: orderId },
  });
  return { order: o };
};

export const getUserOrders = async () => {
  const { session } = await getUserAuth();
  const o = await db.order.findMany({
    where: {
      userId: session?.user.id!,
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });
  return { orders: o };
};
