import Link from 'next/link';
import { Product } from '@/lib/db/schema/products';

interface Props {
  product: Product
}
export function ProductHomeCard({ product }: Props) {
  return (
    <div>
      <Link href={`/products/${product.id}`}>
        <img
          alt="Product"
          className="aspect-square cover rounded-t-lg"
          src={product.photo || '/placeholder.svg'}
        />
        <div className="p-4 bg-white cover dark:bg-gray-950">
          <h3 className="text-lg font-bold">{product.title}</h3>
          <p className="text-gray-500 dark:text-gray-400">
            {product.price}
            {' '}
            грн
          </p>
        </div>
      </Link>
    </div>
  );
}
