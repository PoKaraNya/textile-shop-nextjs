import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type CartId, cartIdSchema } from "@/lib/db/schema/carts";

export const getCarts = async () => {
  const { session } = await getUserAuth();
  const c = await db.cart.findMany({ where: {userId: session?.user.id!}, include: { product: true}});
  return { carts: c };
};

export const getCartById = async (id: CartId) => {
  const { session } = await getUserAuth();
  const { id: cartId } = cartIdSchema.parse({ id });
  const c = await db.cart.findFirst({
    where: { id: cartId, userId: session?.user.id!},
    include: { product: true }
  });
  return { cart: c };
};


