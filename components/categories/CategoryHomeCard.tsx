import Link from 'next/link';
import { Category } from '@/lib/db/schema/categories';

interface Props {
  category: Category
}
export function CategoryHomeCard({ category }: Props) {
  return (
    <div
      className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2"
    >
      {/* <div className="p-3 w-72 border rounded-xl"> */}
      <Link href={`/categories/${category.id}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="w-full h-65 aspect-square rounded-t-lg"
          src={category.photo ?? ''}
          alt=""
        />
        <div className="p-4 bg-white dark:bg-gray-950">
          <h3 className="text-lg font-bold">{category.title}</h3>
        </div>
      </Link>
    </div>
  );
}
