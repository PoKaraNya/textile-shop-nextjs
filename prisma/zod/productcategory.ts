import * as z from 'zod';
import {
  CompleteCategory, CompleteProduct, relatedCategorySchema, relatedProductSchema,
} from './index';

export const productCategorySchema = z.object({
  productId: z.string(),
  categoryId: z.string(),
});

export interface CompleteProductCategory extends z.infer<typeof productCategorySchema> {
  product: CompleteProduct
  category: CompleteCategory
}

/**
 * relatedProductCategorySchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedProductCategorySchema: z.ZodSchema<CompleteProductCategory> = z.lazy(() => productCategorySchema.extend({
  product: relatedProductSchema,
  category: relatedCategorySchema,
}));
