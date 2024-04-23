import { db } from '@/lib/db';
import { type ProductId, productIdSchema } from '@/lib/db/schema/products';

export const getProducts = async () => {
  const p = await db.product.findMany({});
  return { products: p };
};

export const getProductById = async (id: ProductId) => {
  const { id: productId } = productIdSchema.parse({ id });
  const p = await db.product.findFirst({ where: { id: productId } });
  return { product: p };
};
