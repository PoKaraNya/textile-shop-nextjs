import { Product } from '@prisma/client';
import { ProductCard } from '@/components/products';

interface Props {
  products: Product[]
}

export function ProductsGrid({ products }: Props) {
  return (
    <div className="flex flex-wrap gap-5 justify-around">
      {products.map((product: Product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}
