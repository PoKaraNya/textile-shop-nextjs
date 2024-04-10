import * as z from 'zod';
import { CompleteProductCategory, relatedProductCategorySchema } from './index';

export const productSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullish(),
  photo: z.string().nullish(),
  price: z.number().int().nullish(),
});

export interface CompleteProduct extends z.infer<typeof productSchema> {
  categories: CompleteProductCategory[]
}

/**
 * relatedProductSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedProductSchema: z.ZodSchema<CompleteProduct> = z.lazy(() => productSchema.extend({
  categories: relatedProductCategorySchema.array(),
}));
