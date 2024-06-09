import { Category } from '@/lib/db/schema/categories';
import Link from 'next/link';

interface Props {
  category: Category
}
export function CategoryHomeList({ category }: Props) {
  return (

    <Link
      className="flex items-center justify-between text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
      href={`/categories/${category.id}`}
    >
      <span>{category.title}</span>
    </Link>
  );
}
