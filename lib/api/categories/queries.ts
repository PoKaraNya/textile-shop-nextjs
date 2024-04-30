import { db } from '@/lib/db';
import { type CategoryId, categoryIdSchema } from '@/lib/db/schema/categories';

export const getCategories = async () => {
  const c = await db.category.findMany({});
  return { categories: c };
};

export const getCategoryById = async (id: CategoryId) => {
  const { id: categoryId } = categoryIdSchema.parse({ id });
  const c = await db.category.findFirst({ where: { id: categoryId } });
  return { category: c };
};

export const getProductsByCategoryId = async (id: CategoryId) => {
  const { id: categoryId } = categoryIdSchema.parse({ id });
  const c = await db.category.findFirst({
    where: {
      id: categoryId,
    },
    include: {
      products: true,
    },
  });
  return { category: c };
};
