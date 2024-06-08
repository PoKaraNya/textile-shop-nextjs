import { Category } from '@/lib/db/schema/categories';
import { CategoryCard } from '@/components/categories';
import { CategoryHomeCard } from '@/components/categories/CategoryHomeCard';
import { ProductHomeGrid } from '@/components/products/ProductHomeGrid';

interface Props {
  categories: Category[]
}

export function CategoryHomeGrid({ categories }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {categories.map((product: Category) => (
        <CategoryHomeCard category={product} key={product.id} />
      ))}

    </div>
  );
}
