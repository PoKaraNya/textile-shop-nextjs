import Link from 'next/link';
import { Category } from '@/lib/db/schema/categories';

interface Props {
  category: Category
}
export function CategoryCard({ category }: Props) {
  return (
    <div className="p-3 w-72 border rounded-xl">
      <Link href={`/categories/${category.id}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="w-72 h-40 object-cover rounded-lg" src={category.photo ?? ''} alt="" />
        <h3 className="font-bold mt-1">{category.title}</h3>
        <p className="line-clamp-2 text-sm text-zinc-600">{category.description}</p>
      </Link>
    </div>
  );
}
