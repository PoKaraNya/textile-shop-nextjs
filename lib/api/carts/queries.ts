import { db } from '@/lib/db';
import { getUserAuth } from '@/lib/auth/utils';
import { type CartId, cartIdSchema } from '@/lib/db/schema/carts';
import { ProductId, productIdSchema } from '@/lib/db/schema/products';
import { map } from 'lodash';
import { redirect } from 'next/navigation';

export const getCarts = async () => {
  const { session } = await getUserAuth();
  if (!session) redirect('/api/auth/signin');
  const c = await db.cart.findMany({
    where: {
      userId: session?.user.id!,
    },
    include: {
      product: true,
    },
    orderBy: {
      id: 'asc',
    },
  });
  return { carts: c };
};

export const getCartsCount = async () => {
  const { session } = await getUserAuth();
  if (!session) {
    return 0;
  }
  const c = await db.cart.findMany({
    where: {
      userId: session?.user.id!,
    },
    include: {
      product: true,
    },
  });
  return c.length;
};

export const getCartById = async (id: CartId) => {
  const { session } = await getUserAuth();
  const { id: cartId } = cartIdSchema.parse({ id });
  const c = await db.cart.findFirst({
    where: { id: cartId, userId: session?.user.id! },
    include: { product: true },
  });
  return { cart: c };
};

export const isProductInCart = async (id: ProductId) => {
  const { session } = await getUserAuth();
  const { id: productId } = productIdSchema.parse({ id });
  const c = await db.cart.findFirst({
    where: {
      userId: session?.user.id!,
      productId,
    },
  });
  return !!c;
};

export const getProductIdsInCart = async (): Promise<ProductId[]> => {
  const { session } = await getUserAuth();
  if (!session) {
    return [];
  }
  const c = await db.cart.findMany({
    where: {
      userId: session?.user.id!,
    },
  });
  return map(c, 'productId');
};
