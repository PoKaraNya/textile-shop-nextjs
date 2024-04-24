import { Category } from '@/lib/db/schema/categories';
import CategoryCard from '@/components/categories/CategoryCard';

interface Props {
  categories: Category[]
}

function CategoryGrid({ categories }: Props) {
  return (
    <div className="flex flex-wrap gap-5 justify-around">
      {categories.map((product: Category) => (
        <CategoryCard category={product} key={product.id} />
      ))}
    </div>
  );
}

export default CategoryGrid;