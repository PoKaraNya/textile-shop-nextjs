import { db } from '@/lib/db';
import {
  CartId,
  cartIdSchema,
  insertCartSchema,
  NewCartParams,
  UpdateCartParams,
  updateCartSchema,
} from '@/lib/db/schema/carts';
import { getUserAuth } from '@/lib/auth/utils';

export const createCart = async (cart: NewCartParams) => {
  const { session } = await getUserAuth();
  const newCart = insertCartSchema.parse({ ...cart, userId: session?.user.id! });
  try {
    const c = await db.cart.create({ data: newCart });
    return { cart: c };
  } catch (err) {
    const message = (err as Error).message ?? 'Error, please try again';
    console.error(message);
    throw new Error(message);
  }
};

export const updateCart = async (id: CartId, cart: UpdateCartParams) => {
  const { session } = await getUserAuth();
  const { id: cartId } = cartIdSchema.parse({ id });
  const newCart = updateCartSchema.parse({ ...cart, userId: session?.user.id! });
  try {
    const c = await db.cart.update({ where: { id: cartId, userId: session?.user.id! }, data: newCart });
    return { cart: c };
  } catch (err) {
    const message = (err as Error).message ?? 'Error, please try again';
    console.error(message);
    throw new Error(message);
  }
};

export const deleteCart = async (id: CartId) => {
  const { session } = await getUserAuth();
  const { id: cartId } = cartIdSchema.parse({ id });
  try {
    const c = await db.cart.delete({ where: { id: cartId, userId: session?.user.id! } });
    return { cart: c };
  } catch (err) {
    const message = (err as Error).message ?? 'Error, please try again';
    console.error(message);
    throw new Error(message);
  }
};
