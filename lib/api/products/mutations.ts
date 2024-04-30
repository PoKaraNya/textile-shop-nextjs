import { db } from '@/lib/db';
import {
  insertProductSchema,
  NewProductParams,
  ProductId,
  productIdSchema,
  UpdateProductParams,
  updateProductSchema,
} from '@/lib/db/schema/products';
import * as Sentry from '@sentry/nextjs';

export const createProduct = async (product: NewProductParams) => {
  const newProduct = insertProductSchema.parse(product);
  try {
    const p = await db.product.create({ data: newProduct });
    return { product: p };
  } catch (err) {
    Sentry.captureException(err);
    const message = (err as Error).message ?? 'Error, please try again';
    console.error(message);
    throw new Error(message);
  }
};

export const updateProduct = async (id: ProductId, product: UpdateProductParams) => {
  const { id: productId } = productIdSchema.parse({ id });
  const newProduct = updateProductSchema.parse(product);
  try {
    const p = await db.product.update({ where: { id: productId }, data: newProduct });
    return { product: p };
  } catch (err) {
    Sentry.captureException(err);
    const message = (err as Error).message ?? 'Error, please try again';
    console.error(message);
    throw new Error(message);
  }
};

export const deleteProduct = async (id: ProductId) => {
  const { id: productId } = productIdSchema.parse({ id });
  try {
    const p = await db.product.delete({ where: { id: productId } });
    return { product: p };
  } catch (err) {
    Sentry.captureException(err);
    const message = (err as Error).message ?? 'Error, please try again';
    console.error(message);
    throw new Error(message);
  }
};
